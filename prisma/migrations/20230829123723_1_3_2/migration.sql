-- DropForeignKey
ALTER TABLE `proposition` DROP FOREIGN KEY `proposition_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_scenarioId_fkey`;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_scenarioId_fkey` FOREIGN KEY (`scenarioId`) REFERENCES `scenario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposition` ADD CONSTRAINT `proposition_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
