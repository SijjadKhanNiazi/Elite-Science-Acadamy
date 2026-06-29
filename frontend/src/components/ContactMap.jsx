// frontend/src/components/ContactMap.jsx
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactMap = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
          <div className="space-y-6 bg-gray-50 border border-gray-100 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Contact Information
            </h3>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <FaPhoneAlt size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-400">
                  Call Administrative Office
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  0333-1486786
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <FaEnvelope size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-400">
                  Official Inquiry Email
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  sijjadkhan603@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                <FaMapMarkerAlt size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-400">
                  Campus Location
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  Elite Science Academy, Mianwali, Punjab
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Redirect Card */}
          <div className="lg:col-span-2 w-full h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-slate-950 flex flex-col items-center justify-center relative group p-6 text-center">
            {/* Dark Grid Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>

            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
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
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Open Live Location Route
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
