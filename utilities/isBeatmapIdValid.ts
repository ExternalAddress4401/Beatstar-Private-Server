/**
 * Returns whether or not the beatmap ID is a number that can be handled properly
 * @param {number} beatmapId the ID of the beatmap to be tested
 * @returns {boolean} whether the beatmap can be handled or not
 */
export const isBeatmapIdValid = (beatmapId: number): boolean => {
  if (beatmapId > 2147483647) {
    return false;
  }
  return true;
};
