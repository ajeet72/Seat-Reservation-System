import { useState, useEffect } from "react";
import axios from "axios";

interface Seat {
  id: number;
  row_number: number;
  seat_number: number;
  is_booked: boolean;
}

function App() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [noOfSeats, setNoOfSeats] = useState(Number);
  const [bookedSeats, setbookedSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getseats");
        setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [bookedSeats]);

  // handle booking
  const handleSeatBook = async () => {
    if (noOfSeats > 7 || noOfSeats < 1 || Number.isNaN(noOfSeats)) {
      alert("You can only book between 1 and 7 seats.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3000/bookseats", {
        numSeats: noOfSeats 
      });
      setbookedSeats(response.data.bookedSeats);
    } catch (error) {
      console.error("Error booking seats:", error);
      alert("An error occurred while booking seats.");
    }
  };

  // handle reset
  const handleReset = async() => {
    try {
      await axios.post("http://localhost:3000/resetseats");
      setbookedSeats([]);
    } catch (error) {
      alert("Error while reseting seats")
    }
  }

  // handle fill some seats
  const hanleFillSomeSeats = async() => {
    try {
      const response = await axios.post("http://localhost:3000/fillSomeSeats");
      setbookedSeats(response.data.bookedSeats);
    } catch (error) {
      alert("error while filling some seats")
    }
  }
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-2xl mb-4">Seat Booking</h1>
      <div className="grid grid-cols-7 gap-2">
        {seats
          .sort((a, b) => a.row_number - b.row_number || a.seat_number - b.seat_number)
          .map((seat) => (
            <div
              key={seat.id}
              className={`w-20 h-12 flex items-center justify-center rounded text-white font-semibold ${
                seat.is_booked ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {`R${seat.row_number}-S${seat.seat_number}`}
            </div>
          ))}
      </div>
      <div className="pt-4">
        <button 
          onClick={hanleFillSomeSeats}
          className="bg-sky-900 m-4 p-2 rounded text-white"
        >Fill Some Seats</button>
        <button 
          onClick={handleReset}
          className="bg-slate-300 m-4 p-2 rounded text-black"
        >Reset Seats</button>
      </div>
      <div className="flex justify-center items-center">
        <label className="mr-4 text-lg font-medium" htmlFor="seatInput">
          Enter number of seats you want to book:
        </label>
        <input
          onChange={(e) =>{
            setNoOfSeats(parseInt(e.target.value));
          }}
          type="number"
          id="seatInput"
          className="w-20 p-2 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="0"
        />
        <button 
          onClick={handleSeatBook}
          className="bg-sky-900 m-4 p-2 rounded text-white"
        >Book Seats</button>
      </div>
      {bookedSeats.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold flex justify-center text-xl text-center mb-4">Booked Seats:</h2>
          <div className="flex justify-center">
            <div className={`grid grid-cols-7 gap-4`}>
              {bookedSeats.map((seat: any) => (
                <div
                  key={seat.id}
                  className="text-center p-2 border rounded bg-green-200 m-1"
                >
                  R{seat.row_number}-S{seat.seat_number}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );  
};

export default App;