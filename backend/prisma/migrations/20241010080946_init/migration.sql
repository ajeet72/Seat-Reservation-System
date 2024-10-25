/*
  Warnings:

  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Seat";

-- CreateTable
CREATE TABLE "seat" (
    "id" TEXT NOT NULL,
    "row_number" INTEGER NOT NULL,
    "seat_number" INTEGER NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("id")
);
