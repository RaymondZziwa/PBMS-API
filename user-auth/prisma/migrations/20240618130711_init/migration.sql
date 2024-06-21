/*
  Warnings:

  - You are about to drop the column `stocktake_date` on the `eshopStocktakeoutrecord` table. All the data in the column will be lost.
  - You are about to drop the column `received_by` on the `eshoprestockrecord` table. All the data in the column will be lost.
  - You are about to drop the column `received_date` on the `eshoprestockrecord` table. All the data in the column will be lost.
  - Added the required column `transaction_date` to the `eshopStocktakeoutrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorized_by` to the `eshoprestockrecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_date` to the `eshoprestockrecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eshopStocktakeoutrecord` DROP COLUMN `stocktake_date`,
    ADD COLUMN `transaction_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `eshoprestockrecord` DROP COLUMN `received_by`,
    DROP COLUMN `received_date`,
    ADD COLUMN `authorized_by` VARCHAR(191) NOT NULL,
    ADD COLUMN `transaction_date` DATETIME(3) NOT NULL;
