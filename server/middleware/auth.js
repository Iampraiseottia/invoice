const pool = require('../config/database');

const authenticateSession = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if session exists and is valid
    const sessionResult = await pool.query(
      "SELECT s.user_id, u.full_name, u.email FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.session_id = $1 AND s.expires_at > NOW()",
      [sessionId]
    );

    if (sessionResult.rows.length === 0) {
      // Clean up expired session
      await pool.query("DELETE FROM sessions WHERE session_id = $1", [sessionId]);
      res.clearCookie('sessionId');
      return res.status(401).json({ error: 'Session expired' });
    }

    // Attach user info to request
    req.user = {
      userId: sessionResult.rows[0].user_id,
      full_name: sessionResult.rows[0].full_name,
      email: sessionResult.rows[0].email
    };

    next();
  } catch (error) {
    console.error('Session authentication error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
};

// Set authentication to doesn't fail if no session
const optionalAuth = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (sessionId) {
      const sessionResult = await pool.query(
        "SELECT s.user_id, u.full_name, u.email FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.session_id = $1 AND s.expires_at > NOW()",
        [sessionId]
      );

      if (sessionResult.rows.length > 0) {
        req.user = {
          userId: sessionResult.rows[0].user_id,
          full_name: sessionResult.rows[0].full_name,
          email: sessionResult.rows[0].email
        };
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth error:', error);
    next(); 
  }
};

// Clean up expired sessions (call this periodically)
const cleanupExpiredSessions = async () => {
  try {
    await pool.query("DELETE FROM sessions WHERE expires_at < NOW()");
  } catch (error) {
    console.error('Session cleanup error:', error);
  }
};

module.exports = { 
  authenticateSession, 
  optionalAuth, 
  cleanupExpiredSessions 
};