import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function AdminDashboard() {
  const [data, setData] = useState({ contacts: [], rooms: [], halls: [] });
  const [currentTab, setCurrentTab] = useState("rooms");

  // Reusable loader function
  const fetchDashboardData = () => {
    fetch("http://localhost:8080/Hotel-System/api/admin/dashboard")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading panel metrics:", err));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // EXTREMELY SAFE PURGE HANDLER
  const handleDelete = async (tableKey, id, labelName) => {
    // 🚨 Double check safety verification barrier
    const firstCheck = window.confirm(`⚠️ WARNING: Are you absolutely sure you want to delete the record for "${labelName}"?`);
    if (!firstCheck) return;

    const secondCheck = window.confirm(`🛑 FINAL CONFIRMATION: This action is permanent and cannot be undone. Purge #${id} from the database?`);
    if (!secondCheck) return;

    try {
      const formParams = new URLSearchParams();
      formParams.append("table", tableKey);
      formParams.append("id", id);

      const response = await fetch("http://localhost:8080/Hotel-System/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formParams
      });

      const result = await response.json();
      if (response.ok && result.status === "success") {
        alert(`🗑️ Purged: ${result.message}`);
        fetchDashboardData(); // Refresh list automatically
      } else {
        alert(`⚠️ Action Halted: ${result.message}`);
      }
    } catch (error) {
      alert("❌ Could not communicate data execution purge to Tomcat.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 pt-24 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Grand Vista Command Center</h1>
            <p className="text-gray-500 text-sm">Real-time control matrix for tracking and modifying active reservation schemas.</p>
          </div>
          <span className="bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider">Root Admin Active</span>
        <Link 
              to="/admin/managerooms" 
              className="bg-amber-500 text-white px-5 py-2.5 rounded-md hover:bg-amber-700 transition duration-200 font-semibold"
            >
              Manage Rooms
            </Link>
        </div>

        {/* Tab Controls */}
        <div className="flex space-x-4 bg-gray-200/60 p-1.5 rounded-xl w-fit">
          {["rooms", "halls", "contacts"].map((tab) => (
            <button key={tab} onClick={() => setCurrentTab(tab)} className={`px-6 py-2.5 rounded-lg text-sm font-semibold capitalize transition ${currentTab === tab ? "bg-white text-amber-700 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
              {tab === "rooms" ? "🛏️ Room Bookings" : tab === "halls" ? "🏛️ Hall Leases" : "✉️ Inquiries"}
            </button>
          ))}
        </div>

        {/* Dynamic Data Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600 border-collapse">
            <thead className="bg-gray-50 text-gray-400 font-semibold uppercase text-[11px] tracking-wider border-b border-gray-100">
              {currentTab === "rooms" && (
                <tr><th className="p-4">ID</th><th className="p-4">Guest</th><th className="p-4">Suite Assigned</th><th className="p-4">Check In</th><th className="p-4">Check Out</th><th className="p-4 text-right">Revenue</th><th className="p-4 text-center">Actions</th></tr>
              )}
              {currentTab === "halls" && (
                <tr><th className="p-4">ID</th><th className="p-4">Client</th><th className="p-4">Venue Arena</th><th className="p-4">Target Date</th><th className="p-4">Days</th><th className="p-4 text-right">Revenue</th><th className="p-4 text-center">Actions</th></tr>
              )}
              {currentTab === "contacts" && (
                <tr><th className="p-4">ID</th><th className="p-4">User</th><th className="p-4">Email</th><th className="p-4">Phone</th><th className="p-4">Message Context</th><th className="p-4 text-center">Actions</th></tr>
              )}
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {currentTab === "rooms" && data.rooms.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/50"><td className="p-4 text-gray-400">#{r.id}</td><td className="p-4 font-bold">{r.name}</td><td className="p-4 text-amber-700">{r.room}</td><td className="p-4">{r.checkIn}</td><td className="p-4">{r.checkOut}</td><td className="p-4 text-right text-emerald-600 font-bold">₹{r.price.toLocaleString("en-IN")}</td><td className="p-4 text-center"><button onClick={() => handleDelete("rooms", r.id, r.name)} className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">🗑️ Delete</button></td></tr>
              ))}
              {currentTab === "halls" && data.halls.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50/50"><td className="p-4 text-gray-400">#{h.id}</td><td className="p-4 font-bold">{h.name}</td><td className="p-4 text-amber-700">{h.venue}</td><td className="p-4">{h.date}</td><td className="p-4">{h.days} Day(s)</td><td className="p-4 text-right text-emerald-600 font-bold">₹{h.price.toLocaleString("en-IN")}</td><td className="p-4 text-center"><button onClick={() => handleDelete("halls", h.id, h.name)} className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">🗑️ Delete</button></td></tr>
              ))}
              {currentTab === "contacts" && data.contacts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50"><td className="p-4 text-gray-400">#{c.id}</td><td className="p-4 font-bold">{c.name}</td><td className="p-4">{c.email}</td><td className="p-4 text-gray-500">{c.phone}</td><td className="p-4 text-gray-400 italic max-w-xs truncate">{c.msg}</td><td className="p-4 text-center"><button onClick={() => handleDelete("contacts", c.id, c.name)} className="text-red-500 hover:text-red-700 font-bold text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">🗑️ Delete</button></td></tr>
              ))}
            </tbody>
          </table>
          {data[currentTab].length === 0 && <div className="text-center py-12 text-gray-400 text-sm">No live operational records registered inside this schema layer.</div>}
        </div>

      </div>
    </div>
  );
}