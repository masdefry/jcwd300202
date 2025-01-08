-- AlterTable
ALTER TABLE "seasonal_prices" ADD COLUMN     "isEndSeason" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isStartSeason" BOOLEAN NOT NULL DEFAULT false;
