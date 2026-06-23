import React from 'react'
import { Link } from "react-router";

function Footer() {
    return (
        <>
    <footer className="bg-gray-50 text-gray-600 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12 pb-12 border-b border-gray-200">
          
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="text-2xl font-bold tracking-wide text-amber-700 font-serif">
              GRAND VISTA <span className="text-gray-500 font-sans text-xs block tracking-widest uppercase font-semibold">Resort & Spa</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Experience the epitome of luxury, elegant hospitality, and world-class service. Whether booking a weekend getaway, a royal banquet hall, or a corporate retreat, we craft memories that last a lifetime.
            </p>
            {/* Social Icons Section */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-gray-200 hover:bg-amber-700 hover:text-white rounded-full text-gray-600 transition duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="p-2 bg-gray-200 hover:bg-amber-700 hover:text-white rounded-full text-gray-600 transition duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.022-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.225.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.399 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.225v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857-.182-.466-.399-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.802a3.333 3.333 0 110 6.666 3.333 3.333 0 010-6.666zm5.338-3.205a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-amber-700 uppercase">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber-700 transition">Home</Link></li>
              <li><Link to="/gallery" className="hover:text-amber-700 transition">Showcase & Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-amber-700 transition">Contact & Support</Link></li>
              <li><Link to="/book" className="hover:text-amber-700 transition">Book Staying</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-amber-700 uppercase">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/rooms" className="hover:text-amber-700 transition">Luxury Suites</Link></li>
              <li><Link to="/halls" className="hover:text-amber-700 transition">Banquet Halls</Link></li>
              <li><a href="#" className="hover:text-amber-700 transition">Spa & Wellness</a></li>
              <li><a href="#" className="hover:text-amber-700 transition">Fine Dining Restro</a></li>
              <li><a href="#" className="hover:text-amber-700 transition">Fine Dining Restro</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-amber-700 uppercase">Newsletter</h3>
            <p className="text-xs text-gray-500">Subscribe for premium offers and deals.</p>
            <form className="mt-2 flex max-w-md">
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-l-md text-gray-800 focus:outline-none focus:border-amber-700"
              />
              <button
                type="submit"
                className="bg-amber-700 text-white px-4 py-2 text-sm font-semibold rounded-r-md hover:bg-amber-800 transition"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section: Copyright & Contact Meta */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} Grand Vista Resort. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 md:space-x-6 justify-center text-gray-500">
            <span>📍 101 Luxury Boulevard, Coastal View</span>
            <span>📞 +1 (555) 019-2834</span>
            <span>✉️ reservations@grandvista.com</span>
          </div>
        </div>

      </div>
    </footer>
        </>
    )
}

export default Footer
