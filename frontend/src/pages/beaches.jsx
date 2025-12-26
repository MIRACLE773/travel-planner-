// src/pages/beaches.jsx
import React, { useState } from "react";

const Beaches = () => {
  const beachList = [
    { id: 1, name: "Miami Beach", location: "Florida, USA" },
    { id: 2, name: "Bondi Beach", location: "Sydney, Australia" },
    { id: 3, name: "Copacabana", location: "Rio de Janeiro, Brazil" },
    { id: 4, name: "Waikiki Beach", location: "Hawaii, USA" },
    { id: 5, name: "Boulders Beach", location: "South Africa" },
    { id: 6, name: "Santa Monica Beach", location: "California, USA" },
    { id: 7, name: "Tulum Beach", location: "Mexico" },
    { id: 8, name: "Navagio Beach", location: "Greece" },
    { id: 9, name: "Anse Source d'Argent", location: "Seychelles" },
    { id: 10, name: "Pink Sands Beach", location: "Bahamas" },
    { id: 11, name: "Reynisfjara Beach", location: "Iceland" },
    { id: 12, name: "Laguna Beach", location: "California, USA" },
    { id: 13, name: "Playa Paraiso", location: "Cuba" },
    { id: 14, name: "Seven Mile Beach", location: "Cayman Islands" },
    { id: 15, name: "El Nido Beach", location: "Philippines" },
    { id: 16, name: "Railay Beach", location: "Thailand" },
    { id: 17, name: "Grace Bay", location: "Turks and Caicos" },
    { id: 18, name: "Siargao Beach", location: "Philippines" },
    { id: 19, name: "Matira Beach", location: "Bora Bora, French Polynesia" },
    { id: 20, name: "Diani Beach", location: "Kenya" },
  ];

  const [showBeaches, setShowBeaches] = useState(false);
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [userName, setUserName] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleReserve = () => {
    if (!userName || !numPeople) {
      alert("Please enter your name and number of people");
      return;
    }
    setConfirmationMessage(
      `🎉 Congratulations, ${userName}, you reserved ${selectedBeach.name} for ${numPeople} people! 🎉`
    );
    // Reset form
    setUserName("");
    setNumPeople("");
    setSelectedBeach(null);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col"
    style={{ backgroundImage: "url('/bg-login.jpg')" }}
    >
      <h1 className="text-4xl font-bold text-center mb-6">Beach Reservation</h1>

      {!showBeaches && !selectedBeach && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowBeaches(true)}
            className="px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
          >
            Search Beaches
          </button>
        </div>
      )}

      {showBeaches && !selectedBeach && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {beachList.map((beach) => (
            <div
              key={beach.id}
              className="bg-white rounded shadow p-4 cursor-pointer hover:bg-blue-100"
              onClick={() => setSelectedBeach(beach)}
            >
              <h2 className="text-xl font-semibold">{beach.name}</h2>
              <p className="text-gray-600">{beach.location}</p>
            </div>
          ))}
        </div>
      )}

      {selectedBeach && (
        <div className="max-w-md mx-auto bg-white rounded shadow p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">{selectedBeach.name}</h2>
          <p className="mb-4 text-gray-700">{selectedBeach.location}</p>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of People"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
          />

          <button
            onClick={handleReserve}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
          >
            Reserve
          </button>

          <button
            onClick={() => setSelectedBeach(null)}
            className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded"
          >
            Back to Beaches
          </button>
        </div>
      )}

      {confirmationMessage && (
        <div className="text-center mt-8 text-xl font-bold text-green-700">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default Beaches;
