import z from "zod";

export interface CmdHeader {
  type: number;
  hardCurrency: number;
  softCurrency: number;
  randomSeeds: number;
  numSongs: number;
  lastUnlockedSong_id: number;
  saveCount: number;
}

export const cmdHeaderSchema = z.object({
  type: z.number(),
  hardCurrency: z.number(),
  softCurrency: z.number(),
  randomSeeds: z.number(),
  numSongs: z.number(),
  lastUnlockedSong_id: z.number(),
  saveCount: z.number(),
});
