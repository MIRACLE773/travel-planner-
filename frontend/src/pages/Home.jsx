import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/travel-bg.jpg')" }}
    >
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-5xl font-bold drop-shadow-lg">
          Explore the World with TravelPlanner
        </h1>

        <p className="text-white text-lg mt-4 max-w-2xl drop-shadow-lg">
          Discover new destinations, plan your next adventure, and explore unforgettable experiences.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/login"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
