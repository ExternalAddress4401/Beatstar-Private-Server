/*
  Warnings:

  - You are about to drop the column `endTimeMecs` on the `News` table. All the data in the column will be lost.
  - Added the required column `endTimeMsecs` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "endTimeMecs",
ADD COLUMN     "endTimeMsecs" TIMESTAMP(3) NOT NULL;
