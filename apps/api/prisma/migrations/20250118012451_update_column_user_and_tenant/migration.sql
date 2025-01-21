-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "tokenExpiry" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tokenExpiry" TIMESTAMP(3);
