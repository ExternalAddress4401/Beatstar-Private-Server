export const getMaxScore = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return 100000;
    case 2:
      return 50000;
    case 3:
      return 75000;
    case 4:
      return 50000;
  }
};
