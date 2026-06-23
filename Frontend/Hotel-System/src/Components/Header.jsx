import { useState } from "react";
import { Link, NavLink } from "react-router";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [] = useState("");

    const linkStyles = ({ isActive }) =>
    isActive 
      ? "text-amber-700 font-semibold border-b-2 border-amber-700 pb-1 transition duration-150" 
      : "text-gray-600 hover:text-amber-700 transition duration-150";

  const mobileLinkStyles = ({ isActive }) =>
    isActive
      ? "block text-amber-700 font-semibold bg-amber-50 px-3 py-2 rounded-md"
      : "block text-gray-700 hover:text-amber-700 hover:bg-gray-100 px-3 py-2 rounded-md";

    return (
        <>
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Section (Keep as regular Link so it doesn't style like a menu item) */}
          <div className="shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-wide text-amber-700 font-serif">
              GRAND VISTA <span className="text-gray-800 font-sans text-sm block tracking-widest uppercase font-semibold">Resort & Spa</span>
            </Link>
          </div>

          {/* Desktop Navigation using NavLink */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <NavLink to="/" end className={linkStyles}>Home</NavLink>
            <NavLink to="/rooms" className={linkStyles}>Rooms & Suites</NavLink>
            <NavLink to="/halls" className={linkStyles}>Banquet Halls</NavLink>
            <NavLink to="/gallery" className={linkStyles}>Showcase</NavLink>
            <NavLink to="/contact" className={linkStyles}>Contact</NavLink>
            
            {/* Call to Action Button */}
            <Link 
              to="/book" 
              className="bg-amber-700 text-white px-5 py-2.5 rounded-md hover:bg-amber-800 transition duration-200 font-semibold"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-amber-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Options */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4 space-y-1 font-medium">
          <NavLink to="/" end onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Home</NavLink>
          <NavLink to="/rooms" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Rooms & Suites</NavLink>
          <NavLink to="/halls" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Banquet Halls</NavLink>
          <NavLink to="/gallery" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Showcase</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className={mobileLinkStyles}>Contact</NavLink>
          <Link 
            to="/book" 
            onClick={() => setIsOpen(false)} 
            className="block text-center bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 mt-4"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
        </>
    )
}

export default Header
