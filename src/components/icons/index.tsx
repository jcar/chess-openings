// Chess Hall icon set — one consistent line-icon family (stroke = currentColor),
// replacing all emoji. Size & color via className (e.g. "h-5 w-5 text-accent").

import type { ComponentType } from "react";

type IconProps = { className?: string };

function Line({
  className = "h-5 w-5",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function Solid({
  className = "h-5 w-5",
  d,
}: IconProps & { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d={d} />
    </svg>
  );
}

/* ---- Activity-type icons ---- */

export const QuizIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <rect x="3.5" y="4.5" width="17" height="12" rx="3" />
    <path d="M9 16.5 7.5 20l4.5-3.5" />
    <path d="M10 9.4a2 2 0 1 1 2.7 1.9c-.6.3-.9.7-.9 1.3" />
    <circle cx="11.8" cy="14.3" r=".5" fill="currentColor" stroke="none" />
  </Line>
);

export const SettingsIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5l1.3 2.2 2.5-.5.4 2.5 2.3 1.1-1 2.3 1 2.3-2.3 1.1-.4 2.5-2.5-.5L12 21.5l-1.3-2.2-2.5.5-.4-2.5-2.3-1.1 1-2.3-1-2.3 2.3-1.1.4-2.5 2.5.5z" />
  </Line>
);

// A joystick — the Arcade room.
export const ArcadeIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <circle cx="12" cy="6" r="2.6" />
    <path d="M12 8.6V14" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0z" />
  </Line>
);

export const ReplayIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M2.6 12S6 5.8 12 5.8 21.4 12 21.4 12 18 18.2 12 18.2 2.6 12 2.6 12Z" />
    <circle cx="12" cy="12" r="2.6" />
  </Line>
);

export const PuzzleIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M9 5h2.2a1.4 1.4 0 1 1 2.6 0H17a1 1 0 0 1 1 1v2.7a1.4 1.4 0 1 0 0 2.6V15a1 1 0 0 1-1 1h-3a1.4 1.4 0 1 1-2.6 0H9a1 1 0 0 1-1-1v-2.4a1.4 1.4 0 1 1 0-2.6V6a1 1 0 0 1 1-1Z" />
  </Line>
);

export const DrillIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <rect x="5" y="7.5" width="14" height="10.5" rx="2.5" />
    <path d="M12 7.5V4.6" />
    <circle cx="12" cy="3.6" r="1" fill="currentColor" stroke="none" />
    <circle cx="9.6" cy="12.3" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="14.4" cy="12.3" r="1.1" fill="currentColor" stroke="none" />
    <path d="M9.8 15.3h4.4" />
  </Line>
);

export const MoveMapIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M12 4v16M4 12h16" />
    <path d="M12 4 10 6M12 4l2 2M12 20l-2-2M12 20l2-2M4 12l2-2M4 12l2 2M20 12l-2-2M20 12l-2 2" />
  </Line>
);

export const PictureQuizIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
    <circle cx="8.5" cy="9.5" r="1.4" />
    <path d="M5 17l4-3.8 3 2.8 3.4-3.3L20 16.2" />
  </Line>
);

export const SortIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M5 7.5h9M5 12h9M5 16.5h5" />
    <path d="M15 16.2l1.8 1.8 3.2-3.6" />
  </Line>
);

export const CoordinateIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <path d="M4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16" />
    <circle cx="16.9" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
  </Line>
);

export const PracticeIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M12 4 3.6 8.5 12 13l8.4-4.5L12 4Z" />
    <path d="M4 12.4 12 16.8l8-4.4M4 16.4 12 20.8l8-4.4" />
  </Line>
);

export const ConceptIcon = ({ className }: IconProps) => (
  <Line className={className}>
    {/* a lightbulb — "learn the idea" */}
    <path d="M9 17.5h6M9.5 20h5" />
    <path d="M12 3.5a6 6 0 0 0-3.6 10.8c.5.4.8 1 .9 1.7h5.4c.1-.7.4-1.3.9-1.7A6 6 0 0 0 12 3.5Z" />
  </Line>
);

export const OpeningDrillIcon = ({ className }: IconProps) => (
  <Line className={className}>
    {/* a flag on a pole — "reach the target line" */}
    <path d="M7 4v16" />
    <path d="M7 4.5h10l-2.4 3 2.4 3H7" />
    <circle cx="7" cy="20.2" r="1.1" fill="currentColor" stroke="none" />
  </Line>
);

export const SceneIcon = ({ className }: IconProps) => (
  <Line className={className}>
    {/* an open storybook — "a story beat" */}
    <path d="M12 6.5C10 5 6.5 5 4.5 5.5v12C6.5 17 10 17 12 18.5 14 17 17.5 17 19.5 17.5v-12C17.5 5 14 5 12 6.5Z" />
    <path d="M12 6.5v12" />
  </Line>
);

export const GuessMoveIcon = ({ className }: IconProps) => (
  <Line className={className}>
    {/* a question mark over a target — "predict the move" */}
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.8 9.6a2.3 2.3 0 0 1 4.4.8c0 1.6-2.2 1.8-2.2 3.4" />
    <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
  </Line>
);

export const PlanIcon = ({ className }: IconProps) => (
  <Line className={className}>
    {/* a route with a flag — "find and follow the plan" */}
    <path d="M5 19c0-3 3-3 3-6s-3-3-3-6" />
    <path d="M14 4.5v15" />
    <path d="M14 5h5l-1.6 2.2L19 9.4h-5" />
    <circle cx="5" cy="19.2" r="1" fill="currentColor" stroke="none" />
  </Line>
);

/* ---- Status / reward icons ---- */

export const StarIcon = ({
  className = "h-5 w-5",
  filled = true,
}: IconProps & { filled?: boolean }) => {
  const d =
    "M12 3.3l2.55 5.4 5.9.8-4.3 4.1 1.05 5.9L12 16.8l-5.25 2.7 1.05-5.9L3.5 9.5l5.9-.8L12 3.3Z";
  return filled ? (
    <Solid className={className} d={d} />
  ) : (
    <Line className={className}>
      <path d={d} />
    </Line>
  );
};

export const TrophyIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M7 4.5h10V8a5 5 0 0 1-10 0V4.5Z" />
    <path d="M7 6H4.6v1.2A3 3 0 0 0 7 10M17 6h2.4v1.2A3 3 0 0 1 17 10" />
    <path d="M12 13v3M9 19.5h6M10.2 19.5l.4-3.5h2.8l.4 3.5" />
  </Line>
);

export const LockIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <rect x="5" y="10.5" width="14" height="9" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <circle cx="12" cy="14.6" r="1" fill="currentColor" stroke="none" />
  </Line>
);

export const CheckIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M5 12.5l4.3 4.3L19 7.2" />
  </Line>
);

export const FlameIcon = ({ className }: IconProps) => (
  <Solid
    className={className}
    d="M13 2.5c.4 2.6-.7 4-1.9 5.2-1.2 1.2-2.6 2.4-2.6 4.8 0 1 .3 1.8.8 2.4-1.6-.3-2.8-1.7-2.8-3.6 0-.3 0-.6.1-.9-1.3 1.1-2.1 2.8-2.1 4.7A6.5 6.5 0 0 0 18 16c0-3.6-2-5.4-3.4-7.2C13.4 7.2 12.5 5.3 13 2.5Z"
  />
);

export const PlayIcon = ({ className }: IconProps) => (
  <Solid className={className} d="M8 6.3l9.2 5.7L8 17.7V6.3Z" />
);

export const ChevronRightIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M9 6l6 6-6 6" />
  </Line>
);

export const ArrowLeftIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Line>
);

export const InfoIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <path d="M12 8h.01" />
  </Line>
);

export const SearchIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.8-4.8" />
  </Line>
);

export const SpeakerIcon = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M4 9.5h3l4-3.2v11.4l-4-3.2H4z" />
    <path d="M15.5 9.2a3.6 3.6 0 0 1 0 5.6M18 7a6.6 6.6 0 0 1 0 10" />
  </Line>
);

/* ---- Module medallion glyphs (chess motifs) ---- */

export const PawnGlyph = ({ className }: IconProps) => (
  <Line className={className}>
    <circle cx="12" cy="7" r="2.7" />
    <path d="M9.4 9.6c.1 1.3.9 1.9 1 3.4l-1.3 3.5h5.8L13.6 13c.1-1.5.9-2.1 1-3.4" />
    <path d="M7.5 19.5h9" />
  </Line>
);

export const CrownGlyph = ({ className }: IconProps) => (
  <Line className={className}>
    <path d="M4 8l3.2 3 4.8-6 4.8 6L20 8l-1.6 9.5H5.6L4 8Z" />
    <path d="M5.6 19.7h12.8" />
  </Line>
);

/* ---- Lookups ---- */

export const ACTIVITY_ICON: Record<
  string,
  ComponentType<IconProps>
> = {
  quiz: QuizIcon,
  replay: ReplayIcon,
  puzzle: PuzzleIcon,
  drill: DrillIcon,
  movemap: MoveMapIcon,
  pictureQuiz: PictureQuizIcon,
  target: (p: IconProps) => <StarIcon {...p} filled={false} />,
  sort: SortIcon,
  coordinate: CoordinateIcon,
  practiceSet: PracticeIcon,
  openingDrill: OpeningDrillIcon,
  concept: ConceptIcon,
  reviewCheckpoint: TrophyIcon,
  scene: SceneIcon,
  guessMove: GuessMoveIcon,
  plan: PlanIcon,
};
