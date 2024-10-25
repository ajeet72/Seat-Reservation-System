import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();

// Resets all seats by marking them as unbooked.
router.post("/", async (req: Request, res: Response) => {
  try {
    // Set all seats to unbooked
    await prisma.seat.updateMany({
      data: { is_booked: false },
    });

    res.json({ message: "Seats have been reset." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reset seats", error });
  }
});

export default router;
