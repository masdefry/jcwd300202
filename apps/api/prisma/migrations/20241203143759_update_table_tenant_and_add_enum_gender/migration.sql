/*
  Warnings:

  - You are about to drop the column `propertyId` on the `tenants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `gender` on the `profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `tenantId` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `property_types` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_propertyId_fkey";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "property" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "property_types" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "propertyId";

-- CreateIndex
CREATE UNIQUE INDEX "tenants_email_key" ON "tenants"("email");

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
