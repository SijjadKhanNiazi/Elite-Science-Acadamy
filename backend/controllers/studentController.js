// backend/controllers/studentController.js
const Student = require("../models/Student");

// @desc    Get all enrolled students
// @route   GET /api/students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ enrolledAt: -1 });
    return res.status(200).json({ success: true, data: students });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Add a new enrolled student
// @route   POST /api/students
const addStudent = async (req, res) => {
  try {
    const { name, fatherName, grade, group, phone, address, rollNumber } =
      req.body;

    if (!name || !fatherName || !grade || !group || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields must be filled." });
    }

    const student = await Student.create({
      name,
      fatherName,
      grade,
      group,
      phone,
      address,
      rollNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Student enrolled successfully.",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a student record
// @route   DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found." });
    }
    return res
      .status(200)
      .json({ success: true, message: "Student record removed." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getStudents, addStudent, deleteStudent };
