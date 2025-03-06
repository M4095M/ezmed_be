-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_courseId_fkey`;

-- AlterTable
ALTER TABLE `question` MODIFY `courseId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
