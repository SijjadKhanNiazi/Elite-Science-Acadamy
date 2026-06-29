// frontend/src/components/ContactMap.jsx
import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const ContactMap = () => {
  return (
    <section
      id="about"
      className="relative py-20 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)",
      }}
    >
      {/* Quiet background accents — echoes Hero / AdmissionForm language */}
      <div className="absolute top-0 right-0 w-[420px] h-[300px] bg-blue-200/30 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[280px] bg-amber-100/40 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3.5 py-1 mb-4 text-[11px] font-bold tracking-widest text-amber-700 uppercase rounded-full bg-amber-100">
            We're Here to Help
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#1E3A8A" }}
          >
            Connect With Our Campus
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have questions? Visit our campus management deck or contact our
            administrative line directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Informational Credentials Card */}
          <div className="space-y-5 bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-5 rounded-full"
                style={{ backgroundColor: "#1E3A8A" }}
              />
              Contact Information
            </h3>

            {/* Phone — tap to call */}
            <a
              href="tel:+923331486786"
              className="flex items-center space-x-4 -mx-2 px-2 py-2 rounded-xl transition-colors duration-200 hover:bg-amber-50 group"
            >
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl group-hover:scale-105 transition-transform duration-200 shrink-0">
                <FaPhoneAlt size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Call Administrative Office
                </p>
                <p
                  className="text-sm font-semibold group-hover:underline"
                  style={{ color: "#1E3A8A" }}
                >
                  0333-1486786
                </p>
              </div>
              <FaArrowRight
                size={12}
                className="text-amber-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0"
              />
            </a>

            {/* Email — tap to compose */}
            <a
              href="mailto:sijjadkhan603@gmail.com"
              className="flex items-center space-x-4 -mx-2 px-2 py-2 rounded-xl transition-colors duration-200 hover:bg-blue-50 group"
            >
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-105 transition-transform duration-200 shrink-0">
                <FaEnvelope size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Official Inquiry Email
                </p>
                <p className="text-sm font-semibold text-gray-800 group-hover:underline truncate">
                  sijjadkhan603@gmail.com
                </p>
              </div>
              <FaArrowRight
                size={12}
                className="text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0"
              />
            </a>

            {/* Address — tap to open in maps */}
            <a
              href="https://www.google.com/maps/place//@32.5827836,71.5335498,21z/data=!4m6!1m5!3m4!2zMzLCsDM0JzU3LjkiTiA3McKwMzInMDEuMyJF!8m2!3d32.582739!4d71.533683?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 -mx-2 px-2 py-2 rounded-xl transition-colors duration-200 hover:bg-red-50 group"
            >
              <div className="p-3 bg-red-100 text-red-600 rounded-xl group-hover:scale-105 transition-transform duration-200 shrink-0">
                <FaMapMarkerAlt size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Campus Location
                </p>
                <p className="text-sm font-semibold text-gray-800 group-hover:underline">
                  Elite Science Academy, Mianwali, Punjab
                </p>
              </div>
              <FaArrowRight
                size={12}
                className="text-red-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0"
              />
            </a>

            {/* Quiet hint that these are tappable */}
            <p className="text-[11px] text-gray-400 pt-1 flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 rounded-full bg-gray-300" />
              Tap any item above to call, email, or get directions
            </p>
          </div>

          {/* Interactive Map Visual Redirect Card */}
          <div className="lg:col-span-2 w-full h-80 rounded-2xl overflow-hidden shadow-md border border-slate-800 bg-slate-950 flex flex-col items-center justify-center relative group p-6 text-center">
            {/* Dark Grid Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

            {/* Ambient glow that grows on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Pulsing location ping */}
            <div className="absolute top-6 right-6 flex items-center gap-2 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live Location
            </div>

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-500/20 group-hover:scale-110 group-hover:bg-amber-500/15 transition-all duration-300">
                <FaMapMarkerAlt size={28} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Find Us on Google Maps
                </h3>
                <p className="text-slate-400 max-w-sm mx-auto text-sm">
                  Click below to launch the live navigation route directly to
                  Elite Science Academy in your Maps application.
                </p>
              </div>

              <a
                href="https://www.google.com/maps/place//@32.5827836,71.5335498,21z/data=!4m6!1m5!3m4!2zMzLCsDM0JzU3LjkiTiA3McKwMzInMDEuMyJF!8m2!3d32.582739!4d71.533683?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Open Live Location Route
                <FaArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
