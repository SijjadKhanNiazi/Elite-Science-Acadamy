// backend/controllers/admissionController.js
const Admission = require("../models/Admission");

// @desc    Submit Online Admission Form
// @route   POST /api/admissions
const submitAdmission = async (req, res) => {
  try {
    const { studentName, fatherName, grade, group, phone, address } = req.body;

    // Server-side validation
    if (!studentName || !fatherName || !grade || !group || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory." });
    }

    const application = await Admission.create({
      studentName,
      fatherName,
      grade,
      group,
      phone,
      address,
    });

    return res.status(201).json({
      success: true,
      message:
        "Alhamdulillah! Your admission application has been submitted successfully.",
      data: application,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { submitAdmission };
