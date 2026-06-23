import { Link } from "react-router";

export const VENUES_DATA = [
  {
    id: 1,
    name: "The Sapphire Grand Ballroom",
    category: "Indoor Hall",
    capacity: "500 - 800 Guests",
    pricing: "₹1,50,000 / Day",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    features: ["Centralized AC", "Integrated Sound & Stage", "Chandelier Lighting", "Two Green Rooms"],
    description: "Our crown jewel indoor hall. Fully air-conditioned with soundproofing, magnificent high ceilings, and adjustable ambient lighting configurations perfect for royal weddings and corporate galas."
  },
  {
    id: 2,
    name: "The Royal Emerald Lawns",
    category: "Outdoor Garden",
    capacity: "1000 - 1500 Guests",
    pricing: "₹2,00,000 / Day",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    features: ["Open-air Catering Space", "Valet Parking Access", "Water Fountain Backdrop", "Power Backup Setup"],
    description: "Massive, beautifully manicured outdoor garden lawns designed for grand open-air receptions, traditional wedding ceremonies, and large-scale corporate exhibitions under the stars."
  },
  {
    id: 3,
    name: "Starlight Vista Rooftop Lounge",
    category: "Rooftop Lounge",
    capacity: "150 - 250 Guests",
    pricing: "₹85,000 / Day",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
    features: ["Infinite Ocean View", "Built-in Luxury Bar", "DJ Deck Ready", "Modern Lounge Seating"],
    description: "Elevate your private cocktail parties, ring ceremonies, or corporate networking nights on our premium open-sky rooftop lounge, offering panoramic sunset views over the coastal line."
  },
  {
    id: 4,
    name: "The Grand Vista Agro-Farm Estate",
    category: "Off-site Heritage Farm",
    capacity: "2000 - 4000 Guests",
    pricing: "₹3,50,000 / Day",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    features: ["Unlimited Free Parking", "Eco-friendly Traditional Decor", "Cottage Stay Units", "Massive Main stage"],
    description: "Located just 10 minutes outside our main hotel property, this sprawling green country farmhouse offers a massive open landscape for mega-festivals, destination rustic weddings, and heavy-crowd gatherings."
  }
];

function Halls() {
    return (
        <>
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-amber-700 font-semibold tracking-wider uppercase text-sm">Event Spaces & Banquets</span>
          <h1 className="text-3xl sm:text-5xl font-serif text-gray-900 tracking-wide">Host Unforgettable Events</h1>
          <p className="text-gray-500">From majestic indoor ballrooms to sprawling open-air country farms, pick the space matching your guest footprint.</p>
        </div>

        {/* Venues Stack Layout (Big and Beautiful alternating list) */}
        <div className="space-y-20">
          {VENUES_DATA.map((venue, index) => (
            <div 
              key={venue.id}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Left Column: Image with Category Tag */}
              <div className="w-full lg:w-1/2 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transform hover:scale-105 transition duration-500" />
                <span className="absolute top-4 left-4 bg-gray-900/90 text-white text-xs px-3 py-1.5 rounded-full font-semibold uppercase tracking-wider backdrop-blur-sm">
                  {venue.category}
                </span>
              </div>

              {/* Right Column: Venue Specs */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 font-bold">{venue.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
                    <span>👥 {venue.capacity}</span>
                    <span className="text-amber-700 font-semibold">💰 {venue.pricing}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {venue.description}
                </p>

                {/* Key Amenity Features Grid */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Venue Highlights</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {venue.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-xs text-gray-700 font-medium">
                        <span className="text-amber-600 mr-2">✔</span> {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <Link 
                    to="/book" 
                    className="inline-block bg-amber-700 text-white font-semibold px-6 py-2.5 rounded hover:bg-amber-800 transition shadow"
                  >
                    Request Booking Quote
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>  
        </>
    )
}

export default Halls
