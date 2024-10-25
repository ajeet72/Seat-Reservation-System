import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const seats: { row_number: number; seat_number: number }[] = [];

  // Create 10 rows with 7 seats in each row
  for (let row = 1; row <= 10; row++) {
    for (let seat = 1; seat <= 7; seat++) {
      seats.push({ row_number: row, seat_number: seat });
    }
  }

  // Create 1 row (row 11) with 3 seats
  for (let seat = 1; seat <= 3; seat++) {
    seats.push({ row_number: 11, seat_number: seat });
  }

  // Insert seat data into the database
  await prisma.seat.createMany({
    data: seats,
  });

  console.log("Seats have been created!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
