-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;
