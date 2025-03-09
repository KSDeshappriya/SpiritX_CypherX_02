/*
  Warnings:

  - You are about to drop the column `totalPoints` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `ballsFaced` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `battingRuns` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `isFromDataset` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `wickets` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `teamPlayers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Leaderboard` DROP FOREIGN KEY `Leaderboard_userId_fkey`;

-- DropIndex
DROP INDEX `Leaderboard_userId_key` ON `Leaderboard`;

-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Leaderboard` DROP COLUMN `totalPoints`,
    DROP COLUMN `userId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `points` INTEGER NOT NULL,
    ADD COLUMN `rank` INTEGER NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Player` DROP COLUMN `ballsFaced`,
    DROP COLUMN `battingRuns`,
    DROP COLUMN `isFromDataset`,
    DROP COLUMN `wickets`,
    ADD COLUMN `batting` JSON NULL,
    ADD COLUMN `bowling` JSON NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `value` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `budget`,
    DROP COLUMN `role`,
    DROP COLUMN `teamPlayers`,
    DROP COLUMN `username`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `teams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `playerIds` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
