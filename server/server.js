const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const { cleanupExpiredSessions } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://ease-invoice.vercel.app/"]
        : ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files from public directory
app.use(express.static(path.join(__dirname, "../public")));


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

// HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/html/:page", (req, res) => {
  const page = req.params.page;
  const allowedPages = ["login.html", "register.html", "invoice.html"];

  if (allowedPages.includes(page)) {
    res.sendFile(path.join(__dirname, `../public/html/${page}`));
  } else {
    res.status(404).sendFile(path.join(__dirname, "../public/index.html"));
  }
});

// Handle all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

setInterval(cleanupExpiredSessions, 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Session-based authentication enabled");
});

module.exports = app;
