/*
  Warnings:

  - Added the required column `quantity` to the `equatorialprojectrestockrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `equatorialprojectrestockrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `equatorialprojecttakeoutrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `equatorialprojecttakeoutrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `equatorialshopStocktakeoutrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `equatorialshopStocktakeoutrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `equatorialshoprestockrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `units` to the `equatorialshoprestockrecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `equatorialprojectrestockrecord` ADD COLUMN `quantity` VARCHAR(191) NOT NULL,
    ADD COLUMN `units` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `equatorialprojecttakeoutrecord` ADD COLUMN `quantity` VARCHAR(191) NOT NULL,
    ADD COLUMN `units` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `equatorialshopStocktakeoutrecord` ADD COLUMN `quantity` VARCHAR(191) NOT NULL,
    ADD COLUMN `units` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `equatorialshoprestockrecord` ADD COLUMN `quantity` VARCHAR(191) NOT NULL,
    ADD COLUMN `units` INTEGER NOT NULL;
