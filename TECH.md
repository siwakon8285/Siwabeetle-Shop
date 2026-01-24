# Siwabeetle Shop - Technical Documentation

## ภาพรวมระบบ (System Overview)

**Siwabeetle Shop** เป็นร้านค้าออนไลน์สำหรับจำหน่ายด้วงและอุปกรณ์การเลี้ยง สร้างด้วยสถาปัตยกรรม Full-Stack JavaScript ประกอบด้วย:

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend**: Node.js + Express.js
- **Database**: Firebase Real-time Database + PostgreSQL
- **Authentication**: Firebase Auth + bcryptjs

---

## 🏗️ สถาปัตยกรรมระบบ (Architecture)

### Frontend Layer
```
Client Browser
├── index.html (UI Structure)
├── index.css (Styling & Design)
├── app.js (Main Application Logic - 3,078 lines)
└── Firebase SDK (Real-time Data Sync)
```

### Backend Layer
```
Node.js Server (server.js - 186 lines)
├── Express.js Framework
├── Security Middleware (Helmet, Rate Limiting)
├── API Endpoints (/api/register, /api/login, /api/orders)
└── PostgreSQL Connection (db.js)
```

### Database Layer
```
Firebase Real-time Database
├── products/ (ข้อมูลสินค้าและสต็อก)
├── users/ (โปรไฟล์ผู้ใช้)
├── orders/ (คำสั่งซื้อ)
└── wishlists/ (รายการโปรด)

PostgreSQL Database
├── users (ตารางผู้ใช้)
├── orders (คำสั่งซื้อหลัก)
└── order_items (รายการสินค้าในคำสั่งซื้อ)
```

---

## 📊 การทำงานของระบบ (System Workflow)

### 1. การเริ่มต้นระบบ (Initialization)
```javascript
// app.js - init() function
function init() {
    // 1. โหลดสินค้าเริ่มต้น (defaultProducts)
    renderProducts('all');
    
    // 2. เชื่อมต่อ Firebase Real-time Database
    database.ref('products').on('value', (snapshot) => {
        // Sync ข้อมูลสินค้าแบบ real-time
        products = Object.values(snapshot.val());
        renderProducts('all');
    });
    
    // 3. ตรวจสอบสถานะการเข้าสู่ระบบ
    auth.onAuthStateChanged((user) => {
        if (user) {
            // โหลดโปรไฟล์ผู้ใช้
            loadUserProfile(user);
        }
    });
}
```

### 2. การจัดการสินค้า (Product Management)
```javascript
// ข้อมูลสินค้า (17 รายการ)
const defaultProducts = [
    {
        id: 1,
        name: "ด้วงเฮอร์คิวลิส (เพศผู้)",
        category: "adult",
        price: 1200,
        image: "https://...",
        stock: 0,
        description: "ด้วงเฮอร์คิวลิส ขนาดใหญ่"
    }
    // ... อีก 16 รายการ
];

// หมวดหมู่สินค้า
const categories = ['adult', 'larva', 'set', 'accessory'];
```

### 3. ระบบตะกร้าสินค้า (Shopping Cart)
```javascript
// การเพิ่มสินค้าลงตะกร้า
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.qty += quantity;
    } else {
        cart.push({ ...product, qty: quantity });
    }
    
    updateCartUI();
    saveCartToSession();
}

// การคำนวณราคา
function calculateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = 100;
    return { subtotal, shipping, total: subtotal + shipping };
}
```

### 4. ระบบ Authentication
```javascript
// Firebase Authentication
auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
        // เข้าสู่ระบบสำเร็จ
        const user = userCredential.user;
        loadUserProfile(user);
    })
    .catch(error => {
        console.error('Login Error:', error);
    });

// Backend Authentication (server.js)
app.post('/api/login', authLimiter, async (req, res) => {
    const { username, password } = req.body;
    
    // ค้นหาผู้ใช้ใน PostgreSQL
    const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    
    // ตรวจสอบรหัสผ่านด้วย bcrypt
    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
    
    if (isMatch) {
        res.json({ id: user.id, username: user.username });
    }
});
```

### 5. ระบบคำสั่งซื้อ (Order System)
```javascript
// การสร้างคำสั่งซื้อ
async function createOrder(cartItems, deliveryInfo) {
    const orderId = generateOrderId(); // SWB-YYYYMMDD-XXXX
    
    const orderData = {
        orderId: orderId,
        userId: userProfile.uid,
        items: cartItems,
        total: calculateCartTotal().total,
        deliveryInfo: sanitizeHTML(deliveryInfo),
        status: 'pending_payment',
        createdAt: new Date().toISOString()
    };
    
    // บันทึกลง Firebase
    await database.ref('orders/' + orderId).set(orderData);
    
    // บันทึกลง PostgreSQL (Backend)
    await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
            userId: userProfile.uid,
            items: cartItems,
            totalAmount: orderData.total
        })
    });
    
    return orderData;
}
```

---

## 🔐 ความปลอดภัย (Security Implementation)

### Frontend Security
```javascript
// XSS Prevention
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
}

// Input Validation
function isValidPhone(phone) {
    return /^0[689]\d{8}$/.test(phone.replace(/[-\s]/g, ''));
}

// reCAPTCHA v3 Integration
async function getRecaptchaToken(action) {
    return grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
}
```

### Backend Security
```javascript
// Rate Limiting
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // จำกัด 5 ครั้งต่อ 15 นาที
    message: { message: 'พยายามเข้าสู่ระบบมากเกินไป' }
});

// Password Hashing
const passwordHash = await bcrypt.hash(password, 10);

// Security Headers
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
```

---

## 📁 โครงสร้างไฟล์ (File Structure)

```
Siwabeetle Shop/
├── index.html          # หน้าเว็บหลัก (534 lines)
├── index.css           # สไตล์หน้าเว็บ (3,746 lines)
├── app.js              # โลจิกหลักของแอป (3,078 lines)
├── server.js           # Express API Server (186 lines)
├── db.js               # PostgreSQL Connection (16 lines)
├── schema.sql          # โครงสร้างฐานข้อมูล (30 lines)
├── package.json        # Dependencies และ Scripts
├── .env                # Environment Variables
├── firebase-rules.json # Firebase Security Rules
└── images/             # รูปภาพสินค้าและ UI
```

---

## 🗄️ ฐานข้อมูล (Database Schema)

### Firebase Real-time Database Structure
```json
{
  "products": [
    {
      "id": 1,
      "name": "ด้วงเฮอร์คิวลิส",
      "category": "adult",
      "price": 1200,
      "stock": 5,
      "image": "https://...",
      "description": "..."
    }
  ],
  "users": {
    "userId": {
      "username": "siwakon",
      "email": "user@example.com",
      "avatar": "images/beetle_avatar.png",
      "deliveryInfo": {
        "name": "ชื่อผู้รับ",
        "phone": "08xxxxxxxx",
        "address": "ที่อยู่..."
      }
    }
  },
  "orders": {
    "SWB-20260124-ABCD1234": {
      "orderId": "SWB-20260124-ABCD1234",
      "userId": "userId",
      "items": [...],
      "total": 2500,
      "status": "pending_payment",
      "createdAt": "2026-01-24T..."
    }
  }
}
```

### PostgreSQL Tables
```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    note TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL
);
```

---

## 🔄 การไหลของข้อมูล (Data Flow)

### 1. การเข้าชมเว็บไซต์
```
User → Browser → index.html → app.js → Firebase → Render Products
```

### 2. การล็อกอิน
```
User → Login Form → Firebase Auth → Backend Verification → Session Storage
```

### 3. การสั่งซื้อสินค้า
```
User → Add to Cart → Checkout → Payment → Firebase Order → PostgreSQL Order → Confirmation
```

### 4. การจัดการสต็อก (Admin)
```
Admin → Admin Panel → Update Stock → Firebase Real-time Sync → Frontend Update
```

---

## 🚀 การ Deploy และ Environment

### Required Environment Variables (.env)
```
# Database Configuration
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=siwabeetle_shop
DB_PASSWORD=your_db_password
DB_PORT=5432

# Server Configuration
PORT=5000
NODE_ENV=production

# Firebase Configuration (ใน app.js)
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_DATABASE_URL=your_db_url
```

### Dependencies (package.json)
```json
{
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^4.19.2",
    "express-rate-limit": "^8.2.1",
    "helmet": "^8.1.0",
    "pg": "^8.16.3"
  }
}
```

---

## 📊 ฟีเจอร์หลัก (Key Features)

### 1. ระบบสินค้า
- 17 รายการสินค้าใน 4 หมวดหมู่
- ค้นหาแบบ real-time
- กรองตามหมวดหมู่
- รายละเอียดสินค้าพร้อมรูปภาพ

### 2. ระบบผู้ใช้
- Firebase Authentication
- โปรไฟล์ส่วนตัวพร้อมอวาตาร์
- บันทึกข้อมูลการจัดส่ง
- ประวัติการสั่งซื้อ

### 3. ระบบการชำระเงิน
- PromptPay QR Code
- คำนวณค่าจัดส่งอัตโนมัติ
- การยืนยันการชำระเงิน

### 4. ระบบผู้ดูแล
- จัดการสต็อกสินค้า
- รายงานการขาย
- วิเคราะห์ข้อมูลลูกค้า

---

## 🔧 การบำรุงรักษา (Maintenance)

### การ Backup
- Firebase: Automatic backup
- PostgreSQL: Daily backup script
- Images: Cloud storage backup

### การ Monitor
- Server uptime monitoring
- Database performance
- Error tracking (console logs)

### การ Update
- Security patches
- Dependency updates
- Feature enhancements

---

## 📈 สถิติโค้ด (Code Statistics)

- **Total Files**: 10 main files
- **Total Lines**: ~7,500+ lines
- **Languages**: JavaScript, HTML, CSS, SQL
- **Frameworks**: Firebase, Express.js
- **Database**: Firebase + PostgreSQL

---

*Last Updated: 24 January 2026*
*Version: 1.0.0*



-------------------------------------
คำแนะนำในการพัฒนา Siwabeetle Shop เพิ่มเติม
🚀 ฟีเจอร์ที่ควรเพิ่ม
1. ระบบการชำระเงินขั้นสูง
Multiple Payment Methods: เพิ่ม TrueMoney, บัตรเครดิต, โอนเงินธนาคาร
Payment Gateway Integration: Stripe/Omise สำหรับการชำระเงินออนไลน์
Automatic Payment Confirmation: ตรวจสอบการชำระเงินอัตโนมัติ
2. ระบบจัดการสินค้าขั้นสูง
Product Variants: ขนาด/สี/รุ่นย่อยของสินค้า
Inventory Management: แจ้งเตือนสต็อกต่ำ, การนำเข้าสินค้าอัตโนมัติ
Product Reviews: ระบบรีวิวและให้คะแนนสินค้า
Related Products: สินค้าที่เกี่ยวข้อง/แนะนำ
3. ระบบสมาชิกและสิทธิพิเศษ
Membership Tiers: ระดับสมาชิก (Silver, Gold, Platinum)
Points System: สะสมแต้มแลกส่วนลด
Promo Codes: ระบบคูปองส่วนลด
Referral Program: ระบบแนะนำเพื่อนรับส่วนลด
4. ระบบการจัดส่ง
Shipping Options: Kerry, Flash, J&T พร้อมคำนวณค่าจัดส่งอัตโนมัติ
Order Tracking: ติดตามสถานะการจัดส่งแบบ real-time
Shipping Zones: กำหนดพื้นที่จัดส่งและค่าบริการ
5. ระบบการตลาดและขาย
Email Marketing: อีเมล์ตลาดอัตโนมัติ
Abandoned Cart Recovery: แจ้งเตือนตะกร้าที่ทิ้งไว้
Flash Sales: ระบบลดราคาแบบจำกัดเวลา
Bundle Deals: แพ็คเกจสินค้าราคาพิเศษ
🔧 การปรับปรุงด้านเทคนิค
1. Performance Optimization
javascript
// เพิ่ม Lazy Loading สำหรับรูปภาพ
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
        }
    });
});
2. Progressive Web App (PWA)
Service Worker: ให้ใช้งาน offline ได้
App Manifest: ติดตั้งเป็นแอปบนมือถือ
Push Notifications: แจ้งเตือนโปรโมชั่น
3. SEO Optimization
Meta Tags: ปรับปรุง title, description สำหรับแต่ละหน้า
Structured Data: Schema.org สำหรับสินค้า
Sitemap: สร้าง sitemap.xml
4. ระบบ Analytics
Google Analytics 4: ติดตามพฤติกรรมผู้ใช้
Heatmaps: Hotjar หรือ Clarity วิเคราะห์การใช้งาน
Conversion Tracking: ติดตามการซื้อสินค้า
🛡️ ความปลอดภัยที่ควรเพิ่ม
1. การป้องกันฟอกซ์
Fraud Detection: ตรวจจับการสั่งซื้อผิดปกติ
Rate Limiting: จำกัดคำขอต่อผู้ใช้
IP Blocking: บล็อก IP ที่น่าสงสัย
2. การปกป้องข้อมูล
GDPR Compliance: นโยบายความเป็นส่วนตัว
Data Encryption: เข้ารหัสข้อมูลสำคัญ
Regular Backups: สำรองข้อมูลอัตโนมัติ
📱 ประสบการณ์ผู้ใช้ (UX)
1. Mobile Optimization
Responsive Design: ปรับปรุงการแสดงผลบนมือถือ
Touch Gestures: สวิป, พินช์ สำหรับรูปภาพ
Mobile-First Design: ออกแบบให้มือถือเป็นหลัก
2. การค้นหาและกรอง
Advanced Search: ค้นหาแบบละเอียด (ราคา, หมวดหมู่, คะแนน)
Search Suggestions: แนะนำคำค้นหาอัตโนมัติ
Filter Persistence: จำการกรองของผู้ใช้
3. การแสดงผลสินค้า
360° Product View: ดูสินค้ารอบด้าน
Video Gallery: วิดีโอแสดงสินค้า
AR Preview: ดูตัวอย่างสินค้าในพื้นที่จริง
📊 ระบบรายงานขั้นสูง
1. Dashboard สำหรับ Admin
javascript
// ตัวอย่างฟังก์ชันวิเคราะห์ขั้นสูง
const advancedAnalytics = {
    salesByMonth: () => calculateMonthlySales(),
    topCustomers: () => getTopCustomers(),
    productPerformance: () => analyzeProductMetrics(),
    conversionRate: () => calculateConversionRate()
};
2. รายงานอัตโนมัติ
Daily Sales Report: ส่งรายงานยอดขายทุกวัน
Inventory Alert: แจ้งเตือนสต็อกต่ำ
Customer Insights: วิเคราะห์พฤติกรรมลูกค้า
🌐 การขยายตลาด
1. Multi-language Support
English Version: รองรับลูกค้าต่างชาติ
Currency Converter: แปลงสกุลเงินอัตโนมัติ
Local Payment: รองรับการชำระเงินในแต่ละประเทศ
2. Social Media Integration
Social Login: ล็อกอินด้วย Facebook/Google
Share Products: แชร์สินค้าลงโซเชียล
Instagram Shopping: เชื่อมต่อกับ Instagram Shop
💡 คำแนะนำเฉพาะสำหรับร้านด้วง
1. ฟีเจอร์เฉพาะทาง
Beetle Care Guide: คู่มือการเลี้ยงดู
Growth Tracker: ติดตามการเจริญเติบโตของด้วง
Community Forum: ชุมชนคนรักด้วง
Expert Q&A: ปรึกษาผู้เชี่ยวชาญ
2. การจัดการสินค้ามีชีวิต
Health Certificate: ใบรับรองสุขภาพด้วง
Lifespan Tracking: ติดตามอายุขัยของด้วง
Seasonal Availability: สินค้าตามฤดูกาล
การพัฒนาเหล่านี้จะทำให้ Siwabeetle Shop เป็นแพลตฟอร์ม e-commerce ที่สมบูรณ์แบบและพร้อมแข่งขันในตลาดออนไลน์