/*
  Warnings:

  - You are about to drop the column `totalRoom` on the `property_details` table. All the data in the column will be lost.
  - Added the required column `totalRooms` to the `property_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "property_details" DROP COLUMN "totalRoom",
ADD COLUMN     "totalRooms" INTEGER NOT NULL;
