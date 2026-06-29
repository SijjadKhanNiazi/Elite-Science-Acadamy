// frontend/src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("admissions"); // admissions | addFaculty

  // New Faculty Form State
  const [facultyForm, setFacultyForm] = useState({
    name: "",
    subject: "",
    experience: "",
    image: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    message: "",
    success: null,
  });

  // frontend/src/pages/AdminDashboard.jsx ke andar useEffect ko is se replace karein:

  useEffect(() => {
    const verifyAdminSession = async () => {
      try {
        // Step 1: Sirf session check karo pehle
        const authRes = await API.get("/auth/status");

        if (authRes.data.success) {
          setAdmin(authRes.data.admin);

          // Step 2: Session verify hone k BAAD data fetch karo, parallel nahi
          try {
            const admissionsRes = await API.get("/admissions");
            if (admissionsRes.data.success) {
              setAdmissions(admissionsRes.data.data);
            }
          } catch (dataErr) {
            console.error("Data fetch failed, but admin is verified:", dataErr);
          }

          // Data loading complete
          setLoading(false);
        }
      } catch (error) {
        // Agar status code 401 aata hai ya network issue, sirf tab login par bhejo
        console.error(
          "Session verification failed:",
          error.response?.data || error.message,
        );
        setLoading(false);
        navigate("/login");
      }
    };

    verifyAdminSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await API.get("/auth/logout");
      navigate("/login");
    } catch (err) {
      alert("Logout failed. Try again.");
    }
  };

  const handleFacultySubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, message: "", success: null });
    try {
      const res = await API.post("/faculty", facultyForm);
      if (res.data.success) {
        setFormStatus({
          loading: false,
          message: "Faculty member added & cache purged!",
          success: true,
        });
        setFacultyForm({ name: "", subject: "", experience: "", image: "" });
      }
    } catch (error) {
      setFormStatus({
        loading: false,
        message: error.response?.data?.message || "Failed to publish faculty.",
        success: false,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium font-mono">
        Verifying Secure Administrative Session State...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-inter flex flex-col md:flex-row">
      {/* Sidebar Controls */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col p-6 space-y-8">
        <div>
          <h2 className="text-xl font-black tracking-wider text-amber-500">
            ESA CONTROL
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Control Management Layer
          </p>
        </div>

        {/* User Identity context */}
        <div className="flex items-center space-x-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
          <img
            src={admin?.picture}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-amber-500"
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold truncate">{admin?.name}</h4>
            <p className="text-xs text-slate-400 truncate">{admin?.email}</p>
          </div>
        </div>

        {/* Navigation Options */}
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("admissions")}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all text-sm ${activeTab === "admissions" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-300 hover:bg-slate-800"}`}
          >
            Admissions Records ({admissions.length})
          </button>
          <button
            onClick={() => setActiveTab("addFaculty")}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all text-sm ${activeTab === "addFaculty" ? "bg-amber-500 text-slate-950 shadow-md" : "text-slate-300 hover:bg-slate-800"}`}
          >
            Add New Faculty
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition-all py-3 rounded-xl font-bold text-sm"
        >
          Terminate Session
        </button>
      </div>

      {/* Main Content Workspace View */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === "admissions" ? (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-black text-slate-900">
                Student Admission Pipelines
              </h1>
              <p className="text-slate-500 text-sm">
                Dynamic records extracted straight from MongoDB Atlas ecosystem.
              </p>
            </div>
            {/* Add this inside the admissions tab view, right before the table/empty layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <p className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                  Total Applications
                </p>
                <h3 className="text-3xl font-black text-slate-900 mt-2">
                  {admissions.length}
                </h3>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <p className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                  Active Campus
                </p>
                <h3 className="text-3xl font-black text-amber-500 mt-2">
                  Girls Campus
                </h3>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <p className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                  System Status
                </p>
                <h3 className="text-3xl font-black text-green-600 mt-2">
                  Synchronized
                </h3>
              </div>
            </div>

            {admissions.length === 0 ? (
              <div className="bg-white border p-10 rounded-2xl text-center text-slate-400 italic">
                No admission requests logged in system records yet.
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200 text-slate-700 text-xs font-bold uppercase font-mono">
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Father Name</th>
                      <th className="px-6 py-4">Grade & Group</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-slate-600">
                    {admissions.map((stud) => (
                      <tr
                        key={stud._id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {stud.studentName}
                        </td>
                        <td className="px-6 py-4">{stud.fatherName}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-md border border-blue-100 mr-2">
                            {stud.grade}
                          </span>
                          <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-amber-50 text-amber-700 rounded-md border border-amber-100">
                            {stud.group}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs">
                          {stud.phone}
                        </td>
                        <td className="px-6 py-4 truncate max-w-xs">
                          {stud.address}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* Add Faculty Segment view wrapper panel */
          <div className="max-w-xl">
            <div className="mb-8">
              <h1 className="text-2xl font-black text-slate-900">
                Deploy New Instructor Core
              </h1>
              <p className="text-slate-500 text-sm">
                Inserting profiles here updates Atlas and automatically
                invalidates the Upstash cache layout.
              </p>
            </div>

            <form
              onSubmit={handleFacultySubmit}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5"
            >
              {formStatus.message && (
                <div
                  className={`p-4 rounded-xl text-xs font-mono font-bold ${formStatus.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                >
                  {formStatus.message}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Teacher Full Name
                </label>
                <input
                  type="text"
                  required
                  value={facultyForm.name}
                  onChange={(e) =>
                    setFacultyForm({ ...facultyForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Subject Specialization
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Biology, Physics"
                  value={facultyForm.subject}
                  onChange={(e) =>
                    setFacultyForm({ ...facultyForm, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Years of Field Experience
                </label>
                <input
                  type="number"
                  required
                  value={facultyForm.experience}
                  onChange={(e) =>
                    setFacultyForm({
                      ...facultyForm,
                      experience: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={facultyForm.image}
                  onChange={(e) =>
                    setFacultyForm({ ...facultyForm, image: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus.loading}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-md hover:bg-slate-800 transition-colors disabled:opacity-50 text-sm"
              >
                {formStatus.loading
                  ? "Executing Engine Operations..."
                  : "Commit Instructor to DB"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
