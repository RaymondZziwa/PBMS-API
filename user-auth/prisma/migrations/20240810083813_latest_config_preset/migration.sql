/*
  Warnings:

  - You are about to drop the column `name` on the `munits` table. All the data in the column will be lost.
  - Added the required column `payment_method` to the `equatorialprojectssales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `equatorialshopsales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `masanafuprojectssales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_method` to the `masanafushopsales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_name` to the `munits` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `client_email_key` ON `client`;

-- AlterTable
ALTER TABLE `equatorialprojectssales` ADD COLUMN `payment_method` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `equatorialshopsales` ADD COLUMN `payment_method` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `masanafuprojectssales` ADD COLUMN `payment_method` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `masanafushopsales` ADD COLUMN `payment_method` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `munits` DROP COLUMN `name`,
    ADD COLUMN `unit_name` VARCHAR(191) NOT NULL;
