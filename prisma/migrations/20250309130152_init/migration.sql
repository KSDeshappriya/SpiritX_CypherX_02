-- CreateTable
CREATE TABLE `Player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `university` VARCHAR(191) NOT NULL,
    `battingRuns` INTEGER NOT NULL,
    `ballsFaced` INTEGER NOT NULL,
    `wickets` INTEGER NOT NULL,
    `isFromDataset` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `budget` INTEGER NOT NULL DEFAULT 9000000,
    `teamPlayers` JSON NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leaderboard` (
    `userId` INTEGER NOT NULL,
    `totalPoints` DOUBLE NOT NULL,

    UNIQUE INDEX `Leaderboard_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Leaderboard` ADD CONSTRAINT `Leaderboard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
