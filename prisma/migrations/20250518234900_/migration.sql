/*
  Warnings:

  - You are about to drop the column `platform` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `OrderItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CartItem_cartId_productId_platform_key";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "platform";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "platform";

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "CartItem"("cartId", "productId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
