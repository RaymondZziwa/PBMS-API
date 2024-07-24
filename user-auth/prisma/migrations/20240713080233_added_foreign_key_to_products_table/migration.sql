/*
  Warnings:

  - You are about to drop the column `externalreceiptReceipt_number` on the `product` table. All the data in the column will be lost.
  - Added the required column `items` to the `externalreceipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `product_externalreceiptReceipt_number_fkey`;

-- AlterTable
ALTER TABLE `externalreceipt` ADD COLUMN `items` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `externalreceiptReceipt_number`,
    ADD COLUMN `category_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `productcategories` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `productcategories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
