-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "fileExtension" TEXT NOT NULL DEFAULT 'jpg';

-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "fileExtension" TEXT NOT NULL DEFAULT 'jpg';

-- AlterTable
ALTER TABLE "property_facilities" ADD COLUMN     "iconFileExtension" TEXT NOT NULL DEFAULT 'png';

-- AlterTable
ALTER TABLE "property_images" ADD COLUMN     "fileExtension" TEXT NOT NULL DEFAULT 'jpg';

-- AlterTable
ALTER TABLE "property_room_facilites" ADD COLUMN     "iconFileExtension" TEXT NOT NULL DEFAULT 'png';

-- AlterTable
ALTER TABLE "property_room_images" ADD COLUMN     "fileExtension" TEXT NOT NULL DEFAULT 'jpg';

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "fileExtension" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "fileExtension" TEXT;
