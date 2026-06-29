// frontend/src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      {/* Visual Background Accent Details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-60 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full filter blur-3xl opacity-60 -ml-20 -mb-20"></div>

      <div className="max-w-5xl mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-white uppercase rounded-full"
            style={{ backgroundColor: "#F59E0B" }}
          >
            Admissions Open 2026
          </span>

          <h1
            className="text-4xl sm:text-6xl font-black tracking-tight mb-6"
            style={{ color: "#1E3A8A", fontFamily: "Poppins, sans-serif" }}
          >
            Empowering Female Minds <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
              Towards Academic Excellence
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
        >
          Mianwali's premier science institution dedicated to provide top-tier
          academic coaching, professional faculty layers, and structured
          preparation pipelines for board exams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <a
            href="#admission"
            className="w-full sm:w-auto px-8 py-4 font-bold text-white rounded-xl shadow-lg hover:bg-opacity-90 transition-all text-center"
            style={{ backgroundColor: "#1E3A8A" }}
          >
            Apply Online Now
          </a>
          <a
            href="#faculty"
            className="w-full sm:w-auto px-8 py-4 font-bold text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-all text-center"
          >
            Meet Our Instructors
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
