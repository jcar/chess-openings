# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

OpeningLab: a free, phone-first (iPhone portrait) chess opening trainer for 0–1200
players. Standalone sibling of ChessHall.app. No backend, no accounts, no LLM at runtime:
the bot plays real sub-1200 move frequencies (baked Lichess data) then Stockfish; the coach
is rule-based (position features + engine win% + authored content). Static export to
GitHub Pages. See README.md for commands and the plan at
`~/.claude/plans/i-own-the-application-silly-clover.md` for the full design.

## Architecture (one direction: content → book → bot/coach → game hook → views)

- `src/content/spec.ts` — `OpeningSpec`: setup, idea cards, EPD-keyed annotations, traps,
  model games. `src/content/specs/*` hand-authored (core openings). `src/content/legacy/*`
  = ChessHall files synced verbatim (never edit; `npm run sync`), adapted by
  `src/lib/content/adaptLegacy.ts`. `src/content/index.ts` builds `OPENINGS`.
  `src/content/authoring.ts` `pos("e4 e5")` computes EPD keys — throws on illegal SAN.
- `src/lib/book/` — `key.ts` (EPD = FEN minus clocks; all data is keyed by it),
  `explorer.ts`/`evals.ts` (baked JSON loaders), `merged.ts` (`MergedBook`: one view over
  annotations + explorer tree + evals; `inBook`, `movesAt`, `definingMoveAt`).
- `src/lib/bot/policy.ts` — `chooseBotMove`: scripted (tests) → defining line → explorer
  softmax(τ) → authored → baked evals → engine at Elo → any legal.
- `src/lib/coach/` — `features.ts` (chess.js-only position features + `tagMove`),
  `tags.ts` (taxonomy + priority), `classify.ts` (Lichess win% model; our thresholds
  blunder ≥25 / mistake ≥12 / inaccuracy ≥7), `templates.ts` (sentences per tag),
  `explain.ts` (layering: authored → setup rule → tag → engine; bot punish cards; idea
  triggers), `evalSource.ts` (baked first, engine second).
- `src/lib/adapt/` — `store.ts` (SSR-safe localStorage store factory), `rating.ts`
  (per-opening + global Elo, momentum), `strength.ts` (estimate → `Difficulty`),
  `inGame.ts` (momentum from win% streaks).
- `src/lib/progress/` — `mistakes.ts` (recurring-mistake ledger), `sessions.ts`.
- `src/lib/principles/benchmarks.ts` — Principles Mode scoring.
- `src/lib/game/useTrainGame.ts` — THE game loop hook. Views stay thin.
- `src/lib/chess/stockfish.ts` — single-threaded WASM worker with a serialized job
  queue, `analyzeMulti`, `abortAnalysis`. `scriptedEngine.ts` is the deterministic e2e
  stand-in (enabled by localStorage key `openinglab:e2e:engine`; also `peekScripted`
  dictates the bot's book move so scripted games are reproducible).
- `src/app/` — `/` (pick an opening), `/train/[id]`, `/openings` + `/openings/[id]`,
  `/about`. Dynamic routes are server pages with `generateStaticParams` wrapping a
  `"use client"` view (required by `output: "export"`).

## Conventions

- Mobile first: 390px layout, ≥44px targets, tap-to-move primary, `touch-none` on the
  board, safe-area padding, one primary action per screen.
- Never read `localStorage` during render — go through `createLocalStore` +
  `useLocalStore`. Don't assign refs during render (lint enforces both).
- Positions in content are move lists (`pos()`), never hand-typed FENs, except the two
  diagram FENs per spec (validated by `npm run validate`).
- Chess facts (moves, FENs) may be reused from anywhere; prose must be original. Nothing
  from the FCO PDF's text. `references/` is gitignored.
- Secrets: only `LICHESS_TOKEN` in `.env` (gitignored). Never log or print it.
- `public/stockfish/` is vendored GPL; ship unmodified with its license file.

## Checks before claiming done

`npm run typecheck && npm run lint && npm test && npm run validate && npm run test:e2e`
(e2e builds the static export and runs iPhone + desktop profiles).
