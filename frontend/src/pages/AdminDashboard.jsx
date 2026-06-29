// frontend/src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

// ─── Reusable Modal ────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children }) => (
  <div
    style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
    }}
    onClick={onClose}
  >
    <div
      style={{
        background: "#fff", borderRadius: 20, padding: 32,
        width: "100%", maxWidth: 520, boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
        animation: "popIn 0.25s ease",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A" }}>{title}</h3>
        <button
          onClick={onClose}
          style={{
            background: "#F1F5F9", border: "none", borderRadius: 8,
            width: 32, height: 32, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>
      </div>
      {children}
    </div>
  </div>
);

// ─── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color = "#1E3A8A", icon }) => (
  <div style={{
    background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16,
    padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
      {icon} {label}
    </p>
    <h3 style={{ fontSize: 30, fontWeight: 900, color }}>{value}</h3>
  </div>
);

// ─── Input Field ───────────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div>
    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #E2E8F0",
  fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
};

const selectStyle = { ...inputStyle, background: "#fff" };

// ─── GRADE/GROUP OPTIONS ───────────────────────────────────────────────────────
const GRADES = ["6th", "7th", "8th", "9th", "10th", "11th (F.Sc)", "12th (F.Sc)"];
const GROUPS = ["General (Middle School)", "Science", "Arts", "Pre-Medical", "Pre-Engineering", "ICS (Computer Science)"];

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("admissions");

  // ── Admissions State ──
  const [admissions, setAdmissions] = useState([]);

  // ── Faculty State ──
  const [facultyForm, setFacultyForm] = useState({ name: "", subject: "", experience: "", image: "" });
  const [facultyStatus, setFacultyStatus] = useState({ loading: false, message: "", success: null });

  // ── Students State ──
  const [students, setStudents] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [studentForm, setStudentForm] = useState({
    name: "", fatherName: "", grade: "11th (F.Sc)", group: "Pre-Medical",
    phone: "", address: "", rollNumber: "",
  });
  const [studentFormStatus, setStudentFormStatus] = useState({ loading: false, message: "", success: null });

  // ── Fee State ──
  const [fees, setFees] = useState([]);
  const [feeFilter, setFeeFilter] = useState("all"); // studentId or "all"
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [feeForm, setFeeForm] = useState({
    student: "", month: "", amount: "", isPaid: true, remarks: "",
  });
  const [feeFormStatus, setFeeFormStatus] = useState({ loading: false, message: "", success: null });

  // ─── Fetch helpers ─────────────────────────────────────────────────────────
  const fetchAdmissions = useCallback(async () => {
    try {
      const res = await API.get("/admissions");
      if (res.data.success) setAdmissions(res.data.data);
    } catch (e) { console.error(e); }
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await API.get("/students");
      if (res.data.success) setStudents(res.data.data);
    } catch (e) { console.error(e); }
  }, []);

  const fetchFees = useCallback(async () => {
    try {
      const res = await API.get("/fees");
      if (res.data.success) setFees(res.data.data);
    } catch (e) { console.error(e); }
  }, []);

  // ─── Boot ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const boot = async () => {
      try {
        const authRes = await API.get("/auth/status");
        if (authRes.data.success) {
          setAdmin(authRes.data.admin);
          await Promise.all([fetchAdmissions(), fetchStudents(), fetchFees()]);
          setLoading(false);
        }
      } catch {
        setLoading(false);
        navigate("/login");
      }
    };
    boot();
  }, [navigate, fetchAdmissions, fetchStudents, fetchFees]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    try { await API.get("/auth/logout"); navigate("/"); }
    catch { alert("Logout failed."); }
  };

  // Enroll directly from admission record
  const handleEnrollFromAdmission = async (admission) => {
    if (!window.confirm(`"${admission.studentName}" ko enrolled students mein add karna chahte hain?`)) return;
    try {
      const res = await API.post("/students", {
        name: admission.studentName,
        fatherName: admission.fatherName,
        grade: admission.grade,
        group: admission.group,
        phone: admission.phone,
        address: admission.address,
      });
      if (res.data.success) {
        setStudents((prev) => [res.data.data, ...prev]);
        // Admission record bhi list se hata do
        setAdmissions((prev) => prev.filter((a) => a._id !== admission._id));
        alert(`✅ ${admission.studentName} ko successfully enroll kar diya gaya!`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment fail ho gaya. Dobara try karein.");
    }
  };

  // Delete an admission record
  const handleDeleteAdmission = async (id) => {
    if (!window.confirm("Yeh admission record permanently delete karna chahte hain?")) return;
    try {
      await API.delete(`/admissions/${id}`);
      setAdmissions((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete fail ho gaya.");
    }
  };

  // Faculty
  const handleFacultySubmit = async (e) => {
    e.preventDefault();
    setFacultyStatus({ loading: true, message: "", success: null });
    try {
      const res = await API.post("/faculty", facultyForm);
      if (res.data.success) {
        setFacultyStatus({ loading: false, message: "Faculty added & cache refreshed!", success: true });
        setFacultyForm({ name: "", subject: "", experience: "", image: "" });
      }
    } catch (err) {
      setFacultyStatus({ loading: false, message: err.response?.data?.message || "Failed.", success: false });
    }
  };

  // Students
  const handleAddStudent = async (e) => {
    e.preventDefault();
    setStudentFormStatus({ loading: true, message: "", success: null });
    try {
      const res = await API.post("/students", studentForm);
      if (res.data.success) {
        setStudents((prev) => [res.data.data, ...prev]);
        setStudentFormStatus({ loading: false, message: "Student enrolled successfully!", success: true });
        setStudentForm({ name: "", fatherName: "", grade: "11th (F.Sc)", group: "Pre-Medical", phone: "", address: "", rollNumber: "" });
        setTimeout(() => { setShowStudentModal(false); setStudentFormStatus({ loading: false, message: "", success: null }); }, 1200);
      }
    } catch (err) {
      setStudentFormStatus({ loading: false, message: err.response?.data?.message || "Error adding student.", success: false });
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Yeh student record delete karna chahte hain?")) return;
    try {
      await API.delete(`/students/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch { alert("Delete failed."); }
  };

  // Fees
  const handleAddFee = async (e) => {
    e.preventDefault();
    setFeeFormStatus({ loading: true, message: "", success: null });
    try {
      const res = await API.post("/fees", feeForm);
      if (res.data.success) {
        setFees((prev) => [res.data.data, ...prev]);
        setFeeFormStatus({ loading: false, message: "Fee record added!", success: true });
        setFeeForm({ student: "", month: "", amount: "", isPaid: true, remarks: "" });
        setTimeout(() => { setShowFeeModal(false); setFeeFormStatus({ loading: false, message: "", success: null }); }, 1200);
      }
    } catch (err) {
      setFeeFormStatus({ loading: false, message: err.response?.data?.message || "Error adding fee.", success: false });
    }
  };

  const handleDeleteFee = async (id) => {
    if (!window.confirm("Yeh fee record delete karna chahte hain?")) return;
    try {
      await API.delete(`/fees/${id}`);
      setFees((prev) => prev.filter((f) => f._id !== id));
    } catch { alert("Delete failed."); }
  };

  // ─── Computed ─────────────────────────────────────────────────────────────
  const filteredFees = feeFilter === "all" ? fees : fees.filter((f) => f.student?._id === feeFilter);
  const totalCollected = filteredFees.filter((f) => f.isPaid).reduce((s, f) => s + f.amount, 0);
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  // ─── Loading Screen ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FAFC" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "4px solid #E2E8F0", borderTopColor: "#1E3A8A", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#64748B", fontWeight: 600 }}>Verifying admin session...</p>
        </div>
      </div>
    );
  }

  const TAB_ITEMS = [
    { key: "admissions", label: "Admissions", icon: "📋", count: admissions.length },
    { key: "students",   label: "Students",   icon: "🎓", count: students.length },
    { key: "fees",       label: "Fee Records", icon: "💰", count: fees.length },
    { key: "addFaculty", label: "Add Faculty", icon: "👨‍🏫", count: null },
  ];

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Inter', system-ui, sans-serif; }
        input:focus, select:focus, textarea:focus { outline: 2px solid #6366F1 !important; border-color: #6366F1 !important; }
        .del-btn:hover { background: #FEE2E2 !important; color: #DC2626 !important; }
        .row-hover:hover { background: #F8FAFC; }
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex", background: "#F1F5F9" }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width: 260, minHeight: "100vh", background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
          display: "flex", flexDirection: "column", padding: "28px 20px", gap: 8, flexShrink: 0,
        }}>
          {/* Logo */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: "#F59E0B", letterSpacing: 1, margin: 0 }}>⚡ ESA PANEL</h2>
            <p style={{ fontSize: 11, color: "#64748B", marginTop: 4, fontWeight: 600 }}>Admin Control Dashboard</p>
          </div>

          {/* Admin Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#1E293B", border: "1px solid #334155", borderRadius: 14, padding: "12px 14px", marginBottom: 16 }}>
            <img src={admin?.picture} alt="Admin" style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #F59E0B", objectFit: "cover" }} />
            <div style={{ overflow: "hidden" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#F1F5F9", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{admin?.name}</p>
              <p style={{ fontSize: 11, color: "#64748B", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{admin?.email}</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            {TAB_ITEMS.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                  width: "100%", textAlign: "left", padding: "11px 14px", borderRadius: 12, border: "none",
                  cursor: "pointer", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 10,
                  justifyContent: "space-between",
                  background: active ? "linear-gradient(90deg, #F59E0B, #FBBF24)" : "transparent",
                  color: active ? "#0F172A" : "#94A3B8",
                  transition: "all 0.2s",
                }}>
                  <span>{tab.icon} {tab.label}</span>
                  {tab.count !== null && (
                    <span style={{
                      background: active ? "rgba(0,0,0,0.12)" : "#1E293B",
                      color: active ? "#0F172A" : "#64748B",
                      borderRadius: 20, padding: "2px 8px", fontSize: 11, fontWeight: 800,
                    }}>{tab.count}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <button onClick={handleLogout} style={{
            background: "rgba(239,68,68,0.1)", color: "#F87171", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 12, padding: "11px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer",
            transition: "all 0.2s", width: "100%",
          }}>
            🚪 Terminate Session
          </button>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: "32px 36px", overflowY: "auto", animation: "fadeIn 0.3s ease" }}>

          {/* ═══════════════ ADMISSIONS TAB ═══════════════ */}
          {activeTab === "admissions" && (
            <div>
              <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: 0 }}>Admission Applications</h1>
                <p style={{ color: "#64748B", fontSize: 14, marginTop: 6 }}>Online form se aaye sab applications</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 16, marginBottom: 28 }}>
                <StatCard label="Total Applications" value={admissions.length} icon="📋" />
                <StatCard label="Pending Review" value={admissions.filter(a => a.status === "Pending").length} color="#F59E0B" icon="⏳" />
                <StatCard label="Campus" value="Girls" color="#10B981" icon="🏫" />
              </div>
              {admissions.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: 16, padding: 60, textAlign: "center", color: "#94A3B8", border: "1px solid #E2E8F0" }}>
                  Abhi koi application nahi aai.
                </div>
              ) : (
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                          {["Student", "Father Name", "Grade & Group", "Phone", "Address", "Status", "Action"].map(h => (
                            <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {admissions.map((a) => (
                          <tr key={a._id} className="row-hover" style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0F172A" }}>{a.studentName}</td>
                            <td style={{ padding: "14px 18px", color: "#475569" }}>{a.fatherName}</td>
                            <td style={{ padding: "14px 18px" }}>
                              <span style={{ background: "#EFF6FF", color: "#1D4ED8", borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700, marginRight: 6 }}>{a.grade}</span>
                              <span style={{ background: "#FFFBEB", color: "#B45309", borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>{a.group}</span>
                            </td>
                            <td style={{ padding: "14px 18px", fontFamily: "monospace", fontSize: 13 }}>{a.phone}</td>
                            <td style={{ padding: "14px 18px", color: "#64748B", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.address || "—"}</td>
                            <td style={{ padding: "14px 18px" }}>
                              <span style={{
                                borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 800,
                                background: a.status === "Accepted" ? "#ECFDF5" : a.status === "Rejected" ? "#FEF2F2" : "#FFFBEB",
                                color: a.status === "Accepted" ? "#059669" : a.status === "Rejected" ? "#DC2626" : "#B45309",
                              }}>{a.status || "Pending"}</span>
                            </td>
                            <td style={{ padding: "14px 18px" }}>
                              <div style={{ display: "flex", gap: 8 }}>
                                <button
                                  onClick={() => handleEnrollFromAdmission(a)}
                                  style={{
                                    background: "linear-gradient(90deg, #059669, #10B981)",
                                    color: "#fff", border: "none", borderRadius: 8,
                                    padding: "7px 13px", fontSize: 12, fontWeight: 700,
                                    cursor: "pointer", whiteSpace: "nowrap",
                                    boxShadow: "0 2px 8px #10B98130",
                                  }}
                                >✅ Enroll</button>
                                <button
                                  onClick={() => handleDeleteAdmission(a._id)}
                                  className="del-btn"
                                  style={{
                                    background: "#F8FAFC", color: "#94A3B8",
                                    border: "1px solid #E2E8F0", borderRadius: 8,
                                    padding: "7px 13px", fontSize: 12, fontWeight: 700,
                                    cursor: "pointer", whiteSpace: "nowrap",
                                    transition: "all 0.2s",
                                  }}
                                >🗑 Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ STUDENTS TAB ═══════════════ */}
          {activeTab === "students" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: 0 }}>Enrolled Students</h1>
                  <p style={{ color: "#64748B", fontSize: 14, marginTop: 6 }}>Confirmed enrolled students ka record</p>
                </div>
                <button
                  onClick={() => setShowStudentModal(true)}
                  style={{
                    background: "linear-gradient(90deg, #1E3A8A, #6366F1)", color: "#fff",
                    border: "none", borderRadius: 12, padding: "12px 22px",
                    fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px #6366F140",
                  }}
                >+ Naya Student Add Karein</button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 16, marginBottom: 28 }}>
                <StatCard label="Total Enrolled" value={students.length} icon="🎓" />
                <StatCard label="Pre-Medical" value={students.filter(s => s.group === "Pre-Medical").length} color="#EC4899" icon="🔬" />
                <StatCard label="Pre-Engineering" value={students.filter(s => s.group === "Pre-Engineering").length} color="#F59E0B" icon="⚙️" />
                <StatCard label="ICS" value={students.filter(s => s.group === "ICS (Computer Science)").length} color="#6366F1" icon="💻" />
              </div>

              {students.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: 16, padding: 60, textAlign: "center", color: "#94A3B8", border: "1px solid #E2E8F0" }}>
                  Abhi koi student enrolled nahi. "Naya Student Add Karein" button use karein.
                </div>
              ) : (
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                          {["Roll No", "Student Name", "Father Name", "Grade & Group", "Phone", "Address", "Action"].map(h => (
                            <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((s) => (
                          <tr key={s._id} className="row-hover" style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "14px 18px", fontFamily: "monospace", fontSize: 12, color: "#6366F1", fontWeight: 700 }}>{s.rollNumber || "—"}</td>
                            <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0F172A" }}>{s.name}</td>
                            <td style={{ padding: "14px 18px", color: "#475569" }}>{s.fatherName}</td>
                            <td style={{ padding: "14px 18px" }}>
                              <span style={{ background: "#EFF6FF", color: "#1D4ED8", borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700, marginRight: 6 }}>{s.grade}</span>
                              <span style={{ background: "#FFFBEB", color: "#B45309", borderRadius: 6, padding: "2px 8px", fontSize: 12, fontWeight: 700 }}>{s.group}</span>
                            </td>
                            <td style={{ padding: "14px 18px", fontFamily: "monospace", fontSize: 13 }}>{s.phone}</td>
                            <td style={{ padding: "14px 18px", color: "#64748B", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.address || "—"}</td>
                            <td style={{ padding: "14px 18px" }}>
                              <button
                                className="del-btn"
                                onClick={() => handleDeleteStudent(s._id)}
                                style={{
                                  background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8,
                                  padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: "#94A3B8",
                                  transition: "all 0.2s",
                                }}
                              >🗑 Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ FEE RECORDS TAB ═══════════════ */}
          {activeTab === "fees" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: 0 }}>Fee Records</h1>
                  <p style={{ color: "#64748B", fontSize: 14, marginTop: 6 }}>Students ki fee payments ka manual record</p>
                </div>
                <button
                  onClick={() => setShowFeeModal(true)}
                  style={{
                    background: "linear-gradient(90deg, #059669, #10B981)", color: "#fff",
                    border: "none", borderRadius: 12, padding: "12px 22px",
                    fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px #10B98140",
                  }}
                >+ Fee Entry Add Karein</button>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 16, marginBottom: 20 }}>
                <StatCard label="Total Records" value={fees.length} icon="📄" />
                <StatCard label="Total Collected" value={`Rs. ${fees.filter(f=>f.isPaid).reduce((s,f)=>s+f.amount,0).toLocaleString()}`} color="#059669" icon="💵" />
                <StatCard label="Filtered Total" value={`Rs. ${totalCollected.toLocaleString()}`} color="#6366F1" icon="🔍" />
              </div>

              {/* Filter by Student */}
              <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>Student se filter karein:</label>
                <select
                  value={feeFilter}
                  onChange={(e) => setFeeFilter(e.target.value)}
                  style={{ ...selectStyle, width: "auto", minWidth: 220 }}
                >
                  <option value="all">Sab Students</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>{s.name} ({s.grade})</option>
                  ))}
                </select>
                {feeFilter !== "all" && (
                  <button onClick={() => setFeeFilter("all")} style={{ background: "#F1F5F9", border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer", color: "#64748B" }}>
                    ✕ Clear
                  </button>
                )}
              </div>

              {filteredFees.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: 16, padding: 60, textAlign: "center", color: "#94A3B8", border: "1px solid #E2E8F0" }}>
                  {students.length === 0 ? "Pehle koi student enroll karein, phir fee add karein." : "Is student ki koi fee entry nahi hai."}
                </div>
              ) : (
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                          {["Student", "Grade", "Month", "Amount", "Status", "Remarks", "Date", "Action"].map(h => (
                            <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFees.map((f) => (
                          <tr key={f._id} className="row-hover" style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "14px 18px", fontWeight: 700, color: "#0F172A" }}>{f.student?.name || "—"}</td>
                            <td style={{ padding: "14px 18px" }}>
                              <span style={{ background: "#EFF6FF", color: "#1D4ED8", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{f.student?.grade || "—"}</span>
                            </td>
                            <td style={{ padding: "14px 18px", fontWeight: 600, color: "#475569" }}>{f.month}</td>
                            <td style={{ padding: "14px 18px", fontWeight: 800, color: "#059669" }}>Rs. {f.amount?.toLocaleString()}</td>
                            <td style={{ padding: "14px 18px" }}>
                              <span style={{
                                borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 800,
                                background: f.isPaid ? "#ECFDF5" : "#FEF2F2",
                                color: f.isPaid ? "#059669" : "#DC2626",
                              }}>{f.isPaid ? "✓ Paid" : "✗ Unpaid"}</span>
                            </td>
                            <td style={{ padding: "14px 18px", color: "#64748B", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.remarks || "—"}</td>
                            <td style={{ padding: "14px 18px", color: "#94A3B8", fontSize: 12, whiteSpace: "nowrap" }}>
                              {new Date(f.paidAt).toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" })}
                            </td>
                            <td style={{ padding: "14px 18px" }}>
                              <button
                                className="del-btn"
                                onClick={() => handleDeleteFee(f._id)}
                                style={{
                                  background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8,
                                  padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: "#94A3B8",
                                  transition: "all 0.2s",
                                }}
                              >🗑 Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ ADD FACULTY TAB ═══════════════ */}
          {activeTab === "addFaculty" && (
            <div style={{ maxWidth: 520 }}>
              <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", margin: 0 }}>Add New Faculty</h1>
                <p style={{ color: "#64748B", fontSize: 14, marginTop: 6 }}>Atlas DB update + Upstash cache automatically refresh ho ga</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                {facultyStatus.message && (
                  <div style={{
                    padding: "12px 16px", borderRadius: 10, marginBottom: 20, fontSize: 13, fontWeight: 700,
                    background: facultyStatus.success ? "#ECFDF5" : "#FEF2F2",
                    color: facultyStatus.success ? "#059669" : "#DC2626",
                    border: `1px solid ${facultyStatus.success ? "#6EE7B7" : "#FECACA"}`,
                  }}>{facultyStatus.message}</div>
                )}
                <form onSubmit={handleFacultySubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Field label="Teacher Full Name">
                    <input type="text" required value={facultyForm.name} onChange={e => setFacultyForm({...facultyForm, name: e.target.value})} style={inputStyle} />
                  </Field>
                  <Field label="Subject Specialization">
                    <input type="text" required placeholder="e.g., Biology, Physics" value={facultyForm.subject} onChange={e => setFacultyForm({...facultyForm, subject: e.target.value})} style={inputStyle} />
                  </Field>
                  <Field label="Years of Experience">
                    <input type="number" required min="0" value={facultyForm.experience} onChange={e => setFacultyForm({...facultyForm, experience: e.target.value})} style={inputStyle} />
                  </Field>
                  <Field label="Image URL (Optional)">
                    <input type="url" placeholder="https://example.com/photo.jpg" value={facultyForm.image} onChange={e => setFacultyForm({...facultyForm, image: e.target.value})} style={inputStyle} />
                  </Field>
                  <button type="submit" disabled={facultyStatus.loading} style={{
                    background: "linear-gradient(90deg, #0F172A, #1E3A8A)", color: "#fff",
                    border: "none", borderRadius: 12, padding: "14px", fontWeight: 800, fontSize: 14,
                    cursor: "pointer", marginTop: 8, opacity: facultyStatus.loading ? 0.6 : 1,
                  }}>
                    {facultyStatus.loading ? "Adding..." : "👨‍🏫 Add Faculty Member"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ═══════════════ ADD STUDENT MODAL ═══════════════ */}
      {showStudentModal && (
        <Modal title="🎓 Naya Student Enroll Karein" onClose={() => { setShowStudentModal(false); setStudentFormStatus({ loading: false, message: "", success: null }); }}>
          {studentFormStatus.message && (
            <div style={{
              padding: "12px 16px", borderRadius: 10, marginBottom: 16, fontSize: 13, fontWeight: 700,
              background: studentFormStatus.success ? "#ECFDF5" : "#FEF2F2",
              color: studentFormStatus.success ? "#059669" : "#DC2626",
              border: `1px solid ${studentFormStatus.success ? "#6EE7B7" : "#FECACA"}`,
            }}>{studentFormStatus.message}</div>
          )}
          <form onSubmit={handleAddStudent} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Student Name">
                <input type="text" required value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} style={inputStyle} />
              </Field>
              <Field label="Father Name">
                <input type="text" required value={studentForm.fatherName} onChange={e => setStudentForm({...studentForm, fatherName: e.target.value})} style={inputStyle} />
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Grade">
                <select value={studentForm.grade} onChange={e => setStudentForm({...studentForm, grade: e.target.value})} style={selectStyle}>
                  {GRADES.map(g => <option key={g}>{g}</option>)}
                </select>
              </Field>
              <Field label="Group">
                <select value={studentForm.group} onChange={e => setStudentForm({...studentForm, group: e.target.value})} style={selectStyle}>
                  {GROUPS.map(g => <option key={g}>{g}</option>)}
                </select>
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Phone">
                <input type="tel" required placeholder="03XXXXXXXXX" value={studentForm.phone} onChange={e => setStudentForm({...studentForm, phone: e.target.value})} style={inputStyle} />
              </Field>
              <Field label="Roll Number (Optional)">
                <input type="text" placeholder="e.g., ESA-001" value={studentForm.rollNumber} onChange={e => setStudentForm({...studentForm, rollNumber: e.target.value})} style={inputStyle} />
              </Field>
            </div>
            <Field label="Address">
              <input type="text" placeholder="e.g., Mianwali" value={studentForm.address} onChange={e => setStudentForm({...studentForm, address: e.target.value})} style={inputStyle} />
            </Field>
            <button type="submit" disabled={studentFormStatus.loading} style={{
              background: "linear-gradient(90deg, #1E3A8A, #6366F1)", color: "#fff",
              border: "none", borderRadius: 12, padding: "13px", fontWeight: 800,
              fontSize: 14, cursor: "pointer", marginTop: 4,
              opacity: studentFormStatus.loading ? 0.6 : 1,
            }}>
              {studentFormStatus.loading ? "Enrolling..." : "✅ Student Enroll Karein"}
            </button>
          </form>
        </Modal>
      )}

      {/* ═══════════════ ADD FEE MODAL ═══════════════ */}
      {showFeeModal && (
        <Modal title="💰 Fee Entry Add Karein" onClose={() => { setShowFeeModal(false); setFeeFormStatus({ loading: false, message: "", success: null }); }}>
          {feeFormStatus.message && (
            <div style={{
              padding: "12px 16px", borderRadius: 10, marginBottom: 16, fontSize: 13, fontWeight: 700,
              background: feeFormStatus.success ? "#ECFDF5" : "#FEF2F2",
              color: feeFormStatus.success ? "#059669" : "#DC2626",
              border: `1px solid ${feeFormStatus.success ? "#6EE7B7" : "#FECACA"}`,
            }}>{feeFormStatus.message}</div>
          )}
          {students.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0", color: "#94A3B8", fontSize: 14 }}>
              ⚠️ Pehle Students tab mein koi student enroll karein.
            </div>
          ) : (
            <form onSubmit={handleAddFee} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field label="Student Select Karein">
                <select required value={feeForm.student} onChange={e => setFeeForm({...feeForm, student: e.target.value})} style={selectStyle}>
                  <option value="">-- Student chunein --</option>
                  {students.map(s => (
                    <option key={s._id} value={s._id}>{s.name} — {s.grade} ({s.rollNumber || "No Roll"})</option>
                  ))}
                </select>
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Month (e.g. June 2025)">
                  <input type="text" required placeholder={currentMonth} value={feeForm.month} onChange={e => setFeeForm({...feeForm, month: e.target.value})} style={inputStyle} />
                </Field>
                <Field label="Amount (Rs.)">
                  <input type="number" required min="0" placeholder="e.g., 2500" value={feeForm.amount} onChange={e => setFeeForm({...feeForm, amount: e.target.value})} style={inputStyle} />
                </Field>
              </div>
              <Field label="Payment Status">
                <select value={feeForm.isPaid ? "true" : "false"} onChange={e => setFeeForm({...feeForm, isPaid: e.target.value === "true"})} style={selectStyle}>
                  <option value="true">✓ Fee Jama Ho Gayi (Paid)</option>
                  <option value="false">✗ Abhi Pending Hai (Unpaid)</option>
                </select>
              </Field>
              <Field label="Remarks (Optional)">
                <input type="text" placeholder="e.g., Half fee concession" value={feeForm.remarks} onChange={e => setFeeForm({...feeForm, remarks: e.target.value})} style={inputStyle} />
              </Field>
              <button type="submit" disabled={feeFormStatus.loading} style={{
                background: "linear-gradient(90deg, #059669, #10B981)", color: "#fff",
                border: "none", borderRadius: 12, padding: "13px", fontWeight: 800,
                fontSize: 14, cursor: "pointer", marginTop: 4,
                opacity: feeFormStatus.loading ? 0.6 : 1,
              }}>
                {feeFormStatus.loading ? "Saving..." : "💰 Fee Record Save Karein"}
              </button>
            </form>
          )}
        </Modal>
      )}
    </>
  );
};

export default AdminDashboard;
