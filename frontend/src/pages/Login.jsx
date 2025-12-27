import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [emailOrName, setEmailOrName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!emailOrName || !password) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://travel-planner-nziu.onrender.com/api/users/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: emailOrName.trim(),
            password,
          }),
        }
      );

      const text = await res.text();
      console.log("LOGIN RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setError("Backend returned invalid response.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data?.detail || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          token: data.access,
        })
      );

      navigate("/view");
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="flex justify-center items-center mt-10 px-4">
          <form
            onSubmit={handleLogin}
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md"
          >
            <h2 className="text-white text-2xl font-bold mb-4">Sign In</h2>

            {error && (
              <div className="text-red-400 bg-black/20 p-2 rounded mb-4">
                {error}
              </div>
            )}

            <label className="relative block mb-4">
              <FaUser className="absolute top-3 left-3 text-gray-300" />
              <input
                value={emailOrName}
                onChange={(e) => setEmailOrName(e.target.value)}
                placeholder="Email or Username"
                className="w-full p-3 pl-10 rounded-xl bg-gray-800 text-white"
              />
            </label>

            <label className="relative block mb-6">
              <FaLock className="absolute top-3 left-3 text-gray-300" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 pl-10 rounded-xl bg-gray-800 text-white"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl font-bold disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-gray-300 text-sm mt-4 text-center">
              New to TravelPlanner?{" "}
              <a href="/register" className="text-red-400 font-semibold">
                Create account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
