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

          {/* Embedded Google Maps Frame for Local Navigation */}
          <div className="lg:col-span-2 w-full h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <iframe
              title="Elite Science Academy Mianwali Location Map"
              src="https://www.google.com/maps/place/Mianwali,+Pakistan/@32.5828774,71.5141356,13z/data=!3m1!4b1!4m6!3m5!1s0x39271820c5ae398d:0x93a7da7672fc2613!8m2!3d32.5839229!4d71.5370297!16zL20vMDUyZGR4?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
