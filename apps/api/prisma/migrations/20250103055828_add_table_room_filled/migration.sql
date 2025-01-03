-- CreateTable
CREATE TABLE "rooms_filled" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalRooms" INTEGER NOT NULL,
    "propertyRoomTypeId" INTEGER NOT NULL,
    "propertyId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "transactionStatusId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "rooms_filled_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rooms_filled" ADD CONSTRAINT "rooms_filled_propertyRoomTypeId_fkey" FOREIGN KEY ("propertyRoomTypeId") REFERENCES "property_room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms_filled" ADD CONSTRAINT "rooms_filled_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms_filled" ADD CONSTRAINT "rooms_filled_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms_filled" ADD CONSTRAINT "rooms_filled_transactionStatusId_fkey" FOREIGN KEY ("transactionStatusId") REFERENCES "transaction_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
