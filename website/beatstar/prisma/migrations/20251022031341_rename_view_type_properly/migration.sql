-- CreateEnum
CREATE TYPE "NewsType" AS ENUM ('TEXT');

-- CreateTable
CREATE TABLE "News" (
    "type" INTEGER NOT NULL,
    "legacyId" INTEGER NOT NULL,
    "viewType" "NewsType" NOT NULL,
    "startTimeMsecs" TIMESTAMP(3) NOT NULL,
    "endTimeMecs" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "id" CHAR(32) NOT NULL,
    "content" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "imageId" UUID NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "rectWidth" INTEGER NOT NULL,
    "rectHeight" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
