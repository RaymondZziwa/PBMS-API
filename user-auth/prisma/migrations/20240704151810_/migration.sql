/*
  Warnings:

  - You are about to drop the column `project_id` on the `eprojectrestockrecord` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `eprojectrestockrecord` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `eprojectrestockrecord` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `eprojecttakeoutrecord` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `eprojecttakeoutrecord` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `eprojecttakeoutrecord` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `eshopStocktakeoutrecord` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `eshopStocktakeoutrecord` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `eshopStocktakeoutrecord` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `eshoprestockrecord` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `eshoprestockrecord` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `eshoprestockrecord` table. All the data in the column will be lost.
  - You are about to drop the `eprojectinventory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `items` to the `eprojectrestockrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items` to the `eprojecttakeoutrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items` to the `eshopStocktakeoutrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items` to the `eshoprestockrecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `eprojectinventory` DROP FOREIGN KEY `eprojectinventory_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `eprojectrestockrecord` DROP FOREIGN KEY `eprojectrestockrecord_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `eprojecttakeoutrecord` DROP FOREIGN KEY `eprojecttakeoutrecord_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `eshopStocktakeoutrecord` DROP FOREIGN KEY `eshopStocktakeoutrecord_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `eshoprestockrecord` DROP FOREIGN KEY `eshoprestockrecord_product_id_fkey`;

-- AlterTable
ALTER TABLE `eprojectrestockrecord` DROP COLUMN `project_id`,
    DROP COLUMN `quantity`,
    DROP COLUMN `units`,
    ADD COLUMN `items` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `eprojecttakeoutrecord` DROP COLUMN `project_id`,
    DROP COLUMN `quantity`,
    DROP COLUMN `units`,
    ADD COLUMN `items` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `eshopStocktakeoutrecord` DROP COLUMN `product_id`,
    DROP COLUMN `quantity`,
    DROP COLUMN `units`,
    ADD COLUMN `items` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `eshoprestockrecord` DROP COLUMN `product_id`,
    DROP COLUMN `quantity`,
    DROP COLUMN `units`,
    ADD COLUMN `items` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `eprojectinventory`;

-- CreateTable
CREATE TABLE `eprojectsinventory` (
    `inventory_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `units` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`inventory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `eprojectsinventory` ADD CONSTRAINT `eprojectsinventory_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
