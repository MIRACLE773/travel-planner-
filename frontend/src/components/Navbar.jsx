import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const raw = localStorage.getItem("currentUser");
  const currentUser = raw ? JSON.parse(raw) : null;

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4">
      {/* LEFT SIDE */}
      <h1 className="text-white text-2xl font-bold">
        {!currentUser ? "TravelPlanner" : `Hi ${currentUser.name} `}
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6 text-white font-medium">
        {!currentUser ? (
          <>
            <Link to="/login" className="hover:text-red-400">Login</Link>
            <Link to="/register" className="hover:text-red-400">Register</Link>
          </>
        ) : (
          <>
            <Link to="/view" className="hover:text-red-400">Explore</Link>

            <Link to="/dashboard" className="flex items-center gap-2 hover:text-red-400">
              <FaUserCircle size={22} /> 
              <span className="hidden sm:inline">Dashboard</span>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
