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
// Initialize a new Express router and Prisma client
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Route to fetch all seats
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all seat data from the database
        const seats = yield prisma.seat.findMany();
        // Respond with the seat data in JSON format
        res.json(seats);
    }
    catch (error) {
        // Handle errors by sending a 500 response with an error message
        res.status(500).json({ message: "Failed to fetch seats", error });
    }
}));
// Export the router to be used in other parts of the app
exports.default = router;
