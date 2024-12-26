/*
  Warnings:

  - Added the required column `roomAvailability` to the `seasons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seasons" ADD COLUMN     "roomAvailability" BOOLEAN NOT NULL;
