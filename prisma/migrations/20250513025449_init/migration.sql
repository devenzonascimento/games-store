-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('percentage', 'amount');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "igdbId" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "discountType" "DiscountType",
    "discountValue" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_igdbId_key" ON "Product"("igdbId");

-- CreateIndex
CREATE INDEX "Product_igdbId_idx" ON "Product"("igdbId");
