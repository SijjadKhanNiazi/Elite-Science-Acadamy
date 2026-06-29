// backend/config/db.js
const mongoose = require("mongoose");
const { Redis } = require("@upstash/redis");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Elite Science Academy MongoDB Connected...");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Initialize Upstash Redis using HTTP REST Client safely
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  console.log(" Upstash HTTP REST Redis Layer Initialized Securely...");
} else {
  console.log(
    " Upstash Redis configuration variables are missing inside environment context.",
  );
}

module.exports = { connectDB, redis };
