-- AlterTable
ALTER TABLE "seasons" ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isPeak" BOOLEAN NOT NULL DEFAULT false;
