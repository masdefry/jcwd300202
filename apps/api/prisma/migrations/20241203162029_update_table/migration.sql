/*
  Warnings:

  - You are about to drop the column `propertyImageId` on the `property_details` table. All the data in the column will be lost.
  - Added the required column `propertyDetailId` to the `property_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "property_details" DROP CONSTRAINT "property_details_propertyImageId_fkey";

-- AlterTable
ALTER TABLE "property_details" DROP COLUMN "propertyImageId";

-- AlterTable
ALTER TABLE "property_images" ADD COLUMN     "propertyDetailId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "property_room_types" ALTER COLUMN "rooms" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_propertyDetailId_fkey" FOREIGN KEY ("propertyDetailId") REFERENCES "property_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
