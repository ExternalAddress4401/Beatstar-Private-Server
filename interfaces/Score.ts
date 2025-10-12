export interface Score {
  template_id: number;
  HighestGrade_id?: number;
  HighestCheckpoint?: number;
  HighestStreak?: number;
  BragState?:
    | {}
    | {
        expireTimeMsecs: number;
        previousRank: number;
      };
  HighestScore?:
    | {}
    | {
        normalizedScore: number;
        absoluteScore: number;
      };
  PlayedCount: number;
  RewardSource: 1;
  Version: 1;
  NormalizedLifetimeScore?: number;
  absoluteScore?: number;
}
