
const pool = require("../config/database");

const authenticateSession = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId || req.cookies.session_id;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    // Check if session exists and is valid
    const sessionResult = await pool.query(
      `SELECT s.user_id, s.expires_at, u.full_name, u.email 
       FROM sessions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.session_id = $1 AND s.expires_at > NOW()`,
      [sessionId]
    );

    if (sessionResult.rows.length === 0) {
      await pool.query("DELETE FROM sessions WHERE session_id = $1", [
        sessionId,
      ]);
      res.clearCookie("sessionId");
      res.clearCookie("session_id");
      return res.status(401).json({
        success: false,
        error: "Session expired. Please log in again.",
      });
    }

    const session = sessionResult.rows[0];

    // Attach user info to request
    req.user = {
      userId: session.user_id,
      full_name: session.full_name,
      email: session.email,
      phone_number: session.phone_number,
      country: session.country,
    };

    await pool.query(
      "UPDATE sessions SET expires_at = $1 WHERE session_id = $2",
      [new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), sessionId]
    );

    next();
  } catch (error) {
    console.error("Session authentication error:", error);
    res.status(500).json({
      success: false,
      error: "Authentication failed",
    });
  }
};

// Set authentication to doesn't fail if no session
const optionalAuth = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId || req.cookies.session_id;

    if (sessionId) {
      const sessionResult = await pool.query(
        `SELECT s.user_id, s.expires_at, u.full_name, u.email 
         FROM sessions s 
         JOIN users u ON s.user_id = u.id 
         WHERE s.session_id = $1 AND s.expires_at > NOW()`,
        [sessionId]
      );

      if (sessionResult.rows.length > 0) {
        const session = sessionResult.rows[0];
        req.user = {
          userId: session.user_id,
          full_name: session.full_name,
          fullName: session.full_name,
          email: session.email,
        };
      }
    }

    next();
  } catch (error) {
    console.error("Optional auth error:", error);
    next();
  }
};

// Clean up expired sessions
const cleanupExpiredSessions = async () => {
  try {
    await pool.query("DELETE FROM sessions WHERE expires_at < NOW()");
  } catch (error) {
    console.error("Session cleanup error:", error);
  }
};

module.exports = {
  authenticateSession,
  optionalAuth,
  cleanupExpiredSessions,
};
