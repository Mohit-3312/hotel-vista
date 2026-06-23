import React from 'react'
import { useState } from "react";

function Contact() {

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Reservations",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let localErrors = {};
    
    // 1. Name validation: Only letters/spaces AND must be at least 3 characters long
  const nameRegex = /^[A-Za-z\s]+$/;
  const trimmedName = formData.name.trim();

  if (trimmedName.length < 3) {
    localErrors.name = "Names must be at least 3 characters long.";
  } else if (!nameRegex.test(trimmedName)) {
    localErrors.name = "Names can only contain alphabetic letters and spaces.";
  }

    // 2. Phone validation: Strict 10-digit check
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      localErrors.phone = "Please enter a valid 10-digit mobile number.";
    }

    // 3. Email validation: Proper syntax layout checking
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      localErrors.email = "Please specify a real structural email address (e.g. name@domain.com).";
    }

    setErrors(localErrors);
    // Returns true if there are absolutely no error keys present
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    try {
      // Create standard URL-encoded parameters matching what request.getParameter() expects in Java
      const formBody = new URLSearchParams();
      formBody.append("name", formData.name);
      formBody.append("email", formData.email);
      formBody.append("phone", formData.phone);
      formBody.append("department", formData.department);
      formBody.append("message", formData.message);

      // Send the asynchronous network request to Tomcat
      const response = await fetch("http://localhost:8080/Hotel-System/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        alert(`🎉 Success: ${data.message}`);
        // Reset the frontend form inputs cleanly
        setFormData({ name: "", email: "", phone: "", department: "Reservations", message: "" });
        setErrors({});
      } else {
        alert(`⚠️ Server Error: ${data.message || "Submission failed."}`);
      }
    } catch (error) {
      console.error("Network Link Error:", error);
      alert("❌ Could not connect to the backend server. Make sure Tomcat is running!");
    }
  }
};

    return (
        <>
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-700 font-semibold tracking-widest uppercase text-xs block">24/7 Guest Concierge</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 tracking-wide">Connect With Our Estate</h1>
          <p className="text-gray-500 text-sm">
            Have questions regarding suite allocations or multi-day banquet buyouts? Reach out to our specialized resort cells.
          </p>
        </div>

        {/* Form Layout Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-2 bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 tracking-wide">Send An Electronic Memorandum</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* NAME FIELD */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">Full Legal Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. John Doe"
                    className={`w-full bg-white border rounded-lg p-3 text-sm focus:outline-none transition ${
                      errors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-amber-700"
                    }`} 
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {errors.name}</p>}
                </div>

                {/* EMAIL FIELD */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">Email Address</label>
                  <input 
                    type="text" // Changed to text to override default HTML5 layout blocks for cleaner custom error display
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className={`w-full bg-white border rounded-lg p-3 text-sm focus:outline-none transition ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-amber-700"
                    }`} 
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* PHONE FIELD */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">Contact Number</label>
                  <input 
                    type="text" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="9876543210"
                    className={`w-full bg-white border rounded-lg p-3 text-sm focus:outline-none transition ${
                      errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-amber-700"
                    }`} 
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">⚠️ {errors.phone}</p>}
                </div>

                {/* DEPARTMENT DROP SELECT */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">Target Department</label>
                  <select 
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-700 transition text-gray-700"
                  >
                    <option value="Reservations">Room Reservations & Suites</option>
                    <option value="Banquets">Banquet & Event Management</option>
                    <option value="VIP Concierge">VIP Guest Relations</option>
                    <option value="Logistics">Valet & Helicopter Logistics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">Detailed Message</label>
                <textarea 
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Outline your requirements here..."
                  className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-700 transition resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full sm:w-auto bg-amber-700 text-white font-semibold text-sm tracking-wider uppercase px-8 py-3.5 rounded-lg hover:bg-amber-800 transition shadow duration-200"
              >
                Transmit Inquiry
              </button>
            </form>
          </div>

          {/* RIGHT SIDEBAR MODULES */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-serif text-gray-900 font-bold border-b border-gray-100 pb-2">Direct Channels</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="block text-xs text-gray-400 uppercase font-semibold">Front Desk Operations</span>
                  <span className="text-gray-700 font-medium">📞 +1 (555) 019-2834</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 uppercase font-semibold">Electronic Mail Gateways</span>
                  <span className="text-amber-700 font-medium block">concierge@grandvista.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
        </>
    )
}

export default Contact
