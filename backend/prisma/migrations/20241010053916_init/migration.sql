-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "row_number" INTEGER NOT NULL,
    "seat_number" INTEGER NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);
