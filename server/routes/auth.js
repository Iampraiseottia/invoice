
const express = require("express");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/database");
const router = express.Router();

// Session helper functions
const createSession = async (userId, req) => {
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await pool.query(
    "INSERT INTO sessions (session_id, user_id, expires_at, user_agent, ip_address) VALUES ($1, $2, $3, $4, $5)",
    [sessionId, userId, expiresAt, req.get("User-Agent"), req.ip]
  );

  return sessionId;
};

const destroySession = async (sessionId) => {
  await pool.query("DELETE FROM sessions WHERE session_id = $1", [sessionId]);
};

// Register endpoint
router.post("/signup", async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone_number,
      Country: country,
      password,
    } = req.body;

    // Validation
    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user
    const result = await pool.query(
      "INSERT INTO users (full_name, email, phone_number, country, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email",
      [full_name, email, phone_number, country, hashedPassword]
    );

    const user = result.rows[0];

    const sessionId = await createSession(user.id, req);

    // Set session cookie
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
      redirect: "/html/invoice.html",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    const result = await pool.query(
      "SELECT id, full_name, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const sessionId = await createSession(user.id, req);

    // Set session cookie
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
      },
      redirect: "/html/invoice.html",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// Logout endpoint
router.post("/logout", async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (sessionId) {
      await destroySession(sessionId);
    }

    res.clearCookie("sessionId");
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// Get current user endpoint
router.get("/me", async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
    }

    const sessionResult = await pool.query(
      "SELECT user_id FROM sessions WHERE session_id = $1 AND expires_at > NOW()",
      [sessionId]
    );

    if (sessionResult.rows.length === 0) {
      res.clearCookie("sessionId");
      return res.status(401).json({
        success: false,
        error: "Session expired",
      });
    }

    const userId = sessionResult.rows[0].user_id;

    const userResult = await pool.query(
      "SELECT id, full_name, email, phone_number, country FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      user: userResult.rows[0],
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// Update user profile endpoint
router.put("/profile", async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
    }

    const sessionResult = await pool.query(
      "SELECT user_id FROM sessions WHERE session_id = $1 AND expires_at > NOW()",
      [sessionId]
    );

    if (sessionResult.rows.length === 0) {
      res.clearCookie("sessionId");
      return res.status(401).json({
        success: false,
        error: "Session expired",
      });
    }

    const userId = sessionResult.rows[0].user_id;
    const { full_name, email, phone_number, country, password } = req.body;

    let query =
      "UPDATE users SET full_name = $1, email = $2, phone_number = $3, country = $4";
    let params = [full_name, email, phone_number, country];

    // If password is provided, hash it and include in update
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ", password_hash = $5";
      params.push(hashedPassword);
    }

    query +=
      " WHERE id = $" +
      (params.length + 1) +
      " RETURNING id, full_name, email, phone_number, country";
    params.push(userId);

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
