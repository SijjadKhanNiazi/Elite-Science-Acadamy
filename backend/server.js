// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

// Load Passport Configuration
require("./config/passport");

const { connectDB } = require("./config/db.js");

const app = express();
app.set("trust proxy", 1);

// Connect Databases
connectDB();

// Middleware Setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Session cookies ko transfer karne k liye lazmi hai
  }),
);
app.use(express.json());

// Express Session Middleware Config
// backend/server.js ka session layer block completely update karein
// backend/server.js
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // HTTP localhost k liye false hona lazmi hai
      httpOnly: true, // Client-side scripting access block krne k liye
      sameSite: "lax", // Same-site lax different ports par cookies pass krne deta hai local environment me
      maxAge: 24 * 60 * 60 * 1000, // 24 Hours validity
    },
  }),
);

// Initialize Passport Session Tracking Layers
app.use(passport.initialize());
app.use(passport.session());

// Mount Endpoints
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/admissions", require("./routes/admissionRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/fees", require("./routes/feeRoutes"));

app.get("/", (req, res) => {
  res.send("Elite Science Academy Backend API with Passport.js is Live! 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Production Server running with Passport.js Session Management on port ${PORT}`,
  );
});
