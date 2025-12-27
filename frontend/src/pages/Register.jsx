import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validEmail = (e) => /\S+@\S+\.\S+/.test(e);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields.");
      return;
    }

    if (!validEmail(email)) {
      setError("Invalid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://travel-planner-nziu.onrender.com/api/users/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
            confirm_password: confirm,
          }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.password?.[0] || data?.error || JSON.stringify(data) || "Registration failed");
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
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bg-register.jpg')" }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <Navbar />
        <div className="flex justify-center items-center mt-10 px-4">
          <form onSubmit={handleRegister} className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md">
            <h2 className="text-white text-2xl font-bold mb-4">Create account</h2>
            {error && <div className="text-red-400 bg-black/20 p-2 rounded mb-4">{error}</div>}
            <label className="relative block mb-4">
              <FaUser className="absolute top-3 left-3 text-gray-300" />
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-3 pl-10 rounded-xl bg-gray-800 text-white" />
            </label>
            <label className="relative block mb-4">
              <FaEnvelope className="absolute top-3 left-3 text-gray-300" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 pl-10 rounded-xl bg-gray-800 text-white" />
            </label>
            <label className="relative block mb-4">
              <FaLock className="absolute top-3 left-3 text-gray-300" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 pl-10 rounded-xl bg-gray-800 text-white" />
            </label>
            <label className="relative block mb-6">
              <FaLock className="absolute top-3 left-3 text-gray-300" />
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm password" className="w-full p-3 pl-10 rounded-xl bg-gray-800 text-white" />
            </label>
            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-xl font-bold disabled:opacity-50">
              {loading ? "Creating..." : "Create Account"}
            </button>
            <p className="text-gray-300 text-sm mt-4 text-center">
              Already have an account? <Link to="/login" className="text-red-500 font-semibold">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
