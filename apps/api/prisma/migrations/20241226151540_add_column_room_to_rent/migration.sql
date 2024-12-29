/*
  Warnings:

  - Added the required column `roomToRent` to the `seasons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seasons" ADD COLUMN     "roomToRent" INTEGER NOT NULL;
