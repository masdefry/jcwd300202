/*
  Warnings:

  - The primary key for the `property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `property_has_facilities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `property` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "property_details" DROP CONSTRAINT "property_details_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "property_has_facilities" DROP CONSTRAINT "property_has_facilities_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "property_room_types" DROP CONSTRAINT "property_room_types_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_propertyId_fkey";

-- AlterTable
ALTER TABLE "property" DROP CONSTRAINT "property_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "property_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "property_id_seq";

-- AlterTable
ALTER TABLE "property_details" ALTER COLUMN "propertyId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "property_has_facilities" DROP CONSTRAINT "property_has_facilities_pkey",
ALTER COLUMN "propertyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "property_has_facilities_pkey" PRIMARY KEY ("propertyFacilityId", "propertyId");

-- AlterTable
ALTER TABLE "property_room_types" ALTER COLUMN "propertyId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
ALTER COLUMN "propertyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("propertyId", "userId", "transactionId");

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "propertyId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "property_id_key" ON "property"("id");

-- AddForeignKey
ALTER TABLE "property_details" ADD CONSTRAINT "property_details_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_has_facilities" ADD CONSTRAINT "property_has_facilities_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_room_types" ADD CONSTRAINT "property_room_types_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
