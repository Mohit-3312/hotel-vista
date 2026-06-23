import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { VENUES_DATA } from "./Halls";

export default function Book() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("rooms"); 

  // Core Backend Data Storage States
  const [dbRooms, setDbRooms] = useState([]);
  const [errors, setErrors] = useState({});

  // 1. Unified React State Manager
  const [selectedRoomName, setSelectedRoomName] = useState(""); // Parent category name tracker
  const [roomForm, setRoomForm] = useState({
    type: "AC", beds: "1", checkIn: "", checkOut: "", guestName: "", guestEmail: "", guestPhone: ""
  });

  const [hallForm, setHallForm] = useState({
    selectedVenueName: VENUES_DATA[0]?.name || "", eventType: "Wedding Ceremony", eventDate: "", days: "1", clientName: "", clientEmail: "", clientPhone: ""
  });

  // Fetch Live Room Configuration Matrices on Mount
  useEffect(() => {
    fetch("http://localhost:8080/Hotel-System/api/admin/rooms")
      .then((res) => res.json())
      .then((data) => {
        setDbRooms(data);
        if (data.length > 0 && !location.state?.preSelectedRoom) {
          // Extrapolate parent room categories out of the database array array
          const defaultParent = [...new Set(data.map(r => r.name))][0];
          setSelectedRoomName(defaultParent);
        }
      })
      .catch((err) => console.error("Error loading operational assets:", err));
  }, [location]);

  // Catch dynamic redirect router parameters forwarded from RoomsGrid cards
  useEffect(() => {
    if (location.state?.preSelectedRoom && dbRooms.length > 0) {
      setActiveTab("rooms");
      setSelectedRoomName(location.state.preSelectedRoom);
    }
  }, [location, dbRooms]);

  // 2. DYNAMIC LOOKUP MATRIX (React UI Filter Engine)
  // Extracts configurations that match the text label name
  const matchedConfigurations = dbRooms.filter(r => r.name === selectedRoomName);
  
  // Scrapes what options actually exist in database for this specific room key group!
  const dynamicAvailableTypes = [...new Set(matchedConfigurations.map(c => c.type))];
  const dynamicAvailableBeds = [...new Set(matchedConfigurations.map(c => c.beds.toString()))];

  // Auto-correct dropdowns to clean options when parent selection pivots
  useEffect(() => {
    if (matchedConfigurations.length > 0) {
      setRoomForm(prev => ({
        ...prev,
        type: dynamicAvailableTypes.includes(prev.type) ? prev.type : dynamicAvailableTypes[0],
        beds: dynamicAvailableBeds.includes(prev.beds) ? prev.beds : dynamicAvailableBeds[0]
      }));
    }
  }, [selectedRoomName, dbRooms]);

  // Find the exact active row reference object for transaction execution calculations
  const currentActiveRoomRecord = matchedConfigurations.find(
    r => r.type === roomForm.type && r.beds.toString() === roomForm.beds
  );

  // --- ROOMS INVOICE MATH CALCULATOR ---
  let roomPricePerNight = currentActiveRoomRecord ? currentActiveRoomRecord.price : 0;
  const calculateRoomNights = () => {
    if (!roomForm.checkIn || !roomForm.checkOut) return 1;
    const diff = new Date(roomForm.checkOut) - new Date(roomForm.checkIn);
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 1;
  };
  const totalRoomInvoice = roomPricePerNight * calculateRoomNights();

  // --- HALLS INVOICE MATH CALCULATOR ---
  const currentSelectedHall = VENUES_DATA.find(h => h.name === hallForm.selectedVenueName);
  const cleanHallPrice = currentSelectedHall ? parseInt(currentSelectedHall.pricing.replace(/[^0-9]/g, ""), 10) : 150000;
  const totalHallInvoice = cleanHallPrice * parseInt(hallForm.days || 1);

  // --- SYSTEM VALIDATION SCHEMAS ---
  const validateFields = (form, isRoom) => {
    let tempErrors = {};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const phoneRegex = /^[0-9]{10}$/;

const name = isRoom ? form.guestName : form.clientName;
const email = isRoom ? form.guestEmail : form.clientEmail;
const phone = isRoom ? form.guestPhone : form.clientPhone;

// 1. Fixed name check with nested logic to prevent error overwriting
if (!name.trim() || name.trim().length < 3) {
    tempErrors.name = "Name must be at least 3 letters.";
} else if (!nameRegex.test(name)) { // Mapped to 'name' variable
    tempErrors.name = "Names can only contain alphabetic letters and spaces.";
}

// 2. Email verification
if (!emailRegex.test(email)) {
    tempErrors.email = "Please present a valid email pattern index.";
}

// 3. Phone verification
if (!phoneRegex.test(phone.replace(/[^0-9]/g, ""))) {
    tempErrors.phone = "Mobile layout must be exactly 10 digits.";
}

    if (isRoom) {
      if (!form.checkIn) tempErrors.checkIn = "Check In date required.";
      if (!form.checkOut) tempErrors.checkOut = "Check Out date required.";
      if (form.checkIn && form.checkOut && new Date(form.checkIn) >= new Date(form.checkOut)) {
        tempErrors.checkOut = "Check Out must fall strictly after Check In.";
      }
    } else {
      if (!form.eventDate) tempErrors.eventDate = "Target calendar date required.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // --- PIPELINE FORM TRANSACTION SUBMISSIONS ---
  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields(roomForm, true)) return;
    if (!currentActiveRoomRecord) {
      alert("⚠️ Selected configuration variant is unavailable for this suite tier category.");
      return;
    }

    try {
      const formBody = new URLSearchParams();
      formBody.append("roomId", currentActiveRoomRecord.id); // Secure tracking primary key index row
      formBody.append("guestName", roomForm.guestName.trim());
      formBody.append("guestEmail", roomForm.guestEmail.trim());
      formBody.append("guestPhone", roomForm.guestPhone.replace(/[^0-9]/g, ""));
      formBody.append("selectedRoomName", selectedRoomName);
      formBody.append("type", roomForm.type);
      formBody.append("beds", roomForm.beds);
      formBody.append("checkIn", roomForm.checkIn);
      formBody.append("checkOut", roomForm.checkOut);
      formBody.append("totalPrice", totalRoomInvoice);

      const res = await fetch("http://localhost:8080/Hotel-System/api/book/room", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });
      const data = await res.json();
      alert(res.ok && data.status === "success" ? `🎉 Reservation Confirmed!\n${data.message}` : `⚠️ Collision Warning: ${data.message}`);
    } catch (err) { alert("❌ Backend communication failure updating ledger."); }
  };

  const handleHallSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields(hallForm, false)) return;

    try {
      const formBody = new URLSearchParams();
      formBody.append("clientName", hallForm.clientName.trim());
      formBody.append("clientEmail", hallForm.clientEmail.trim());
      formBody.append("clientPhone", hallForm.clientPhone.replace(/[^0-9]/g, ""));
      formBody.append("selectedVenueName", hallForm.selectedVenueName);
      formBody.append("eventType", hallForm.eventType);
      formBody.append("eventDate", hallForm.eventDate);
      formBody.append("days", hallForm.days);
      formBody.append("totalPrice", totalHallInvoice);

      const res = await fetch("http://localhost:8080/Hotel-System/api/book/hall", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });
      const data = await res.json();
      alert(res.ok && data.status === "success" ? `🏛️ Event Venue Logged!\n${data.message}` : `⚠️ Booking Error: ${data.message}`);
    } catch (err) { alert("❌ Connection failure pointing to Hall Servlet context."); }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 space-y-8 font-sans">
      
      {/* Switch Control Navigation Tabs Header */}
      <div className="flex space-x-4 bg-gray-200/60 p-1.5 rounded-xl w-fit mx-auto shadow-inner">
        <button onClick={() => { setActiveTab("rooms"); setErrors({}); }} className={`px-8 py-2.5 rounded-lg text-sm font-bold transition ${activeTab === "rooms" ? "bg-white text-amber-700 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
          🛏️ Reserve Luxury Suites
        </button>
        <button onClick={() => { setActiveTab("halls"); setErrors({}); }} className={`px-8 py-2.5 rounded-lg text-sm font-bold transition ${activeTab === "halls" ? "bg-white text-amber-700 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
          🏛️ Lease Event Spaces
        </button>
      </div>

      {activeTab === "rooms" ? (
        <form onSubmit={handleRoomSubmit} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2 border-gray-100">Suite Lodging Details</h2>
          
          {/* Parent Room Category Select Menu Dropdown */}
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Select Suite Layout Class</label>
            <select value={selectedRoomName} onChange={(e) => setSelectedRoomName(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 font-medium">
              {[...new Set(dbRooms.map(r => r.name))].map((name, idx) => (
                <option key={idx} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* DYNAMICALLY UNLOCKED OPTIONS CONTROL SUB-GRID PANELS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Climate Module Options</label>
              <select value={roomForm.type} onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 font-medium">
                {dynamicAvailableTypes.map((t, idx) => (
                  <option key={idx} value={t}>{t === "AC" ? "Air Conditioned (AC)" : "Standard Ventilation (Non-AC)"}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Beds Counter Matrix Configs</label>
              <select value={roomForm.beds} onChange={(e) => setRoomForm({ ...roomForm, beds: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 font-medium">
                {dynamicAvailableBeds.map((b, idx) => (
                  <option key={idx} value={b}>{b} Mapped Bed Variant(s)</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Check In</label>
              <input type="date" min={new Date().toISOString().split("T")[0]} value={roomForm.checkIn} onChange={e => setRoomForm({...roomForm, checkIn: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${errors.checkIn ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} required />
              {errors.checkIn && <p className="text-[11px] text-red-500 mt-1 font-bold">{errors.checkIn}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Check Out</label>
              <input type="date" min={roomForm.checkIn || new Date().toISOString().split("T")[0]} value={roomForm.checkOut} onChange={e => setRoomForm({...roomForm, checkOut: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${errors.checkOut ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} required />
              {errors.checkOut && <p className="text-[11px] text-red-500 mt-1 font-bold">{errors.checkOut}</p>}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div>
              <input type="text" placeholder="Guest Full Name" value={roomForm.guestName} onChange={e => setRoomForm({...roomForm, guestName: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} required />
              {errors.name && <p className="text-[11px] text-red-500 mt-1 font-bold">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input type="email" placeholder="Email Address" value={roomForm.guestEmail} onChange={e => setRoomForm({...roomForm, guestEmail: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} required />
                {errors.email && <p className="text-[11px] text-red-500 mt-1 font-bold">{errors.email}</p>}
              </div>
              <div>
                <input type="tel" placeholder="10-Digit Mobile" value={roomForm.guestPhone} onChange={e => setRoomForm({...roomForm, guestPhone: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} required />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1 font-bold">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex justify-between items-center">
            <span className="text-xs text-amber-800 font-bold">Total Stay Invoice: (₹{roomPricePerNight.toLocaleString("en-IN")}/nt × {calculateRoomNights()} nights)</span>
            <span className="text-2xl font-black text-amber-900">₹{totalRoomInvoice.toLocaleString("en-IN")}</span>
          </div>
          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition shadow-sm">Confirm Room Reservation</button>
        </form>
      ) : (
        // BANQUET HALLS INTERFACE VIEW
        <form onSubmit={handleHallSubmit} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-2 border-gray-100">Banquet Event Contracting</h2>
          
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Select Event Venue Arena</label>
            <select value={hallForm.selectedVenueName} onChange={(e) => setHallForm({ ...hallForm, selectedVenueName: e.target.value })} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 font-medium">
              {VENUES_DATA.map(h => <option key={h.id} value={h.name}>{h.name} ({h.pricing})</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-400 block mb-1">Event Category Type</label>
              <select value={hallForm.eventType} onChange={e => setHallForm({...hallForm, eventType: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50">
                <option value="Wedding Ceremony">Wedding Ceremony</option>
                <option value="Corporate Tech Keynote">Corporate Tech Keynote</option>
                <option value="Exotic Birthday Celebration">Exotic Birthday Celebration</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">Lease Days</label>
              <input type="number" min="1" value={hallForm.days} onChange={e => setHallForm({...hallForm, days: e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Target Event Execution Date</label>
            <input type="date" min={new Date().toISOString().split("T")[0]} value={hallForm.eventDate} onChange={e => setHallForm({...hallForm, eventDate: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${errors.eventDate ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} required />
            {errors.eventDate && <p className="text-[11px] text-red-500 mt-1 font-bold">{errors.eventDate}</p>}
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div>
              <input type="text" placeholder="Client Organizer Name" value={hallForm.clientName} onChange={e => setHallForm({...hallForm, clientName: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} required />
              {errors.name && <p className="text-[11px] text-red-500 mt-1 font-bold">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input type="email" placeholder="Contact Email" value={hallForm.clientEmail} onChange={e => setHallForm({...hallForm, clientEmail: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} required />
                {errors.email && <p className="text-[11px] text-red-500 mt-1 font-bold">{errors.email}</p>}
              </div>
              <div>
                <input type="tel" placeholder="Mobile Number" value={hallForm.clientPhone} onChange={e => setHallForm({...hallForm, clientPhone: e.target.value})} className={`w-full border rounded-lg p-2.5 text-sm ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} required />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1 font-bold">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex justify-between items-center">
            <span className="text-xs text-amber-800 font-bold">Total Venue Invoice: ({currentSelectedHall?.pricing} × {hallForm.days} day(s))</span>
            <span className="text-2xl font-black text-amber-900">₹{totalHallInvoice.toLocaleString("en-IN")}</span>
          </div>
          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition shadow-sm">Lock Event Space Contract</button>
        </form>
      )}
    </div>
  );
}