export default function About() {
  return (
    <div className="pb-dock mx-auto w-full max-w-lg px-4 pt-6">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">About OpeningLab</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        A free opening sparring partner for players rated up to about 1200. The bot plays the moves your real
        opponents play, the coach explains the ideas, and nothing leaves your device — there is no account and no
        server. Progress is stored in this browser.
      </p>
      <h2 className="mt-8 font-display text-lg font-bold">Credits & licenses</h2>
      <ul className="mt-2 flex flex-col gap-2 text-sm text-ink-soft">
        <li>
          <span className="font-semibold text-ink">Stockfish 18</span> (GPL-3.0) runs in your browser as an unmodified
          WebAssembly worker. Source: stockfishchess.org and github.com/nmrugg/stockfish.js.
        </li>
        <li>
          <span className="font-semibold text-ink">Opening statistics</span> come from the Lichess Opening Explorer
          database (CC0), pre-computed for games rated under 1200.
        </li>
        <li>
          <span className="font-semibold text-ink">chess.js</span> (BSD-2) and{" "}
          <span className="font-semibold text-ink">react-chessboard</span> (MIT) power the board.
        </li>
        <li>All explanations are original writing. Move sequences are public chess theory.</li>
      </ul>
    </div>
  );
}
