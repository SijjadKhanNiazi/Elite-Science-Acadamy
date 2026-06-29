// frontend/src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FacultyList from "../components/FacultyList";
import AdmissionForm from "../components/AdmissionForm";
import ContactMap from "../components/ContactMap";

const Home = () => {
  return (
    <div className="min-h-screen bg-lightGray font-inter">
      <Navbar />
      <Hero />
      <FacultyList />
      <AdmissionForm />
      <ContactMap />
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm border-t border-gray-800">
        <p>© 2026 Elite Science Academy (Girls Campus). All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
