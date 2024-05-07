-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `nin_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `salary` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `contact1` VARCHAR(191) NOT NULL,
    `contact2` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userSessions` (
    `sessionId` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `last_time_online` DATETIME(3) NOT NULL,

    PRIMARY KEY (`sessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bankinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `account_no` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `bankinfo_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `educationinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `educationinfo_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addressinfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `village` VARCHAR(191) NOT NULL,
    `parish` VARCHAR(191) NOT NULL,
    `subcounty` VARCHAR(191) NOT NULL,
    `county` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `addressinfo_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `userSessions` ADD CONSTRAINT `userSessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bankinfo` ADD CONSTRAINT `bankinfo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `educationinfo` ADD CONSTRAINT `educationinfo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addressinfo` ADD CONSTRAINT `addressinfo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
