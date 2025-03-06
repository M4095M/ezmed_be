/*
  Warnings:

  - You are about to drop the column `permission` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Plan` DROP COLUMN `permission`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `permission`;

-- CreateTable
CREATE TABLE `Permission` (
    `planId` INTEGER NOT NULL,
    `schoolYearId` INTEGER NOT NULL,

    PRIMARY KEY (`planId`, `schoolYearId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_schoolYearId_fkey` FOREIGN KEY (`schoolYearId`) REFERENCES `schoolYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
