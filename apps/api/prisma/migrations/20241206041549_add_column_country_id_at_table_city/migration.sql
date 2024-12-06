/*
  Warnings:

  - You are about to drop the `_CityToCountry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `countryId` to the `cities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CityToCountry" DROP CONSTRAINT "_CityToCountry_A_fkey";

-- DropForeignKey
ALTER TABLE "_CityToCountry" DROP CONSTRAINT "_CityToCountry_B_fkey";

-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "countryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CityToCountry";

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
