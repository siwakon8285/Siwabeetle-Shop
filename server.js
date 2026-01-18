/**
 * Server.js - เซิร์ฟเวอร์ Express สำหรับ Siwabeetle Shop
 * จัดการระบบ Authentication และ Order ของร้านค้า
 */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// SECURITY MIDDLEWARE
// ==========================================

// Helmet - ตั้งค่า HTTP security headers
app.use(helmet({
    contentSecurityPolicy: false, // ปิดไว้เพราะใช้ inline scripts
    crossOriginEmbedderPolicy: false
}));

// Rate Limiting - จำกัดจำนวน request ต่อ IP
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 100, // จำกัด 100 requests ต่อ IP ต่อ 15 นาที
    message: { message: 'คำขอมากเกินไป กรุณารอสักครู่แล้วลองใหม่' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limit เข้มงวดสำหรับ auth endpoints (ป้องกัน brute-force)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 5, // จำกัด 5 ครั้งต่อ IP (login/register)
    message: { message: 'พยายามเข้าสู่ระบบมากเกินไป กรุณารอ 15 นาที' },
    standardHeaders: true,
    legacyHeaders: false,
});

// ใช้ rate limiting กับทุก API
app.use('/api/', apiLimiter);

// ==========================================
// BASIC MIDDLEWARE
// ==========================================
app.use(cors());  // อนุญาต Cross-Origin requests
app.use(express.json());  // รับข้อมูล JSON จาก request body

// --- เส้นทาง API สำหรับระบบ Authentication ---

/**
 * API สมัครสมาชิก (Register)
 * @route POST /api/register
 * @param {string} username - ชื่อผู้ใช้ที่ต้องการสมัคร
 * @param {string} password - รหัสผ่าน
 * @returns {Object} ข้อมูลผู้ใช้ที่สมัครสำเร็จ (id, username)
 * 
 * ขั้นตอนการทำงาน:
 * 1. ตรวจสอบว่า username ซ้ำหรือไม่
 * 2. เข้ารหัส password ด้วย bcrypt
 * 3. บันทึกข้อมูลลงฐานข้อมูล PostgreSQL
 */
app.post('/api/register', authLimiter, async (req, res) => {
    const { username, password } = req.body;
    try {
        // ตรวจสอบว่า username มีอยู่แล้วหรือไม่
        const userCheck = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // เข้ารหัส password และบันทึกผู้ใช้ใหม่
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await db.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
            [username, passwordHash]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * API เข้าสู่ระบบ (Login)
 * @route POST /api/login
 * @param {string} username - ชื่อผู้ใช้
 * @param {string} password - รหัสผ่าน
 * @returns {Object} ข้อมูลผู้ใช้ (id, username, phone, address)
 * 
 * ขั้นตอนการทำงาน:
 * 1. ค้นหาผู้ใช้จาก username
 * 2. ตรวจสอบ password ด้วย bcrypt.compare
 * 3. ส่งข้อมูลผู้ใช้กลับไป (ไม่รวม password)
 */
app.post('/api/login', authLimiter, async (req, res) => {
    const { username, password } = req.body;
    try {
        // ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // ส่งข้อมูลผู้ใช้กลับ (ไม่รวม password_hash)
        res.json({
            id: user.rows[0].id,
            username: user.rows[0].username,
            phone: user.rows[0].phone,
            address: user.rows[0].address
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// --- เส้นทาง API สำหรับระบบ Order ---

/**
 * API สร้างคำสั่งซื้อ (Place Order)
 * @route POST /api/orders
 * @param {number} userId - ID ของผู้ใช้ที่สั่งซื้อ
 * @param {Array} items - รายการสินค้าที่สั่งซื้อ
 * @param {number} totalAmount - ยอดรวมทั้งหมด
 * @param {string} note - หมายเหตุเพิ่มเติม
 * @returns {Object} ข้อความยืนยันและ orderId
 * 
 * ขั้นตอนการทำงาน:
 * 1. เริ่ม transaction
 * 2. สร้าง order หลักในตาราง orders
 * 3. เพิ่มรายการสินค้าแต่ละชิ้นลงตาราง order_items
 * 4. Commit transaction เมื่อสำเร็จ หรือ Rollback เมื่อเกิดข้อผิดพลาด
 */
app.post('/api/orders', async (req, res) => {
    const { userId, items, totalAmount, note } = req.body;
    try {
        // เริ่ม transaction เพื่อให้แน่ใจว่าข้อมูลสมบูรณ์
        await db.query('BEGIN');

        // สร้าง order หลัก
        const orderResult = await db.query(
            'INSERT INTO orders (user_id, total_amount, note) VALUES ($1, $2, $3) RETURNING id',
            [userId, totalAmount, note]
        );
        const orderId = orderResult.rows[0].id;

        // เพิ่มรายการสินค้าแต่ละชิ้น
        for (const item of items) {
            await db.query(
                'INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES ($1, $2, $3, $4, $5)',
                [orderId, item.id, item.name, item.price, item.qty]
            );
        }

        // ยืนยัน transaction
        await db.query('COMMIT');
        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        // ยกเลิก transaction เมื่อเกิดข้อผิดพลาด
        await db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * เริ่มต้น server
 * รอรับ requests บน PORT ที่กำหนด
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
