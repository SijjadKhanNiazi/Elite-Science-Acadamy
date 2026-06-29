// frontend/src/components/FacultyList.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axios";

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [meta, setMeta] = useState({ source: "", loading: true });

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await API.get("/faculty");
        if (response.data.success) {
          setFaculty(response.data.data);
          setMeta({ source: response.data.source, loading: false });
        }
      } catch (error) {
        console.error("Error fetching faculty data:", error);
        setMeta({ source: "Failed to sync cache layers", loading: false });
      }
    };

    fetchFaculty();
  }, []);

  if (meta.loading) {
    return (
      <div className="py-20 text-center text-gray-500 font-medium">
        Loading Expert Faculty Systems...
      </div>
    );
  }

  return (
    <section
      id="faculty"
      className="py-20"
      style={{ backgroundColor: "#F8FAFC" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block & Cache Metrics indicator badge */}
        <div className="text-center mb-16 relative">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "#1E3A8A" }}
          >
            Meet Our Professional Instructors
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Highly experienced specialist teachers dedicated to preparing
            students for competitive board exams.
          </p>

          {meta.source && (
            <span className="inline-block mt-4 px-3 py-1 text-xs font-mono font-bold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              ⚡ Engine Optimization: {meta.source}
            </span>
          )}
        </div>

        {faculty.length === 0 ? (
          <div className="text-center text-gray-400 italic">
            No faculty profiles available at the moment. Admin entry
            outstanding.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member) => (
              <div
                key={member._id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 flex items-center space-x-4"
              >
                <img
                  src={
                    member.image ||
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                  }
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "#F59E0B" }}
                  >
                    {member.subject} Specialist
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {member.experience}+ Years Production Experience
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FacultyList;
