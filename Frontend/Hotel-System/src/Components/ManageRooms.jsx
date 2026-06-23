import { useState, useEffect } from "react";
import { Link } from "react-router";
export default function ManageRooms() {
  const [roomsInventory, setRoomsInventory] = useState([]);
  const [newRoom, setNewRoom] = useState({
    name: "", beds: "1", type: "AC", price: "", capacity: "2 Guests", image: "", description: ""
  });

  const fetchInventory = () => {
    fetch("http://localhost:8080/Hotel-System/api/admin/rooms")
      .then((res) => res.json())
      .then((data) => setRoomsInventory(data))
      .catch((err) => console.error("Error connecting to database inventory:", err));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const form = new URLSearchParams();
      form.append("name", newRoom.name);
      form.append("beds", newRoom.beds);
      form.append("type", newRoom.type);
      form.append("price", newRoom.price);
      form.append("capacity", newRoom.capacity);
      form.append("image", newRoom.image);
      form.append("description", newRoom.description);

      const res = await fetch("http://localhost:8080/Hotel-System/api/admin/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form
      });
      
      const data = await res.json();
      if (res.ok && data.status === "success") {
        alert("🎉 Success: New Room tier deployed to catalog grid!");
        setNewRoom({ name: "", beds: "1", type: "AC", price: "", capacity: "2 Guests", image: "", description: "" });
        fetchInventory();
      }
    } catch (err) {
      alert("❌ Operation dropped by database pipeline.");
    }
  };

  const handleInventoryDelete = async (id, name) => {
    if (!window.confirm(`⚠️ Are you sure you want to completely drop "${name}" from live customer listings?`)) return;
    
    try {
      const form = new URLSearchParams();
      form.append("action", "delete");
      form.append("id", id);

      const res = await fetch("http://localhost:8080/Hotel-System/api/admin/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form
      });
      
      if (res.ok) {
        alert("🗑️ Room configuration removed cleanly.");
        fetchInventory();
      }
    } catch (err) {
      alert("❌ Could not process delete transaction.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 pt-24 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        <Link 
              to="/admin" 
              className="bg-amber-700 text-white px-5 py-2.5 rounded-md hover:bg-amber-800 transition duration-200 font-semibold"
            >
              Admin Dashboard
            </Link>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-5">
          <h1 className="text-3xl font-bold text-gray-900">Hotel Inventory Manager</h1>
          <p className="text-gray-500 text-sm">Add or drop physical lodging accommodations instantly from the core server storage layout.</p>
            
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creation Control Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add Room Layout Specs</h3>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Room Class / Name</label>
                <input type="text" value={newRoom.name} onChange={e => setNewRoom({...newRoom, name: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 text-sm" placeholder="e.g. Penthouse Sky Lounge" required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Climate Module</label>
                  <select value={newRoom.type} onChange={e => setNewRoom({...newRoom, type: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 text-sm bg-gray-50">
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Bed Configuration</label>
                  <input type="number" value={newRoom.beds} onChange={e => setNewRoom({...newRoom, beds: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 text-sm" min="1" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Capacity Limit</label>
                  <input type="text" value={newRoom.capacity} onChange={e => setNewRoom({...newRoom, capacity: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 text-sm" placeholder="e.g. 4 Guests" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Price / Night (₹)</label>
                  <input type="number" value={newRoom.price} onChange={e => setNewRoom({...newRoom, price: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 text-sm" placeholder="5000" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Image Asset URL</label>
                <input type="url" value={newRoom.image} onChange={e => setNewRoom({...newRoom, image: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 text-sm text-blue-600" placeholder="https://unsplash.com/..." required />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Marketing Description Context</label>
                <textarea value={newRoom.description} onChange={e => setNewRoom({...newRoom, description: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2 text-sm h-20 resize-none" placeholder="Add custom copy descriptions for customers..." required />
              </div>

              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-sm shadow-sm transition">
                🚀 Deploy Room Variant
              </button>
            </form>
          </div>

          {/* Active Ledger Monitor Table Grid */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-sm text-gray-600 border-collapse">
              <thead className="bg-gray-50 text-gray-400 font-semibold uppercase text-[11px] tracking-wider border-b border-gray-100">
                <tr>
                  <th className="p-4">Asset Details</th>
                  <th className="p-4">Specs</th>
                  <th className="p-4">Nightly Rate</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {roomsInventory.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50/50">
                    <td className="p-4 flex space-x-3 items-center">
                      <img src={room.image} alt="" className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                      <div>
                        <div className="font-bold text-gray-900">{room.name}</div>
                        <div className="text-xs text-gray-400 max-w-xs truncate">{room.description}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded w-fit font-bold mb-1">{room.type}</div>
                      <div className="text-[11px] text-gray-400">{room.beds} Bed(s) • {room.capacity}</div>
                    </td>
                    <td className="p-4 text-emerald-600 font-bold">₹{room.price.toLocaleString("en-IN")}</td>
                    <td className="p-4 text-center">
                      <button onClick={() => handleInventoryDelete(room.id, room.name)} className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                        🗑️ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {roomsInventory.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">No live variants loaded in database.</div>}
          </div>
        </div>

      </div>
    </div>
  );
}