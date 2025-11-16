-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "highestCheckpoint" DROP NOT NULL,
ALTER COLUMN "highestCheckpoint" DROP DEFAULT,
ALTER COLUMN "highestStreak" DROP NOT NULL,
ALTER COLUMN "highestStreak" DROP DEFAULT;
