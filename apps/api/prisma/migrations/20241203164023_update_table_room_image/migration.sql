/*
  Warnings:

  - You are about to drop the column `propertyRoomImageId` on the `property_room_types` table. All the data in the column will be lost.
  - Added the required column `propertyRoomTypeId` to the `property_room_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "property_room_types" DROP CONSTRAINT "property_room_types_propertyRoomImageId_fkey";

-- AlterTable
ALTER TABLE "property_room_images" ADD COLUMN     "propertyRoomTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "property_room_types" DROP COLUMN "propertyRoomImageId";

-- AddForeignKey
ALTER TABLE "property_room_images" ADD CONSTRAINT "property_room_images_propertyRoomTypeId_fkey" FOREIGN KEY ("propertyRoomTypeId") REFERENCES "property_room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
