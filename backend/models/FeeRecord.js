// backend/models/FeeRecord.js
const mongoose = require("mongoose");

const FeeRecordSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student reference is required"],
    },
    month: {
      type: String,
      required: [true, "Month is required (e.g. June 2025)"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Fee amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeeRecord", FeeRecordSchema);
