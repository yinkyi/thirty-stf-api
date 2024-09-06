/*
  Warnings:

  - You are about to drop the column `airline_id` on the `flightSchedules` table. All the data in the column will be lost.
  - You are about to drop the column `flight_number` on the `flightSchedules` table. All the data in the column will be lost.
  - Added the required column `flight_id` to the `flightSchedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flightSchedules" DROP COLUMN "airline_id",
DROP COLUMN "flight_number",
ADD COLUMN     "flight_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "flightSchedules" ADD CONSTRAINT "flightSchedules_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
