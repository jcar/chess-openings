# OpeningLab

A free, phone-first chess opening sparring partner for players rated up to about 1200.

Pick an opening. The bot plays the moves your **real opponents** play at your level
(pre-computed from the Lichess Opening Explorer, under-1200 games), then hands off to
Stockfish at an adaptive strength. A coach explains the ideas as you go — what your
move did, why the book prefers something else, and how to punish the opponent's
typical mistakes — all without an account, a server, or an AI API.

Everything runs in the browser and works offline after the first load.

## Develop

```bash
npm install
npm run dev                 # http://localhost:3000
npm run dev -- -H 0.0.0.0   # reach it from a phone on your Wi-Fi
```

Checks:

```bash
npm run typecheck   # tsc
npm run lint        # eslint
npm test            # vitest (unit)
npm run test:e2e    # playwright (iPhone + desktop profiles) against the static export
npm run validate    # content validator: every position, move and FEN in every opening
```

## Content

Openings live in `src/content/specs/*.ts` as `OpeningSpec`s (see `src/content/spec.ts`):
a **setup** (where your pieces belong), **idea cards** with triggers, **position-keyed
annotations** (your move + why, common wrong moves, the opponent's real replies and how
to answer them), traps, and a couple of short model games. Positions are written as move
lists via `pos("e4 e5 Nf3")`; the build fails on an illegal one.

The other openings come from ChessHall's content (`src/content/legacy/`, synced verbatim
with `npm run sync`) through an adapter, so they are playable with thinner coaching.

### Data pipeline (offline, committed)

```bash
# one-time: create a Lichess API token (no scopes) at https://lichess.org/account/oauth/token
echo "LICHESS_TOKEN=..." > .env
npm run bake:explorer -- --only italian-game   # sub-1200 move frequencies → public/data/explorer
npm run bake:evals    -- --only italian-game   # Stockfish MultiPV evals     → public/data/evals
npm run sheet         -- italian-game          # authoring worklist          → scripts/.cache/sheets
```

Both bakes are cached and resumable. Without a token the app still works: the bot uses
the authored book, then the engine.

### Adding an opening

```bash
npm run new-opening -- vienna-game "Vienna Game" white
```

Then bake, run the sheet, author the spec, `npm run validate`. Add the id to
`src/content/core.ts` to feature it on the home screen.

## Deployment

Static export (`next build` → `out/`) deployed to GitHub Pages by
`.github/workflows/deploy.yml`. Set `NEXT_PUBLIC_BASE_PATH` when serving from a
repo subpath; leave it empty for a custom domain.

## Credits

Stockfish 18 (GPL-3.0, unmodified WASM worker), Lichess Opening Explorer data (CC0),
chess.js (BSD-2), react-chessboard (MIT). All explanations are original writing.
