-- CreateTable
CREATE TABLE "transaction_upload" (
    "id" SERIAL NOT NULL,
    "directory" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_upload_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction_upload" ADD CONSTRAINT "transaction_upload_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
