-- DropForeignKey
ALTER TABLE `Pay` DROP FOREIGN KEY `Pay_planId_fkey`;

-- DropForeignKey
ALTER TABLE `activityPratique` DROP FOREIGN KEY `activityPratique_playlistId_fkey`;

-- DropForeignKey
ALTER TABLE `activityPratique` DROP FOREIGN KEY `activityPratique_scenarioId_fkey`;

-- DropForeignKey
ALTER TABLE `activityTheorique` DROP FOREIGN KEY `activityTheorique_playlistId_fkey`;

-- DropForeignKey
ALTER TABLE `activityTheorique` DROP FOREIGN KEY `activityTheorique_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `note_questionId_fkey`;

-- AddForeignKey
ALTER TABLE `activityTheorique` ADD CONSTRAINT `activityTheorique_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activityTheorique` ADD CONSTRAINT `activityTheorique_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activityPratique` ADD CONSTRAINT `activityPratique_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activityPratique` ADD CONSTRAINT `activityPratique_scenarioId_fkey` FOREIGN KEY (`scenarioId`) REFERENCES `scenario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `note` ADD CONSTRAINT `note_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pay` ADD CONSTRAINT `Pay_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
