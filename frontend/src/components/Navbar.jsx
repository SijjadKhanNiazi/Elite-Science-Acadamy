// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#faculty", label: "Faculty" },
    { href: "#admission", label: "Admissions" },
    { href: "#about", label: "About Us" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(15,31,77,0.97)" : "#0F1F4D",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Top accent line — quiet signature detail */}
      <div
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #F59E0B 0%, #FCD34D 50%, #F59E0B 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Branding */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div
              className="hidden sm:flex h-11 w-11 items-center justify-center rounded-xl shadow-sm"
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)",
              }}
            >
              <span className="text-[#0F1F4D] font-black text-lg tracking-tight">
                ESA
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none">
                <span className="text-white">ELITE</span>{" "}
                <span style={{ color: "#F59E0B" }}>SCIENCE ACADEMY</span>
              </span>
              <p className="text-[11px] font-semibold text-blue-200/70 uppercase tracking-widest mt-0.5">
                Mianwali (Girls Campus)
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-blue-50/85 transition-colors group"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">
                  {link.label}
                </span>
                <span
                  className="absolute bottom-1 left-4 right-4 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                  style={{ backgroundColor: "#F59E0B" }}
                />
              </a>
            ))}
            <a
              href="#admission"
              className="ml-3 px-5 py-2.5 text-sm font-bold rounded-lg shadow-sm hover:shadow-md hover:brightness-105 transition-all"
              style={{ backgroundColor: "#F59E0B", color: "#0F1F4D" }}
            >
              Apply Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1F4D] rounded-lg p-1.5 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden border-t border-white/10 shadow-inner overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "#0F1F4D" }}
      >
        <div className="px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-blue-50/85 font-medium hover:bg-white/5 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#admission"
            onClick={() => setIsOpen(false)}
            className="block mt-2 py-3 px-3 text-center font-bold rounded-lg shadow-sm"
            style={{ backgroundColor: "#F59E0B", color: "#0F1F4D" }}
          >
            Apply Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
