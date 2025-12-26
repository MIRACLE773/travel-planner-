import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import View from "./pages/view";
import Dashboard from "./pages/Dashboard";
import Flights from "./pages/flights";
import Hotels from "./pages/hotels"; 
import Beaches from "./pages/beaches";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view" element={<View />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/beaches" element={<Beaches />} />
      </Routes>
    </BrowserRouter>
  );
}
