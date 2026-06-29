const express = require("express");
const router = express.Router();
const { getFaculty, addFaculty } = require("../controllers/facultyController");

router.route("/").get(getFaculty).post(addFaculty);

module.exports = router;
