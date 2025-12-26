import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [flights, setFlights] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    if (!raw) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(raw));

    setFlights(JSON.parse(localStorage.getItem("flights")) || []);
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
  }, [navigate]);

  if (!user) return null;

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...tasks, { id: Date.now(), title: newTask }];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setNewTask("");
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const uploadAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* PROFILE */}
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            {avatar ? (
              <img src={avatar} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-3xl">
                {user.name[0]}
              </div>
            )}
            <input type="file" hidden onChange={uploadAvatar} />
          </label>

          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* BIO */}
        <div>
          <h3 className="font-semibold mb-2">About Me</h3>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 rounded bg-white/10"
            rows={3}
          />
          <button
            onClick={() => localStorage.setItem("bio", bio)}
            className="mt-2 bg-blue-500 px-4 py-1 rounded"
          >
            Save Bio
          </button>
        </div>

        {/* FLIGHTS */}
        <div>
          <h3 className="text-lg font-semibold">Flight Receipts</h3>
          {flights.length === 0 ? (
            <p className="text-gray-400">No flights booked yet.</p>
          ) : (
            <ul className="space-y-2 mt-2">
              {flights.map((f) => (
                <li key={f.id} className="bg-white/10 p-3 rounded">
                  ✈ {f.origin_country} → {f.destination_country} <br />
                  Passenger: {f.first_name} {f.last_name} <br />
                  Date: {f.departure_date} | Price: ${f.price}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TASKS */}
        <div>
          <h3 className="text-lg font-semibold">Tasks</h3>
          <div className="flex gap-2 mt-2">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="New task..."
              className="flex-1 p-2 rounded bg-white/10"
            />
            <button onClick={addTask} className="bg-green-500 px-3 rounded">
              +
            </button>
          </div>

          <ul className="mt-3 space-y-2">
            {tasks.map((t) => (
              <li
                key={t.id}
                className="flex justify-between bg-white/10 p-2 rounded"
              >
                {t.title}
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-red-400"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
