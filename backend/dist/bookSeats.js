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
// POST endpoint to book a specified number of seats
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract the number of seats to book from the request body
    const { numSeats } = req.body;
    // Validate if numSeats is within the allowed range (1 to 7)
    if (numSeats < 1 || numSeats > 7) {
        res.status(400).json({ message: "You can only book between 1 and 7 seats." });
        return;
    }
    try {
        // Fetch all unbooked seats ordered by row and seat number
        const rows = yield prisma.seat.findMany({
            where: { is_booked: false },
            orderBy: [{ row_number: "asc" }, { seat_number: "asc" }],
        });
        let bookedSeats = []; // To store booked seats
        let found = false; // Flag to indicate if seats were found in one row
        // Group seats by their row_number
        const rowsGrouped = rows.reduce((acc, seat) => {
            if (!acc[seat.row_number])
                acc[seat.row_number] = [];
            acc[seat.row_number].push(seat);
            return acc;
        }, {});
        // Loop through each row and find a row with enough available seats
        for (let row of Object.keys(rowsGrouped)) {
            const availableRowSeats = rowsGrouped[row];
            // If there are enough seats in the row, select and book them
            if (availableRowSeats.length >= numSeats) {
                const seatsToBook = availableRowSeats.slice(0, numSeats);
                // Book the selected seats
                bookedSeats = yield Promise.all(seatsToBook.map((seat) => prisma.seat.update({
                    where: { id: seat.id },
                    data: { is_booked: true },
                })));
                found = true; // Set the flag to true as seats were found
                break; // Exit the loop after booking
            }
        }
        // If no row had enough available seats, fall back to booking scattered seats
        if (!found) {
            const availableSeats = rows.slice(0, numSeats);
            // If not enough seats are available, return a failure response
            if (availableSeats.length < numSeats) {
                res.status(400).json({ message: "Not enough available seats." });
                return;
            }
            // Book the scattered seats
            bookedSeats = yield Promise.all(availableSeats.map((seat) => prisma.seat.update({
                where: { id: seat.id },
                data: { is_booked: true },
            })));
        }
        // Respond with success and the booked seats
        res.json({ message: "Seats booked successfully", bookedSeats });
    }
    catch (error) {
        // Handle any errors and respond with a 500 status
        res.status(500).json({ message: "Booking failed", error });
    }
}));
exports.default = router;
