"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
// Initialize router and Prisma client
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// POST endpoint to randomly book seats
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Generate a random number of seats to book (between 20 and 30)
    const randomNumSeats = Math.floor(Math.random() * 11) + 20;
    try {
        // Find all available (unbooked) seats, ordered by row and seat number
        const availableSeats = yield prisma.seat.findMany({
            where: { is_booked: false },
            orderBy: [{ row_number: "asc" }, { seat_number: "asc" }]
        });
        // Check if there are enough available seats
        if (availableSeats.length < randomNumSeats) {
            // If not enough available seats, return a 400 error
            res.status(400).json({
                message: `Only ${availableSeats.length} available seats left. Cannot fill ${randomNumSeats} seats.`
            });
        }
        else {
            // Shuffle the available seats randomly
            const shuffledSeats = availableSeats.sort(() => 0.5 - Math.random());
            // Select the first randomNumSeats seats from the shuffled list
            const seatsToBook = shuffledSeats.slice(0, randomNumSeats);
            // Book the selected seats
            const bookedSeats = yield Promise.all(seatsToBook.map((seat) => prisma.seat.update({
                where: { id: seat.id },
                data: { is_booked: true }
            })));
            // Respond with the booked seats and a success message
            res.status(200).json({
                message: `Successfully filled ${bookedSeats.length} seats randomly`,
                bookedSeats
            });
        }
    }
    catch (error) {
        // Handle any errors and respond with a 500 error
        console.error("Error filling seats: ", error);
        res.status(500).json({ message: "Error filling seats", error });
    }
}));
// Export the router to be used in other parts of the app
exports.default = router;
