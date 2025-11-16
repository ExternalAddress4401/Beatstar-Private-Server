export const Difficulty = {
  EXTREME: 1,
  HARD: 3,
  NORMAL: 4,
  TUTORIAL: 5,
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const DifficultyFromNumber = {
  1: Difficulty.EXTREME,
  3: Difficulty.HARD,
  4: Difficulty.NORMAL,
  5: Difficulty.TUTORIAL,
} as const;

export type DifficultyName = keyof typeof Difficulty;
