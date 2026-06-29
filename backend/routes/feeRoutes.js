// backend/routes/feeRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllFees,
  getStudentFees,
  addFeeRecord,
  deleteFeeRecord,
} = require("../controllers/feeController");
const { protectAdmin } = require("../middlewares/authMiddleware");

router.route("/").get(protectAdmin, getAllFees).post(protectAdmin, addFeeRecord);
router.route("/student/:studentId").get(protectAdmin, getStudentFees);
router.route("/:id").delete(protectAdmin, deleteFeeRecord);

module.exports = router;
