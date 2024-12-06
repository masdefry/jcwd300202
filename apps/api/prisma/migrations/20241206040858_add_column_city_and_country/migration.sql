/*
  Warnings:

  - You are about to drop the column `city` on the `property` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `property` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'TENANT');

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "profilePictureUrl" TEXT,
ALTER COLUMN "username" SET DEFAULT 'Roomify friend''s',
ALTER COLUMN "nationality" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "birthDate" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "property" DROP COLUMN "city",
DROP COLUMN "country",
ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "countryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'TENANT',
ADD COLUMN     "token" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isGoogleRegistered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "token" TEXT;

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CityToCountry" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CityToCountry_AB_unique" ON "_CityToCountry"("A", "B");

-- CreateIndex
CREATE INDEX "_CityToCountry_B_index" ON "_CityToCountry"("B");

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToCountry" ADD CONSTRAINT "_CityToCountry_A_fkey" FOREIGN KEY ("A") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToCountry" ADD CONSTRAINT "_CityToCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
