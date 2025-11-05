-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accuracyText" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "perfectPlusHighlight" BOOLEAN NOT NULL DEFAULT false;
