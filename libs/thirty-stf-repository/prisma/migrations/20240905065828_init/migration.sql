/*
  Warnings:

  - You are about to drop the column `flight_id` on the `bookingFlights` table. All the data in the column will be lost.
  - You are about to drop the column `arrival_airport_id` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `arrival_date` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `arrival_time` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `depature_airport_id` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `depature_date` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `depature_time` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `flights` table. All the data in the column will be lost.
  - Added the required column `flight_schedule_id` to the `bookingFlights` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookingFlights" DROP CONSTRAINT "bookingFlights_flight_id_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_arrival_airport_id_fkey";

-- DropForeignKey
ALTER TABLE "flights" DROP CONSTRAINT "flights_depature_airport_id_fkey";

-- AlterTable
ALTER TABLE "bookingFlights" DROP COLUMN "flight_id",
ADD COLUMN     "flight_schedule_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "flights" DROP COLUMN "arrival_airport_id",
DROP COLUMN "arrival_date",
DROP COLUMN "arrival_time",
DROP COLUMN "depature_airport_id",
DROP COLUMN "depature_date",
DROP COLUMN "depature_time",
DROP COLUMN "duration",
DROP COLUMN "unit_price";

-- CreateTable
CREATE TABLE "flightSchedules" (
    "id" UUID NOT NULL,
    "airline_id" UUID NOT NULL,
    "flight_number" TEXT NOT NULL,
    "type" "FlightType" NOT NULL,
    "depature_airport_id" UUID NOT NULL,
    "arrival_airport_id" UUID NOT NULL,
    "depature_date" TIMESTAMP(3) NOT NULL,
    "arrival_date" TIMESTAMP(3) NOT NULL,
    "depature_time" TIMESTAMP(3) NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,
    "unit_price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "flightSchedules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "flightSchedules" ADD CONSTRAINT "flightSchedules_depature_airport_id_fkey" FOREIGN KEY ("depature_airport_id") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flightSchedules" ADD CONSTRAINT "flightSchedules_arrival_airport_id_fkey" FOREIGN KEY ("arrival_airport_id") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookingFlights" ADD CONSTRAINT "bookingFlights_flight_schedule_id_fkey" FOREIGN KEY ("flight_schedule_id") REFERENCES "flightSchedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
