import React from "react";
import { useNavigate } from "react-router"; // Import the router navigator tool!

export default function RoomsGrid({ roomList }) {
  const navigate = useNavigate();

  if (roomList.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 text-sm w-full col-span-full">
        No luxury layouts match your active filtering preferences.
      </div>
    );
  }

  const handleBookingRedirect = (roomName, roomPrice) => {
    // Navigate to your booking screen and pass the room name + unit price along as router state!
    navigate("/book", { 
      state: { 
        preSelectedRoom: roomName,
        preSelectedPrice: roomPrice 
      } 
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {roomList.map((room) => (
        <div 
          key={room.id} 
          className="border rounded-xl overflow-hidden shadow-sm bg-white border-gray-100 transition hover:shadow-md flex flex-col justify-between"
        >
          {/* Top Image & Availability Flag */}
          <div>
            <div className="relative">
              <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
              <span 
                className={`absolute top-3 right-3 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm ${
                  room.nextAvailable === "Available Today" ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                }`}
              >
                <li>🗓 {room.nextAvailable}</li>
              </span>
            </div>
            
            {/* Context Elements */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900">{room.name}</h3>
                <span className="text-emerald-600 font-extrabold text-lg">₹{room.price}</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{room.description}</p>
            </div>
          </div>
          
          {/* Footer Specs & Action Buttons */}
          <div className="p-4 pt-0 space-y-3 mt-auto">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-400 pt-2 border-t border-gray-50">
              <span>🛏️ {room.beds} Bed(s)</span>
              <span>👥 {room.capacity}</span>
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{room.type}</span>
            </div>
            
            <button 
              onClick={() => handleBookingRedirect(room.name, room.price)}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold py-2 rounded-lg shadow-sm transition mt-2"
            >
              🛎️ Reserve Room Now
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}