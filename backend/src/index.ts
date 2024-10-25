import express, { Request, Response } from 'express';
import cors from 'cors';
import getSeats from "./getSeats"
import bookSeats from "./bookSeats"
import resetSeats from './resetSeats';
import fillSomeSeats from './fillSomeSeats';


const app = express();
const PORT = 3000;
app.use(cors())
app.use(express.json());

// Define API routes for different operations related to seats
app.use('/getseats', getSeats);          // Route for fetching seat details
app.use('/bookseats', bookSeats);        // Route for booking seats
app.use('/resetseats', resetSeats);      // Route for resetting seats
app.use('/fillSomeSeats', fillSomeSeats); // Route for randomly filling seats

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});