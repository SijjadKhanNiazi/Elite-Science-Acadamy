// backend/controllers/feeController.js
const FeeRecord = require("../models/FeeRecord");

// @desc    Get all fee records (with student name populated)
// @route   GET /api/fees
const getAllFees = async (req, res) => {
  try {
    const fees = await FeeRecord.find()
      .populate("student", "name fatherName grade group rollNumber")
      .sort({ paidAt: -1 });
    return res.status(200).json({ success: true, data: fees });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get fee records for a specific student
// @route   GET /api/fees/student/:studentId
const getStudentFees = async (req, res) => {
  try {
    const fees = await FeeRecord.find({ student: req.params.studentId })
      .populate("student", "name fatherName grade group rollNumber")
      .sort({ paidAt: -1 });
    return res.status(200).json({ success: true, data: fees });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Add a new fee record
// @route   POST /api/fees
const addFeeRecord = async (req, res) => {
  try {
    const { student, month, amount, isPaid, remarks } = req.body;

    if (!student || !month || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Student, month, and amount are required.",
      });
    }

    const record = await FeeRecord.create({
      student,
      month,
      amount,
      isPaid: isPaid !== undefined ? isPaid : true,
      remarks,
    });

    const populated = await record.populate(
      "student",
      "name fatherName grade group rollNumber"
    );

    return res.status(201).json({
      success: true,
      message: "Fee record added successfully.",
      data: populated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a fee record
// @route   DELETE /api/fees/:id
const deleteFeeRecord = async (req, res) => {
  try {
    const record = await FeeRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Fee record not found." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Fee record deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAllFees, getStudentFees, addFeeRecord, deleteFeeRecord };
