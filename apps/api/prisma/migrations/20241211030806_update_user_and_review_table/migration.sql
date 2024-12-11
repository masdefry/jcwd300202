/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "rating" INTEGER,
ALTER COLUMN "comment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "cityId" INTEGER,
ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "directory" TEXT,
ADD COLUMN     "filename" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "username" TEXT DEFAULT 'Roomify''s friend';

-- DropTable
DROP TABLE "profile";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
