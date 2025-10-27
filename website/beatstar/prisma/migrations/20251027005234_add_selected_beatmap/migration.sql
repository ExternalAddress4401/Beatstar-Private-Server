-- AlterTable
ALTER TABLE "User" ADD COLUMN     "selectedBeatmapId" INTEGER NOT NULL DEFAULT 3006;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_selectedBeatmapId_fkey" FOREIGN KEY ("selectedBeatmapId") REFERENCES "Beatmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
