/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nrc` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passport_expire_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passport_number` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "date_of_birth",
DROP COLUMN "nationality",
DROP COLUMN "nrc",
DROP COLUMN "passport_expire_date",
DROP COLUMN "passport_number";
