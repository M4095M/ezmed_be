/*
  Warnings:

  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `activity_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `activity_userId_fkey`;

-- DropTable
DROP TABLE `activity`;

-- CreateTable
CREATE TABLE `activityTheorique` (
    `playlistId` INTEGER NOT NULL,
    `questionId` INTEGER NOT NULL,
    `answer` ENUM('CORRECT', 'INCORRECT', 'IGNORED') NOT NULL DEFAULT 'IGNORED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`playlistId`, `questionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activityPratique` (
    `playlistId` INTEGER NOT NULL,
    `scenarioId` INTEGER NOT NULL,
    `answer` ENUM('CORRECT', 'INCORRECT', 'IGNORED') NOT NULL DEFAULT 'IGNORED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`playlistId`, `scenarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `authSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `authSession_token_key`(`token`),
    UNIQUE INDEX `authSession_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activityTheorique` ADD CONSTRAINT `activityTheorique_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `playlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activityTheorique` ADD CONSTRAINT `activityTheorique_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activityPratique` ADD CONSTRAINT `activityPratique_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `playlist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activityPratique` ADD CONSTRAINT `activityPratique_scenarioId_fkey` FOREIGN KEY (`scenarioId`) REFERENCES `scenario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `playlist` ADD CONSTRAINT `playlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `authSession` ADD CONSTRAINT `authSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
