-- DropForeignKey
ALTER TABLE "public"."Score" DROP CONSTRAINT "Score_beatmapId_fkey";

-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "normalizedScore" DROP NOT NULL,
ALTER COLUMN "highestGrade" DROP NOT NULL,
ALTER COLUMN "highestCheckpoint" DROP NOT NULL,
ALTER COLUMN "highestStreak" DROP NOT NULL,
ALTER COLUMN "playedCount" DROP NOT NULL;
