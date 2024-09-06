/*
  Warnings:

  - You are about to drop the column `flight_id` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `city` to the `airports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrival_time` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depature_time` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `flights` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FlightType" AS ENUM ('domestic', 'international');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('reserved', 'completed');

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_flight_id_fkey";

-- AlterTable
ALTER TABLE "airports" ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "flight_id",
ADD COLUMN     "status" "BookingStatus" NOT NULL;

-- AlterTable
ALTER TABLE "flights" ADD COLUMN     "arrival_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "depature_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "FlightType" NOT NULL;

-- CreateTable
CREATE TABLE "bookingFlights" (
    "id" UUID NOT NULL,
    "booking_id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "flight_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "bookingFlights_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookingFlights" ADD CONSTRAINT "bookingFlights_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookingFlights" ADD CONSTRAINT "bookingFlights_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
