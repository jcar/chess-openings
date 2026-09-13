// Registry of the ChessHall opening files synced into ./openings (do not edit them
// here; run `npm run sync`). Consumed only through lib/content/adaptLegacy.ts.
import type { Opening } from "./openings/types";
import { alapinSicilian } from "./openings/alapin-sicilian";
import { alekhine } from "./openings/alekhine";
import { benkoGambit } from "./openings/benko-gambit";
import { benoni } from "./openings/benoni";
import { bogoIndian } from "./openings/bogo-indian";
import { caroKann } from "./openings/caro-kann";
import { dutchDefence } from "./openings/dutch-defence";
import { englishOpening } from "./openings/english-opening";
import { fourKnights } from "./openings/four-knights";
import { frenchDefence } from "./openings/french-defence";
import { grunfeld } from "./openings/grunfeld";
import { italianGame } from "./openings/italian-game";
import { kingsGambit } from "./openings/kings-gambit";
import { kingsIndian } from "./openings/kings-indian";
import { larsen } from "./openings/larsen";
import { londonSystem } from "./openings/london-system";
import { nimzoIndian } from "./openings/nimzo-indian";
import { petroff } from "./openings/petroff";
import { pirc } from "./openings/pirc";
import { queensGambitAccepted } from "./openings/queens-gambit-accepted";
import { queensGambitDeclined } from "./openings/queens-gambit-declined";
import { queensGambit } from "./openings/queens-gambit";
import { queensIndian } from "./openings/queens-indian";
import { reti } from "./openings/reti";
import { ruyLopez } from "./openings/ruy-lopez";
import { scandinavian } from "./openings/scandinavian";
import { scotchGame } from "./openings/scotch-game";
import { semiSlav } from "./openings/semi-slav";
import { sicilianDefence } from "./openings/sicilian-defence";
import { slavDefence } from "./openings/slav-defence";
import { viennaGame } from "./openings/vienna-game";

export type { Opening as LegacyOpening, OpeningLine as LegacyLine } from "./openings/types";

export const LEGACY_OPENINGS: Opening[] = [
  alapinSicilian,
  alekhine,
  benkoGambit,
  benoni,
  bogoIndian,
  caroKann,
  dutchDefence,
  englishOpening,
  fourKnights,
  frenchDefence,
  grunfeld,
  italianGame,
  kingsGambit,
  kingsIndian,
  larsen,
  londonSystem,
  nimzoIndian,
  petroff,
  pirc,
  queensGambitAccepted,
  queensGambitDeclined,
  queensGambit,
  queensIndian,
  reti,
  ruyLopez,
  scandinavian,
  scotchGame,
  semiSlav,
  sicilianDefence,
  slavDefence,
  viennaGame,
];
