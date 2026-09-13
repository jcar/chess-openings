// Stockfish (WASM) client. Loads the single-threaded build served from
// /public/stockfish as a Web Worker and speaks UCI to it. Single-threaded means
// no SharedArrayBuffer, so no cross-origin-isolation headers are required.
//
// Improvements over the ChessHall original:
//  • one serialized JOB QUEUE — callers never race on the same `bestmove`
//  • `analyzeMulti` — MultiPV lines with scores (coaching needs candidates)
//  • `abortAnalysis` — a new user move cancels stale coaching analysis
//  • bot-move jobs preempt pending analysis jobs
//
// Browser-only — guard calls behind `typeof window !== "undefined"`.

import { withBasePath } from "@/lib/basePath";
import { createScriptedEngine, isScriptedEngineEnabled } from "./scriptedEngine";

const ENGINE_URL = withBasePath("/stockfish/stockfish-18-lite-single.js");

/** UCI skill levels run 0 (weakest) to 20 (full strength). */
export type SkillLevel = number;

/** Evaluation from the SIDE-TO-MOVE's perspective. */
export interface Analysis {
  cp: number | null;
  mate: number | null;
  bestMove: string | null;
}

export interface PvLine {
  uci: string;
  cp: number | null;
  mate: number | null;
}

export interface MultiAnalysis {
  /** Best-first. */
  lines: PvLine[];
  bestMove: string | null;
  depth: number;
  /** True when the job was cancelled before finishing; `lines` may be partial. */
  aborted: boolean;
}

export interface MultiOptions {
  depth?: number;
  multiPV?: number;
  signal?: AbortSignal;
}

export interface EngineLike {
  getBestMove(fen: string, skill?: SkillLevel, moveTimeMs?: number): Promise<string | null>;
  getMoveAtElo(fen: string, elo: number, moveTimeMs?: number): Promise<string | null>;
  analyze(fen: string, depth?: number): Promise<Analysis>;
  analyzeMulti(fen: string, opts?: MultiOptions): Promise<MultiAnalysis>;
  /** Cancel every pending/running ANALYSIS job (move jobs are left alone). */
  abortAnalysis(): void;
  /** Start the worker early (e.g. after the first user move) so the first real
   *  request doesn't pay the WASM boot cost. */
  warmUp(): Promise<void>;
  dispose(): void;
  /** Test seam: a pre-scripted move for this position, if any (only the e2e
   *  scripted engine implements it; the bot policy consults it first). */
  peekScripted?(fen: string): string | null;
}

/** Approximate sub-1320-Elo play by limiting search depth + skill (the engine
 *  has no native Elo setting below 1320). Heuristic — tuned to feel right. */
export function weakConfigForElo(elo: number): { skill: number; depth: number } {
  if (elo <= 700) return { skill: 0, depth: 1 };
  if (elo <= 900) return { skill: 1, depth: 2 };
  if (elo <= 1100) return { skill: 2, depth: 3 };
  return { skill: 3, depth: 5 }; // ~1200 up to the 1320 native floor
}

type Kind = "move" | "analysis";

interface Job<T> {
  kind: Kind;
  commands: string[];
  onInfo?: (line: string) => void;
  finish: (bestmove: string | null, aborted: boolean) => T;
  resolve: (v: T) => void;
  aborted: boolean;
}

class StockfishEngine implements EngineLike {
  private worker: Worker | null = null;
  private ready: Promise<void> | null = null;
  private listeners = new Set<(line: string) => void>();
  private queue: Job<unknown>[] = [];
  private current: Job<unknown> | null = null;

  private ensureWorker(): Promise<void> {
    if (this.ready) return this.ready;
    this.ready = new Promise<void>((resolve, reject) => {
      try {
        const worker = new Worker(ENGINE_URL);
        this.worker = worker;
        worker.onmessage = (e: MessageEvent) => {
          const line = typeof e.data === "string" ? e.data : String(e.data);
          this.listeners.forEach((l) => l(line));
        };
        worker.onerror = (e) => reject(e);
        const onLine = (line: string) => {
          if (line === "uciok") this.send("isready");
          else if (line === "readyok") {
            this.listeners.delete(onLine);
            resolve();
          }
        };
        this.listeners.add(onLine);
        this.send("uci");
      } catch (err) {
        reject(err);
      }
    });
    return this.ready;
  }

  private send(cmd: string) {
    this.worker?.postMessage(cmd);
  }

  warmUp(): Promise<void> {
    return this.ensureWorker();
  }

  private enqueue<T>(job: Omit<Job<T>, "resolve" | "aborted">): Promise<T> {
    return new Promise<T>((resolve) => {
      const full: Job<T> = { ...job, resolve, aborted: false };
      if (job.kind === "move") {
        // Preempt pending analysis: the bot's reply matters more than a stale eval.
        const idx = this.queue.findIndex((j) => j.kind === "analysis");
        if (idx === -1) this.queue.push(full as Job<unknown>);
        else this.queue.splice(idx, 0, full as Job<unknown>);
        if (this.current?.kind === "analysis") this.stopCurrent();
      } else {
        this.queue.push(full as Job<unknown>);
      }
      void this.pump();
    });
  }

  private stopCurrent() {
    if (this.current && !this.current.aborted) {
      this.current.aborted = true;
      this.send("stop");
    }
  }

  private async pump() {
    if (this.current) return;
    const job = this.queue.shift();
    if (!job) return;
    this.current = job;
    await this.ensureWorker();
    await new Promise<void>((done) => {
      const onLine = (line: string) => {
        if (line.startsWith("info") && job.onInfo) job.onInfo(line);
        else if (line.startsWith("bestmove")) {
          this.listeners.delete(onLine);
          const bm = line.split(" ")[1];
          job.resolve(job.finish(bm && bm !== "(none)" ? bm : null, job.aborted));
          done();
        }
      };
      this.listeners.add(onLine);
      if (job.aborted) {
        // Cancelled while waiting in the queue: never started, nothing to stop.
        this.listeners.delete(onLine);
        job.resolve(job.finish(null, true));
        done();
        return;
      }
      for (const c of job.commands) this.send(c);
    });
    this.current = null;
    void this.pump();
  }

  abortAnalysis(): void {
    for (const j of this.queue) if (j.kind === "analysis") j.aborted = true;
    if (this.current?.kind === "analysis") this.stopCurrent();
  }

  getBestMove(fen: string, skill: SkillLevel = 5, moveTimeMs = 500): Promise<string | null> {
    const s = Math.max(0, Math.min(20, Math.round(skill)));
    return this.enqueue<string | null>({
      kind: "move",
      commands: [
        "setoption name MultiPV value 1",
        "setoption name UCI_LimitStrength value false",
        `setoption name Skill Level value ${s}`,
        `position fen ${fen}`,
        `go movetime ${moveTimeMs}`,
      ],
      finish: (bm) => bm,
    });
  }

  getMoveAtElo(fen: string, elo: number, moveTimeMs = 600): Promise<string | null> {
    const e = Math.round(elo);
    const commands =
      e >= 1320
        ? [
            "setoption name MultiPV value 1",
            "setoption name UCI_LimitStrength value true",
            `setoption name UCI_Elo value ${Math.min(3190, e)}`,
            "setoption name Skill Level value 20",
            `position fen ${fen}`,
            `go movetime ${moveTimeMs}`,
          ]
        : (() => {
            const { skill, depth } = weakConfigForElo(e);
            return [
              "setoption name MultiPV value 1",
              "setoption name UCI_LimitStrength value false",
              `setoption name Skill Level value ${skill}`,
              `position fen ${fen}`,
              `go depth ${depth}`,
            ];
          })();
    return this.enqueue<string | null>({ kind: "move", commands, finish: (bm) => bm });
  }

  async analyze(fen: string, depth = 12): Promise<Analysis> {
    const r = await this.analyzeMulti(fen, { depth, multiPV: 1 });
    const top = r.lines[0];
    return { cp: top?.cp ?? null, mate: top?.mate ?? null, bestMove: r.bestMove ?? top?.uci ?? null };
  }

  analyzeMulti(fen: string, opts: MultiOptions = {}): Promise<MultiAnalysis> {
    const depth = opts.depth ?? 12;
    const multiPV = Math.max(1, Math.min(5, opts.multiPV ?? 3));
    const latest = new Map<number, PvLine>();
    let seenDepth = 0;
    const onInfo = (line: string) => {
      const parsed = parseInfoLine(line);
      if (!parsed) return;
      // Only keep lines from the deepest iteration seen so far.
      if (parsed.depth > seenDepth) {
        seenDepth = parsed.depth;
        latest.clear();
      }
      if (parsed.depth === seenDepth) latest.set(parsed.multipv, parsed.line);
    };
    const p = this.enqueue<MultiAnalysis>({
      kind: "analysis",
      commands: [
        `setoption name MultiPV value ${multiPV}`,
        "setoption name UCI_LimitStrength value false",
        "setoption name Skill Level value 20",
        `position fen ${fen}`,
        `go depth ${depth}`,
      ],
      onInfo,
      finish: (bm, aborted) => ({
        lines: [...latest.entries()].sort((a, b) => a[0] - b[0]).map(([, l]) => l),
        bestMove: bm,
        depth: seenDepth,
        aborted,
      }),
    });
    if (opts.signal) {
      const onAbort = () => this.abortAnalysis();
      if (opts.signal.aborted) onAbort();
      else opts.signal.addEventListener("abort", onAbort, { once: true });
    }
    return p;
  }

  dispose() {
    this.worker?.terminate();
    this.worker = null;
    this.ready = null;
    this.listeners.clear();
    for (const j of this.queue) j.resolve(j.finish(null, true));
    this.queue = [];
    this.current = null;
  }
}

/** Parse one `info depth D ... multipv N ... score (cp|mate) X ... pv MOVE ...` line. */
export function parseInfoLine(line: string): { depth: number; multipv: number; line: PvLine } | null {
  if (!line.includes(" pv ")) return null;
  const d = line.match(/\bdepth (\d+)/);
  const mp = line.match(/\bmultipv (\d+)/);
  const sc = line.match(/\bscore (cp|mate) (-?\d+)/);
  const pv = line.match(/\bpv (\S+)/);
  if (!sc || !pv) return null;
  const isMate = sc[1] === "mate";
  return {
    depth: d ? Number(d[1]) : 0,
    multipv: mp ? Number(mp[1]) : 1,
    line: { uci: pv[1], cp: isMate ? null : Number(sc[2]), mate: isMate ? Number(sc[2]) : null },
  };
}

let singleton: EngineLike | null = null;

/** One shared engine per page. */
export function getEngine(): EngineLike {
  if (!singleton) {
    singleton = isScriptedEngineEnabled() ? createScriptedEngine() : new StockfishEngine();
  }
  return singleton;
}
