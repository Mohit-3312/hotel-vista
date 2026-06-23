import React from 'react'
import { Link } from "react-router";

function Home() {
    return (
        <>
    <div className="bg-white text-gray-800">
      
      {/* 1. HERO SECTION (The Big Opener) */}
      <header className="relative h-[85vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        {/* Visual background placeholder - Replace URL with your local hero banner later */}
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80')" }}></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <span className="text-amber-400 tracking-widest uppercase font-semibold text-sm sm:text-base block">Welcome to Luxury</span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-wide leading-tight">
            Your Sanctuary Outside <br className="hidden sm:inline" /> The Ordinary
          </h1>
          <p className="text-gray-200 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Experience premium staycations, dynamic banquet configurations, and fine coastal dining at Grand Vista.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/book" className="bg-amber-700 text-white px-8 py-3.5 rounded-md font-semibold hover:bg-amber-800 transition shadow-lg text-center">
              Check Availability
            </Link>
            <Link to="/rooms" className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-md font-semibold hover:bg-white hover:text-gray-900 transition text-center">
              Explore Suites
            </Link>
          </div>
        </div>
      </header>

      {/* 2. INLINE QUICK BOOKING WIDGET (Adds great functionality & space) */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end border border-gray-100">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">Check In</label>
            <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-amber-700" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">Check Out</label>
            <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-amber-700" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wider">Guests</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-amber-700">
              <option>1 Guest</option>
              <option defaultValue>2 Guests</option>
              <option>3+ Guests</option>
            </select>
          </div>
          <Link to="/book" className="w-full bg-amber-700 text-white text-center py-3.5 rounded font-semibold hover:bg-amber-800 transition">
            Search Rooms
          </Link>
        </div>
      </section>

      {/* 3. THE EXPERIENCE (Spacious Intro Block) */}
      <section className="py-20 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-sm">The Grand Vista Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-wide">Where Class Architecture Meets Unmatched Comfort</h2>
            <p className="text-gray-600 leading-relaxed">
              Nestled right along the vibrant coastline, our property features state-of-the-art designs engineered for supreme serenity. We don't just check you into a room; we offer custom tailored hospitality matching your exact lifestyle choices.
            </p>
            <p className="text-gray-600 leading-relaxed hidden sm:block">
              From our organic farm-to-table breakfast systems to deeply intuitive smart-room features managed straight from your device, luxury flows naturally here.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" alt="Hotel room detail" className="rounded-lg shadow-md w-full h-64 object-cover mt-8" />
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80" alt="Hotel spa lounge" className="rounded-lg shadow-md w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      {/* 4. SERVICES SNAPSHOT (Using our HashLinks!) */}
      <section className="bg-gray-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-amber-700 font-semibold tracking-wider uppercase text-sm">Resort Offerings</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-wide">More Than Just a Place to Sleep</h2>
            <p className="text-gray-500">Explore our dedicated modules crafted perfectly for events, personal wellness, and unforgettable celebrations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Suites */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="text-3xl">🛏️</div>
                <h3 className="text-xl font-bold font-serif text-gray-900">Luxury Rooms & Suites</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Ocean views, premium bedding configurations, automated climate control, and fully managed butler options.</p>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <Link to="/rooms" className="text-amber-700 text-sm font-semibold hover:text-amber-800 transition block">View Accommodations &rarr;</Link>
              </div>
            </div>

            {/* Card 2: Banquet Halls */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="text-3xl">🏛️</div>
                <h3 className="text-xl font-bold font-serif text-gray-900">Royal Banquet Configurations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Perfect setups spanning across wedding halls, business meets, corporate seminars, and private parties.</p>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <Link smooth to="/halls#wedding" className="text-amber-700 text-sm font-semibold hover:text-amber-800 transition block">Explore Event Spaces &rarr;</Link>
              </div>
            </div>

            {/* Card 3: Wellness */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col justify-between">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="text-3xl">🧘</div>
                <h3 className="text-xl font-bold font-serif text-gray-900">Spa & Infinite Wellness</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Detoxify within therapeutic sauna systems, customized thermal pools, and healing packages built for relaxation.</p>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <span className="text-gray-400 text-sm block">Available for Checked-In Guests</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GUEST TESTIMONIAL BLOCK (Adds massive space and trust) */}
      <section className="py-20 sm:py-32 max-w-5xl mx-auto px-4 text-center space-y-6">
        <div className="text-amber-500 text-4xl">★★★★★</div>
        <blockquote className="text-2xl sm:text-3xl font-serif italic text-gray-900 px-4 leading-normal">
          "Our wedding banquet execution at Grand Vista was sheer magic. The staff structured the audio-visuals, the private food lounge, and guest transit perfectly. A stellar college project-tier execution!"
        </blockquote>
        <div>
          <h4 className="font-bold text-gray-900 tracking-wide uppercase text-sm">Emily & David Miller</h4>
          <span className="text-xs text-gray-400">Married in the Sapphire Hall, Oct 2025</span>
        </div>
      </section>
      
    </div>
        </>
    )
}

export default Home
