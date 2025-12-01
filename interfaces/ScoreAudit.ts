import z from "zod";
import { Difficulty, difficultySchema } from "./Difficulty";
import { CmdHeader, cmdHeaderSchema } from "./CmdHeader";

interface ScoreTypeCount {
  scoreType?: "Miss" | "A" | "B" | "C" | "APLUS";
  count?: number;
}

export interface ScoreAudit {
  type: number;
  song_id: number;
  checkpointReached?: number;
  maxStreak?: number;
  highestStreak?: number;
  scoreTypeCounts: ScoreTypeCount[];
  resultType: string;
  interactionTypeAndCountPerStreakMultiplier: {
    InteractionType:
      | "Tap"
      | "Hold"
      | "Flick"
      | "HoldFlick"
      | "SwitchHold"
      | "SwitchHoldFlick";
    CountsPerStreakMultiplier: number[];
    ScoreTypeCounts: ScoreTypeCount[];
  }[];
  previousBeatmapLeaderboardRank: number;
  currentBeatmapLeaderboardRank: number;
  score: {
    normalizedScore?: number;
    absoluteScore?: number;
  };
  currentBeatmapLeaderboardNumEntries: number;
  deluxeInteractionScores: {};
  timestampMsecs: number;
  cmdHeader: CmdHeader;
}

const scoreTypeCountSchema = z.object({
  scoreType: z.enum(["Miss", "A", "B", "C", "APLUS"]).optional(),
  count: z.number().optional(),
});

export const scoreAuditSchema = z.object({
  type: z.number(),
  song_id: z.number(),
  checkpointReached: z.number().default(0),
  maxStreak: z.number().default(0),
  highestStreak: z.number().default(0),
  scoreTypeCounts: scoreTypeCountSchema.array(),
  resultType: z.string(),
  interactionTypeAndCountPerStreakMultiplier: z
    .object({
      InteractionType: z.union([
        z.literal("Tap"),
        z.literal("Hold"),
        z.literal("Flick"),
        z.literal("HoldFlick"),
        z.literal("SwitchHold"),
        z.literal("SwitchHoldFlick"),
      ]),
      CountsPerStreakMultiplier: z.number().array(),
      ScoreTypeCounts: scoreTypeCountSchema.array(),
    })
    .array(),
  previousBeatmapLeaderboardRank: z.number(),
  currentBeatmapLeaderboardRank: z.number(),
  score: z.object({
    normalizedScore: z.number().default(0),
    absoluteScore: z.number().default(0),
  }),
  currentBeatmapLeaderboardNumEntries: z.number(),
  deluxeInteractionScores: z.any(),
  timestampMsecs: z.number(),
  cmdHeader: cmdHeaderSchema,
});
