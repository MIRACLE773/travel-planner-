import { useState } from "react";
import axios from "axios";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [message, setMessage] = useState("");

  const loadHotels = async () => {
    const res = await axios.get("https://travel-planner-nziu.onrender.com/api/hotels/list/");
    setHotels(res.data.hotels);
  };

  const bookRoom = async (hotel, room) => {
    const res = await axios.post("https://travel-planner-nziu.onrender.com/api/hotels/book/", {
      hotel_name: hotel.name,
      room_type: room.type,
      price: room.price,
    });
    setMessage(res.data.message);
    setSelectedHotel(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-300 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">🏨 Hotel Booking</h1>

      <div className="text-center mb-6">
        <button
          onClick={loadHotels}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700"
        >
          Search Hotels
        </button>
      </div>

      {/* Hotel List */}
      <div className="grid md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => setSelectedHotel(hotel)}
            className="bg-white p-5 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold">{hotel.name}</h2>
            <p className="text-gray-500">Tap to view rooms</p>
          </div>
        ))}
      </div>

      {/* Room Prices */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {selectedHotel.name}
            </h2>

            {selectedHotel.rooms.map((room, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-3 rounded-lg mb-3"
              >
                <div>
                  <p className="font-semibold">{room.type}</p>
                  <p className="text-gray-500">${room.price}</p>
                </div>
                <button
                  onClick={() => bookRoom(selectedHotel, room)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Book
                </button>
              </div>
            ))}

            <button
              onClick={() => setSelectedHotel(null)}
              className="mt-4 text-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {message && (
        <div className="mt-8 text-center text-2xl font-bold text-green-700">
          {message}
        </div>
      )}
    </div>
  );
}
