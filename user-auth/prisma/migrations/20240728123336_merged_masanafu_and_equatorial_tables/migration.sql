/*
  Warnings:

  - You are about to drop the `eprojectrestockrecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eprojectsinventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eprojectssales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eprojecttakeoutrecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eshopStocktakeoutrecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eshopexpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eshopinventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eshoprestockrecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eshopsales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mshopsales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `eprojectsinventory` DROP FOREIGN KEY `eprojectsinventory_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `eprojectssales` DROP FOREIGN KEY `eprojectssales_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `eshopinventory` DROP FOREIGN KEY `eshopinventory_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `eshopsales` DROP FOREIGN KEY `eshopsales_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `mshopsales` DROP FOREIGN KEY `mshopsales_client_id_fkey`;

-- DropTable
DROP TABLE `eprojectrestockrecord`;

-- DropTable
DROP TABLE `eprojectsinventory`;

-- DropTable
DROP TABLE `eprojectssales`;

-- DropTable
DROP TABLE `eprojecttakeoutrecord`;

-- DropTable
DROP TABLE `eshopStocktakeoutrecord`;

-- DropTable
DROP TABLE `eshopexpense`;

-- DropTable
DROP TABLE `eshopinventory`;

-- DropTable
DROP TABLE `eshoprestockrecord`;

-- DropTable
DROP TABLE `eshopsales`;

-- DropTable
DROP TABLE `mshopsales`;

-- CreateTable
CREATE TABLE `equatorialshopsales` (
    `sale_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `items` VARCHAR(191) NOT NULL,
    `totalCost` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `equatorialshopsales_client_id_key`(`client_id`),
    PRIMARY KEY (`sale_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equatorialprojectssales` (
    `sale_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `items` VARCHAR(191) NOT NULL,
    `totalCost` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `equatorialprojectssales_client_id_key`(`client_id`),
    PRIMARY KEY (`sale_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masanafuprojectssales` (
    `sale_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `items` VARCHAR(191) NOT NULL,
    `totalCost` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `masanafuprojectssales_client_id_key`(`client_id`),
    PRIMARY KEY (`sale_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masanafushopsales` (
    `sale_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `items` VARCHAR(191) NOT NULL,
    `totalCost` VARCHAR(191) NOT NULL,
    `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `masanafushopsales_client_id_key`(`client_id`),
    PRIMARY KEY (`sale_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equatorialshopinventory` (
    `inventory_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `units` INTEGER NOT NULL,

    PRIMARY KEY (`inventory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equatorialprojectsinventory` (
    `inventory_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `units` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`inventory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equatorialprojectrestockrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equatorialprojecttakeoutrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equatorialshoprestockrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equatorialshopStocktakeoutrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equatorialshopexpense` (
    `expense_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `balance` DOUBLE NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `payment_status` VARCHAR(191) NOT NULL,
    `receipt_image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`expense_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masanafushopexpense` (
    `expense_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `balance` DOUBLE NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `payment_status` VARCHAR(191) NOT NULL,
    `receipt_image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`expense_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masanafushopinventory` (
    `inventory_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `units` INTEGER NOT NULL,

    PRIMARY KEY (`inventory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masanafuprojectsinventory` (
    `inventory_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `units` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`inventory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masanafuprojectrestockrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masanafuprojecttakeoutrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masanafushoprestockrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `masanafushopStocktakeoutrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `items` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `equatorialshopsales` ADD CONSTRAINT `equatorialshopsales_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equatorialprojectssales` ADD CONSTRAINT `equatorialprojectssales_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masanafuprojectssales` ADD CONSTRAINT `masanafuprojectssales_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masanafushopsales` ADD CONSTRAINT `masanafushopsales_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equatorialshopinventory` ADD CONSTRAINT `equatorialshopinventory_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `equatorialprojectsinventory` ADD CONSTRAINT `equatorialprojectsinventory_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masanafushopinventory` ADD CONSTRAINT `masanafushopinventory_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `masanafuprojectsinventory` ADD CONSTRAINT `masanafuprojectsinventory_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
