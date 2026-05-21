/*
  Warnings:

  - The primary key for the `aeronaves` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `etapas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `funcionarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pecas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `relatorios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `testes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_EtapaToFuncionario` DROP FOREIGN KEY `_EtapaToFuncionario_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EtapaToFuncionario` DROP FOREIGN KEY `_EtapaToFuncionario_B_fkey`;

-- DropForeignKey
ALTER TABLE `etapas` DROP FOREIGN KEY `etapas_aeronaveId_fkey`;

-- DropForeignKey
ALTER TABLE `funcionarios` DROP FOREIGN KEY `funcionarios_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `pecas` DROP FOREIGN KEY `pecas_aeronaveId_fkey`;

-- DropForeignKey
ALTER TABLE `relatorios` DROP FOREIGN KEY `relatorios_aeronaveId_fkey`;

-- DropForeignKey
ALTER TABLE `relatorios` DROP FOREIGN KEY `relatorios_autorId_fkey`;

-- DropForeignKey
ALTER TABLE `testes` DROP FOREIGN KEY `testes_aeronaveId_fkey`;

-- DropIndex
DROP INDEX `etapas_aeronaveId_fkey` ON `etapas`;

-- DropIndex
DROP INDEX `pecas_aeronaveId_fkey` ON `pecas`;

-- DropIndex
DROP INDEX `relatorios_aeronaveId_fkey` ON `relatorios`;

-- DropIndex
DROP INDEX `relatorios_autorId_fkey` ON `relatorios`;

-- DropIndex
DROP INDEX `testes_aeronaveId_fkey` ON `testes`;

-- AlterTable
ALTER TABLE `_EtapaToFuncionario` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `aeronaves` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `etapas` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `aeronaveId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `funcionarios` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `usuarioId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pecas` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `aeronaveId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `relatorios` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `aeronaveId` VARCHAR(191) NOT NULL,
    MODIFY `autorId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `testes` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `aeronaveId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usuarios` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `funcionarios_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `etapas` ADD CONSTRAINT `etapas_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `aeronaves`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pecas` ADD CONSTRAINT `pecas_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `aeronaves`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testes` ADD CONSTRAINT `testes_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `aeronaves`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relatorios` ADD CONSTRAINT `relatorios_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `aeronaves`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relatorios` ADD CONSTRAINT `relatorios_autorId_fkey` FOREIGN KEY (`autorId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtapaToFuncionario` ADD CONSTRAINT `_EtapaToFuncionario_A_fkey` FOREIGN KEY (`A`) REFERENCES `etapas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EtapaToFuncionario` ADD CONSTRAINT `_EtapaToFuncionario_B_fkey` FOREIGN KEY (`B`) REFERENCES `funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
