// backend/models/Faculty.js
const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a faculty name"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Please specify the subject"],
      trim: true,
    },
    experience: {
      type: Number,
      required: [true, "Please add years of experience"],
    },
    image: {
      type: String, // Cloudinary image URL yahan save hoga
      default: "https://via.placeholder.com/150",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Faculty", FacultySchema);
