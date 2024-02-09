/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `client_bank` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "client_bank" DROP CONSTRAINT "client_bank_client_id_fkey";

-- DropTable
DROP TABLE "client";

-- DropTable
DROP TABLE "client_bank";

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_picture" TEXT,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_bank" (
    "id" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "account_status" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "payment_type" TEXT NOT NULL,
    "credit_limit" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "client_bank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- AddForeignKey
ALTER TABLE "client_bank" ADD CONSTRAINT "client_bank_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
