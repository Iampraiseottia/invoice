// route/api.js
const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/database");
const { authenticateSession } = require("../middleware/auth");
const router = express.Router();

// User Authentication Routes

// Register user
router.post("/auth/register", async (req, res) => {
  try {
    const { full_name, email, phone_number, country, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Full name, email, and password are required",
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
        error: "User with this email already exists",
      });
    }

    // Hash password
    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users (full_name, email, phone_number, country, password_hash) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, phone_number, country, created_at`,
      [full_name, email, phone_number, country, password_hash]
    );

    const user = result.rows[0];

    // Create session
    const sessionId = require("crypto").randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO sessions (session_id, user_id, expires_at, user_agent, ip_address) 
       VALUES ($1, $2, $3, $4, $5)`,
      [sessionId, user.id, expiresAt, req.get("User-Agent"), req.ip]
    );

    // Set session cookie
    res.cookie("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
});

// Login user
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    // Get user with password hash
    const userResult = await pool.query(
      "SELECT id, full_name, email, phone_number, country, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const user = userResult.rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Create session
    const sessionId = require("crypto").randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO sessions (session_id, user_id, expires_at, user_agent, ip_address) 
       VALUES ($1, $2, $3, $4, $5)`,
      [sessionId, user.id, expiresAt, req.get("User-Agent"), req.ip]
    );

    res.cookie("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    // Remove password hash from response
    delete user.password_hash;

    res.json({
      success: true,
      message: "Login successful",
      redirect: "/html/invoice.html",
      user: user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
});

// Logout user
router.post("/auth/logout", authenticateSession, async (req, res) => {
  try {
    const sessionId = req.cookies.session_id;

    if (sessionId) {
      await pool.query("DELETE FROM sessions WHERE session_id = $1", [
        sessionId,
      ]);
    }

    res.clearCookie("session_id");
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      error: "Logout failed",
    });
  }
});

// User Profile Routes

// Get
router.get("/user/profile", authenticateSession, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, full_name, email, phone_number, country, profile_image_url, created_at FROM users WHERE id = $1",
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get profile",
    });
  }
});

// Update user profile
router.put("/user/profile", authenticateSession, async (req, res) => {
  try {
    const { full_name, email, phone_number, country, password } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({
        success: false,
        error: "Full name and email are required",
      });
    }

    const emailCheck = await pool.query(
      "SELECT id FROM users WHERE email = $1 AND id != $2",
      [email, req.user.userId]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Email is already taken",
      });
    }

    let updateParams = [
      full_name,
      email,
      phone_number,
      country,
      req.user.userId,
    ];
    let updateQuery = `
      UPDATE users SET 
      full_name = $1, email = $2, phone_number = $3, country = $4
      WHERE id = $5
      RETURNING id, full_name, email, phone_number, country, created_at
    `;

    if (password) {
      const saltRounds = 12;
      const password_hash = await bcrypt.hash(password, saltRounds);
      updateParams = [
        full_name,
        email,
        phone_number,
        country,
        password_hash,
        req.user.userId,
      ];
      updateQuery = `
        UPDATE users SET 
        full_name = $1, email = $2, phone_number = $3, country = $4, password_hash = $5
        WHERE id = $6
        RETURNING id, full_name, email, phone_number, country, created_at
      `;
    }

    const result = await pool.query(updateQuery, updateParams);

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update profile",
    });
  }
});

// Invoice Routes

// Create a new invoice
router.post("/invoices", authenticateSession, async (req, res) => {
  try {
    const {
      invoice_number,
      invoice_date,
      company_name,
      billing_address,
      country,
      terms_conditions,
      signature_image_data,
      logo_image_data,
      signature_path,
      logo_path,
      items,
    } = req.body;

    // Process signature image
    let signatureData = null,
      signatureFilename = null,
      signatureMimetype = null;
    if (signature_image_data && signature_image_data.startsWith("data:")) {
      const matches = signature_image_data.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        signatureMimetype = matches[1];
        signatureData = matches[2];
        signatureFilename = `signature_${Date.now()}.${
          signatureMimetype.split("/")[1]
        }`;
      }
    }

    // Process logo image
    let logoData = null,
      logoFilename = null,
      logoMimetype = null;
    if (logo_image_data && logo_image_data.startsWith("data:")) {
      const matches = logo_image_data.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        logoMimetype = matches[1];
        logoData = matches[2];
        logoFilename = `logo_${Date.now()}.${logoMimetype.split("/")[1]}`;
      }
    }

    // Calculate totals
    let subtotal = 0;
    let tax_total = 0;

    if (items && items.length > 0) {
      items.forEach((item) => {
        const amount = parseFloat(item.amount) || 0;
        const tax_percentage = parseFloat(item.tax_percentage) || 0;
        const tax_amount = (amount * tax_percentage) / 100;

        subtotal += amount;
        tax_total += tax_amount;
      });
    }

    const total_amount = subtotal + tax_total;

    // Insert invoice
    const invoiceResult = await pool.query(
      `INSERT INTO invoices 
       (user_id, invoice_number, invoice_date, company_name, billing_address, country, 
        terms_conditions, signature_image_data, signature_filename, signature_mimetype,
        logo_image_data, logo_filename, logo_mimetype, signature_path, logo_path,
        subtotal, tax_total, total_amount, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
       RETURNING *`,
      [
        req.user.userId,
        invoice_number,
        invoice_date,
        company_name,
        billing_address,
        country,
        terms_conditions,
        signatureData,
        signatureFilename,
        signatureMimetype,
        logoData,
        logoFilename,
        logoMimetype,
        signature_path,
        logo_path,
        subtotal,
        tax_total,
        total_amount,
        'completed'
      ]
    );

    const invoice = invoiceResult.rows[0];

    // Insert invoice items
    if (items && items.length > 0) {
      for (const item of items) {
        const amount = parseFloat(item.amount) || 0;
        const tax_percentage = parseFloat(item.tax_percentage) || 0;
        const tax_amount = (amount * tax_percentage) / 100;
        const line_total = amount + tax_amount;

        await pool.query(
          `INSERT INTO invoice_items 
           (invoice_id, description, amount, tax_percentage, tax_amount, line_total) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            invoice.id,
            item.description,
            amount,
            tax_percentage,
            tax_amount,
            line_total,
          ]
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice: invoice,
    });
  } catch (error) {
    console.error("Create invoice error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create invoice",
    });
  }
});

// Invoice count for user
router.get("/invoices/count", authenticateSession, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) as count FROM invoices WHERE user_id = $1",
      [req.user.userId]
    );

    res.json({
      success: true,
      count: parseInt(result.rows[0].count)
    });
  } catch (error) {
    console.error("Get invoice count error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get invoice count",
    });
  }
});


// Get user's invoices
router.get("/invoices", authenticateSession, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.*, 
       (SELECT json_agg(
          json_build_object(
            'id', ii.id,
            'description', ii.description,
            'amount', ii.amount,
            'tax_percentage', ii.tax_percentage,
            'tax_amount', ii.tax_amount,
            'line_total', ii.line_total
          )
        ) FROM invoice_items ii WHERE ii.invoice_id = i.id
       ) as items
       FROM invoices i 
       WHERE i.user_id = $1 
       ORDER BY i.created_at DESC`,
      [req.user.userId]
    );

    res.json({
      success: true,
      invoices: result.rows,
    });
  } catch (error) {
    console.error("Get invoices error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve invoices",
    });
  }
});

// Get a specific invoice
router.get("/invoices/:id", authenticateSession, async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const invoiceResult = await pool.query(
      "SELECT * FROM invoices WHERE id = $1 AND user_id = $2",
      [invoiceId, req.user.userId]
    );

    if (invoiceResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Invoice not found",
      });
    }

    const itemsResult = await pool.query(
      "SELECT * FROM invoice_items WHERE invoice_id = $1 ORDER BY id",
      [invoiceId]
    );

    const invoice = invoiceResult.rows[0];
    invoice.items = itemsResult.rows;

    // Convert base64 images back to data URLs for frontend
    if (invoice.signature_image_data && invoice.signature_mimetype) {
      invoice.signature_image_url = `data:${invoice.signature_mimetype};base64,${invoice.signature_image_data}`;
    }
    if (invoice.logo_image_data && invoice.logo_mimetype) {
      invoice.logo_image_url = `data:${invoice.logo_mimetype};base64,${invoice.logo_image_data}`;
    }

    res.json({
      success: true,
      invoice: invoice,
    });
  } catch (error) {
    console.error("Get invoice error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve invoice",
    });
  }
});

// Update an invoice
router.put("/invoices/:id", authenticateSession, async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const {
      invoice_number,
      invoice_date,
      company_name,
      billing_address,
      country,
      terms_conditions,
      signature_image_data,
      logo_image_data,
      signature_path,
      logo_path,
      items,
      status,
    } = req.body;

    // Check if invoice belongs to user
    const existingInvoice = await pool.query(
      "SELECT id FROM invoices WHERE id = $1 AND user_id = $2",
      [invoiceId, req.user.userId]
    );

    if (existingInvoice.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Invoice not found",
      });
    }

    // Process images
    let signatureData = null,
      signatureFilename = null,
      signatureMimetype = null;
    if (signature_image_data && signature_image_data.startsWith("data:")) {
      const matches = signature_image_data.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        signatureMimetype = matches[1];
        signatureData = matches[2];
        signatureFilename = `signature_${Date.now()}.${
          signatureMimetype.split("/")[1]
        }`;
      }
    }

    let logoData = null,
      logoFilename = null,
      logoMimetype = null;
    if (logo_image_data && logo_image_data.startsWith("data:")) {
      const matches = logo_image_data.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        logoMimetype = matches[1];
        logoData = matches[2];
        logoFilename = `logo_${Date.now()}.${logoMimetype.split("/")[1]}`;
      }
    }

    // Calculate totals
    let subtotal = 0;
    let tax_total = 0;

    if (items && items.length > 0) {
      items.forEach((item) => {
        const amount = parseFloat(item.amount) || 0;
        const tax_percentage = parseFloat(item.tax_percentage) || 0;
        const tax_amount = (amount * tax_percentage) / 100;

        subtotal += amount;
        tax_total += tax_amount;
      });
    }

    const total_amount = subtotal + tax_total;

    // Update invoice with support for both image data and file paths
    const updateResult = await pool.query(
      `UPDATE invoices SET 
       invoice_number = $1, invoice_date = $2, company_name = $3, billing_address = $4, 
       country = $5, terms_conditions = $6, signature_image_data = $7, signature_filename = $8,
       signature_mimetype = $9, logo_image_data = $10, logo_filename = $11, logo_mimetype = $12,
       signature_path = $13, logo_path = $14, subtotal = $15, tax_total = $16, total_amount = $17, status = $18
       WHERE id = $19 AND user_id = $20 
       RETURNING *`,
      [
        invoice_number,
        invoice_date,
        company_name,
        billing_address,
        country,
        terms_conditions,
        signatureData,
        signatureFilename,
        signatureMimetype,
        logoData,
        logoFilename,
        logoMimetype,
        signature_path,
        logo_path,
        subtotal,
        tax_total,
        total_amount,
        status || "draft",
        invoiceId,
        req.user.userId,
      ]
    );

    // Delete existing items
    await pool.query("DELETE FROM invoice_items WHERE invoice_id = $1", [
      invoiceId,
    ]);

    // Insert new items
    if (items && items.length > 0) {
      for (const item of items) {
        const amount = parseFloat(item.amount) || 0;
        const tax_percentage = parseFloat(item.tax_percentage) || 0;
        const tax_amount = (amount * tax_percentage) / 100;
        const line_total = amount + tax_amount;

        await pool.query(
          `INSERT INTO invoice_items 
           (invoice_id, description, amount, tax_percentage, tax_amount, line_total) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            invoiceId,
            item.description,
            amount,
            tax_percentage,
            tax_amount,
            line_total,
          ]
        );
      }
    }

    res.json({
      success: true,
      message: "Invoice updated successfully",
      invoice: updateResult.rows[0],
    });
  } catch (error) {
    console.error("Update invoice error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update invoice",
    });
  }
});

// Delete an invoice
router.delete("/invoices/:id", authenticateSession, async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const result = await pool.query(
      "DELETE FROM invoices WHERE id = $1 AND user_id = $2 RETURNING id",
      [invoiceId, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Invoice not found",
      });
    }

    res.json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    console.error("Delete invoice error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete invoice",
    });
  }
});

// Get dashboard statistics
router.get("/dashboard/stats", authenticateSession, async (req, res) => {
  try {
    const statsResult = await pool.query(
      `SELECT 
        COUNT(*) as total_invoices,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_invoices,
        COUNT(CASE WHEN status = 'sent' THEN 1 END) as sent_invoices,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_invoices,
        COALESCE(SUM(total_amount), 0) as total_amount,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END), 0) as paid_amount
       FROM invoices 
       WHERE user_id = $1`,
      [req.user.userId]
    );

    res.json({
      success: true,
      stats: statsResult.rows[0],
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve statistics",
    });
  }
});

// Image Gallery Routes

// Upload image
router.post("/gallery/upload", authenticateSession, async (req, res) => {
  try {
    const { image_name, image_data, image_type } = req.body;

    if (!image_data || !image_data.startsWith("data:")) {
      return res.status(400).json({
        success: false,
        error: "Invalid image data",
      });
    }

    const matches = image_data.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({
        success: false,
        error: "Invalid image format",
      });
    }

    const mimetype = matches[1];
    const base64Data = matches[2];

    const result = await pool.query(
      `INSERT INTO image_gallery (user_id, image_name, image_data, image_type, mimetype) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.user.userId, image_name, base64Data, image_type, mimetype]
    );

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: result.rows[0],
    });
  } catch (error) {
    console.error("Upload image error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to upload image",
    });
  }
});

// Get user's gallery images
router.get("/gallery/:type", authenticateSession, async (req, res) => {
  try {
    const imageType = req.params.type;

    const result = await pool.query(
      "SELECT id, image_name, image_data, mimetype, created_at FROM image_gallery WHERE user_id = $1 AND image_type = $2 ORDER BY created_at DESC",
      [req.user.userId, imageType]
    );

    // Convert to data URLs
    const images = result.rows.map((img) => ({
      ...img,
      image_url: `data:${img.mimetype};base64,${img.image_data}`,
    }));

    res.json({
      success: true,
      images: images,
    });
  } catch (error) {
    console.error("Get gallery error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve gallery images",
    });
  }
});

// Get next invoice number for user
router.get("/invoices/next-number", authenticateSession, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COALESCE(MAX(CAST(invoice_number AS INTEGER)), 0) as max_number 
       FROM invoices 
       WHERE user_id = $1 
       AND invoice_number ~ '^[0-9]+$'`,
      [req.user.userId]
    );

    const nextNumber = (result.rows[0].max_number || 0) + 1;

    res.json({
      success: true,
      next_invoice_number: nextNumber.toString(),
    });
  } catch (error) {
    console.error("Get next invoice number error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get next invoice number",
    });
  }
});

// SIgn up api call
router.post("/auth/signup", async (req, res) => {
  try {
    const { full_name, email, phone_number, Country, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and password are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users (full_name, email, phone_number, country, password_hash) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, phone_number, country, created_at`,
      [full_name, email, phone_number, Country, password_hash]
    );

    const user = result.rows[0];

    // Create session
    const sessionId = require("crypto").randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await pool.query(
      `INSERT INTO sessions (session_id, user_id, expires_at, user_agent, ip_address) 
       VALUES ($1, $2, $3, $4, $5)`,
      [sessionId, user.id, expiresAt, req.get("User-Agent"), req.ip]
    );

    // Set session cookie with consistent naming
    res.cookie("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      redirect: "/html/invoice.html",
      user: user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

//  auth check route
router.get("/auth/me", async (req, res) => {
  try {
    const sessionId = req.cookies.session_id;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
    }

    const sessionResult = await pool.query(
      `SELECT s.user_id, s.expires_at, u.full_name, u.email, u.phone_number, u.country
       FROM sessions s 
       JOIN users u ON s.user_id = u.id 
       WHERE s.session_id = $1 AND s.expires_at > NOW()`,
      [sessionId]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Session expired",
      });
    }

    const session = sessionResult.rows[0];
    res.json({
      success: true,
      user: {
        id: session.user_id,
        full_name: session.full_name,
        email: session.email,
        phone_number: session.phone_number,
        country: session.country,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(500).json({
      success: false,
      error: "Authentication check failed",
    });
  }
});

module.exports = router;
