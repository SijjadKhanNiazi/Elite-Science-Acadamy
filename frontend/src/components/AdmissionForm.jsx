// frontend/src/components/AdmissionForm.jsx
import React, { useState } from "react";
import API from "../api/axios";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    grade: "11th (F.Sc)",
    group: "Pre-Medical",
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
          grade: "11th (F.Sc)",
          group: "Pre-Medical",
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

  return (
    <section id="admission" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#1E3A8A" }}
          >
            Online Admission Registration
          </h2>
          <p className="text-gray-600">
            Secure your seat at Elite Science Academy by submitting the form
            below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6"
        >
          {status.message && (
            <div
              className={`p-4 rounded-xl text-sm font-semibold ${status.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {status.message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student Name
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Father Name
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Grade / Class
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="11th (F.Sc)">11th (F.Sc)</option>
                <option value="12th (F.Sc)">12th (F.Sc)</option>
                <option value="Matric (9th/10th)">Matric (9th/10th)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Group
              </label>
              <select
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Pre-Medical">Pre-Medical</option>
                <option value="Pre-Engineering">Pre-Engineering</option>
                <option value="ICS (Computer Science)">
                  ICS (Computer Science)
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g., 03331234567"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Home Address
            </label>
            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-4 text-white font-bold rounded-xl shadow-md hover:bg-opacity-90 transition-all disabled:opacity-50"
            style={{ backgroundColor: "#1E3A8A" }}
          >
            {status.loading
              ? "Submitting Application..."
              : "Submit Admission Request"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdmissionForm;
