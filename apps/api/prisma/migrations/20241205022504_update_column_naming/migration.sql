/*
  Warnings:

  - You are about to drop the column `birth_date` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `property` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood_description` on the `property_details` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `property_details` table. All the data in the column will be lost.
  - You are about to drop the column `property_description` on the `property_details` table. All the data in the column will be lost.
  - You are about to drop the column `total_room` on the `property_details` table. All the data in the column will be lost.
  - You are about to drop the column `total_rooms` on the `property_room_types` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthDate` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhoodDescription` to the `property_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `property_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyDescription` to the `property_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRoom` to the `property_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRooms` to the `property_room_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "birth_date",
DROP COLUMN "phone_number",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "property" DROP COLUMN "zip_code",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "property_details" DROP COLUMN "neighborhood_description",
DROP COLUMN "phone_number",
DROP COLUMN "property_description",
DROP COLUMN "total_room",
ADD COLUMN     "neighborhoodDescription" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "propertyDescription" TEXT NOT NULL,
ADD COLUMN     "totalRoom" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "property_room_types" DROP COLUMN "total_rooms",
ADD COLUMN     "totalRooms" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "property_slug_key" ON "property"("slug");
