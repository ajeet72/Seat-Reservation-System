import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

// Initialize router and Prisma client
const router = Router();
const prisma = new PrismaClient();

// POST endpoint to randomly book seats
router.post("/", async (req: Request, res: Response): Promise<void> => {
  
  try {
    // Generate a random number of seats to book (between 20 and 30)
    const randomNumSeats = Math.floor(Math.random() * 11) + 20;
    // Find all available (unbooked) seats, ordered by row and seat number
    const availableSeats = await prisma.seat.findMany({
      where: { is_booked: false },
      orderBy: [{ row_number: "asc" }, { seat_number: "asc" }]
    });

    // Check if there are enough available seats
    if (availableSeats.length < randomNumSeats) {
      // If not enough available seats, return a 400 error
      res.status(400).json({
        message: `Only ${availableSeats.length} available seats left. Cannot fill ${randomNumSeats} seats.`
      });
    } else {
      // Shuffle the available seats randomly
      const shuffledSeats = availableSeats.sort(() => 0.5 - Math.random());

      // Select the first randomNumSeats seats from the shuffled list
      const seatsToBook = shuffledSeats.slice(0, randomNumSeats);

      // Book the selected seats
      const bookedSeats = await Promise.all(
        seatsToBook.map((seat) =>
          prisma.seat.update({
            where: { id: seat.id },
            data: { is_booked: true }
          })
        )
      );

      // Respond with the booked seats and a success message
      res.status(200).json({
        message: `Successfully filled ${bookedSeats.length} seats randomly`,
        bookedSeats
      });
    }
  } catch (error) {
    // Handle any errors and respond with a 500 error
    console.error("Error filling seats: ", error);
    res.status(500).json({ message: "Error filling seats", error });
  }
});

// Export the router to be used in other parts of the app
export default router;
