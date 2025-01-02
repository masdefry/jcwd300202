-- AlterTable
ALTER TABLE "property" ALTER COLUMN "checkInEndTime" DROP NOT NULL,
ALTER COLUMN "checkOutStartTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "property_details" ALTER COLUMN "url" DROP NOT NULL;
