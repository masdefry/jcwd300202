-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_propertyTypeId_fkey";

-- AlterTable
ALTER TABLE "property" ALTER COLUMN "propertyTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "property_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
