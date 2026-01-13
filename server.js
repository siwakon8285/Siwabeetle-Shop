const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- User Authentication Routes ---

// Register
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const userCheck = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

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

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

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

// --- Order Routes ---

// Place Order
app.post('/api/orders', async (req, res) => {
    const { userId, items, totalAmount, note } = req.body;
    try {
        // Start transaction
        await db.query('BEGIN');

        const orderResult = await db.query(
            'INSERT INTO orders (user_id, total_amount, note) VALUES ($1, $2, $3) RETURNING id',
            [userId, totalAmount, note]
        );
        const orderId = orderResult.rows[0].id;

        for (const item of items) {
            await db.query(
                'INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES ($1, $2, $3, $4, $5)',
                [orderId, item.id, item.name, item.price, item.qty]
            );
        }

        await db.query('COMMIT');
        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        await db.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
