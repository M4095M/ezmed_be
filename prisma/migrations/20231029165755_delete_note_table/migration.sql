/*
  Warnings:

  - You are about to drop the `note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `note_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `note_userId_fkey`;

-- DropTable
DROP TABLE `note`;
