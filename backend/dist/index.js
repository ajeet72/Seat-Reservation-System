"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getSeats_1 = __importDefault(require("./getSeats"));
const bookSeats_1 = __importDefault(require("./bookSeats"));
const resetSeats_1 = __importDefault(require("./resetSeats"));
const fillSomeSeats_1 = __importDefault(require("./fillSomeSeats"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Define API routes for different operations related to seats
app.use('/getseats', getSeats_1.default); // Route for fetching seat details
app.use('/bookseats', bookSeats_1.default); // Route for booking seats
app.use('/resetseats', resetSeats_1.default); // Route for resetting seats
app.use('/fillSomeSeats', fillSomeSeats_1.default); // Route for randomly filling seats
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
