(function () {

    const defaultProducts = [
        {
            id: 1,
            name: "ด้วงเฮอร์คิวลิส (เพศผู้)",
            category: "adult",
            price: 1200,
            image: "https://jamjamexotic.com/cdn/shop/files/Untitled_Artwork2_1024x1024@2x.png?v=1711688851",
            stock: 0,
            description: "ด้วงเฮอร์คิวลิส ขนาดใหญ่ แข็งแรง สุขภาพดี"
        },
        {
            id: 2,
            name: "ด้วงเฮอร์คิวลิส (เพศเมีย)",
            category: "adult",
            price: 800,
            image: "https://scontent.fbkk12-5.fna.fbcdn.net/v/t1.6435-9/117899897_3166985993389230_3758748727876001929_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=bd9a62&_nc_ohc=648PldJDaw8Q7kNvwE7NGJN&_nc_oc=AdmAhGvm_lRGM46Po4yefT0XxExJQ3AkHOsSHKnzKMGGXoCwmAPplBZuIcWvMu37GjM&_nc_zt=23&_nc_ht=scontent.fbkk12-5.fna&_nc_gid=tiz_ognEIY08UlRBBNGB0g&oh=00_Afptk6ZCx1UcPIX0j1DjQvlEnl94DLb4gQL-9Ho_NtV4_A&oe=69837448",
            stock: 0,
            description: "ด้วงเฮอร์คิวลิส ขนาดใหญ่ แข็งแรง สุขภาพดี"
        },
        {
            id: 3,
            name: "ด้วงสามเขาคอคาซัส (เพศผู้)",
            category: "adult",
            price: 900,
            image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Chalcosoma_caucasus.JPG",
            stock: 0,
            description: "ด้วงสามเขาคอคาซัส ขนาดใหญ่ แข็งแรง สุขภาพดี"
        },
        {
            id: 4,
            name: "ด้วงสามเขาคอคาซัส (เพศเมีย)",
            category: "adult",
            price: 650,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjx_GamPOMfwXFyBHEr8mNpBD_mksT5NfUUQ&s",
            stock: 0,
            description: "ด้วงสามเขาคอคาซัส ขนาดใหญ่ แข็งแรง สุขภาพดี"
        },
        {
            id: 5,
            name: "ด้วงคีมฟันเลือย (เพศผู้)",
            category: "adult",
            price: 600,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdxWNBJdT5ECrxZ5ss32PFwCbZMVli-ss-uA&s",
            stock: 0,
            description: "ด้วงคีมฟันเลือย ขนาดใหญ่ แข็งแรง สุขภาพดี"
        },
        {
            id: 6,
            name: "ด้วงคีมฟันเลือย (เพศเมีย)",
            category: "adult",
            price: 450,
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjp4AgfcqlXp4LhJGaHGQqH2NKSU1R_czy_h7eCwHBts031TDy9mYPfTDCQtgZJ8ziIMLVQyfEgig13bqXbYPchZcUvAXNQNT-k7wDSRiANcr9WAgaRS6Hlpi-rrCBVw-MKIR0lpMNe4OU/s1600/SAM_3078+%2528Medium%2529.JPG",
            stock: 0,
            description: "ด้วงคีมฟันเลือย ขนาดใหญ่ แข็งแรง สุขภาพดี"
        },
        {
            id: 7,
            name: "ตัวอ่อนด้วงสามเขาคอคาซัส (ระยะที่ 3)",
            category: "larva",
            price: 750,
            image: "https://preview.redd.it/goliath-beetle-larvae-dead-dying-v0-efjp7zp3cxac1.jpeg?width=640&crop=smart&auto=webp&s=0eb3c8c9573cb8a17096b6967788db86e57e263b",
            stock: 0,
            description: "ตัวอ่อนด้วงสามเขา ระยะที่ 3 พร้อมเข้าดักแด้"
        },
        {
            id: 8,
            name: "ตัวอ่อนด้วงสามเขาแอสลาส (ระยะที่ 1)",
            category: "larva",
            price: 250,
            image: "images/larva_stage_1.jpg",
            stock: 0,
            description: "ตัวอ่อนด้วงสามเขา ระยะที่ 1 พร้อมเข้าดักแด้"
        },
        {
            id: 9,
            name: "คู่ด้วงเฮอร์คิวลิส (เพศผู้ 1 ตัว เพศเมีย 1 ตัว)",
            category: "set",
            price: 2000,
            image: "https://villagarden.decorexpro.com/wp-content/uploads/2018/03/zhuk-gerkules-foto-3.jpg",
            stock: 0,
            description: "คู่ด้วงเฮอร์คิวลิส (เพศผู้ 1 ตัว เพศเมีย 1 ตัว)"
        },
        {
            id: 10,
            name: "คู่ด้วงสามเขาคอคาซัส (เพศผู้ 1 ตัว เพศเมีย 1 ตัว)",
            category: "set",
            price: 1500,
            image: "https://i.ytimg.com/vi/7z7UTB83YPQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCsPVuPfVVSlglL6MZ5c7aQsp4vEA",
            stock: 0,
            description: "คู่ด้วงสามเขาคอคาซัส (เพศผู้ 1 ตัว เพศเมีย 1 ตัว)"
        },
        {
            id: 11,
            name: "คู่ด้วงคีมฟันเลือย (เพศผู้ 1 ตัว เพศเมีย 1 ตัว)",
            category: "set",
            price: 800,
            image: "https://lh4.googleusercontent.com/proxy/qLTXvRq9fOqJD1CsH4ilvyjC0PKS8iUKw4j7GV1BizS6M4EtoKFBL08txTdBF2XYfooDTtNLNKZC5JznMP2IRLMbpeojibt2P_FtHTL0HgB2ovyDFtJQEG4W5uJB5BrzvGnw2ndBG0qQrIE",
            stock: 0,
            description: "คู่ด้วงคีมฟันเลือย (เพศผู้ 1 ตัว เพศเมีย 1 ตัว)"
        },
        {
            id: 12,
            name: "กล่องเลี้ยงด้วง",
            category: "accessory",
            price: 280,
            image: "https://filebroker-cdn.lazada.co.th/kf/S339519f961f240d38f530a003ff44e88a.jpg",
            stock: 0,
            description: "กล่องเลี้ยงด้วง พร้อมตู้ดิน และอาหาร"
        },
        {
            id: 13,
            name: "แมทหมักคุณภาพสูงสำหรับด้วงกว่าง",
            category: "accessory",
            price: 180,
            image: "https://down-th.img.susercontent.com/file/44abb54911ce45ecee05754183b5669e_tn.webp",
            stock: 0,
            description: "แมทหมักคุณภาพสูงสำหรับด้วง"
        },
        {
            id: 14,
            name: "แมทหมักคุณภาพสูงสำหรับด้วงกว่างขนาดเล็ก",
            category: "accessory",
            price: 180,
            image: "https://www.siaminsectzoo.com/wp-content/uploads/2024/05/12620519fa219127072194bd6fbf6556_tn.jpg",
            stock: 0,
            description: "แมทหมักคุณภาพสูงสำหรับด้วง"
        },
        {
            id: 15,
            name: "แมทหมักคุณภาพสูงสำหรับด้วงคีม",
            category: "accessory",
            price: 180,
            image: "https://th-test-11.slatic.net/p/43fdc0ed1f90da09820e14d43133decb.jpg",
            stock: 0,
            description: "แมทหมักคุณภาพสูงสำหรับด้วง"
        },
        {
            id: 16,
            name: "แมทหมักคุณภาพสูงสำหรับตัวอ่อนด้วงคีม",
            category: "accessory",
            price: 180,
            image: "https://www.siaminsectzoo.com/wp-content/uploads/2024/05/ff020ce2b8377164e07c15a8eac41ff2_tn-300x300.jpg",
            stock: 0,
            description: "แมทหมักคุณภาพสูงสำหรับด้วง"
        },
    ];

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDbFDX1OBBTUXt8kqXZDbVHzN-ls_1CL0Q",
        authDomain: "siwabeetle-shop.firebaseapp.com",
        databaseURL: "https://siwabeetle-shop-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "siwabeetle-shop",
        storageBucket: "siwabeetle-shop.firebasestorage.app",
        messagingSenderId: "452787544152",
        appId: "1:452787544152:web:34a8051ed6c000725caa2d",
        measurementId: "G-KTEGDWD82D"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();
    const auth = firebase.auth();

    // ==========================================
    // SECURITY UTILITIES - XSS Prevention
    // ==========================================

    /**
     * Sanitize HTML to prevent XSS attacks
     * @param {string} str - String to sanitize
     * @returns {string} - Sanitized string safe for HTML display
     */
    function sanitizeHTML(str) {
        if (str === null || str === undefined) return '';
        const div = document.createElement('div');
        div.textContent = String(str);
        return div.innerHTML;
    }

    /**
     * Validate Thai phone number format
     * @param {string} phone - Phone number to validate
     * @returns {boolean} - True if valid Thai phone number
     */
    function isValidPhone(phone) {
        if (!phone) return false;
        const cleaned = phone.replace(/[-\s]/g, '');
        return /^0[689]\d{8}$/.test(cleaned);
    }

    /**
     * Validate name (no HTML/script tags)
     * @param {string} name - Name to validate
     * @returns {boolean} - True if valid name
     */
    function isValidName(name) {
        if (!name) return false;
        return name.length >= 2 && name.length <= 100 &&
            !/[<>"'`]/.test(name);
    }

    /**
     * Validate address (basic sanitization check)
     * @param {string} address - Address to validate
     * @returns {boolean} - True if valid address
     */
    function isValidAddress(address) {
        if (!address) return false;
        return address.length >= 10 && address.length <= 500 &&
            !/[<>]/.test(address);
    }

    // ==========================================
    // ORDER MANAGEMENT SYSTEM
    // ==========================================

    /**
     * Generate unique OrderID with format SWB-YYYYMMDD-XXXX
     * @returns {string} - Unique order ID
     */
    function generateOrderId() {
        const now = new Date();
        const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        const timePart = now.getTime().toString(36).slice(-4).toUpperCase();
        return `SWB-${datePart}-${randomPart}${timePart}`;
    }

    /**
     * Create order in Firebase Database
     * @param {Array} cartItems - Items in cart
     * @param {Object} deliveryInfo - Delivery information
     * @returns {Promise<Object>} - Order object with orderId
     */
    async function createOrder(cartItems, deliveryInfo) {
        if (!userProfile || !userProfile.uid) {
            throw new Error('User not authenticated');
        }

        const orderId = generateOrderId();
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const shipping = 100;
        const total = subtotal + shipping;

        const orderData = {
            orderId: orderId,
            userId: userProfile.uid,
            userEmail: userProfile.email || '',
            userName: userProfile.username || '',
            items: cartItems.map(item => ({
                id: item.id,
                name: sanitizeHTML(item.name),
                price: item.price,
                qty: item.qty,
                subtotal: item.price * item.qty
            })),
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            deliveryInfo: {
                name: sanitizeHTML(deliveryInfo.name || ''),
                phone: sanitizeHTML(deliveryInfo.phone || ''),
                address: sanitizeHTML(deliveryInfo.address || ''),
                note: sanitizeHTML(deliveryInfo.note || '')
            },
            status: 'pending_payment',
            createdAt: new Date().toISOString(),
            paymentConfirmedAt: null
        };

        // Save to Firebase
        await database.ref('orders/' + orderId).set(orderData);

        // Also save to user's order history
        await database.ref('users/' + userProfile.uid + '/orders/' + orderId).set({
            orderId: orderId,
            total: total,
            status: orderData.status,
            createdAt: orderData.createdAt,
            itemCount: cartItems.reduce((sum, item) => sum + item.qty, 0)
        });

        return orderData;
    }

    /**
     * Get user's order history
     * @returns {Promise<Array>} - Array of orders
     */
    async function getUserOrders() {
        if (!userProfile || !userProfile.uid) {
            return [];
        }

        try {
            const snapshot = await database.ref('users/' + userProfile.uid + '/orders')
                .orderByChild('createdAt')
                .limitToLast(20)
                .once('value');

            const orders = [];
            snapshot.forEach(child => {
                orders.unshift(child.val()); // Newest first
            });
            return orders;
        } catch (err) {
            console.error('Error fetching orders:', err);
            return [];
        }
    }

    /**
     * Get order details by ID
     * @param {string} orderId - Order ID
     * @returns {Promise<Object|null>} - Order object or null
     */
    async function getOrderById(orderId) {
        try {
            const snapshot = await database.ref('orders/' + orderId).once('value');
            const order = snapshot.val();

            // Security check: only return if order belongs to current user
            if (order && order.userId === userProfile?.uid) {
                return order;
            }
            return null;
        } catch (err) {
            console.error('Error fetching order:', err);
            return null;
        }
    }

    // ==========================================
    // ADMIN ANALYTICS FUNCTIONS
    // ==========================================

    /**
     * Get all orders for admin analytics
     * @returns {Promise<Array>} - Array of all orders
     */
    async function getAllOrders() {
        if (!userProfile || userProfile.username?.toLowerCase() !== 'siwakon') {
            return [];
        }

        try {
            const snapshot = await database.ref('orders')
                .orderByChild('createdAt')
                .once('value');

            const orders = [];
            snapshot.forEach(child => {
                orders.push(child.val());
            });
            return orders;
        } catch (err) {
            console.error('Error fetching all orders:', err);
            return [];
        }
    }

    /**
     * Calculate sales analytics
     * @param {Array} orders - Array of orders
     * @returns {Object} - Analytics data
     */
    function calculateAnalytics(orders) {
        const now = new Date();
        const today = now.toISOString().slice(0, 10);
        const thisMonth = now.toISOString().slice(0, 7);

        let totalRevenue = 0;
        let todayRevenue = 0;
        let monthRevenue = 0;
        let totalOrders = orders.length;
        let todayOrders = 0;
        let monthOrders = 0;
        const productSales = {};

        orders.forEach(order => {
            const orderDate = order.createdAt?.slice(0, 10) || '';
            const orderMonth = order.createdAt?.slice(0, 7) || '';
            const orderTotal = order.total || 0;

            totalRevenue += orderTotal;

            if (orderDate === today) {
                todayRevenue += orderTotal;
                todayOrders++;
            }

            if (orderMonth === thisMonth) {
                monthRevenue += orderTotal;
                monthOrders++;
            }

            // Track product sales
            if (order.items) {
                order.items.forEach(item => {
                    const key = item.name || 'Unknown';
                    if (!productSales[key]) {
                        productSales[key] = { name: key, qty: 0, revenue: 0 };
                    }
                    productSales[key].qty += item.qty || 0;
                    productSales[key].revenue += item.subtotal || 0;
                });
            }
        });

        // Sort products by quantity sold
        const topProducts = Object.values(productSales)
            .sort((a, b) => b.qty - a.qty)
            .slice(0, 5);

        return {
            totalRevenue,
            todayRevenue,
            monthRevenue,
            totalOrders,
            todayOrders,
            monthOrders,
            topProducts
        };
    }

    let cart = [];
    let userProfile = null;
    let products = [...defaultProducts];
    let pendingItemId = null;
    let wishlist = [];
    let notifyProductId = null;

    /**
     * ฟังก์ชันลัดสำหรับดึง element ด้วย ID
     * @param {string} id - ID ของ element ที่ต้องการ
     * @returns {HTMLElement|null} - element ที่พบ หรือ null
     */
    const getEl = (id) => document.getElementById(id);

    /**
     * ฟังก์ชันเริ่มต้นการทำงานของแอปพลิเคชัน
     * - แสดงสินค้าทั้งหมดบนหน้าเว็บ
     * - เชื่อมต่อกับ Firebase และรับข้อมูลสินค้าแบบ real-time
     * - อัปเดต UI ตะกร้าและสถานะผู้ใช้
     * - ตั้งค่า Event Listeners ทั้งหมด
     */
    function init() {
        console.log("Siwabeetle Shop: Initializing...");

        // CRITICAL: Ensure we show something immediately
        if (products && products.length > 0) {
            renderProducts('all');
        } else {
            console.error("Products array is empty at init!");
            products = [...defaultProducts];
            renderProducts('all');
        }

        // Listen for real-time product updates from Firebase
        try {
            database.ref('products').on('value', (snapshot) => {
                const data = snapshot.val();
                console.log("Firebase Data Received:", data);

                if (data) {
                    let syncedProducts = [];
                    if (Array.isArray(data)) {
                        syncedProducts = data;
                    } else if (typeof data === 'object') {
                        // Firebase handles arrays with gaps as objects
                        syncedProducts = Object.values(data);
                    }

                    // Keep nulls to maintain array indexing consistency with Firebase
                    products = syncedProducts;
                    console.log("Products synced from Firebase:", products.length);
                } else {
                    console.log("No data in Firebase products node. Setting defaults...");
                    database.ref('products').set(defaultProducts);
                }

                renderProducts('all');
                renderCart();
                renderShowcaseSections();
            }, (error) => {
                console.error("Firebase Sync Error:", error);
                renderProducts('all'); // Stay with local defaults
            });
        } catch (err) {
            console.error("Firebase Setup Error:", err);
            renderProducts('all');
        }

        updateCartUI();
        setupEventListeners();
        initSearch();
        loadWishlist();

        // Listen for Authentication state changes
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log("User is logged in:", user.uid);
                // Fetch extra profile data from Database
                try {
                    const snapshot = await database.ref('users/' + user.uid).once('value');
                    const userData = snapshot.val();

                    userProfile = {
                        uid: user.uid,
                        email: user.email,
                        username: userData?.username || 'User',
                        avatar: userData?.avatar || 'images/beetle_avatar.png'
                    };

                    if (userData?.deliveryInfo) {
                        sessionStorage.setItem('deliveryInfo', JSON.stringify(userData.deliveryInfo));
                    }

                    sessionStorage.setItem('user', JSON.stringify(userProfile));

                    // Reload wishlist from Firebase after login
                    loadWishlist();
                } catch (err) {
                    console.error("Error fetching user profile:", err);
                }
            } else {
                console.log("User is logged out");
                userProfile = null;
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('deliveryInfo');

                // Reload wishlist from localStorage after logout
                loadWishlist();
            }
            updateLoginStatus();
        });

        console.log("Siwabeetle Shop: Ready.");
    }

    const availableAvatars = [
        'images/beetle_avatar.png',
        'images/beetle_avatar_1.png',
        'images/beetle_avatar_2.png',
        'images/beetle_avatar_3.png',
        'images/beetle_avatar_4.png',
        'images/beetle_avatar_5.png'
    ];

    /**
     * ฟังก์ชันสลับการแสดง/ซ่อนตัวเลือกอวาตาร์
     * เมื่อกดปุ่มกล้องจะเปิด/ปิดแถบเลือกรูปโปรไฟล์
     */
    window.toggleAvatarSelection = () => {
        const grid = getEl('avatar-selection');
        if (grid) grid.style.display = grid.style.display === 'none' ? 'block' : 'none';
    };

    /**
     * ฟังก์ชันเลือกและบันทึกอวาตาร์ใหม่
     * @param {string} url - URL ของรูปอวาตาร์ที่เลือก
     * บันทึกลง Firebase และ sessionStorage แล้วอัปเดตหน้าโปรไฟล์
     */
    window.selectAvatar = async (url) => {
        if (!userProfile || !userProfile.uid) return;

        try {
            await database.ref('users/' + userProfile.uid + '/avatar').set(url);
            userProfile.avatar = url;
            sessionStorage.setItem('user', JSON.stringify(userProfile));
            updateLoginStatus();
            window.toggleAvatarSelection();
            showToast("อัปเดตรูปโปรไฟล์เรียบร้อย");
        } catch (err) {
            console.error("Avatar Update Error:", err);
            showToast("อัปเดตรูปโปรไฟล์ไม่สำเร็จ", "error");
        }
    };

    /**
     * ฟังก์ชันเปิด/ปิดการแสดงรหัสผ่าน
     */
    window.togglePasswordVisibility = (inputId, btn) => {
        const input = getEl(inputId);
        const icon = btn.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };

    /**
     * ฟังก์ชันเปิด/ปิดส่วนแก้ไขชื่อผู้ใช้
     */
    window.toggleEditUsername = () => {
        const group = getEl('edit-username-group');
        const input = getEl('new-username-input');
        if (group.style.display === 'none' || !group.style.display) {
            group.style.display = 'block';
            input.value = userProfile.username;
            input.focus();
        } else {
            group.style.display = 'none';
        }
    };

    /**
     * ฟังก์ชันบันทึกชื่อผู้ใช้ใหม่
     */
    window.updateUsername = async () => {
        const newName = getEl('new-username-input').value.trim();
        if (!newName) return showToast("กรุณากรอกชื่อ", "error");
        if (newName === userProfile.username) return window.toggleEditUsername();

        try {
            await database.ref('users/' + userProfile.uid + '/username').set(newName);
            userProfile.username = newName;
            sessionStorage.setItem('user', JSON.stringify(userProfile));
            updateLoginStatus();
            window.toggleEditUsername();
            showToast("เปลี่ยนชื่อผู้ใช้เรียบร้อย");
        } catch (err) {
            console.error("Update Username Error:", err);
            showToast("ไม่สามารถเปลี่ยนชื่อได้", "error");
        }
    };

    /**
     * ฟังก์ชันอัปเดตสถานะการเข้าสู่ระบบ
     * - ตรวจสอบว่ามีผู้ใช้ล็อกอินอยู่หรือไม่
     * - แสดงรูปโปรไฟล์หรือไอคอนผู้ใช้ตามสถานะ
     * - แสดง/ซ่อนฟอร์มล็อกอิน หรือหน้าโปรไฟล์
     * - แสดงข้อมูลจัดส่งของผู้ใช้
     * - แสดงปุ่มจัดการร้านค้าสำหรับ admin เท่านั้น
     */
    function updateLoginStatus() {
        const trigger = getEl('login-trigger');
        if (!trigger) return;

        const loginForm = getEl('login-form');
        const registerForm = getEl('register-form');
        const profileView = getEl('profile-view');
        const modalTitle = getEl('modal-title');
        const userDisplay = getEl('profile-username-display');
        const adminBtn = getEl('admin-access-btn');

        if (userProfile) {
            trigger.innerHTML = `<img src="${userProfile.avatar || 'images/beetle_avatar.png'}" alt="Profile" style="width: 100%; height: 100%; border-radius: 12px; object-fit: cover; border: 1px solid rgba(255,255,255,0.2);">`;
            if (loginForm) loginForm.style.display = 'none';
            if (registerForm) registerForm.style.display = 'none';
            if (profileView) profileView.style.display = 'block';
            if (modalTitle) modalTitle.textContent = 'โปรไฟล์ของคุณ';

            if (userDisplay) userDisplay.textContent = sanitizeHTML(userProfile.username);

            const emailDisplay = getEl('profile-email-display');
            if (emailDisplay) emailDisplay.textContent = sanitizeHTML(userProfile.email || '');

            // Render Avatar
            const avatarImg = getEl('profile-avatar-img');
            if (avatarImg) {
                avatarImg.src = userProfile.avatar || 'images/beetle_avatar.png';
            }

            // Render Delivery Info (with XSS protection)
            const deliveryContent = getEl('delivery-info-content');
            if (deliveryContent) {
                const savedInfo = sessionStorage.getItem('deliveryInfo');
                if (savedInfo) {
                    const info = JSON.parse(savedInfo);
                    deliveryContent.innerHTML = `
                    <div style="margin-bottom: 8px;"><strong><i class="fa-solid fa-user-tag" style="width: 20px;"></i></strong> ${sanitizeHTML(info.name)}</div>
                    <div style="margin-bottom: 8px;"><strong><i class="fa-solid fa-phone" style="width: 20px;"></i></strong> ${sanitizeHTML(info.phone)}</div>
                    <div style="margin-bottom: 8px; word-break: break-word;"><strong><i class="fa-solid fa-location-dot" style="width: 20px;"></i></strong> ${sanitizeHTML(info.address)}</div>
                    ${info.note ? `<div style="word-break: break-word; color: var(--dappled-gold); font-size: 0.85rem; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px; border-left: 3px solid var(--dappled-gold); margin-top: 10px;"><strong>หมายเหตุ:</strong> ${sanitizeHTML(info.note)}</div>` : ''}
                `;
                } else {
                    deliveryContent.innerHTML = `<p style="opacity: 0.5; font-style: italic;">ยังไม่มีข้อมูลจัดส่ง</p>`;
                }
            }

            // Load order history
            loadOrderHistory();

            // Show admin button for specific UID or Email if needed
            if (adminBtn) {
                const isAdmin = (userProfile.username && userProfile.username.toLowerCase() === 'siwakon') || userProfile.email === 'admin@siwabeetle.com';
                adminBtn.style.display = isAdmin ? 'block' : 'none';
            }
        }
        else {
            trigger.innerHTML = '<i class="fa-solid fa-user"></i>';
            if (profileView) profileView.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
            if (registerForm) registerForm.style.display = 'none';
            if (modalTitle) modalTitle.textContent = 'เข้าสู่ระบบ';
        }
    }

    /**
     * Load and render user's order history in profile
     */
    async function loadOrderHistory() {
        const container = getEl('order-history-content');
        if (!container) return;

        if (!userProfile || !userProfile.uid) {
            container.innerHTML = `<p style="opacity: 0.5; font-style: italic;">กรุณาเข้าสู่ระบบ</p>`;
            return;
        }

        container.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fa-solid fa-spinner fa-spin" style="color: var(--moss-green);"></i>
            </div>
        `;

        try {
            const orders = await getUserOrders();

            if (orders.length === 0) {
                container.innerHTML = `<p style="opacity: 0.5; font-style: italic;">ยังไม่มีประวัติการสั่งซื้อ</p>`;
                return;
            }

            const statusLabels = {
                'pending_payment': { color: '#ffc107', text: 'รอชำระ' },
                'paid': { color: '#28a745', text: 'ชำระแล้ว' },
                'shipped': { color: '#007bff', text: 'จัดส่งแล้ว' },
                'completed': { color: '#52b788', text: 'สำเร็จ' },
                'cancelled': { color: '#dc3545', text: 'ยกเลิก' }
            };

            let html = orders.slice(0, 5).map(order => {
                const status = statusLabels[order.status] || statusLabels['pending_payment'];
                const orderDate = new Date(order.createdAt).toLocaleDateString('th-TH', {
                    day: 'numeric', month: 'short', year: '2-digit'
                });

                return `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; margin-bottom: 8px; border-radius: 12px; background: rgba(255,255,255,0.03); cursor: pointer; transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.05);" onclick="window.viewOrderDetail('${sanitizeHTML(order.orderId)}')" onmouseover="this.style.borderColor='var(--light-moss)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'">
                        <div>
                            <div style="font-size: 0.8rem; font-weight: 600; color: var(--dappled-gold);">${sanitizeHTML(order.orderId)}</div>
                            <div style="font-size: 0.7rem; color: var(--light-moss); opacity: 0.7;">${orderDate} | ${order.itemCount || 0} ชิ้น</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 0.85rem; font-weight: 700; color: white;">${order.total?.toLocaleString('th-TH') || 0} ฿</div>
                            <div style="font-size: 0.65rem; color: ${status.color}; display: flex; align-items: center; justify-content: flex-end; gap: 5px;"><i class="fa-solid fa-circle" style="font-size: 0.4rem;"></i>${status.text}</div>
                        </div>
                    </div>
                `;
            }).join('');

            if (orders.length > 5) {
                html += `<p style="text-align: center; font-size: 0.75rem; color: var(--light-moss); margin-top: 10px; opacity: 0.7;">+ อีก ${orders.length - 5} รายการ</p>`;
            }

            container.innerHTML = html;
        } catch (err) {
            console.error('Error loading order history:', err);
            container.innerHTML = `<p style="opacity: 0.5; font-style: italic; color: #ff6b6b;">เกิดข้อผิดพลาด</p>`;
        }
    }

    // Expose loadOrderHistory to window for button onclick
    window.loadOrderHistory = loadOrderHistory;

    /**
     * ฟังก์ชันออกจากระบบ
     * - ล้างข้อมูลผู้ใช้จาก sessionStorage
     * - ล้างข้อมูลจัดส่ง
     * - แสดงข้อความแจ้งเตือน
     * - ปิด modal และอัปเดต UI
     */
    window.handleLogout = () => {
        auth.signOut().then(() => {
            showToast("ออกจากระบบแล้ว");
            window.closeLoginModal();
        }).catch(err => {
            console.error("Logout Error:", err);
        });
    };

    /**
     * ฟังก์ชันลบบัญชีผู้ใช้
     * - ขอยืนยันจากผู้ใช้ก่อนลบ
     * - ลบข้อมูลผู้ใช้จาก Firebase
     * - ออกจากระบบหลังลบสำเร็จ
     */
    window.handleDeleteAccount = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const confirmDelete = confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีนี้?\nการดำเนินการนี้จะลบข้อมูลที่อยู่จัดส่งและประวัติทั้งหมดถาวร ไม่สามารถกู้คืนได้`);

        if (confirmDelete) {
            try {
                // Delete from Database first
                await database.ref('users/' + user.uid).remove();
                // Then delete from Auth
                await user.delete();
                showToast("ลบบัญชีผู้ใช้งานเรียบร้อยแล้ว");
            } catch (err) {
                console.error("Delete Account Error:", err);
                showToast("เกิดข้อผิดพลาดในการลบบัญชี", "error");
            }
        }
    };

    /**
     * ฟังก์ชันแสดงสินค้าบนหน้าเว็บ
     * @param {string} filter - หมวดหมู่ที่ต้องการกรอง ('all', 'adult', 'larva', 'set', 'accessory')
     * - กรองสินค้าตามหมวดหมู่
     * - สร้าง card สินค้าพร้อมรูปภาพ ราคา และจำนวนคงเหลือ
     * - แสดงสถานะ "หมดชั่วคราว" สำหรับสินค้าที่ stock เป็น 0
     */
    function renderProducts(filter) {
        const container = getEl('product-container');
        if (!container) return;

        // Clear container
        container.innerHTML = '';

        // Debug fallback in case products is somehow lost
        if (!products || !Array.isArray(products) || products.length === 0) {
            console.warn("No products to render. Re-initializing with defaults.");
            products = [...defaultProducts];
        }

        const filtered = products.filter(p => {
            if (!p || typeof p !== 'object') return false;
            if (!p.name || p.name === 'สินค้าไม่ได้ระบุชื่อ') return false;
            if (filter !== 'all' && p.category !== filter) return false;
            return true;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--moss-green); margin-bottom: 20px; display: block;"></i>
                    <p style="color: var(--light-moss); font-size: 1.2rem;">ไม่พบสินค้าในหมวดหมู่นี้</p>
                    <button class="filter-btn" onclick="renderProducts('all')" style="margin-top: 15px; background: var(--moss-green); color: white;">ดูสินค้าทั้งหมด</button>
                </div>
            `;
            return;
        }

        filtered.forEach(p => {
            if (!p || typeof p !== 'object') return;
            const isOutOfStock = p.stock <= 0;
            const inWishlist = isInWishlist(p.id);
            const isFeatured = p.isFeatured || false;
            const isBestSeller = p.isBestSeller || false;
            const isNew = p.isNew || false;

            // Build status badges HTML - text labels like out-of-stock badge
            let statusBadges = '';
            if (isFeatured) statusBadges += '<div class="product-text-badge badge-featured">⭐ แนะนำ</div>';
            if (isBestSeller) statusBadges += '<div class="product-text-badge badge-bestseller">🔥 ขายดี</div>';
            if (isNew) statusBadges += '<div class="product-text-badge badge-new">✨ ใหม่</div>';

            const card = document.createElement('div');
            card.className = 'product-card glass';
            card.innerHTML = `
                <div class="product-image">
                    ${isOutOfStock ? '<div class="out-of-stock-badge">หมดชั่วคราว</div>' : ''}
                    ${statusBadges ? `<div class="product-badges-stack">${statusBadges}</div>` : ''}
                    <button class="wishlist-heart-btn ${inWishlist ? 'active' : ''}" onclick="window.toggleWishlist(${p.id})">
                        <i class="fa-${inWishlist ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                    <img src="${p.image}" alt="${p.name}" class="${isOutOfStock ? 'grayscale' : ''}" onerror="this.src='https://placehold.co/400x400?text=No+Image'">
                </div>
                <div class="product-info">
                    <span class="product-category">${(p.category || 'misc').toUpperCase()}</span>
                    <h3 class="product-name">${p.name || 'สินค้าไม่ได้ระบุชื่อ'}</h3>
                    <div class="product-stock-label" style="color: ${isOutOfStock ? '#ff4d4d' : '#40916c'}">
                        คงเหลือ: ${p.stock || 0} ชิ้น
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <span class="product-price">${(p.price || 0).toLocaleString()} ฿</span>
                        ${!isOutOfStock ? `
                        <button class="add-to-cart-btn" onclick="window.addToCart(${p.id})">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                        ` : `
                        <button class="notify-stock-btn" onclick="window.openNotifyModal(${p.id})">
                            <i class="fa-solid fa-bell"></i> แจ้งเตือน
                        </button>
                        `}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        console.log(`Successfully rendered ${filtered.length} products`);
    }

    /**
     * ฟังก์ชันเพิ่มสินค้าลงตะกร้า
     * @param {number} id - ID ของสินค้าที่ต้องการเพิ่ม
     * - ตรวจสอบว่าผู้ใช้ล็อกอินและมีข้อมูลจัดส่งหรือยัง
     * - ลดจำนวน stock ใน Firebase
     * - เพิ่มสินค้าลงตะกร้าหรือเพิ่มจำนวน
     */
    window.addToCart = (id) => {
        const user = sessionStorage.getItem('user');
        if (!user) {
            pendingItemId = id;
            const loginModal = getEl('login-modal');
            if (loginModal) loginModal.classList.add('active');
            showToast("กรุณาเข้าสู่ระบบก่อนเริ่มการสั่งซื้อ", "error");
            return;
        }

        const deliveryInfo = sessionStorage.getItem('deliveryInfo');
        if (!deliveryInfo) {
            pendingItemId = id;
            const loginModal = getEl('login-modal');
            if (loginModal) {
                loginModal.classList.add('active');
                updateLoginStatus();
            }
            showToast("กรุณาระบุข้อมูลจัดส่งในโปรไฟล์ของคุณ", "error");
            return;
        }

        const pIndex = products.findIndex(x => x.id === id);
        if (pIndex !== -1) {
            const p = products[pIndex];
            if (p.stock <= 0) {
                showToast("ขออภัย สินค้าหมดชั่วคราว", "error");
                return;
            }

            // Reduce stock in Firebase (Atomic update would be better, but simple set for now)
            products[pIndex].stock -= 1;
            database.ref('products/' + pIndex + '/stock').set(products[pIndex].stock);

            // Add to cart or increment qty
            const cartItem = cart.find(item => item.id === id);
            if (cartItem) {
                cartItem.qty += 1;
            } else {
                cart.push({ ...p, qty: 1 });
            }

            updateCartUI();
            // renderProducts will be triggered by firebase listener
            showToast(`เพิ่ม ${p.name} ลงตะกร้าแล้ว`);
            pendingItemId = null; // Clear pending after success
        }
    };

    /**
     * ฟังก์ชันแสดงรายการสินค้าในตะกร้า
     * - สร้าง element สำหรับแต่ละสินค้าในตะกร้า
     * - คำนวณยอดรวมสินค้า ค่าจัดส่ง และยอดรวมทั้งหมด
     * - มีปุ่มเพิ่ม/ลดจำนวน และลบสินค้า
     */
    function renderCart() {
        const container = getEl('cart-items-container');
        if (!container) return;

        container.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div style="font-weight: 800; color: var(--dappled-gold);">${item.price} ฿</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="window.updateCartQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="window.updateCartQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="window.removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            container.appendChild(div);
        });

        const shipping = cart.length > 0 ? 100 : 0;
        const total = subtotal + shipping;

        if (getEl('cart-subtotal')) getEl('cart-subtotal').innerText = subtotal;
        if (getEl('cart-total-amount')) getEl('cart-total-amount').innerText = total;
        if (getEl('total-amount')) getEl('total-amount').innerText = total; // For payment modal
    }

    /**
     * ฟังก์ชันอัปเดตจำนวนสินค้าในตะกร้า
     * @param {number} id - ID ของสินค้า
     * @param {number} delta - การเปลี่ยนแปลง (1 = เพิ่ม, -1 = ลด)
     * - เพิ่ม/ลดจำนวนสินค้าในตะกร้า
     * - อัปเดต stock ใน Firebase ตามการเปลี่ยนแปลง
     */
    window.updateCartQty = (id, delta) => {
        const cIndex = cart.findIndex(x => x.id === id);
        const pIndex = products.findIndex(x => x.id === id);

        if (cIndex === -1 || pIndex === -1) return;

        if (delta > 0) {
            // Increase qty, check stock
            if (products[pIndex].stock > 0) {
                cart[cIndex].qty += 1;
                products[pIndex].stock -= 1;
                database.ref('products/' + pIndex + '/stock').set(products[pIndex].stock);
            } else {
                showToast("ขออภัย สินค้าในสต็อกไม่เพียงพอ", "error");
            }
        } else {
            // Decrease qty
            if (cart[cIndex].qty > 1) {
                cart[cIndex].qty -= 1;
                products[pIndex].stock += 1;
                database.ref('products/' + pIndex + '/stock').set(products[pIndex].stock);
            } else {
                // If qty is 1 and we decrease, remove item
                window.removeFromCart(id);
                return;
            }
        }

        updateCartUI();
    };

    /**
     * ฟังก์ชันลบสินค้าออกจากตะกร้า
     * @param {number} id - ID ของสินค้าที่ต้องการลบ
     * - คืน stock กลับไปใน Firebase
     * - ลบสินค้าออกจากตะกร้า
     */
    window.removeFromCart = (id) => {
        const cIndex = cart.findIndex(x => x.id === id);
        const pIndex = products.findIndex(x => x.id === id);

        if (cIndex !== -1 && pIndex !== -1) {
            // Restore stock
            products[pIndex].stock += cart[cIndex].qty;
            database.ref('products/' + pIndex + '/stock').set(products[pIndex].stock);

            // Remove from cart
            cart.splice(cIndex, 1);

            updateCartUI();
            showToast("ลบสินค้าออกจากตะกร้าแล้ว");
        }
    };

    /**
     * ฟังก์ชันอัปเดต UI ตะกร้าสินค้า
     * - อัปเดตจำนวนสินค้าบน badge
     * - เรียก renderCart เพื่อวาดรายการสินค้าใหม่
     */
    function updateCartUI() {
        const countBadge = getEl('cart-count');
        if (countBadge) {
            const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
            countBadge.innerText = totalQty;
        }
        renderCart();
    }

    /**
     * ฟังก์ชันปิด modal เข้าสู่ระบบ/โปรไฟล์
     */
    window.closeLoginModal = () => {
        const modal = getEl('login-modal');
        if (modal) modal.classList.remove('active');
    };

    /**
     * ฟังก์ชันสลับโหมดระหว่างล็อกอินและสมัครสมาชิก
     */
    window.toggleAuthMode = () => {
        const modal = getEl('login-modal');
        if (modal) modal.classList.toggle('reg-mode');
    };

    /**
     * ฟังก์ชันแสดงข้อความแจ้งเตือน (Toast Notification)
     * @param {string} msg - ข้อความที่ต้องการแสดง
     * @param {string} type - ประเภทการแจ้งเตือน ('success', 'error', 'warning')
     * Toast จะหายไปอัตโนมัติหลัง 3 วินาที
     */
    function showToast(msg, type = "success") {
        const container = getEl('toast-container');
        if (!container) { console.log(`[${type}] ${msg}`); return; }
        const t = document.createElement('div');
        t.className = `toast ${type}`;
        t.innerText = msg;
        container.appendChild(t);
        setTimeout(() => {
            t.style.opacity = '0';
            setTimeout(() => t.remove(), 300);
        }, 3000);
    }

    /**
     * ฟังก์ชันจัดการการเข้าสู่ระบบ
     * @param {Event} e - event จากฟอร์ม submit
     * - ตรวจสอบ username และ password จาก Firebase
     * - บันทึกข้อมูลผู้ใช้ลง sessionStorage
     * - โหลดข้อมูลจัดส่งจาก Firebase (ถ้ามี)
     * - เพิ่มสินค้าที่ค้างอยู่ลงตะกร้า (ถ้ามี)
     */
    async function handleLogin(e) {
        e.preventDefault();
        const email = getEl('login-email')?.value?.trim();
        const password = getEl('login-password')?.value;
        if (!email || !password) return showToast("กรุณากรอกข้อมูล", "error");

        try {
            await auth.signInWithEmailAndPassword(email, password);
            showToast("เข้าสู่ระบบสำเร็จ");
            window.closeLoginModal();

            if (pendingItemId) {
                window.addToCart(pendingItemId);
            }
        } catch (err) {
            console.error("Login error:", err);
            let errMsg = "เกิดข้อผิดพลาด กรุณาลองใหม่";
            if (err.code === 'auth/user-not-found') errMsg = "ไม่พบผู้ใช้นี้";
            else if (err.code === 'auth/wrong-password') errMsg = "รหัสผ่านไม่ถูกต้อง";
            showToast(errMsg, "error");
        }
    }

    /**
     * ฟังก์ชันจัดการการสมัครสมาชิก
     * @param {Event} e - event จากฟอร์ม submit
     * - ตรวจสอบว่ามี username ซ้ำหรือไม่
     * - สุ่มอวาตาร์ให้ผู้ใช้ใหม่
     * - เข้ารหัส password ด้วย SHA256
     * - บันทึกข้อมูลผู้ใช้ลง Firebase
     */
    async function handleRegister(e) {
        e.preventDefault();
        const username = getEl('reg-username')?.value?.trim();
        const email = getEl('reg-email')?.value?.trim();
        const password = getEl('reg-password')?.value;

        if (!username || !email || !password) return showToast("กรุณากรอกข้อมูลให้ครบ", "error");
        if (password.length < 6) return showToast("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร", "error");

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Assign random avatar for new user
            const randomAvatar = availableAvatars[Math.floor(Math.random() * availableAvatars.length)];

            // Save extra data to Database
            await database.ref('users/' + user.uid).set({
                uid: user.uid,
                username: username,
                email: email,
                avatar: randomAvatar,
                createdAt: new Date().toISOString()
            });

            showToast("สมัครสมาชิกสำเร็จ!");
            window.closeLoginModal();
        } catch (err) {
            console.error("Register error:", err);
            let errMsg = "เกิดข้อผิดพลาด กรุณาลองใหม่";
            if (err.code === 'auth/email-already-in-use') errMsg = "อีเมลนี้ถูกใช้งานแล้ว";
            showToast(errMsg, "error");
        }
    }

    /**
     * ฟังก์ชันส่งอีเมลรีเซ็ตรหัสผ่าน
     */
    async function handleResetPassword(e) {
        e.preventDefault();
        const email = getEl('login-email')?.value?.trim();
        if (!email) {
            showToast("กรุณากรอกอีเมลในช่องด้านบนก่อนกดรีเซ็ต", "error");
            return;
        }

        try {
            await auth.sendPasswordResetEmail(email);
            showToast("ส่งอีเมลรีเซ็ตรหัสผ่านแล้ว! กรุณาตรวจสอบใน Inbox/Junk mail");
        } catch (err) {
            console.error("Reset Password Error:", err);
            let errMsg = "เกิดข้อผิดพลาดในการส่งอีเมล";
            if (err.code === 'auth/user-not-found') errMsg = "ไม่พบอีเมลนี้ในระบบ";
            showToast(errMsg, "error");
        }
    }

    /**
     * ฟังก์ชันตั้งค่า Event Listeners ทั้งหมด
     * - ปุ่มกรองหมวดหมู่สินค้า
     * - ปุ่มเปิด/ปิด modal ต่างๆ
     * - ฟอร์มล็อกอิน, สมัครสมาชิก, ข้อมูลจัดส่ง
     * - ปุ่มตะกร้าสินค้า
     */
    function setupEventListeners() {
        const filters = getEl('category-filters');
        if (filters) {
            filters.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-btn');
                if (btn) renderProducts(btn.dataset.category);
            });
        }

        const loginTrigger = getEl('login-trigger');
        if (loginTrigger) {
            loginTrigger.addEventListener('click', () => {
                const modal = getEl('login-modal');
                if (modal) {
                    modal.classList.add('active');
                    // updateLoginStatus will handle showing the correct form/view
                    updateLoginStatus();
                }
            });
        }

        const loginForm = getEl('login-form');
        if (loginForm) loginForm.addEventListener('submit', handleLogin);

        const forgotPassword = getEl('forgot-password-link');
        if (forgotPassword) forgotPassword.addEventListener('click', handleResetPassword);

        const registerForm = getEl('register-form');
        if (registerForm) registerForm.addEventListener('submit', handleRegister);

        const closeLogin = getEl('close-login');
        if (closeLogin) closeLogin.addEventListener('click', window.closeLoginModal);

        // Toggle between Login and Register forms
        const goToRegister = getEl('go-to-register');
        if (goToRegister) {
            goToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                const loginForm = getEl('login-form');
                const registerForm = getEl('register-form');
                const modalTitle = getEl('modal-title');
                if (loginForm) loginForm.style.display = 'none';
                if (registerForm) registerForm.style.display = 'block';
                if (modalTitle) modalTitle.textContent = 'สมัครสมาชิก';
            });
        }

        const goToLogin = getEl('go-to-login');
        if (goToLogin) {
            goToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                const loginForm = getEl('login-form');
                const registerForm = getEl('register-form');
                const modalTitle = getEl('modal-title');
                if (registerForm) registerForm.style.display = 'none';
                if (loginForm) loginForm.style.display = 'block';
                if (modalTitle) modalTitle.textContent = 'เข้าสู่ระบบ';
            });
        }

        // Cart Trigger - ตรวจสอบการล็อกอินก่อนเปิดตะกร้า
        const cartTrigger = getEl('cart-trigger');
        if (cartTrigger) {
            cartTrigger.addEventListener('click', () => {
                // ตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือยัง
                const user = sessionStorage.getItem('user');
                if (!user) {
                    // ยังไม่ได้ล็อกอิน - แสดง login modal
                    const loginModal = getEl('login-modal');
                    if (loginModal) {
                        loginModal.classList.add('active');
                        updateLoginStatus();
                    }
                    showToast("กรุณาเข้าสู่ระบบก่อนดูตะกร้าสินค้า", "error");
                    return;
                }

                // ล็อกอินแล้ว - เปิดตะกร้าสินค้าได้เลย
                const cartModal = getEl('cart-modal');
                if (cartModal) cartModal.classList.add('active');
            });
        }

        window.openDeliveryForm = () => {
            const modal = getEl('delivery-modal');
            if (modal) {
                const saved = sessionStorage.getItem('deliveryInfo');
                if (saved) {
                    const info = JSON.parse(saved);
                    if (getEl('delivery-name')) getEl('delivery-name').value = info.name || '';
                    if (getEl('delivery-phone')) getEl('delivery-phone').value = info.phone || '';
                    if (getEl('delivery-address')) getEl('delivery-address').value = info.address || '';
                    if (getEl('delivery-note')) getEl('delivery-note').value = info.note || '';
                }
                modal.classList.add('active');
            }
        };

        // Close Delivery Modal
        const closeDelivery = getEl('close-delivery');
        if (closeDelivery) {
            closeDelivery.addEventListener('click', () => {
                const deliveryModal = getEl('delivery-modal');
                if (deliveryModal) deliveryModal.classList.remove('active');
            });
        }

        // Delivery Form Handler
        const deliveryForm = getEl('delivery-form');
        if (deliveryForm) {
            deliveryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = getEl('delivery-name')?.value;
                const phone = getEl('delivery-phone')?.value;
                const address = getEl('delivery-address')?.value;
                const note = getEl('delivery-note')?.value;

                if (!name || !phone || !address) {
                    showToast("กรุณากรอกข้อมูลให้ครบ", "error");
                    return;
                }

                // Save delivery info
                const deliveryInfo = { name, phone, address, note };
                sessionStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));

                // Save to Firebase for the current user
                if (userProfile && userProfile.uid) {
                    database.ref('users/' + userProfile.uid + '/deliveryInfo').set(deliveryInfo)
                        .then(() => {
                            showToast("บันทึกข้อมูลจัดส่งเรียบร้อย!");
                            updateLoginStatus();
                        })
                        .catch(err => {
                            console.error("Firebase Sync Error (Delivery):", err);
                            showToast("บันทึกลงคลาวด์ไม่สำเร็จ แต่บันทึกชั่วคราวแล้ว", "warning");
                        });
                } else {
                    showToast("บันทึกข้อมูลจัดส่งชั่วคราวแล้ว");
                    updateLoginStatus();
                }

                // Close delivery modal 
                const deliveryModal = getEl('delivery-modal');
                if (deliveryModal) deliveryModal.classList.remove('active');

                // If there was a pending item, add it now
                if (pendingItemId) {
                    window.addToCart(pendingItemId);
                    pendingItemId = null;
                } else {
                    // If no pending item, we probably came from the "Edit" button in profile
                    // Just keep the login modal (profile) open
                }
            });
        }

        // Close Cart Modal
        const closeCart = getEl('close-cart');
        if (closeCart) {
            closeCart.addEventListener('click', () => {
                const cartModal = getEl('cart-modal');
                if (cartModal) cartModal.classList.remove('active');
            });
        }
    }

    // --- ฟังก์ชันชำระเงินและระบบ Admin ---

    /**
     * ฟังก์ชันเปิด modal ชำระเงิน
     * - ตรวจสอบว่ามีสินค้าในตะกร้าหรือไม่
     * - ตรวจสอบว่ากรอกข้อมูลจัดส่งแล้วหรือไม่
     * - แสดง QR Code PromptPay สำหรับชำระเงิน
     */
    window.openPayment = () => {
        if (cart.length === 0) return showToast("กรุณาเพิ่มสินค้าลงตะกร้าก่อนชำระเงิน", "error");

        // ตรวจสอบข้อมูลจัดส่งก่อนชำระเงิน
        const deliveryInfo = sessionStorage.getItem('deliveryInfo');
        if (!deliveryInfo) {
            // ยังไม่มีข้อมูลจัดส่ง - แสดง delivery modal
            const deliveryModal = getEl('delivery-modal');
            if (deliveryModal) deliveryModal.classList.add('active');
            showToast("กรุณากรอกข้อมูลจัดส่งก่อนชำระเงิน", "error");
            return;
        }

        const modal = getEl('payment-modal');
        if (modal) modal.classList.add('active');
    };

    /**
     * ฟังก์ชันปิด modal ชำระเงิน
     */
    window.closePayment = () => {
        const modal = getEl('payment-modal');
        if (modal) modal.classList.remove('active');
    };

    /**
     * ฟังก์ชันยืนยันการชำระเงิน
     * - สร้าง Order ใน Firebase พร้อม OrderID และ Timestamp
     * - สร้างสรุปรายการสั่งซื้อและที่อยู่จัดส่ง
     * - คัดลอกข้อความสรุปไปยัง Clipboard เพื่อให้ลูกค้าไปวางใน Facebook
     * - เปิดหน้า Facebook ของร้านค้าเพื่อส่งหลักฐานการโอน
     * - ล้างตะกร้าสินค้าหลังยืนยัน
     */
    window.confirmPayment = async () => {
        if (cart.length === 0) return showToast("ไม่มีสินค้าในตะกร้า", "error");

        const deliveryInfo = JSON.parse(sessionStorage.getItem('deliveryInfo') || '{}');

        try {
            // สร้าง Order ใน Firebase
            showToast("กำลังบันทึกคำสั่งซื้อ...", "success");
            const order = await createOrder(cart, deliveryInfo);

            // สร้างข้อความสรุปรายการสั่งซื้อ (พร้อม OrderID)
            let orderSummary = `🛒 รายการสั่งซื้อจาก Siwabeetle Shop\n`;
            orderSummary += `📋 หมายเลขคำสั่งซื้อ: ${order.orderId}\n`;
            orderSummary += `📅 วันที่: ${new Date(order.createdAt).toLocaleString('th-TH')}\n`;
            orderSummary += `------------------------------\n`;
            cart.forEach((item, index) => {
                orderSummary += `${index + 1}. ${item.name} (${item.price}฿) x ${item.qty}\n`;
            });
            orderSummary += `------------------------------\n`;
            orderSummary += `💰 ยอดรวมสินค้า: ${order.subtotal} บาท\n`;
            orderSummary += `🚚 ค่าจัดส่ง: ${order.shipping} บาท\n`;
            orderSummary += `✨ ยอดชำระทั้งหมด: ${order.total} บาท\n\n`;
            orderSummary += `📍 ข้อมูลจัดส่ง:\n`;
            orderSummary += `ชื่อ: ${deliveryInfo.name || '-'}\n`;
            orderSummary += `เบอร์โทร: ${deliveryInfo.phone || '-'}\n`;
            orderSummary += `ที่อยู่: ${deliveryInfo.address || '-'}\n`;
            if (deliveryInfo.note) orderSummary += `หมายเหตุ: ${deliveryInfo.note}\n`;
            orderSummary += `------------------------------\n`;
            orderSummary += `✅(แจ้งชำระเงินเรียบร้อยแล้วครับ อย่าลืมแนบสลิปด้วยน้าา)`;

            // คัดลอกไปยัง Clipboard
            try {
                await navigator.clipboard.writeText(orderSummary);
                showToast(`บันทึกคำสั่งซื้อ ${order.orderId} แล้ว! กรุณาวางข้อความในแชท Facebook`, "success");
            } catch (clipErr) {
                console.warn('Clipboard copy failed:', clipErr);
                showToast(`บันทึกคำสั่งซื้อ ${order.orderId} แล้ว!`, "success");
            }

            // รอให้ Toast แสดงซักครู่ก่อนเปิด Facebook
            setTimeout(() => {
                window.open('https://www.facebook.com/siwakorn.bunde.2024', '_blank');
                window.closePayment();
                // Close cart modal too
                const cartModal = getEl('cart-modal');
                if (cartModal) cartModal.classList.remove('active');
                // Reset cart after payment confirmation
                cart = [];
                updateCartUI();
            }, 2000);

        } catch (err) {
            console.error('Error creating order:', err);
            showToast("เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ กรุณาลองใหม่", "error");
        }
    };

    /**
     * ฟังก์ชันดาวน์โหลดรูป QR Code PromptPay
     * - สร้างลิงก์ดาวน์โหลดชั่วคราวแล้วคลิกเพื่อดาวน์โหลด
     */
    window.downloadQR = () => {
        const link = document.createElement('a');
        link.href = 'images/04e5eb92-d450-422e-b525-4149d8d04dd8.jpg';
        link.download = 'promptpay-qr.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("บันทึกรูป QR Code แล้ว");
    };

    /**
     * ฟังก์ชันเปิด modal จัดการร้านค้า (สำหรับ Admin เท่านั้น)
     * - ตรวจสอบว่าผู้ใช้เป็น 'siwakon' หรือไม่
     * - แสดงรายการสินค้าทั้งหมดพร้อมช่องแก้ไข stock
     * - แสดง Dashboard วิเคราะห์ยอดขาย
     */
    window.toggleAdminLogin = async () => {
        if (userProfile && userProfile.username.toLowerCase() === 'siwakon') {
            const adminModal = getEl('admin-modal');
            if (adminModal) {
                adminModal.classList.add('active');
                await renderAdminDashboard();
            }
        }
    };

    /**
     * Current admin tab state
     */
    let currentAdminTab = 'analytics';

    /**
     * Switch admin tab
     */
    window.switchAdminTab = async (tab) => {
        currentAdminTab = tab;
        await renderAdminDashboard();
    };

    /**
     * Render the complete admin dashboard with tabs
     */
    async function renderAdminDashboard() {
        const container = getEl('admin-product-list');
        if (!container) return;

        // Create tabs header
        const tabsHTML = `
            <div class="admin-tabs" style="display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
                <button class="admin-tab ${currentAdminTab === 'analytics' ? 'active' : ''}" 
                    onclick="switchAdminTab('analytics')"
                    style="flex: 1; padding: 12px 20px; background: ${currentAdminTab === 'analytics' ? 'var(--grad-gold)' : 'rgba(255,255,255,0.05)'}; 
                           color: ${currentAdminTab === 'analytics' ? 'var(--deep-forest)' : 'white'}; 
                           border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-family: inherit;
                           transition: all 0.3s ease;">
                    <i class="fa-solid fa-chart-line"></i> สถิติยอดขาย
                </button>
                <button class="admin-tab ${currentAdminTab === 'stock' ? 'active' : ''}" 
                    onclick="switchAdminTab('stock')"
                    style="flex: 1; padding: 12px 20px; background: ${currentAdminTab === 'stock' ? 'var(--grad-gold)' : 'rgba(255,255,255,0.05)'}; 
                           color: ${currentAdminTab === 'stock' ? 'var(--deep-forest)' : 'white'}; 
                           border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-family: inherit;
                           transition: all 0.3s ease;">
                    <i class="fa-solid fa-boxes-stacked"></i> จัดการสต็อก
                </button>
                <button class="admin-tab ${currentAdminTab === 'orders' ? 'active' : ''}" 
                    onclick="switchAdminTab('orders')"
                    style="flex: 1; padding: 12px 20px; background: ${currentAdminTab === 'orders' ? 'var(--grad-gold)' : 'rgba(255,255,255,0.05)'}; 
                           color: ${currentAdminTab === 'orders' ? 'var(--deep-forest)' : 'white'}; 
                           border: none; border-radius: 10px; cursor: pointer; font-weight: 600; font-family: inherit;
                           transition: all 0.3s ease;">
                    <i class="fa-solid fa-receipt"></i> คำสั่งซื้อ
                </button>
            </div>
            <div id="admin-tab-content"></div>
        `;

        container.innerHTML = tabsHTML;

        const contentContainer = getEl('admin-tab-content');
        if (!contentContainer) return;

        if (currentAdminTab === 'analytics') {
            await renderAnalyticsTab(contentContainer);
        } else if (currentAdminTab === 'stock') {
            renderStockTab(contentContainer);
        } else if (currentAdminTab === 'orders') {
            await renderOrdersTab(contentContainer);
        }
    }

    /**
     * Render analytics dashboard tab
     */
    async function renderAnalyticsTab(container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--moss-green);"></i>
                <p style="margin-top: 15px; color: var(--light-moss);">กำลังโหลดข้อมูล...</p>
            </div>
        `;

        try {
            const orders = await getAllOrders();
            const analytics = calculateAnalytics(orders);

            container.innerHTML = `
                <!-- Stats Cards -->
                <div class="analytics-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
                    <div class="stat-card" style="background: linear-gradient(135deg, rgba(64,145,108,0.3), rgba(64,145,108,0.1)); 
                         padding: 20px; border-radius: 15px; border: 1px solid rgba(64,145,108,0.3); text-align: center;">
                        <div style="font-size: 0.8rem; color: var(--light-moss); margin-bottom: 8px; text-transform: uppercase;">
                            <i class="fa-solid fa-calendar-day"></i> ยอดขายวันนี้
                        </div>
                        <div style="font-size: 1.8rem; font-weight: 800; color: #40916c;">${analytics.todayRevenue.toLocaleString('th-TH')} ฿</div>
                        <div style="font-size: 0.75rem; color: var(--light-moss); margin-top: 5px;">${analytics.todayOrders} คำสั่งซื้อ</div>
                    </div>
                    
                    <div class="stat-card" style="background: linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1)); 
                         padding: 20px; border-radius: 15px; border: 1px solid rgba(212,175,55,0.3); text-align: center;">
                        <div style="font-size: 0.8rem; color: var(--dappled-gold); margin-bottom: 8px; text-transform: uppercase;">
                            <i class="fa-solid fa-calendar-week"></i> ยอดขายเดือนนี้
                        </div>
                        <div style="font-size: 1.8rem; font-weight: 800; color: var(--dappled-gold);">${analytics.monthRevenue.toLocaleString('th-TH')} ฿</div>
                        <div style="font-size: 0.75rem; color: var(--light-moss); margin-top: 5px;">${analytics.monthOrders} คำสั่งซื้อ</div>
                    </div>
                    
                    <div class="stat-card" style="background: linear-gradient(135deg, rgba(82,183,136,0.3), rgba(82,183,136,0.1)); 
                         padding: 20px; border-radius: 15px; border: 1px solid rgba(82,183,136,0.3); text-align: center;">
                        <div style="font-size: 0.8rem; color: var(--light-moss); margin-bottom: 8px; text-transform: uppercase;">
                            <i class="fa-solid fa-chart-pie"></i> ยอดขายรวมทั้งหมด
                        </div>
                        <div style="font-size: 1.8rem; font-weight: 800; color: #52b788;">${analytics.totalRevenue.toLocaleString('th-TH')} ฿</div>
                        <div style="font-size: 0.75rem; color: var(--light-moss); margin-top: 5px;">${analytics.totalOrders} คำสั่งซื้อ</div>
                    </div>
                </div>

                <!-- Top Products Section -->
                <div class="top-products-section" style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                    <h4 style="color: var(--dappled-gold); margin-bottom: 15px; font-size: 1rem;">
                        <i class="fa-solid fa-trophy"></i> สินค้าขายดี (Top 5)
                    </h4>
                    ${analytics.topProducts.length > 0 ? `
                        <div class="top-products-list">
                            ${analytics.topProducts.map((product, idx) => `
                                <div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; 
                                     ${idx < analytics.topProducts.length - 1 ? 'border-bottom: 1px solid rgba(255,255,255,0.05);' : ''}">
                                    <div style="width: 30px; height: 30px; background: ${idx === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' : idx === 1 ? 'linear-gradient(135deg, #C0C0C0, #A9A9A9)' : idx === 2 ? 'linear-gradient(135deg, #CD7F32, #8B4513)' : 'rgba(255,255,255,0.1)'}; 
                                         border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                                         font-weight: 700; font-size: 0.8rem; color: ${idx < 3 ? '#1a1a2e' : 'white'};">
                                        ${idx + 1}
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-size: 0.9rem; font-weight: 600; color: white;">${sanitizeHTML(product.name)}</div>
                                        <div style="font-size: 0.75rem; color: var(--light-moss);">ขายได้ ${product.qty} ชิ้น</div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 0.9rem; font-weight: 700; color: var(--dappled-gold);">${product.revenue.toLocaleString('th-TH')} ฿</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <p style="text-align: center; color: var(--light-moss); opacity: 0.6; padding: 30px 0;">
                            <i class="fa-solid fa-box-open" style="font-size: 2rem; display: block; margin-bottom: 10px;"></i>
                            ยังไม่มีข้อมูลการขาย
                        </p>
                    `}
                </div>
            `;
        } catch (err) {
            console.error('Error loading analytics:', err);
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #ff6b6b;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem;"></i>
                    <p style="margin-top: 15px;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                </div>
            `;
        }
    }

    /**
     * Render stock management tab
     */
    function renderStockTab(container) {
        let stockHTML = `
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255,183,3,0.1); border-radius: 12px; border: 1px solid rgba(255,183,3,0.2);">
                <div style="display: flex; align-items: center; gap: 10px; color: var(--dappled-gold);">
                    <i class="fa-solid fa-info-circle"></i>
                    <span style="font-size: 0.85rem;">คลิกที่ป้ายเพื่อเปิด/ปิดสถานะ: <span style="color: #ffd700;">⭐ แนะนำ</span> | <span style="color: #ff6b6b;">🔥 ขายดี</span> | <span style="color: #74c69d;">✨ ใหม่</span></span>
                </div>
            </div>
        `;

        products.forEach(p => {
            if (!p || !p.name || p.name === 'สินค้าไม่ได้ระบุชื่อ') return;
            const isFeatured = p.isFeatured || false;
            const isBestSeller = p.isBestSeller || false;
            const isNew = p.isNew || false;

            stockHTML += `
                <div class="admin-product-item" style="display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; margin-bottom: 10px; border: 1px solid rgba(255,255,255,0.05);">
                    <img src="${p.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;" onerror="this.src='https://placehold.co/50x50?text=No+Image'">
                    <div style="flex: 1;">
                        <div style="font-size: 0.9rem; font-weight: 600; color: white;">${sanitizeHTML(p.name)}</div>
                        <div style="font-size: 0.75rem; color: var(--light-moss); opacity: 0.7;">ID: ${p.id} | ${p.price} ฿</div>
                        <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
                            <button onclick="window.toggleProductStatus(${p.id}, 'isFeatured')" 
                                style="padding: 4px 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 0.65rem; font-weight: 700; transition: all 0.3s;
                                background: ${isFeatured ? 'linear-gradient(135deg, #ffd700, #ffb703)' : 'rgba(255,255,255,0.1)'}; 
                                color: ${isFeatured ? '#000' : 'rgba(255,255,255,0.5)'};">
                                ⭐ แนะนำ
                            </button>
                            <button onclick="window.toggleProductStatus(${p.id}, 'isBestSeller')" 
                                style="padding: 4px 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 0.65rem; font-weight: 700; transition: all 0.3s;
                                background: ${isBestSeller ? 'linear-gradient(135deg, #ff6b6b, #ee5a5a)' : 'rgba(255,255,255,0.1)'}; 
                                color: ${isBestSeller ? '#fff' : 'rgba(255,255,255,0.5)'};">
                                🔥 ขายดี
                            </button>
                            <button onclick="window.toggleProductStatus(${p.id}, 'isNew')" 
                                style="padding: 4px 8px; border-radius: 6px; border: none; cursor: pointer; font-size: 0.65rem; font-weight: 700; transition: all 0.3s;
                                background: ${isNew ? 'linear-gradient(135deg, #74c69d, #40916c)' : 'rgba(255,255,255,0.1)'}; 
                                color: ${isNew ? '#fff' : 'rgba(255,255,255,0.5)'};">
                                ✨ ใหม่
                            </button>
                        </div>
                    </div>
                    <div style="width: 80px;">
                        <label style="font-size: 0.7rem; display: block; margin-bottom: 5px; color: var(--light-moss);">สต็อก</label>
                        <input type="number" value="${p.stock}" id="stock-input-${p.id}" min="0"
                            style="width: 100%; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.15); color: white; border-radius: 6px; padding: 8px; text-align: center; font-weight: 600;">
                    </div>
                </div>
            `;
        });

        container.innerHTML = stockHTML || '<p style="text-align: center; color: var(--light-moss);">ไม่พบสินค้า</p>';
    }

    /**
     * Toggle product status (Featured/New/BestSeller)
     */
    window.toggleProductStatus = async (productId, statusKey) => {
        const productIndex = products.findIndex(p => p && p.id === productId);
        if (productIndex === -1) return;

        const product = products[productIndex];
        const newValue = !product[statusKey];

        // Immediately update local state for instant UI feedback
        products[productIndex][statusKey] = newValue;

        // Re-render stock tab immediately for instant color change
        const contentContainer = getEl('admin-tab-content');
        if (contentContainer && currentAdminTab === 'stock') {
            renderStockTab(contentContainer);
        }

        const statusMessages = {
            'isFeatured': 'ตั้งเป็นสินค้าแนะนำแล้ว ⭐',
            'isBestSeller': 'ตั้งเป็นสินค้าขายดีแล้ว 🔥',
            'isNew': 'ตั้งเป็นสินค้าใหม่แล้ว ✨'
        };

        showToast(newValue ? statusMessages[statusKey] : 'ยกเลิกสถานะแล้ว');

        try {
            await database.ref(`products/${productIndex}/${statusKey}`).set(newValue);
        } catch (err) {
            console.error('Error toggling product status:', err);
            // Revert on error
            products[productIndex][statusKey] = !newValue;
            if (contentContainer && currentAdminTab === 'stock') renderStockTab(contentContainer);
            showToast('เกิดข้อผิดพลาด', 'error');
        }
    };

    /**
     * Render orders management tab
     */
    async function renderOrdersTab(container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--moss-green);"></i>
                <p style="margin-top: 15px; color: var(--light-moss);">กำลังโหลดคำสั่งซื้อ...</p>
            </div>
        `;

        try {
            const orders = await getAllOrders();

            // Sort by date descending
            orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            if (orders.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: var(--light-moss);">
                        <i class="fa-solid fa-receipt" style="font-size: 2rem; opacity: 0.5;"></i>
                        <p style="margin-top: 15px;">ยังไม่มีคำสั่งซื้อ</p>
                    </div>
                `;
                return;
            }

            let ordersHTML = '';
            orders.slice(0, 20).forEach(order => {
                const statusColors = {
                    'pending_payment': { bg: 'rgba(255,193,7,0.2)', color: '#ffc107', text: 'รอชำระเงิน' },
                    'paid': { bg: 'rgba(40,167,69,0.2)', color: '#28a745', text: 'ชำระแล้ว' },
                    'shipped': { bg: 'rgba(0,123,255,0.2)', color: '#007bff', text: 'จัดส่งแล้ว' },
                    'completed': { bg: 'rgba(82,183,136,0.2)', color: '#52b788', text: 'สำเร็จ' },
                    'cancelled': { bg: 'rgba(220,53,69,0.2)', color: '#dc3545', text: 'ยกเลิก' }
                };
                const status = statusColors[order.status] || statusColors['pending_payment'];
                const orderDate = new Date(order.createdAt).toLocaleString('th-TH', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });

                ordersHTML += `
                    <div class="order-card" style="background: rgba(255,255,255,0.03); padding: 15px; border-radius: 12px; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <div>
                                <div style="font-size: 0.9rem; font-weight: 700; color: var(--dappled-gold);">${order.orderId}</div>
                                <div style="font-size: 0.75rem; color: var(--light-moss); opacity: 0.7;">${orderDate}</div>
                            </div>
                            <span style="padding: 5px 12px; background: ${status.bg}; color: ${status.color}; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">
                                ${status.text}
                            </span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05);">
                            <div style="font-size: 0.85rem; color: white;">
                                <i class="fa-solid fa-user"></i> ${sanitizeHTML(order.deliveryInfo?.name || order.userName || '-')}
                            </div>
                            <div style="font-size: 1rem; font-weight: 700; color: white;">
                                ${order.total?.toLocaleString('th-TH')} ฿
                            </div>
                        </div>
                        <div style="font-size: 0.75rem; color: var(--light-moss); margin-top: 8px;">
                            ${order.items?.length || 0} รายการ | ${order.items?.reduce((sum, i) => sum + (i.qty || 0), 0) || 0} ชิ้น
                        </div>
                    </div>
                `;
            });

            container.innerHTML = ordersHTML;
        } catch (err) {
            console.error('Error loading orders:', err);
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #ff6b6b;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem;"></i>
                    <p style="margin-top: 15px;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                </div>
            `;
        }
    }

    /**
     * ฟังก์ชันแสดงรายการสินค้าในหน้า Admin (Legacy - kept for compatibility)
     */
    function renderAdminProducts() {
        renderAdminDashboard();
    }

    /**
     * ฟังก์ชันบันทึกข้อมูล stock สินค้า
     * - รวบรวมค่า stock จากช่อง input ทั้งหมด
     * - บันทึกข้อมูลลง Firebase
     */
    window.saveStock = () => {
        // รวบรวมค่าล่าสุดจาก input
        products.forEach((p) => {
            const input = getEl(`stock-input-${p.id}`);
            if (input) {
                p.stock = parseInt(input.value) || 0;
            }
        });

        // Save the entire products array back to Firebase
        database.ref('products').set(products).then(() => {
            showToast("บันทึกสต็อกสินค้าเรียบร้อยแล้ว");
            window.closeAdminModal();
        }).catch(err => {
            console.error("Firebase Save Error:", err);
            const errorMsg = err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
            showToast(errorMsg, "error");
        });
    };

    /**
     * ฟังก์ชันปิด modal จัดการร้านค้า
     */
    window.closeAdminModal = () => {
        const modal = getEl('admin-modal');
        if (modal) modal.classList.remove('active');
        currentAdminTab = 'analytics'; // Reset to default tab
    };

    // ==========================================
    // SEARCH SYSTEM
    // ==========================================

    /**
     * Initialize search functionality
     */
    function initSearch() {
        const searchToggle = getEl('search-toggle');
        const searchWrapper = getEl('search-wrapper');
        const searchInput = getEl('search-input');
        const searchResults = getEl('search-results');

        if (!searchToggle || !searchWrapper) return;

        // Toggle search bar
        searchToggle.addEventListener('click', () => {
            searchWrapper.classList.toggle('active');
            searchToggle.classList.toggle('active');
            if (searchWrapper.classList.contains('active')) {
                searchInput.focus();
            } else {
                searchInput.value = '';
                searchResults.classList.remove('active');
            }
        });

        // Real-time search
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const results = products.filter(p =>
                p && p.name && p.name.toLowerCase().includes(query)
            ).slice(0, 6);

            if (results.length === 0) {
                searchResults.innerHTML = `
                    <div class="search-no-results">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <p>ไม่พบสินค้าที่ค้นหา</p>
                    </div>
                `;
            } else {
                searchResults.innerHTML = results.map(p => `
                    <div class="search-result-item" onclick="window.scrollToProduct(${p.id})">
                        <img src="${p.image}" alt="${sanitizeHTML(p.name)}" onerror="this.src='https://placehold.co/50x50?text=...'">
                        <div class="search-result-info">
                            <h4>${sanitizeHTML(p.name)}</h4>
                            <span>${p.price.toLocaleString()} ฿</span>
                        </div>
                    </div>
                `).join('');
            }
            searchResults.classList.add('active');
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!searchWrapper.contains(e.target) && !searchToggle.contains(e.target)) {
                searchWrapper.classList.remove('active');
                searchToggle.classList.remove('active');
                searchResults.classList.remove('active');
            }
        });
    }

    window.scrollToProduct = (id) => {
        const searchWrapper = getEl('search-wrapper');
        const searchToggle = getEl('search-toggle');
        searchWrapper.classList.remove('active');
        searchToggle.classList.remove('active');
        getEl('search-results').classList.remove('active');

        // Filter to show all and scroll to shop section
        renderProducts('all');
        document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
    };

    // ==========================================
    // WISHLIST SYSTEM
    // ==========================================

    /**
     * Load wishlist from Firebase or localStorage
     */
    function loadWishlist() {
        // Clear old localStorage wishlist (now requires login)
        localStorage.removeItem('wishlist');

        // Only load wishlist if user is logged in
        if (userProfile?.uid) {
            database.ref('users/' + userProfile.uid + '/wishlist').on('value', (snapshot) => {
                const data = snapshot.val();
                wishlist = data ? Object.values(data) : [];
                updateWishlistUI();
                renderProducts(document.querySelector('.filter-btn.active')?.dataset.category || 'all');
                renderShowcaseSections();
            });
        } else {
            // Not logged in - clear wishlist
            wishlist = [];
            updateWishlistUI();
        }
    }

    /**
     * Update wishlist UI (badge count and items)
     */
    function updateWishlistUI() {
        const badge = getEl('wishlist-count');
        if (badge) badge.textContent = wishlist.length;
        renderWishlistItems();
    }

    /**
     * Toggle wishlist item
     */
    window.toggleWishlist = async (id) => {
        // Require login to add to wishlist
        const user = sessionStorage.getItem('user');
        if (!user) {
            const loginModal = getEl('login-modal');
            if (loginModal) loginModal.classList.add('active');
            showToast("กรุณาเข้าสู่ระบบเพื่อเพิ่มรายการโปรด", "error");
            return;
        }

        const product = products.find(p => p && p.id === id);
        if (!product) return;

        const index = wishlist.findIndex(item => item.id === id);

        if (index > -1) {
            wishlist.splice(index, 1);
            showToast('นำออกจากรายการโปรด');
        } else {
            wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
            showToast('เพิ่มลงรายการโปรดแล้ว ❤️');
        }

        // Save to Firebase
        if (userProfile?.uid) {
            await database.ref('users/' + userProfile.uid + '/wishlist').set(wishlist);
        }

        updateWishlistUI();
        renderProducts(document.querySelector('.filter-btn.active')?.dataset.category || 'all');
        renderShowcaseSections();
    };

    /**
     * Check if product is in wishlist
     */
    function isInWishlist(id) {
        return wishlist.some(item => item.id === id);
    }

    /**
     * Render wishlist items in modal
     */
    function renderWishlistItems() {
        const container = getEl('wishlist-items-container');
        if (!container) return;

        if (wishlist.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-heart-crack"></i>
                    <h3>ยังไม่มีรายการโปรด</h3>
                    <p>กดปุ่ม ❤️ บนสินค้าที่ชอบ</p>
                </div>
            `;
            return;
        }

        container.innerHTML = wishlist.map(item => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${sanitizeHTML(item.name)}" onerror="this.src='https://placehold.co/70x70?text=...'">
                <div class="wishlist-item-info">
                    <h4>${sanitizeHTML(item.name)}</h4>
                    <span class="price">${item.price.toLocaleString()} ฿</span>
                </div>
                <div class="wishlist-item-actions">
                    <button class="wishlist-add-cart-btn" onclick="window.addToCart(${item.id}); window.closeWishlistModal();">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    <button class="wishlist-remove-btn" onclick="window.toggleWishlist(${item.id})">
                        <i class="fa-solid fa-trash"></i> ลบ
                    </button>
                </div>
            </div>
        `).join('');
    }

    window.closeWishlistModal = () => {
        const modal = getEl('wishlist-modal');
        if (modal) modal.classList.remove('active');
    };

    // ==========================================
    // ORDER TRACKING SYSTEM
    // ==========================================

    /**
     * View order detail modal
     */
    window.viewOrderDetail = async (orderId) => {
        const modal = getEl('order-detail-modal');
        const content = getEl('order-detail-content');
        if (!modal || !content) return;

        content.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--light-moss);"></i>
                <p style="margin-top: 15px; color: var(--light-moss);">กำลังโหลดข้อมูล...</p>
            </div>
        `;
        modal.classList.add('active');

        try {
            const order = await getOrderById(orderId);
            if (!order) {
                content.innerHTML = `
                    <div style="text-align: center; padding: 50px;">
                        <i class="fa-solid fa-circle-xmark" style="font-size: 2rem; color: #ff6b6b;"></i>
                        <p style="margin-top: 15px; color: #ff6b6b;">ไม่พบข้อมูลคำสั่งซื้อ</p>
                    </div>
                `;
                return;
            }

            const statusSteps = [
                { key: 'pending_payment', icon: 'fa-clock', label: 'รอชำระเงิน' },
                { key: 'paid', icon: 'fa-credit-card', label: 'ชำระแล้ว' },
                { key: 'shipped', icon: 'fa-truck', label: 'กำลังจัดส่ง' },
                { key: 'completed', icon: 'fa-check-circle', label: 'ส่งสำเร็จ' }
            ];

            const currentStatusIndex = statusSteps.findIndex(s => s.key === order.status);

            content.innerHTML = `
                <div class="order-detail-section">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
                        <div>
                            <div style="font-size: 0.85rem; color: var(--light-moss); margin-bottom: 5px;">หมายเลขคำสั่งซื้อ</div>
                            <div style="font-size: 1.2rem; font-weight: 800; color: var(--dappled-gold);">${sanitizeHTML(order.orderId)}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 0.85rem; color: var(--light-moss); margin-bottom: 5px;">วันที่สั่งซื้อ</div>
                            <div style="font-size: 1rem; color: var(--white);">${new Date(order.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        </div>
                    </div>
                    
                    <div class="order-status-timeline">
                        ${statusSteps.map((step, i) => `
                            <div class="status-step ${i < currentStatusIndex ? 'completed' : ''} ${i === currentStatusIndex ? 'active' : ''}">
                                <div class="status-icon"><i class="fa-solid ${step.icon}"></i></div>
                                <div class="status-label">${step.label}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${order.trackingNumber ? `
                        <div class="tracking-number-box">
                            <i class="fa-solid fa-barcode"></i>
                            <div>
                                <div style="font-size: 0.75rem; color: var(--light-moss);">หมายเลขพัสดุ</div>
                                <span>${sanitizeHTML(order.trackingNumber)}</span>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="order-items-list">
                        <div style="font-weight: 700; color: var(--white); margin-bottom: 15px;">
                            <i class="fa-solid fa-box"></i> รายการสินค้า
                        </div>
                        ${order.items.map(item => `
                            <div class="order-item-row">
                                <span style="color: var(--white);">${sanitizeHTML(item.name)} <span style="color: var(--light-moss);">x${item.qty}</span></span>
                                <span style="color: var(--dappled-gold); font-weight: 700;">${(item.price * item.qty).toLocaleString()} ฿</span>
                            </div>
                        `).join('')}
                        <div class="order-item-row" style="border-top: 1px solid var(--glass-border); margin-top: 10px; padding-top: 15px;">
                            <span style="color: var(--light-moss);">ค่าจัดส่ง</span>
                            <span style="color: var(--white);">${(order.shipping || 100).toLocaleString()} ฿</span>
                        </div>
                        <div class="order-item-row" style="border-top: 1px solid var(--glass-border); padding-top: 15px;">
                            <span style="color: var(--white); font-weight: 700; font-size: 1.1rem;">รวมทั้งหมด</span>
                            <span style="color: var(--dappled-gold); font-weight: 900; font-size: 1.3rem;">${order.total.toLocaleString()} ฿</span>
                        </div>
                    </div>
                </div>
            `;
        } catch (err) {
            console.error('Error loading order detail:', err);
            content.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <i class="fa-solid fa-circle-exclamation" style="font-size: 2rem; color: #ff6b6b;"></i>
                    <p style="margin-top: 15px; color: #ff6b6b;">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                </div>
            `;
        }
    };

    // ==========================================
    // BACK IN STOCK NOTIFICATION
    // ==========================================

    /**
     * Open stock notification modal
     */
    window.openNotifyModal = (productId) => {
        notifyProductId = productId;
        const product = products.find(p => p && p.id === productId);
        if (!product) return;

        const modal = getEl('notify-modal');
        const nameEl = getEl('notify-product-name');
        const emailEl = getEl('notify-email');

        if (nameEl) nameEl.textContent = product.name;
        if (emailEl) emailEl.value = userProfile?.email || '';
        if (modal) modal.classList.add('active');
    };

    /**
     * Submit stock notification request
     */
    window.submitStockNotification = async () => {
        const email = getEl('notify-email')?.value?.trim();
        if (!email || !email.includes('@')) {
            showToast('กรุณากรอกอีเมลที่ถูกต้อง', 'error');
            return;
        }

        if (!notifyProductId) return;
        const product = products.find(p => p && p.id === notifyProductId);
        if (!product) return;

        try {
            await database.ref('stockNotifications').push({
                productId: notifyProductId,
                productName: product.name,
                email: email,
                createdAt: new Date().toISOString(),
                notified: false
            });

            showToast('ตั้งค่าแจ้งเตือนเรียบร้อยแล้ว! 🔔');
            getEl('notify-modal')?.classList.remove('active');
            notifyProductId = null;
        } catch (err) {
            console.error('Stock notification error:', err);
            showToast('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error');
        }
    };

    // ==========================================
    // LANDING PAGE SHOWCASE
    // ==========================================

    /**
     * Render all showcase sections
     */
    function renderShowcaseSections() {
        // Best Sellers - products marked by admin with isBestSeller flag
        const bestSellers = products.filter(p => p && p.isBestSeller === true).slice(0, 8);

        // If no best sellers marked, show message
        if (bestSellers.length === 0) {
            const container = getEl('bestseller-products');
            if (container) {
                container.innerHTML = '<p style="text-align: center; color: var(--light-moss); opacity: 0.6; grid-column: 1/-1; padding: 30px;">ยังไม่มีสินค้าขายดี - Admin สามารถตั้งค่าได้ในหน้าจัดการสต็อก</p>';
            }
            return;
        }

        renderShowcaseGrid('bestseller-products', bestSellers, 'bestseller');
    }

    /**
     * Render showcase grid
     */
    function renderShowcaseGrid(containerId, items, badgeType) {
        const container = getEl(containerId);
        if (!container) return;

        if (!items || items.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--light-moss); opacity: 0.5; grid-column: 1/-1;">ไม่มีสินค้าในหมวดหมู่นี้</p>';
            return;
        }

        const badgeConfig = {
            'featured': { class: 'badge-featured', text: '⭐ แนะนำ' },
            'bestseller': { class: 'badge-bestseller', text: '🔥 ขายดี' },
            'new': { class: 'badge-new', text: '✨ ใหม่' }
        };

        const badge = badgeConfig[badgeType];

        container.innerHTML = items.map(p => {
            if (!p) return '';
            const isOutOfStock = p.stock <= 0;
            const inWishlist = isInWishlist(p.id);

            return `
                <div class="showcase-card">
                    <span class="showcase-badge ${badge.class}">${badge.text}</span>
                    <button class="wishlist-heart-btn ${inWishlist ? 'active' : ''}" onclick="window.toggleWishlist(${p.id})">
                        <i class="fa-${inWishlist ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                    <div class="product-image">
                        ${isOutOfStock ? '<div class="out-of-stock-badge">หมดชั่วคราว</div>' : ''}
                        <img src="${p.image}" alt="${sanitizeHTML(p.name)}" class="${isOutOfStock ? 'grayscale' : ''}" onerror="this.src='https://placehold.co/400x400?text=No+Image'">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name" style="font-size: 1.1rem;">${sanitizeHTML(p.name)}</h3>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                            <span class="product-price" style="font-size: 1.4rem;">${p.price.toLocaleString()} ฿</span>
                            ${!isOutOfStock ? `
                                <button class="add-to-cart-btn" onclick="window.addToCart(${p.id})" style="width: 42px; height: 42px;">
                                    <i class="fa-solid fa-cart-plus"></i>
                                </button>
                            ` : `
                                <button class="notify-stock-btn" onclick="window.openNotifyModal(${p.id})" style="padding: 8px 12px; font-size: 0.75rem;">
                                    <i class="fa-solid fa-bell"></i>
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ==========================================
    // ADDITIONAL EVENT LISTENERS FOR NEW FEATURES
    // ==========================================

    // Add to setupEventListeners or call separately
    const wishlistTrigger = getEl('wishlist-trigger');
    const wishlistModal = getEl('wishlist-modal');
    const closeWishlist = getEl('close-wishlist');

    if (wishlistTrigger && wishlistModal) {
        wishlistTrigger.addEventListener('click', () => wishlistModal.classList.add('active'));
    }
    if (closeWishlist) {
        closeWishlist.addEventListener('click', () => wishlistModal.classList.remove('active'));
    }

    const closeNotify = getEl('close-notify');
    if (closeNotify) {
        closeNotify.addEventListener('click', () => getEl('notify-modal')?.classList.remove('active'));
    }

    const closeOrderDetail = getEl('close-order-detail');
    if (closeOrderDetail) {
        closeOrderDetail.addEventListener('click', () => getEl('order-detail-modal')?.classList.remove('active'));
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
