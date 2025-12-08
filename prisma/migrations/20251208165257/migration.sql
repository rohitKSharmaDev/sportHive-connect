/*
  Warnings:

  - You are about to drop the column `interests` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "interests",
DROP COLUMN "name",
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "sportsInterests" TEXT[] DEFAULT ARRAY[]::TEXT[];
