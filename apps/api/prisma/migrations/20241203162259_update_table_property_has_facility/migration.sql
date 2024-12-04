-- DropIndex
DROP INDEX "profile_updatedAt_key";

-- DropIndex
DROP INDEX "property_updatedAt_key";

-- DropIndex
DROP INDEX "property_details_updatedAt_key";

-- DropIndex
DROP INDEX "property_facilities_updatedAt_key";

-- DropIndex
DROP INDEX "property_has_facilities_updatedAt_key";

-- DropIndex
DROP INDEX "property_images_updatedAt_key";

-- DropIndex
DROP INDEX "property_room_facilites_updatedAt_key";

-- DropIndex
DROP INDEX "property_room_images_updatedAt_key";

-- DropIndex
DROP INDEX "property_room_types_updatedAt_key";

-- DropIndex
DROP INDEX "property_types_updatedAt_key";

-- DropIndex
DROP INDEX "reviews_updatedAt_key";

-- DropIndex
DROP INDEX "room_has_facilities_updatedAt_key";

-- DropIndex
DROP INDEX "tenants_updatedAt_key";

-- DropIndex
DROP INDEX "transaction_status_updatedAt_key";

-- DropIndex
DROP INDEX "transactions_updatedAt_key";

-- DropIndex
DROP INDEX "users_updatedAt_key";

-- AlterTable
ALTER TABLE "room_has_facilities" ADD CONSTRAINT "room_has_facilities_pkey" PRIMARY KEY ("propertyRoomFacilityId", "propertyRoomTypeId");
