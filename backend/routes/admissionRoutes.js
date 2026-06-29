const express = require("express");
const router = express.Router();
const { submitAdmission } = require("../controllers/admissionController");
const Admission = require("../models/Admission"); // Ensure proper path to your schema
const { protectAdmin } = require("../middlewares/authMiddleware"); // Ensure proper path to your auth middleware

// 1. Public Submission Entry Point
router.route("/").post(submitAdmission);

// 2. Protected Dashboard Fetch Entry Point
router.route("/").get(protectAdmin, async (req, res) => {
  try {
    // Database se saari applications sorting order k sath nikalen
    const records = await Admission.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server encountered an error pulling documents.",
    });
  }
});

// 3. Protected Delete Entry Point
router.route("/:id").delete(protectAdmin, async (req, res) => {
  try {
    const record = await Admission.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: "Admission record not found." });
    }
    return res.status(200).json({ success: true, message: "Admission record deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
