-- AlterTable
ALTER TABLE `playlist` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `isPingged` BOOLEAN NOT NULL DEFAULT false;
