// frontend/src/components/FacultyList.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axios";

// Subject se color mapping
const subjectColors = {
  Physics: { from: "#6366F1", to: "#818CF8", light: "#EEF2FF" },
  Chemistry: { from: "#10B981", to: "#34D399", light: "#ECFDF5" },
  Biology: { from: "#EC4899", to: "#F472B6", light: "#FDF2F8" },
  Mathematics: { from: "#F59E0B", to: "#FCD34D", light: "#FFFBEB" },
  Math: { from: "#F59E0B", to: "#FCD34D", light: "#FFFBEB" },
  English: { from: "#3B82F6", to: "#60A5FA", light: "#EFF6FF" },
  Urdu: { from: "#8B5CF6", to: "#A78BFA", light: "#F5F3FF" },
  Computer: { from: "#14B8A6", to: "#2DD4BF", light: "#F0FDFA" },
  Islamiat: { from: "#84CC16", to: "#A3E635", light: "#F7FEE7" },
  default: { from: "#1E3A8A", to: "#3B82F6", light: "#EFF6FF" },
};

const getColor = (subject = "") => {
  const key = Object.keys(subjectColors).find((k) =>
    subject.toLowerCase().includes(k.toLowerCase()),
  );
  return subjectColors[key] || subjectColors.default;
};

// Subject ka first letter / initials (avatar fallback)
const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// Stars for experience
const ExperienceDots = ({ years }) => {
  const filled = Math.min(Math.round(years / 3), 5);
  return (
    <div className="flex gap-1 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            display: "inline-block",
            background: i < filled ? "currentColor" : "rgba(0,0,0,0.12)",
            transition: "background 0.3s",
          }}
        />
      ))}
    </div>
  );
};

// Shimmer skeleton card
const SkeletonCard = () => (
  <div
    style={{
      background: "#fff",
      borderRadius: 20,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(30,58,138,0.07)",
      padding: "28px 24px 24px",
      animation: "pulse 1.5s ease-in-out infinite",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "#E5E7EB",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: 16,
            background: "#E5E7EB",
            borderRadius: 8,
            marginBottom: 10,
            width: "70%",
          }}
        />
        <div
          style={{
            height: 12,
            background: "#E5E7EB",
            borderRadius: 8,
            width: "50%",
          }}
        />
      </div>
    </div>
    <div
      style={{
        height: 10,
        background: "#E5E7EB",
        borderRadius: 8,
        marginBottom: 8,
      }}
    />
    <div
      style={{
        height: 10,
        background: "#E5E7EB",
        borderRadius: 8,
        width: "60%",
      }}
    />
  </div>
);

// Individual Faculty Card
const FacultyCard = ({ member, index }) => {
  const [hovered, setHovered] = useState(false);
  const color = getColor(member.subject);
  const hasImage = member.image && !member.image.includes("placeholder");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: hovered
          ? `0 20px 48px rgba(30,58,138,0.18), 0 4px 12px ${color.from}30`
          : "0 4px 24px rgba(30,58,138,0.07)",
        transform: hovered
          ? "translateY(-6px) scale(1.01)"
          : "translateY(0) scale(1)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        position: "relative",
        cursor: "default",
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
        animation: `fadeSlideUp 0.5s ease ${index * 80}ms both`,
      }}
    >
      {/* Top gradient accent strip */}
      <div
        style={{
          height: 5,
          background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
          transition: "height 0.3s ease",
          ...(hovered ? { height: 6 } : {}),
        }}
      />

      <div style={{ padding: "24px 24px 20px" }}>
        {/* Top row: avatar + name/subject */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 18,
          }}
        >
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: hasImage
                  ? "transparent"
                  : `linear-gradient(135deg, ${color.from}, ${color.to})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `3px solid ${color.light}`,
                boxShadow: `0 0 0 3px ${color.from}25`,
                overflow: "hidden",
                transition: "box-shadow 0.3s",
                ...(hovered ? { boxShadow: `0 0 0 4px ${color.from}40` } : {}),
              }}
            >
              {hasImage ? (
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span
                  style={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 24,
                    letterSpacing: 1,
                  }}
                >
                  {getInitials(member.name)}
                </span>
              )}
            </div>
            {/* Online / Available dot */}
            {member.isAvailable && (
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 14,
                  height: 14,
                  background: "#10B981",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  boxShadow: "0 0 6px #10B98180",
                }}
              />
            )}
          </div>

          {/* Name + Subject badge */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: 6,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {member.name}
            </h3>
            {/* Subject pill */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 11px",
                borderRadius: 999,
                background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.3,
                boxShadow: `0 2px 8px ${color.from}40`,
              }}
            >
              <span>📚</span>
              {member.subject}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `linear-gradient(90deg, ${color.from}20, transparent)`,
            marginBottom: 16,
          }}
        />

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "#94A3B8",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.8,
                marginBottom: 2,
              }}
            >
              Experience
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}
              >
                {member.experience}+
              </span>
              <span style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>
                Years
              </span>
            </div>
            <div style={{ color: color.from }}>
              <ExperienceDots years={member.experience} />
            </div>
          </div>

          {/* Availability tag */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "#94A3B8",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              Status
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 999,
                background: member.isAvailable ? "#ECFDF5" : "#FEF2F2",
                color: member.isAvailable ? "#059669" : "#DC2626",
                fontSize: 11,
                fontWeight: 700,
                border: `1px solid ${member.isAvailable ? "#6EE7B7" : "#FECACA"}`,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "currentColor",
                  display: "inline-block",
                }}
              />
              {member.isAvailable ? "Enrolling" : "Full"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA hover reveal */}
      <div
        style={{
          padding: "0 24px",
          maxHeight: hovered ? 52 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease, padding 0.35s ease",
          ...(hovered ? { paddingBottom: 20 } : {}),
        }}
      >
        <a
          href="#admission"
          style={{
            display: "block",
            textAlign: "center",
            padding: "10px",
            background: `linear-gradient(90deg, ${color.from}, ${color.to})`,
            color: "#fff",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: `0 4px 14px ${color.from}40`,
            letterSpacing: 0.3,
          }}
        >
          Apply for Admission →
        </a>
      </div>
    </div>
  );
};

// Main Section
const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [meta, setMeta] = useState({ loading: true, error: false });

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await API.get("/faculty");
        if (response.data.success) {
          setFaculty(response.data.data);
          setMeta({ loading: false, error: false });
        }
      } catch (error) {
        console.error("Error fetching faculty data:", error);
        setMeta({ loading: false, error: true });
      }
    };
    fetchFaculty();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to   { background-position: 200% 0; }
        }
      `}</style>

      <section
        id="faculty"
        style={{
          padding: "80px 0",
          background: "linear-gradient(180deg, #F0F4FF 0%, #F8FAFC 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #6366F120 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #1E3A8A15 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 18px",
                background: "linear-gradient(90deg, #1E3A8A15, #6366F115)",
                border: "1px solid #C7D2FE",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                color: "#4338CA",
                marginBottom: 16,
                letterSpacing: 0.5,
              }}
            >
              🎓 Our Expert Faculty
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 900,
                color: "#0F172A",
                marginBottom: 14,
                lineHeight: 1.2,
              }}
            >
              Meet Our{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #1E3A8A, #6366F1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Professional Instructors
              </span>
            </h2>
            <p
              style={{
                color: "#64748B",
                fontSize: 16,
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Highly experienced specialist teachers dedicated to preparing
              students for competitive board exams.
            </p>
          </div>

          {/* Cards Grid */}
          {meta.loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : meta.error ? (
            <div
              style={{
                textAlign: "center",
                color: "#EF4444",
                padding: "40px 0",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              ⚠️ Faculty data load nahi ho saka. Server check karein.
            </div>
          ) : faculty.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 4px 24px rgba(30,58,138,0.07)",
                color: "#94A3B8",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              📋 Abhi koi faculty profile nahi hai. Admin se request karein.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {faculty.map((member, index) => (
                <FacultyCard key={member._id} member={member} index={index} />
              ))}
            </div>
          )}

          {/* Bottom stats bar */}
          {!meta.loading && faculty.length > 0 && (
            <div
              style={{
                marginTop: 52,
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 32,
              }}
            >
              {[
                { label: "Expert Teachers", value: faculty.length, icon: "👨‍🏫" },
                {
                  label: "Subjects Covered",
                  value: new Set(faculty.map((f) => f.subject)).size,
                  icon: "📚",
                },
                {
                  label: "Avg Experience",
                  value:
                    Math.round(
                      faculty.reduce((s, f) => s + f.experience, 0) /
                        faculty.length,
                    ) + "+ yrs",
                  icon: "🏆",
                },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: "#1E3A8A",
                      background: "linear-gradient(135deg, #1E3A8A, #6366F1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#94A3B8", fontWeight: 600 }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FacultyList;
