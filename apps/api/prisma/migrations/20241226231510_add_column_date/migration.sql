/*
  Warnings:

  - Added the required column `date` to the `seasonal_prices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seasonal_prices" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
