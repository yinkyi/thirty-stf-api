/*
  Warnings:

  - You are about to drop the column `type` on the `flights` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flights" DROP COLUMN "type";

-- CreateTable
CREATE TABLE "airportTypes" (
    "id" UUID NOT NULL,
    "airport_id" UUID NOT NULL,
    "type" "FlightType" NOT NULL,

    CONSTRAINT "airportTypes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "airportTypes" ADD CONSTRAINT "airportTypes_airport_id_fkey" FOREIGN KEY ("airport_id") REFERENCES "airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
