// frontend/src/components/Navbar.jsx
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Branding */}
          <div className="flex-shrink-0">
            <span
              className="text-xl sm:text-2xl font-extrabold tracking-tight"
              style={{ color: "#1E3A8A" }}
            >
              ELITE <span style={{ color: "#F59E0B" }}>SCIENCE ACADEMY</span>
            </span>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Mianwali (Girls Campus)
            </p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-medium">
            <a
              href="#home"
              className="hover:text-amber-500 transition-colors text-gray-700"
            >
              Home
            </a>
            <a
              href="#faculty"
              className="hover:text-amber-500 transition-colors text-gray-700"
            >
              Faculty
            </a>
            <a
              href="#admission"
              className="hover:text-amber-500 transition-colors text-gray-700"
            >
              Admissions
            </a>
            <a
              href="#about"
              className="hover:text-amber-500 transition-colors text-gray-700"
            >
              About Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 font-medium"
          >
            Home
          </a>
          <a
            href="#faculty"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 font-medium"
          >
            Faculty
          </a>
          <a
            href="#admission"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 font-medium"
          >
            Admissions
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700 font-medium"
          >
            About Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
