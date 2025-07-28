const express = require("express");
const pool = require("../config/database");
const { authenticateSession } = require("../middleware/auth");
const router = express.Router();

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
      signature_path,
      logo_path,
      items
    } = req.body;

    // Calculate totals
    let subtotal = 0;
    let tax_total = 0;
    
    if (items && items.length > 0) {
      items.forEach(item => {
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
        terms_conditions, signature_path, logo_path, subtotal, tax_total, total_amount) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
       RETURNING *`,
      [
        req.user.userId,
        invoice_number,
        invoice_date,
        company_name,
        billing_address,
        country,
        terms_conditions,
        signature_path,
        logo_path,
        subtotal,
        tax_total,
        total_amount
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
          [invoice.id, item.description, amount, tax_percentage, tax_amount, line_total]
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice: invoice
    });
  } catch (error) {
    console.error("Create invoice error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create invoice"
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
      invoices: result.rows
    });
  } catch (error) {
    console.error("Get invoices error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve invoices"
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
        error: "Invoice not found"
      });
    }

    const itemsResult = await pool.query(
      "SELECT * FROM invoice_items WHERE invoice_id = $1 ORDER BY id",
      [invoiceId]
    );

    const invoice = invoiceResult.rows[0];
    invoice.items = itemsResult.rows;

    res.json({
      success: true,
      invoice: invoice
    });
  } catch (error) {
    console.error("Get invoice error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve invoice"
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
      signature_path,
      logo_path,
      items,
      status
    } = req.body;

    // Check if invoice belongs to user
    const existingInvoice = await pool.query(
      "SELECT id FROM invoices WHERE id = $1 AND user_id = $2",
      [invoiceId, req.user.userId]
    );

    if (existingInvoice.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Invoice not found"
      });
    }

    // Calculate totals
    let subtotal = 0;
    let tax_total = 0;
    
    if (items && items.length > 0) {
      items.forEach(item => {
        const amount = parseFloat(item.amount) || 0;
        const tax_percentage = parseFloat(item.tax_percentage) || 0;
        const tax_amount = (amount * tax_percentage) / 100;
        
        subtotal += amount;
        tax_total += tax_amount;
      });
    }

    const total_amount = subtotal + tax_total;

    // Update invoice
    const updateResult = await pool.query(
      `UPDATE invoices SET 
       invoice_number = $1, invoice_date = $2, company_name = $3, billing_address = $4, 
       country = $5, terms_conditions = $6, signature_path = $7, logo_path = $8,
       subtotal = $9, tax_total = $10, total_amount = $11, status = $12
       WHERE id = $13 AND user_id = $14 
       RETURNING *`,
      [
        invoice_number, invoice_date, company_name, billing_address, country,
        terms_conditions, signature_path, logo_path, subtotal, tax_total, 
        total_amount, status || 'draft', invoiceId, req.user.userId
      ]
    );

    // Delete existing items
    await pool.query("DELETE FROM invoice_items WHERE invoice_id = $1", [invoiceId]);

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
          [invoiceId, item.description, amount, tax_percentage, tax_amount, line_total]
        );
      }
    }

    res.json({
      success: true,
      message: "Invoice updated successfully",
      invoice: updateResult.rows[0]
    });
  } catch (error) {
    console.error("Update invoice error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update invoice"
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
        error: "Invoice not found"
      });
    }

    res.json({
      success: true,
      message: "Invoice deleted successfully"
    });
  } catch (error) {
    console.error("Delete invoice error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete invoice"
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
      stats: statsResult.rows[0]
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve statistics"
    });
  }
});

module.exports = router;