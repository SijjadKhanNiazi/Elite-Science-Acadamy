// backend/models/Student.js
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
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
      required: [true, "Please select grade"],
      enum: [
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th (F.Sc)",
        "12th (F.Sc)",
      ],
    },
    group: {
      type: String,
      required: [true, "Please select group"],
      enum: [
        "General (Middle School)",
        "Science",
        "Arts",
        "Pre-Medical",
        "Pre-Engineering",
        "ICS (Computer Science)",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
      default: "Mianwali",
    },
    rollNumber: {
      type: String,
      trim: true,
      default: "",
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
