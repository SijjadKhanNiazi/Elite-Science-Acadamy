// backend/models/Admission.js
const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    fatherName: {
      type: String,
      required: [true, "Father name is required"],
      trim: true,
    },
    grade: {
      type: String,
      required: [true, "Please select grade (6th to 12th)"],
      enum: [
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
        "Grade 10",
        "Grade 11",
        "Grade 12",
      ],
    },
    group: {
      type: String,
      required: [true, "Please select program/group"],
      enum: [
        "Middle School",
        "Science",
        "Arts",
        "Pre-Medical",
        "Pre-Engineering",
        "FA",
        "ICS/IT",
      ],
    },
    phone: {
      type: String,
      required: [true, "Contact phone number is required"],
    },
    address: {
      type: String,
      default: "Mianwali",
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Admission", AdmissionSchema);
