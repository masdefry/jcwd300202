/*
  Warnings:

  - Added the required column `directory` to the `cities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `cities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "directory" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL;
