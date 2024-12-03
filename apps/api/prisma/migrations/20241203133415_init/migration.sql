-- CreateEnum
CREATE TYPE "Status" AS ENUM ('WAITING_FOR_PAYMENT', 'WAITING_FOR_CONFIRMATION_PAYMENT', 'PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "checkInStartTime" TIMESTAMP(3) NOT NULL,
    "checkInEndTime" TIMESTAMP(3) NOT NULL,
    "checkOutStartTime" TIMESTAMP(3) NOT NULL,
    "checkOutEndTime" TIMESTAMP(3) NOT NULL,
    "propertyTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_details" (
    "id" SERIAL NOT NULL,
    "property_description" TEXT NOT NULL,
    "neighborhood_description" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "total_room" INTEGER NOT NULL,
    "propertyImageId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "property_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_images" (
    "id" SERIAL NOT NULL,
    "directory" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertyAtypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "propertyAtypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_facilities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon_directory" TEXT NOT NULL,
    "icon_filename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "property_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_has_facilities" (
    "propertyId" INTEGER NOT NULL,
    "propertyFacilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "property_has_facilities_pkey" PRIMARY KEY ("propertyFacilityId","propertyId")
);

-- CreateTable
CREATE TABLE "property_room_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "total_rooms" INTEGER NOT NULL,
    "propertyRoomImageId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "property_room_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_room_facilites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon_directory" TEXT NOT NULL,
    "icon_filename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "property_room_facilites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_has_facilities" (
    "propertyRoomTypeId" INTEGER NOT NULL,
    "propertyRoomFacilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "property_room_images" (
    "id" SERIAL NOT NULL,
    "directory" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "property_room_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_status" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "transaction_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "comment" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("propertyId","userId","transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_updatedAt_key" ON "users"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "profile_updatedAt_key" ON "profile"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_updatedAt_key" ON "tenant"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "property_updatedAt_key" ON "property"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "property_details_propertyId_key" ON "property_details"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "property_details_updatedAt_key" ON "property_details"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "property_images_updatedAt_key" ON "property_images"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "propertyAtypes_updatedAt_key" ON "propertyAtypes"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "property_facilities_updatedAt_key" ON "property_facilities"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "property_has_facilities_updatedAt_key" ON "property_has_facilities"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "property_room_types_updatedAt_key" ON "property_room_types"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "property_room_facilites_updatedAt_key" ON "property_room_facilites"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "room_has_facilities_updatedAt_key" ON "room_has_facilities"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "property_room_images_updatedAt_key" ON "property_room_images"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_updatedAt_key" ON "transactions"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_status_updatedAt_key" ON "transaction_status"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_transactionId_key" ON "reviews"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_updatedAt_key" ON "reviews"("updatedAt");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "propertyAtypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_details" ADD CONSTRAINT "property_details_propertyImageId_fkey" FOREIGN KEY ("propertyImageId") REFERENCES "property_images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_details" ADD CONSTRAINT "property_details_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_has_facilities" ADD CONSTRAINT "property_has_facilities_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_has_facilities" ADD CONSTRAINT "property_has_facilities_propertyFacilityId_fkey" FOREIGN KEY ("propertyFacilityId") REFERENCES "property_facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_room_types" ADD CONSTRAINT "property_room_types_propertyRoomImageId_fkey" FOREIGN KEY ("propertyRoomImageId") REFERENCES "property_room_images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_room_types" ADD CONSTRAINT "property_room_types_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_has_facilities" ADD CONSTRAINT "room_has_facilities_propertyRoomTypeId_fkey" FOREIGN KEY ("propertyRoomTypeId") REFERENCES "property_room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_has_facilities" ADD CONSTRAINT "room_has_facilities_propertyRoomFacilityId_fkey" FOREIGN KEY ("propertyRoomFacilityId") REFERENCES "property_room_facilites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "property_room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_status" ADD CONSTRAINT "transaction_status_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
