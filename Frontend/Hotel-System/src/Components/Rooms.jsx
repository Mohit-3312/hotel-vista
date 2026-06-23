import React from 'react'
import RoomsGrid from './RoomsGrid'
import { useState, useEffect } from 'react';




function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [selectedType, setSelectedType] = useState("All");
    const [selectedBeds, setSelectedBeds] = useState("All");

    // Fetch data cleanly from Tomcat
  useEffect(() => {
    fetch("http://localhost:8080/Hotel-System/api/admin/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error loading live suites from inventory:", err));
  }, []);

  // Compute filtered array subset
  const filteredRooms = rooms.filter((room) => {
    const matchesType = selectedType === "All" || room.type === selectedType;
    const matchesBeds = selectedBeds === "All" || room.beds.toString() === selectedBeds;
    return matchesType && matchesBeds;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 pt-24 space-y-8">
      
      {/* Interactive Filter Control Layout Bar */}
      <div className="flex space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-fit">
        <div>
          <label className="text-xs font-bold text-gray-400 block mb-1">Room Class Type</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="border border-gray-200 rounded-lg p-2 text-sm bg-gray-50">
            <option value="All">All Types</option>
            <option value="AC">Air Conditioned (AC)</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 block mb-1">Bed Configuration</label>
          <select value={selectedBeds} onChange={(e) => setSelectedBeds(e.target.value)} className="border border-gray-200 rounded-lg p-2 text-sm bg-gray-50">
            <option value="All">Any Bed Count</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
          </select>
        </div>
      </div>

      {/* Production Ready Child Feed Injection */}
      <RoomsGrid roomList={filteredRooms} />

    </div>
  )
   
}

export default Rooms