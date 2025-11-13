/*
  Warnings:

  - Made the column `normalizedScore` on table `Score` required. This step will fail if there are existing NULL values in that column.
  - Made the column `highestGrade` on table `Score` required. This step will fail if there are existing NULL values in that column.
  - Made the column `highestCheckpoint` on table `Score` required. This step will fail if there are existing NULL values in that column.
  - Made the column `highestStreak` on table `Score` required. This step will fail if there are existing NULL values in that column.
  - Made the column `playedCount` on table `Score` required. This step will fail if there are existing NULL values in that column.

*/

-- Remove nulls
UPDATE "Score" SET "highestCheckpoint" = 0 WHERE "highestCheckpoint" IS NULL;
UPDATE "Score" SET "highestGrade" = 0 WHERE "highestGrade" IS NULL;
UPDATE "Score" SET "highestStreak" = 0 WHERE "highestStreak" IS NULL;

-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "normalizedScore" SET NOT NULL,
ALTER COLUMN "normalizedScore" SET DEFAULT 0,
ALTER COLUMN "highestGrade" SET NOT NULL,
ALTER COLUMN "highestGrade" SET DEFAULT 0,
ALTER COLUMN "highestCheckpoint" SET NOT NULL,
ALTER COLUMN "highestCheckpoint" SET DEFAULT 0,
ALTER COLUMN "highestStreak" SET NOT NULL,
ALTER COLUMN "highestStreak" SET DEFAULT 0,
ALTER COLUMN "playedCount" SET NOT NULL,
ALTER COLUMN "playedCount" SET DEFAULT 0;
