
-- Create database tables for the invoice system

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    country VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table for session management
CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    user_agent TEXT,
    ip_address INET
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) NOT NULL,
    invoice_date DATE NOT NULL,
    company_name TEXT,
    billing_address TEXT,
    country VARCHAR(100),
    terms_conditions TEXT,
    signature_path VARCHAR(500),
    logo_path VARCHAR(500),
    subtotal DECIMAL(10,2) DEFAULT 0,
    tax_total DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoice items table
CREATE TABLE IF NOT EXISTS invoice_items (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    tax_percentage DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    line_total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


    -- Add missing columns to invoices table
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS signature_image_data TEXT,
ADD COLUMN IF NOT EXISTS logo_image_data TEXT,
ADD COLUMN IF NOT EXISTS signature_path VARCHAR(255),
ADD COLUMN IF NOT EXISTS logo_path VARCHAR(255);

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'invoices' 
ORDER BY ordinal_position;



CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    invoice_number VARCHAR(100) NOT NULL,
    invoice_date DATE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    billing_address TEXT,
    country VARCHAR(100),
    terms_conditions TEXT,
    
    -- Image storage fields
    signature_image_data TEXT, -- Base64 encoded image data
    signature_filename VARCHAR(255),
    signature_mimetype VARCHAR(100),
    signature_path VARCHAR(500), -- File path if using file storage
    
    logo_image_data TEXT, -- Base64 encoded image data
    logo_filename VARCHAR(255),
    logo_mimetype VARCHAR(100),
    logo_path VARCHAR(500), -- File path if using file storage
    
    -- Financial fields
    subtotal DECIMAL(15,2) DEFAULT 0.00,
    tax_total DECIMAL(15,2) DEFAULT 0.00,
    total_amount DECIMAL(15,2) DEFAULT 0.00,
    
    -- Status and metadata
    status VARCHAR(50) DEFAULT 'draft', -- draft, sent, paid, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure unique invoice numbers per user
    UNIQUE(user_id, invoice_number)
);






CREATE TABLE IF NOT EXISTS image_gallery (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_name VARCHAR(255),
    image_data TEXT NOT NULL, -- Base64 encoded
    image_type VARCHAR(50), -- 'logo' or 'signature'
    mimetype VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to invoices table
DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at 
    BEFORE UPDATE ON invoices 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();














    -- Add missing columns to the invoices table
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS signature_filename VARCHAR(500),
ADD COLUMN IF NOT EXISTS logo_filename VARCHAR(500);

-- Optional: Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at);

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'invoices' 
ORDER BY ordinal_position;












-- Add the missing columns to your invoices table
-- Run these SQL commands in your database (Vercel Postgres)

ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS signature_mimetype VARCHAR(10000),
ADD COLUMN IF NOT EXISTS logo_mimetype VARCHAR(10000),
ADD COLUMN IF NOT EXISTS signature_filename VARCHAR(255),
ADD COLUMN IF NOT EXISTS logo_filename VARCHAR(255);

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'invoices' 
ORDER BY ordinal_position;