-- CreateTable
CREATE TABLE "CustomScore" (
    "beatmapId" INTEGER NOT NULL,
    "normalizedScore" DOUBLE PRECISION,
    "absoluteScore" INTEGER NOT NULL,
    "highestGrade" INTEGER,
    "highestCheckpoint" INTEGER,
    "highestStreak" INTEGER,
    "playedCount" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CustomScore_pkey" PRIMARY KEY ("userId","beatmapId")
);

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_beatmapId_fkey" FOREIGN KEY ("beatmapId") REFERENCES "Beatmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomScore" ADD CONSTRAINT "CustomScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
