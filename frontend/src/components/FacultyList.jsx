// frontend/src/components/FacultyList.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axios";

// Single consistent theme for every card — navy + amber, matching
// the rest of the site. No more per-subject color variation.
const THEME = {
  from: "#1E3A8A",
  to: "#3B5FCC",
  accent: "#F59E0B",
  accentLight: "#FFFBEB",
  light: "#EEF2FF",
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
    <div className="flex gap-1.5 mt-1.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            display: "inline-block",
            background: i < filled ? THEME.accent : "rgba(15,23,42,0.10)",
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
      borderRadius: 22,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(30,58,138,0.08)",
      padding: "32px 28px 28px",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: "50%",
          background:
            "linear-gradient(100deg, #E5E7EB 30%, #F1F3F6 50%, #E5E7EB 70%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.8s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: 18,
            background:
              "linear-gradient(100deg, #E5E7EB 30%, #F1F3F6 50%, #E5E7EB 70%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.8s ease-in-out infinite",
            borderRadius: 8,
            marginBottom: 12,
            width: "70%",
          }}
        />
        <div
          style={{
            height: 13,
            background:
              "linear-gradient(100deg, #E5E7EB 30%, #F1F3F6 50%, #E5E7EB 70%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.8s ease-in-out infinite",
            borderRadius: 8,
            width: "50%",
          }}
        />
      </div>
    </div>
    <div
      style={{
        height: 12,
        background:
          "linear-gradient(100deg, #E5E7EB 30%, #F1F3F6 50%, #E5E7EB 70%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.8s ease-in-out infinite",
        borderRadius: 8,
        marginBottom: 10,
      }}
    />
    <div
      style={{
        height: 12,
        background:
          "linear-gradient(100deg, #E5E7EB 30%, #F1F3F6 50%, #E5E7EB 70%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.8s ease-in-out infinite",
        borderRadius: 8,
        width: "60%",
      }}
    />
  </div>
);

// Individual Faculty Card
const FacultyCard = ({ member, index }) => {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage =
    member.image && !member.image.includes("placeholder") && !imgFailed;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      style={{
        background: "#fff",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 16px 36px rgba(30,58,138,0.16)"
          : "0 4px 24px rgba(30,58,138,0.08)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        position: "relative",
        cursor: "default",
        outline: "none",
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
        animation: `fadeSlideUp 0.5s ease ${index * 80}ms both`,
      }}
    >
      {/* Visible focus ring for keyboard navigation */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            boxShadow: `0 0 0 2px ${THEME.from}40`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      )}

      {/* Top gradient accent strip */}
      <div
        style={{
          height: 5,
          background: `linear-gradient(90deg, ${THEME.from}, ${THEME.accent})`,
        }}
      />

      <div style={{ padding: "30px 28px 26px" }}>
        {/* Top row: avatar + name/subject */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 18,
            marginBottom: 22,
          }}
        >
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                background: hasImage
                  ? "transparent"
                  : `linear-gradient(135deg, ${THEME.from}, ${THEME.to})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `3px solid ${THEME.light}`,
                boxShadow: `0 0 0 3px ${THEME.from}20`,
                overflow: "hidden",
              }}
            >
              {hasImage ? (
                <img
                  src={member.image}
                  alt={member.name}
                  onError={() => setImgFailed(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span
                  style={{
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 27,
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
                aria-label="Currently enrolling"
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 16,
                  height: 16,
                  background: "#10B981",
                  borderRadius: "50%",
                  border: "2.5px solid #fff",
                  boxShadow: "0 0 6px #10B98180",
                }}
              />
            )}
          </div>

          {/* Name + Subject badge */}
          <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
            <h3
              title={member.name}
              style={{
                fontSize: 19,
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: 8,
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
                gap: 6,
                padding: "4px 13px",
                borderRadius: 999,
                background: THEME.accentLight,
                color: "#92400E",
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: 0.3,
                border: `1px solid ${THEME.accent}40`,
                maxWidth: "100%",
              }}
            >
              <span aria-hidden="true">📚</span>
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {member.subject}
              </span>
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, #1E3A8A1A, transparent)",
            marginBottom: 20,
          }}
        />

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11.5,
                color: "#94A3B8",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.8,
                marginBottom: 3,
              }}
            >
              Experience
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: THEME.from,
                  lineHeight: 1,
                }}
              >
                {member.experience}+
              </span>
              <span style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>
                Years
              </span>
            </div>
            <ExperienceDots years={member.experience} />
          </div>

          {/* Availability tag */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 5,
            }}
          >
            <span
              style={{
                fontSize: 11.5,
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
                gap: 6,
                padding: "5px 12px",
                borderRadius: 999,
                background: member.isAvailable ? "#ECFDF5" : "#FEF2F2",
                color: member.isAvailable ? "#059669" : "#DC2626",
                fontSize: 12,
                fontWeight: 700,
                border: `1px solid ${member.isAvailable ? "#6EE7B7" : "#FECACA"}`,
                whiteSpace: "nowrap",
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

        {/* CTA — always visible now, no hover-reveal animation */}
        <a
          href="#admission"
          style={{
            display: "block",
            textAlign: "center",
            padding: "12px",
            marginTop: 22,
            background: hovered
              ? `linear-gradient(90deg, ${THEME.from}, ${THEME.to})`
              : "#F1F5F9",
            color: hovered ? "#fff" : "#1E3A8A",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: 0.3,
            transition: "background 0.25s ease, color 0.25s ease",
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

  const fetchFaculty = async () => {
    setMeta({ loading: true, error: false });
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

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        .faculty-retry-btn:focus-visible {
          outline: 2px solid #1E3A8A;
          outline-offset: 2px;
        }
      `}</style>

      <section
        id="faculty"
        style={{
          padding: "80px 0",
          background:
            "linear-gradient(180deg, #0F1F4D 0%, #16306f 32%, #EEF2FF 70%, #F8FAFC 100%)",
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
              "radial-gradient(circle, #F59E0B22 0%, transparent 70%)",
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

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 18px",
                background: "rgba(245,158,11,0.15)",
                border: "1px solid rgba(245,158,11,0.4)",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 700,
                color: "#FCD34D",
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
                color: "#FFFFFF",
                marginBottom: 14,
                lineHeight: 1.2,
              }}
            >
              Meet Our{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #F59E0B, #FCD34D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Professional Instructors
              </span>
            </h2>
            <p
              style={{
                color: "rgba(219,234,254,0.85)",
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

          {/* Cards Grid — wider min card width = bigger cards, fewer per row */}
          {meta.loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 28,
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
                padding: "48px 24px",
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 4px 24px rgba(30,58,138,0.07)",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
              <p
                style={{
                  color: "#EF4444",
                  fontSize: 15,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Faculty data load nahi ho saka. Server check karein.
              </p>
              <button
                className="faculty-retry-btn"
                onClick={fetchFaculty}
                style={{
                  padding: "10px 24px",
                  background: "#1E3A8A",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(30,58,138,0.3)",
                }}
              >
                Try Again
              </button>
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
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 28,
              }}
            >
              {faculty.map((member, index) => (
                <FacultyCard
                  key={member._id || `${member.name}-${index}`}
                  member={member}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Bottom stats bar */}
          {!meta.loading && !meta.error && faculty.length > 0 && (
            <div
              style={{
                marginTop: 56,
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
                      faculty.reduce((s, f) => s + (f.experience || 0), 0) /
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
                      background: "linear-gradient(135deg, #F59E0B, #FCD34D)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "rgba(219,234,254,0.7)",
                      fontWeight: 600,
                    }}
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
