// frontend/src/components/AdmissionForm.jsx
import React, { useState } from "react";
import API from "../api/axios";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    grade: "6th",
    group: "General (Middle School)",
    phone: "",
    address: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, message: "" });

    try {
      const response = await API.post("/admissions", formData);
      if (response.data.success) {
        setStatus({
          loading: false,
          success: true,
          message: "Your admission form has been submitted successfully.",
        });
        // Clear Form after successful entry
        setFormData({
          studentName: "",
          fatherName: "",
          grade: "6th",
          group: "General (Middle School)",
          phone: "",
          address: "",
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 hover:border-gray-300";

  const labelClasses =
    "block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5";

  return (
    <section
      id="admission"
      className="relative py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 55%, #E0E7FF 100%)",
      }}
    >
      {/* Quiet background accents to echo Hero's visual language */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-200/40 rounded-full filter blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-amber-100/40 rounded-full filter blur-3xl opacity-50 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 mb-4 text-[11px] font-bold tracking-widest text-amber-700 uppercase rounded-full bg-amber-100">
            Step Into Your Future
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#1E3A8A" }}
          >
            Online Admission Registration
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Secure your seat at Elite Science Academy by submitting the form
            below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-6"
        >
          {status.message && (
            <div
              role="status"
              className={`flex items-start gap-3 p-4 rounded-xl text-sm font-semibold animate-[fadeIn_0.3s_ease-out] ${
                status.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                  status.success
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {status.success ? "✓" : "!"}
              </span>
              <span>{status.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>
                Student Name <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                name="studentName"
                placeholder="Full name as per CNIC / B-Form"
                value={formData.studentName}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>
                Father Name <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                placeholder="Father's full name"
                value={formData.fatherName}
                onChange={handleChange}
                required
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Select Grade / Class</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className={`${inputClasses} cursor-pointer`}
              >
                <optgroup label="Middle School">
                  <option value="6th">6th Class</option>
                  <option value="7th">7th Class</option>
                  <option value="8th">8th Class</option>
                </optgroup>
                <optgroup label="Matric">
                  <option value="9th">9th Class</option>
                  <option value="10th">10th Class</option>
                </optgroup>
                <optgroup label="F.Sc / Inter">
                  <option value="11th (F.Sc)">11th (F.Sc)</option>
                  <option value="12th (F.Sc)">12th (F.Sc)</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Select Group</label>
              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
                className={`${inputClasses} cursor-pointer`}
              >
                <option value="General (Middle School)">
                  General (Middle School)
                </option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
                <option value="Pre-Medical">Pre-Medical</option>
                <option value="Pre-Engineering">Pre-Engineering</option>
                <option value="ICS (Computer Science)">
                  ICS (Computer Science)
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClasses}>
              Contact Phone Number <span className="text-amber-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g., 03331234567"
              value={formData.phone}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>Home Address</label>
            <textarea
              name="address"
              rows="3"
              placeholder="House #, street, city"
              value={formData.address}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-4 flex items-center justify-center gap-2 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{ backgroundColor: "#1E3A8A" }}
          >
            {status.loading && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {status.loading
              ? "Submitting Application..."
              : "Submit Admission Request"}
          </button>

          <p className="text-center text-xs text-gray-400">
            By submitting, you agree to be contacted regarding your application
            status.
          </p>
        </form>
      </div>
    </section>
  );
};

export default AdmissionForm;
