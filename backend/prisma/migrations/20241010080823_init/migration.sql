/*
  Warnings:

  - The primary key for the `Seat` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Seat_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Seat_id_seq";
