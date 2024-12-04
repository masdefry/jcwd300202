/*
  Warnings:

  - You are about to drop the column `icon_directory` on the `property_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `icon_filename` on the `property_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `icon_directory` on the `property_room_facilites` table. All the data in the column will be lost.
  - You are about to drop the column `icon_filename` on the `property_room_facilites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "property_facilities" DROP COLUMN "icon_directory",
DROP COLUMN "icon_filename",
ADD COLUMN     "iconDirectory" TEXT,
ADD COLUMN     "iconFilename" TEXT;

-- AlterTable
ALTER TABLE "property_room_facilites" DROP COLUMN "icon_directory",
DROP COLUMN "icon_filename",
ADD COLUMN     "iconDirectory" TEXT,
ADD COLUMN     "iconFilename" TEXT;
