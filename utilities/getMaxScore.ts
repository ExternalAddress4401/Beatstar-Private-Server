import { Difficulty } from "../interfaces/Difficulty";

/**
 * Returns the maximum score for a given difficulty
 * @param {Difficulty} difficulty the ID of the difficulty
 * @returns {number} the maximum score possible for this beatmap
 */
export const getMaxScore = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case Difficulty.EXTREME:
      return 100000;
    case Difficulty.HARD:
      return 75000;
    case Difficulty.NORMAL:
    case Difficulty.TUTORIAL:
      return 50000;
  }
};
