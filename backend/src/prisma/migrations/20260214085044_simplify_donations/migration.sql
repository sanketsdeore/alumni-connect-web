/*
  Warnings:

  - You are about to drop the column `createdById` on the `DonationProject` table. All the data in the column will be lost.
  - You are about to drop the `Donation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `DonationProject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_donorId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "DonationProject" DROP CONSTRAINT "DonationProject_createdById_fkey";

-- AlterTable
ALTER TABLE "DonationProject" DROP COLUMN "createdById",
ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Donation";
