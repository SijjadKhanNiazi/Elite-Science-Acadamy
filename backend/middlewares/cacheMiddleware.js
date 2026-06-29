// backend/middleware/cacheMiddleware.js
const Redis = require("ioredis");

// Connect to Upstash Redis using your ENV connection string
const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => console.log("⚡ Redis Cache Connected Successfully"));
redis.on("error", (err) => console.error("Redis connection error:", err));

const cacheFaculty = async (req, res, next) => {
  const cacheKey = "academy_faculty_data";

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      // Cache hit - Serve immediately from Redis
      return res.status(200).json({
        success: true,
        source: "Redis Cache Layer",
        data: JSON.parse(cachedData),
      });
    }

    // Cache miss - proceed to MongoDB Controller, inject redis instance to res
    res.redis = redis;
    res.cacheKey = cacheKey;
    next();
  } catch (error) {
    console.error("Redis Middleware Error:", error);
    next(); // Fallback to database seamlessly if Redis fails
  }
};

module.exports = { cacheFaculty, redis };
