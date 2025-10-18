-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "beatmapId" INTEGER NOT NULL,
    "normalizedScore" DOUBLE PRECISION NOT NULL,
    "absoluteScore" INTEGER NOT NULL,
    "highestGrade" INTEGER NOT NULL,
    "highestCheckpoint" INTEGER NOT NULL,
    "highestStreak" INTEGER NOT NULL,
    "playedCount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("userId","beatmapId")
);

-- CreateTable
CREATE TABLE "Beatmap" (
    "id" INTEGER NOT NULL,
    "idLabel" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "deluxe" BOOLEAN NOT NULL,

    CONSTRAINT "Beatmap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cms" (
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "gzip" BYTEA NOT NULL,
    "hash" CHAR(32) NOT NULL,

    CONSTRAINT "Cms_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_beatmapId_fkey" FOREIGN KEY ("beatmapId") REFERENCES "Beatmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
