/*
  Warnings:

  - You are about to drop the column `isPeak` on the `seasons` table. All the data in the column will be lost.
  - You are about to drop the column `roomAvailability` on the `seasons` table. All the data in the column will be lost.
  - You are about to drop the column `roomToRent` on the `seasons` table. All the data in the column will be lost.
  - Added the required column `roomToRent` to the `seasonal_prices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seasonal_prices" ADD COLUMN     "isPeak" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "roomAvailability" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "roomToRent" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "seasons" DROP COLUMN "isPeak",
DROP COLUMN "roomAvailability",
DROP COLUMN "roomToRent";
