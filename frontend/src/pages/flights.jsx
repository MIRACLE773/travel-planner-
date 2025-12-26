import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    origin_country: "",
    destination_country: "",
    departure_date: ""
  });

  // Load flights from localStorage
  useEffect(() => {
    const savedFlights = JSON.parse(localStorage.getItem("flights")) || [];
    setFlights(savedFlights);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = (e) => {
    e.preventDefault();

    const newFlight = {
      id: Date.now(),
      ...form,
      price: Math.floor(Math.random() * 1000) + 200
    };

    const updatedFlights = [...flights, newFlight];
    setFlights(updatedFlights);

    localStorage.setItem("flights", JSON.stringify(updatedFlights));

    setMessage(
      `Congratulations ${form.first_name}! Your flight to ${form.destination_country} is booked 🎉`
    );

    setForm({
      first_name: "",
      last_name: "",
      origin_country: "",
      destination_country: "",
      departure_date: ""
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/bg-login.jpg')" }}
    >
      <Navbar />

      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-white text-center">
            Book a Flight
          </h2>

          {message && (
            <p className="text-green-400 text-center mt-2">{message}</p>
          )}

          <form onSubmit={handleBook} className="flex flex-col gap-3 mt-4">
            <input
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="p-2 rounded"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="p-2 rounded"
            />
            <input
              name="origin_country"
              placeholder="Origin Country"
              value={form.origin_country}
              onChange={handleChange}
              required
              className="p-2 rounded"
            />
            <input
              name="destination_country"
              placeholder="Destination Country"
              value={form.destination_country}
              onChange={handleChange}
              required
              className="p-2 rounded"
            />
            <input
              type="date"
              name="departure_date"
              value={form.departure_date}
              onChange={handleChange}
              required
              className="p-2 rounded"
            />

            <button className="bg-blue-600 text-white py-2 rounded mt-2">
              Book Flight
            </button>
          </form>

          {flights.length > 0 && (
            <>
              <h3 className="text-white text-xl font-bold mt-6 text-center">
                My Flights
              </h3>
              <ul className="text-white mt-2 text-sm">
                {flights.map((f) => (
                  <li key={f.id} className="border-b py-1">
                    {f.origin_country} → {f.destination_country} | ${f.price}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
