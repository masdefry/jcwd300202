-- AlterTable
ALTER TABLE "property_types" ADD COLUMN     "tenantId" TEXT;

-- AddForeignKey
ALTER TABLE "property_types" ADD CONSTRAINT "property_types_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
