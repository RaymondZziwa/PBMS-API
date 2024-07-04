/*
  Warnings:

  - The primary key for the `saffronsale` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Points` on the `saffronsale` table. All the data in the column will be lost.
  - You are about to drop the column `sale_date` on the `saffronsale` table. All the data in the column will be lost.
  - You are about to drop the column `sales_id` on the `saffronsale` table. All the data in the column will be lost.
  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `points` to the `saffronsale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_id` to the `saffronsale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `supplyrecords` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_client_id_fkey`;

-- AlterTable
ALTER TABLE `massageincome` MODIFY `received_by` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `saffronsale` DROP PRIMARY KEY,
    DROP COLUMN `Points`,
    DROP COLUMN `sale_date`,
    DROP COLUMN `sales_id`,
    ADD COLUMN `points` DOUBLE NOT NULL,
    ADD COLUMN `sale_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`sale_id`);

-- AlterTable
ALTER TABLE `supplyrecords` ADD COLUMN `totalCost` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `sales`;

-- CreateTable
CREATE TABLE `eshopsales` (
    `sale_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `items` VARCHAR(191) NOT NULL,
    `totalCost` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `eshopsales_client_id_key`(`client_id`),
    PRIMARY KEY (`sale_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eprojectssales` (
    `sale_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `items` VARCHAR(191) NOT NULL,
    `totalCost` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `eprojectssales_client_id_key`(`client_id`),
    PRIMARY KEY (`sale_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mshopsales` (
    `sale_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `items` VARCHAR(191) NOT NULL,
    `totalCost` VARCHAR(191) NOT NULL,
    `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `mshopsales_client_id_key`(`client_id`),
    PRIMARY KEY (`sale_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `barcode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eprojectinventory` (
    `inventory_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `units` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`inventory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eprojectrestockrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `units` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eprojecttakeoutrecord` (
    `record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `units` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `authorized_by` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saffronuser` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `totalpts` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `saffronuser_username_key`(`username`),
    UNIQUE INDEX `saffronuser_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `munits` (
    `unit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`unit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productcategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `branch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `branch_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dept_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `eshopsales` ADD CONSTRAINT `eshopsales_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eprojectssales` ADD CONSTRAINT `eprojectssales_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mshopsales` ADD CONSTRAINT `mshopsales_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eprojectinventory` ADD CONSTRAINT `eprojectinventory_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eprojectrestockrecord` ADD CONSTRAINT `eprojectrestockrecord_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eprojecttakeoutrecord` ADD CONSTRAINT `eprojecttakeoutrecord_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `saffronsale` ADD CONSTRAINT `saffronsale_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `saffronuser`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `department` ADD CONSTRAINT `department_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role` ADD CONSTRAINT `role_dept_id_fkey` FOREIGN KEY (`dept_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
