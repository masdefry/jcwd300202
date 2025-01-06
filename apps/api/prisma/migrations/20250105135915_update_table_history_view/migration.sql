/*
  Warnings:

  - The primary key for the `history_view` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `history_view` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "history_view" DROP CONSTRAINT "history_view_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "history_view_pkey" PRIMARY KEY ("userId", "propertyId");
