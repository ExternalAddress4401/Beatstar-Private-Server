/*ONE_STAR = 1
TWO_STAR = 2
FOUR_STAR = 3 <-- no this isn't wrong, it's supposed to be 3
FIVE_STAR = 4
THREE_STAR = 5
GOLD = 6
PLATINUM = 7
DIAMOND = 8
DELUXE_GOLD = 9
DELUXE_PLATINUM = 10
DELUXE_DIAMOND = 11*/

import { Difficulty } from "../interfaces/Difficulty";

export const isNewMedalBetter = (
  oldMedal: number,
  newMedal: number,
  isDeluxe?: boolean
) => {
  if (!oldMedal) {
    return true;
  }
  const normalMedals = [1, 2, 5, 3, 4, 6, 7, 8];
  const deluxeMedals = [1, 2, 5, 3, 4, 9, 10, 11];

  const table = isDeluxe ? deluxeMedals : normalMedals;

  const oldIndex = table.indexOf(oldMedal);
  const newIndex = table.indexOf(newMedal);
  return newIndex > oldIndex;
};

/**
 * Given a goofy Beatstar medal index convert it to normal
 * @param medal Goofy Beatstar medal index from the above table
 */
export const medalToNormalStar = (medal: number) => {
  // if we scored gold or above
  if (medal > 5) {
    return 5;
  }
  const medalIndex = [1, 2, 5, 3, 4].indexOf(medal) + 1;
  return medalIndex;
};

export const scoreToNormalStar = (
  score: number,
  difficulty: number,
  isDeluxe: boolean
) => {
  return medalToNormalStar(scoreToMedal(score, difficulty, isDeluxe));
};

/**
 * Converts an absoluteScore to the appropriate medal
 * @param score absoluteScore the play achieved
 * @param difficulty the difficulty of the beatmap
 * @param isDeluxe whether the song is a deluxe or not
 * @returns
 */
export const scoreToMedal = (
  score: number,
  difficulty: Difficulty,
  isDeluxe: boolean
) => {
  const fixedScore = score ?? 0;

  const vanillaTable: Record<number, number[]> = {
    1: [0, 20000, 50000, 80000, 95000, 97000, 98000, 99000], // extreme
    3: [0, 15000, 37500, 60000, 71250, 72750, 73500, 74250], // hard
    4: [0, 10000, 17500, 35000, 47500, 48500, 49000, 49500], // normal
    5: [0, 10000, 17500, 35000, 47500, 48500, 49000, 49500], // tutoral
  };

  const deluxeTable: Record<number, number[]> = {
    1: [0, 20000, 50000, 80000, 95000, 97800, 98600, 99500], // extreme
    3: [0, 15000, 37500, 60000, 71250, 73350, 73950, 74625], // hard
    4: [0, 10000, 17500, 35000, 47500, 48900, 49300, 49750], // normal
    5: [0, 10000, 17500, 35000, 47500, 48900, 49300, 49750], // tutoral
  };

  const useTable = isDeluxe ? deluxeTable : vanillaTable;

  const vanlaMedalIndexes = [1, 2, 5, 3, 4, 6, 7, 8];
  const deluxeMedalIndexes = [1, 2, 5, 3, 4, 9, 10, 11];

  const medalTable = isDeluxe ? deluxeMedalIndexes : vanlaMedalIndexes;

  const scoreRow = useTable[difficulty];
  if (scoreRow === undefined) {
    return null;
  }

  const thresholdIndex = scoreRow.findLastIndex(
    (threshold) => fixedScore >= threshold
  );

  if (thresholdIndex < 0) {
    return null;
  }

  return medalTable[thresholdIndex] ?? null;
};
