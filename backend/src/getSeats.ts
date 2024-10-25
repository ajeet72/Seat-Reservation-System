import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

// Initialize a new Express router and Prisma client
const router = Router();
const prisma = new PrismaClient();

// Route to fetch all seats
router.get("/", async (req: Request, res: Response) => {
  try {
    // Fetch all seat data from the database
    const seats = await prisma.seat.findMany();
    
    // Respond with the seat data in JSON format
    res.json(seats);
  } catch (error) {
    // Handle errors by sending a 500 response with an error message
    res.status(500).json({ message: "Failed to fetch seats", error });
  }
});

// Export the router to be used in other parts of the app
export default router;
