import React from 'react'
import { useState } from "react";
import { Link } from "react-router";


// 🏆 THE 5 MAJOR FLAGSHIP FEATURES (Giant Magazine Layout)
const HERO_SHOWCASE = [
  {
    id: 1,
    badge: "Smart Accommodations",
    title: "The Presidential Voice-Automated Suite",
    subtitle: "Elite Tiers • Central AC • 24/7 Butler Access",
    desc: "Step into the absolute pinnacle of luxury. Our flagship suites are fully integrated with localized environmental smart-controls, master king bedding, deep marble therapeutic baths, and an independent private service portal linking you directly to dedicated estate concierges.",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=90",
    highlights: ["Voice Climate Control", "Private Balcony Pool", "Pre-stocked Premium Mini-bar"]
  },
  {
    id: 2,
    badge: "Royal Gatherings",
    title: "The Sapphire Grand Ballroom & Gardens",
    subtitle: "Full-Day Booking • Custom Stages • 1500+ Footprint",
    desc: "Whether executing a traditional royal marriage or staging a multi-national corporate keynote event, our palatial indoor ballrooms and adjoining Emerald Lawns provide complete event freedom. Features specialized acoustics, massive floating chandeliers, and dual master green rooms.",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=90",
    highlights: ["Pro Audio/Visual Array", "Alternating Indoor/Outdoor Zones", "Complete Day Buyouts"]
  },
  {
    id: 3,
    badge: "Advanced Logistics",
    title: "Subterranean Multi-Level Valet Parking",
    subtitle: "Secure Security Hub • Automated Lift Matrices • Ultra EV Stations",
    desc: "True luxury means peace of mind the second you arrive. Our high-tech subterranean parking garage features license-plate scanning, live mechanical elevators, 24/7 dedicated security patrols, and high-kilowatt EV charging terminals to process premium vehicle classes cleanly.",
    img: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=1200&q=90",
    highlights: ["Automated Vehicle Retrieval", "EV Fast-Charging Bays", "24/7 CCTV Monitoring"]
  },
  {
    id: 4,
    badge: "Infinite Relaxation",
    title: "The Horizon Pool & Therapeutic Wellness Spa",
    subtitle: "Thermal Pools • Aromatic Steam • Expert Massages",
    desc: "Escape the noise inside our climate-controlled horizon infinity pool that merges seamlessly into the coastal ocean skyline. Afterward, step into our thermal spa networks containing wood-lined saunas, hot stone relaxation chambers, and customized organic detox routines.",
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=90",
    highlights: ["Temperature-Controlled Water", "Private Deck Cabanas", "Certified Spa Practitioners"]
  },
  {
    id: 5,
    badge: "Fine Culinary Arts",
    title: "The Golden Leaf Michelin-Tier Restaurant",
    subtitle: "Ocean Balcony • Pre-Booking Required • World Flavors",
    desc: "Savor expertly composed platters prepared by internationally acclaimed culinary masters. Overlooking the ocean vantage points, the Golden Leaf blends authentic global practices with freshly caught coastal seafood configurations to deliver unmatched dining memories.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=90",
    highlights: ["Sommelier Curated Wine Cellar", "Private Chef Tables", "Scenic Sunset Exposures"]
  }
];

// 🔎 THE 12 EXTRA VARIETIES (Grid Layout Below)
const EXTRA_VARIETIES = [
  { id: 6, category: "Rooms", title: "Premium AC Twin Room", img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80" },
  { id: 7, category: "Rooms", title: "Standard Non-AC Comfort", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80" },
  { id: 8, category: "Rooms", title: "Executive Beachfront Villa", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80" },
  { id: 9, category: "Banquets", title: "Royal Emerald Garden Lawns", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80" },
  { id: 10, category: "Banquets", title: "Starlight Rooftop Vista", img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80" },
  { id: 11, category: "Banquets", title: "The Heritage Agro-Farm Estate", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" },
  { id: 12, category: "Amenities", title: "Fitness & Cardio Hub", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
  { id: 13, category: "Amenities", title: "Helipad Departure Deck", img: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=600&q=80" },
  { id: 14, category: "Amenities", title: "Kids Adventure Zone", img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80" },
  { id: 15, category: "Dining", title: "The Blue Lagoon Bar", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80" },
  { id: 16, category: "Dining", title: "Sunset Café Terraces", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" },
  { id: 17, category: "Dining", title: "24/7 Bakery & Confectionery", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" }
];

function Gallery() {



    return (
        <>
        <div className="bg-white min-h-screen pb-24">
      
      {/* 1. CINEMATIC OVERVIEW BANNER */}
      <div className="relative h-[60vh] sm:h-[75vh] flex items-center justify-center bg-gray-950 overflow-hidden mb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=90')" }}
        />
        <div className="relative z-10 text-center px-4 max-w-5xl space-y-6">
          <span className="text-amber-400 text-xs sm:text-sm tracking-[0.3em] uppercase font-bold block">The Grand Vista Lookbook</span>
          <h1 className="text-4xl sm:text-7xl font-serif text-white tracking-wide leading-tight">Engineering The 5-Star Experience</h1>
          <div className="w-20 h-[2px] bg-amber-500 mx-auto mt-4" />
        </div>
      </div>

      {/* 2. DYNAMIC BROADCAST STACKED EDITORIAL PAGES (The Top 5) */}
      <div className="space-y-32 sm:space-y-48 mb-32">
        {HERO_SHOWCASE.map((section, index) => {
          const isEven = index % 2 === 0;
          return (
            <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="w-full lg:w-3/5 group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-100 aspect-[16/10]">
                    <img src={section.img} alt={section.title} className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105" />
                    <div className="absolute top-6 left-6 bg-white/90 text-gray-900 text-[10px] tracking-widest font-bold px-4 py-2 uppercase rounded backdrop-blur-sm shadow-md">{section.badge}</div>
                  </div>
                </div>
                <div className="w-full lg:w-2/5 space-y-4 px-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 block">0{section.id} // Premium Tier</span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 tracking-wide leading-tight">{section.title}</h2>
                  <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase">{section.subtitle}</p>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">{section.desc}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <ul className="space-y-2">
                      {section.highlights.map((item, i) => (
                        <li key={i} className="flex items-center text-xs font-medium text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-3" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <hr className="max-w-7xl mx-auto border-gray-200 my-24" />

      {/* 3. ADDITIONAL RESORT ARCHIVES (The remaining 12 items) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-3xl font-serif text-gray-900 tracking-wide">More Property Collections</h2>
          <p className="text-gray-500 text-sm mt-1">A quick glance across our other premium zones, halls, and dining facilities.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {EXTRA_VARIETIES.map((item) => (
            <div key={item.id} className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square shadow-sm">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
              {/* Elegant Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block mb-1">{item.category}</span>
                <h4 className="text-white font-serif text-sm sm:text-base tracking-wide leading-snug">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MEGA CLOSING FOOTER STATEMENT */}
      <div className="max-w-6xl mx-auto px-4 mt-32">
        <div className="bg-gray-950 text-white rounded-3xl p-8 sm:p-20 relative overflow-hidden text-center space-y-6 shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="text-amber-400 text-xs tracking-widest uppercase font-semibold">Pre-Booking Gateways Open</span>
            <h2 className="text-3xl sm:text-5xl font-serif tracking-wide">Secure Advanced Priority Placement</h2>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">Guarantee specialized coastal layout suites, allocate individual multi-day grand ballrooms, or lock down dining schedules months in advance.</p>
            <div className="pt-4"><Link to="/book" className="inline-block bg-amber-600 text-white font-semibold text-sm tracking-wider uppercase px-8 py-4 rounded hover:bg-amber-700 transition duration-300">Initiate Elite Booking</Link></div>
          </div>
        </div>
      </div>

    </div> 
        </>
    )
}

export default Gallery
