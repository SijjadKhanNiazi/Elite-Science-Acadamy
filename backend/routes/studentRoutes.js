// backend/routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const {
  getStudents,
  addStudent,
  deleteStudent,
} = require("../controllers/studentController");
const { protectAdmin } = require("../middlewares/authMiddleware");

router.route("/").get(protectAdmin, getStudents).post(protectAdmin, addStudent);
router.route("/:id").delete(protectAdmin, deleteStudent);

module.exports = router;
