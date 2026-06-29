// backend/controllers/facultyController.js
const Faculty = require("../models/Faculty");
const { redis } = require("../config/db");

const CACHE_KEY = "academy_faculty_data";

// @desc    Get all faculty (With Upstash HTTP REST Caching)
const getFaculty = async (req, res) => {
  try {
    // 1. Fetch cache from Upstash REST
    const cachedFaculty = await redis.get(CACHE_KEY);

    if (cachedFaculty) {
      // Note: Upstash HTTP client automatically parses JSON objects in some versions,
      // but to be 100% secure, we check type.
      const parsedData =
        typeof cachedFaculty === "string"
          ? JSON.parse(cachedFaculty)
          : cachedFaculty;

      return res.status(200).json({
        success: true,
        source: "Upstash HTTP Redis Cache",
        count: parsedData.length,
        data: parsedData,
      });
    }

    // 2. Cache Miss - Fetch from MongoDB Atlas
    const faculty = await Faculty.find({ isAvailable: true }).sort({
      experience: -1,
    });

    // 3. Store in Upstash (TTL: 24 Hours)
    // stringify is safe for transfer
    await redis.set(CACHE_KEY, JSON.stringify(faculty), { ex: 86400 });

    return res.status(200).json({
      success: true,
      source: "MongoDB Atlas Database",
      count: faculty.length,
      data: faculty,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Add new faculty member
const addFaculty = async (req, res) => {
  try {
    const { name, subject, experience, image } = req.body;

    if (!name || !subject || !experience) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all required fields.",
        });
    }

    const newFaculty = await Faculty.create({
      name,
      subject,
      experience,
      image,
    });

    // Clear Cache
    await redis.del(CACHE_KEY);

    return res.status(201).json({
      success: true,
      message: "Faculty member added! Cache refreshed successfully.",
      data: newFaculty,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getFaculty, addFaculty };
