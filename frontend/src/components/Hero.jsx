// frontend/src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Rotating set of education-themed background photos.
// These are stable, permanent Unsplash CDN URLs (not the deprecated
// source.unsplash.com redirect service), so they won't go stale.
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80", // students in classroom
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80", // science lab
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1920&q=80", // students studying together
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80", // library / books
];

const ROTATE_INTERVAL_MS = 6000;

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);
  // Tracks load result per image: 'loaded' | 'error' | undefined (pending)
  const [imageStatus, setImageStatus] = useState({});

  // Preload every image once. If a URL ever fails (network issue,
  // dead link, offline), we simply never mark it 'loaded' — the
  // gradient layer underneath stays visible instead of a broken image.
  useEffect(() => {
    BACKGROUND_IMAGES.forEach((src, idx) => {
      const img = new window.Image();
      img.onload = () =>
        setImageStatus((prev) => ({ ...prev, [idx]: "loaded" }));
      img.onerror = () =>
        setImageStatus((prev) => ({ ...prev, [idx]: "error" }));
      img.src = src;
    });
  }, []);

  // Rotate through the image set on a timer.
  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const anyImageLoaded = Object.values(imageStatus).includes("loaded");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{ backgroundColor: "#0F1F4D" }}
    >
      {/* Background layer — gradient renders immediately (never
          broken / never blank). Photos crossfade on top only once
          each has confirmed it loaded successfully; a failed URL
          simply never appears. */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1E3A8A 0%, #16306f 50%, #0F1F4D 100%)",
          }}
        />
        {BACKGROUND_IMAGES.map((src, idx) => (
          <div
            key={src}
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
            style={{
              opacity:
                idx === imageIndex && imageStatus[idx] === "loaded" ? 1 : 0,
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        {/* Navy wash so text stays legible over any photo */}
        <div
          className="absolute inset-0"
          style={{
            background: anyImageLoaded
              ? "linear-gradient(180deg, rgba(15,31,77,0.86) 0%, rgba(15,31,77,0.78) 45%, rgba(15,31,77,0.92) 100%)"
              : "transparent",
          }}
        />
      </div>

      {/* Visual Background Accent Details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full filter blur-3xl -ml-20 -mb-20" />

      {/* Subtle dot-grid texture for depth, kept quiet */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft ring accent behind the badge — quiet signature detail */}
      <div
        className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Rotation indicator dots — small, quiet, bottom of hero */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {BACKGROUND_IMAGES.map((_, idx) => (
          <span
            key={idx}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: idx === imageIndex ? "20px" : "6px",
              backgroundColor:
                idx === imageIndex ? "#F59E0B" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-white uppercase rounded-full shadow-sm"
            style={{ backgroundColor: "#F59E0B" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Admissions Open 2026
          </span>

          <h1
            className="text-4xl sm:text-6xl font-black tracking-tight mb-6 text-white drop-shadow-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Empowering Female Minds <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
              Towards Academic Excellence
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-blue-50/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
        >
          Mianwali's premier science institution dedicated to provide top-tier
          academic coaching, professional faculty layers, and structured
          preparation pipelines for board exams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14"
        >
          <a
            href="#admission"
            className="w-full sm:w-auto px-8 py-4 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-center"
            style={{ backgroundColor: "#F59E0B", color: "#1E3A8A" }}
          >
            Apply Online Now
          </a>
          <a
            href="#faculty"
            className="w-full sm:w-auto px-8 py-4 font-bold text-white bg-white/10 border border-white/30 rounded-xl shadow-sm backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 text-center"
          >
            Meet Our Instructors
          </a>
        </motion.div>

        {/* Quiet trust strip — reinforces credibility without new claims */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3 pt-8 border-t border-white/20"
        >
          {[
            "Experienced Faculty",
            "Board Exam Focused",
            "Girls-Only Campus",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm font-semibold text-blue-50/85"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#F59E0B" }}
              />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
