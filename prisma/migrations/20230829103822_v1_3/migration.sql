/*
  Warnings:

  - The primary key for the `activity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `qcmId` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `qcmId` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `question` table. All the data in the column will be lost.
  - You are about to drop the `qcm` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `questionId` to the `activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `activity_qcmId_fkey`;

-- DropForeignKey
ALTER TABLE `qcm` DROP FOREIGN KEY `qcm_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_qcmId_fkey`;

-- AlterTable
ALTER TABLE `Plan` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `activity` DROP PRIMARY KEY,
    DROP COLUMN `qcmId`,
    ADD COLUMN `questionId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `questionId`);

-- AlterTable
ALTER TABLE `course` ADD COLUMN `type` ENUM('theorique', 'pratique') NOT NULL DEFAULT 'theorique';

-- AlterTable
ALTER TABLE `question` DROP COLUMN `point`,
    DROP COLUMN `qcmId`,
    DROP COLUMN `type`,
    ADD COLUMN `courseId` INTEGER NOT NULL,
    ADD COLUMN `scenarioId` INTEGER NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `year` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `qcm`;

-- CreateTable
CREATE TABLE `scenario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `courseId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `scenario` ADD CONSTRAINT `scenario_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_scenarioId_fkey` FOREIGN KEY (`scenarioId`) REFERENCES `scenario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
