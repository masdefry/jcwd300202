-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_cityId_fkey";

-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_countryId_fkey";

-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_tenantId_fkey";

-- AlterTable
ALTER TABLE "property" ALTER COLUMN "tenantId" DROP NOT NULL,
ALTER COLUMN "countryId" DROP NOT NULL,
ALTER COLUMN "cityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
