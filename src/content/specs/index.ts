// Hand-authored OpeningSpecs (the core openings). Add a file, import it here.
import type { OpeningSpec } from "../spec";
import { italianGame } from "./italian-game";
import { londonSystem } from "./london-system";
import { viennaGame } from "./vienna-game";
import { scandinavian } from "./scandinavian";
import { queensGambit } from "./queens-gambit";
import { caroKann } from "./caro-kann";
import { frenchDefence } from "./french-defence";
import { slavDefence } from "./slav-defence";
import { kingsIndian } from "./kings-indian";
import { openGamesBlack } from "./open-games-black";
import { larsenOpening } from "./larsen";

export const SPECS: OpeningSpec[] = [italianGame, londonSystem, viennaGame, scandinavian, queensGambit, caroKann, frenchDefence, slavDefence, kingsIndian, openGamesBlack, larsenOpening];
