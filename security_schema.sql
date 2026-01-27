-- Security and Compliance Schema for Siwabeetle Shop

-- Suspicious Orders Table (Fraud Detection)
CREATE TABLE IF NOT EXISTS suspicious_orders (
    id SERIAL PRIMARY KEY,
    ip_address INET NOT NULL,
    order_data JSONB NOT NULL,
    user_agent TEXT,
    risk_score INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending_review', -- pending_review, approved, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    reviewed_by INTEGER REFERENCES users(id)
);

-- IP Blacklist Table
CREATE TABLE IF NOT EXISTS ip_blacklist (
    id SERIAL PRIMARY KEY,
    ip_address INET UNIQUE NOT NULL,
    reason TEXT,
    blocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    blocked_by INTEGER REFERENCES users(id),
    expires_at TIMESTAMP, -- NULL for permanent blocks
    is_active BOOLEAN DEFAULT true
);

-- Data Encryption Keys Table
CREATE TABLE IF NOT EXISTS encryption_keys (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    encrypted_key TEXT NOT NULL,
    algorithm VARCHAR(50) DEFAULT 'aes-256-cbc',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- GDPR Compliance - User Consent Tracking
CREATE TABLE IF NOT EXISTS user_consent (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    consent_type VARCHAR(50) NOT NULL, -- privacy_policy, marketing, cookies
    granted BOOLEAN NOT NULL,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Data Processing Records (GDPR Article 30)
CREATE TABLE IF NOT EXISTS data_processing_records (
    id SERIAL PRIMARY KEY,
    process_name VARCHAR(100) NOT NULL,
    process_description TEXT,
    data_categories TEXT[], -- Array of data types processed
    purpose VARCHAR(200),
    legal_basis VARCHAR(100),
    data_retention_period VARCHAR(50),
    security_measures TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Backup Logs Table
CREATE TABLE IF NOT EXISTS backup_logs (
    id SERIAL PRIMARY KEY,
    backup_type VARCHAR(50) NOT NULL, -- database, files, full
    backup_path VARCHAR(500),
    backup_size BIGINT,
    status VARCHAR(20) DEFAULT 'in_progress', -- in_progress, completed, failed
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    error_message TEXT
);

-- Audit Log Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Beetle Care Guide Content
CREATE TABLE IF NOT EXISTS beetle_care_guides (
    id SERIAL PRIMARY KEY,
    beetle_species VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    difficulty_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced
    estimated_lifespan VARCHAR(50),
    temperature_range VARCHAR(50),
    humidity_range VARCHAR(50),
    food_recommendations TEXT,
    common_issues TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT false
);

-- Beetle Growth Tracker
CREATE TABLE IF NOT EXISTS beetle_growth_tracker (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    beetle_id VARCHAR(50) NOT NULL, -- User-defined identifier
    species VARCHAR(100) NOT NULL,
    stage VARCHAR(50) NOT NULL, -- egg, larva L1, larva L2, larva L3, pupa, adult
    current_size DECIMAL(5,2), -- in cm
    weight DECIMAL(6,2), -- in grams
    temperature DECIMAL(4,1), -- Celsius
    humidity DECIMAL(4,1), -- Percentage
    last_fed DATE,
    notes TEXT,
    image_url VARCHAR(500),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Community Forum Categories
CREATE TABLE IF NOT EXISTS forum_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- Community Forum Posts
CREATE TABLE IF NOT EXISTS forum_posts (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES forum_categories(id),
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    image_urls TEXT[], -- Array of image URLs
    tags TEXT[],
    view_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_reply_at TIMESTAMP
);

-- Forum Replies
CREATE TABLE IF NOT EXISTS forum_replies (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES forum_posts(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    image_urls TEXT[],
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expert Q&A Sessions
CREATE TABLE IF NOT EXISTS expert_sessions (
    id SERIAL PRIMARY KEY,
    expert_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMP NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    max_participants INTEGER,
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, live, completed, cancelled
    meeting_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expert Q&A Questions
CREATE TABLE IF NOT EXISTS expert_questions (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES expert_sessions(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    question TEXT NOT NULL,
    answer TEXT,
    is_answered BOOLEAN DEFAULT false,
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answered_at TIMESTAMP
);

-- Insert default forum categories
INSERT INTO forum_categories (name, description, icon, sort_order) VALUES
('การเลี้ยงดูพื้นฐาน', 'คำแนะนำการเลี้ยงดูด้วงสำหรับผู้เริ่มต้น', 'fa-seedling', 1),
('โรคและปัญหาสุขภาพ', 'การวินิจฉัยและรักษาโรคที่พบบ่อยในด้วง', 'fa-heartbeat', 2),
('การเพาะพันธุ์', 'เทคนิคการเพาะพันธุ์ด้วงขั้นสูง', 'fa-dna', 3),
('พบปะสังสรรค์', 'พูดคุยแลกเปลี่ยนประสบการณ์', 'fa-comments', 4),
('ซื้อขายแลกเปลี่ยน', 'ห้องสำหรับซื้อขายแลกเปลี่ยนด้วง', 'fa-shopping-cart', 5)
ON CONFLICT (name) DO NOTHING;

-- Insert default GDPR processing records
INSERT INTO data_processing_records (process_name, process_description, data_categories, purpose, legal_basis, data_retention_period) VALUES
('User Registration', 'Processing user registration data', ARRAY['name', 'email', 'password', 'ip_address'], 'Account creation and authentication', 'User consent', 'Until account deletion'),
('Order Processing', 'Processing customer orders', ARRAY['name', 'address', 'phone', 'order_items', 'payment_info'], 'Order fulfillment and customer service', 'Contractual necessity', '7 years'),
('Email Marketing', 'Sending promotional emails', ARRAY['email', 'name', 'purchase_history'], 'Marketing and promotions', 'User consent', 'Until withdrawal of consent'),
('Analytics', 'Website usage analytics', ARRAY['ip_address', 'user_agent', 'pages_visited', 'session_duration'], 'Service improvement', 'Legitimate interest', '25 months')
ON CONFLICT (process_name) DO NOTHING;
