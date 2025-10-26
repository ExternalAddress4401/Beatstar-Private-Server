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

/**
 * Given a goofy Beatstar medal index convert it to normal
 * @param medal Goofy Beatstar medal index from the above table
 */
export const medalToNormalStar = (medal: number | undefined) => {
  if (!medal) {
    return 0;
  }
  return [1, 2, 5, 3, 4].indexOf(medal) + 1;
};

export const scoreToMedal = (
  score: number | undefined,
  difficulty: number,
  isDeluxe: boolean
) => {
  if (score === undefined) {
    return 0;
  }
  const table: Record<number, number[]> = {
    1: [0, 20000, 50000, 80000, 95000, 97000, 98000, 99000], // extreme
    2: [0, 10000, 17500, 35000, 47500, 48500, 49000, 49500], // tutoral
    3: [0, 15000, 37500, 60000, 71250, 72750, 73500, 74250], // hard
    4: [0, 10000, 17500, 35000, 47500, 48500, 49000, 49500], // normal
  };

  const deluxeTable: Record<number, number[]> = {
    1: [0, 20000, 50000, 80000, 95000, 97800, 98600, 99500], // extreme
    2: [0, 10000, 17500, 35000, 47500, 48900, 49300, 49750], // tutoral
    3: [0, 15000, 37500, 60000, 71250, 73350, 73950, 74625], // hard
    4: [0, 10000, 17500, 35000, 47500, 48900, 49300, 49750], // normal
  };

  const useTable = isDeluxe ? deluxeTable : table;

  const medalIndexes = [1, 2, 5, 3, 4, 6, 7, 8];

  const scoreRow = useTable[difficulty];
  if (scoreRow === undefined) {
    return 0;
  }

  const thresholdIndex = scoreRow.findLastIndex(
    (threshold) => score >= threshold
  );

  return medalIndexes[thresholdIndex];
};
