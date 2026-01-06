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
        stock: 5,
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
        stock: 10,
        description: "กล่องเลี้ยงด้วง พร้อมตู้ดิน และอาหาร"
    },
    {
        id: 13,
        name: "แมทหมักคุณภาพสูงสำหรับด้วงกว่าง",
        category: "accessory",
        price: 180,
        image: "https://down-th.img.susercontent.com/file/44abb54911ce45ecee05754183b5669e_tn.webp",
        stock: 3,
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
    {
        id: 17,
        name: "ไม้พุสำหรับเพราะด้วงคีม",
        category: "accessory",
        price: 180,
        image: "https://th-test-11.slatic.net/p/3e39b81cdc98e589c1b1bf7311822287.jpg",
        stock: 0,
        description: "แมทหมักคุณภาพสูงสำหรับด้วง"
    },
];

let products = JSON.parse(localStorage.getItem('products')) || defaultProducts;

let cart = [];
let userProfile = JSON.parse(sessionStorage.getItem('userProfile')) || null;
const SHIPPING_FEE = 100;

// DOM Elements
const productContainer = document.getElementById('product-container');
const categoryFilters = document.getElementById('category-filters');
const cartTrigger = document.getElementById('cart-trigger');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const loginTrigger = document.getElementById('login-trigger');
const registrationForm = document.getElementById('registration-form');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotalAmount = document.getElementById('cart-total-amount');
const checkoutBtn = document.getElementById('checkout-btn');
const copySummaryBtn = document.getElementById('copy-summary');
const header = document.getElementById('main-header');
const toastContainer = document.getElementById('toast-container');
// Admin Elements
const adminTrigger = document.getElementById('admin-trigger');
const adminModal = document.getElementById('admin-modal');
const closeAdmin = document.getElementById('close-admin');
const adminProductList = document.getElementById('admin-product-list');
const saveStockBtn = document.getElementById('save-stock-btn');
const resetStockBtn = document.getElementById('reset-stock-btn');

// Initialize
function init() {
    renderProducts('all');
    updateCartUI();
    updateLoginStatus();
    setupEventListeners();
}
// ... [Existing helper functions like updateLoginStatus, renderProducts, checkLogin, cart logic] ...
// (We keep the rest of the file largely the same, just adding new functions)

function renderAdminProducts() {
    adminProductList.innerHTML = '';
    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="admin-item-left">
                <img src="${product.image}" alt="${product.name}">
                <div class="admin-item-info">
                    <h4>${product.name}</h4>
                    <span>คงเหลือปัจจุบัน: ${product.stock}</span>
                </div>
            </div>
            <div class="admin-stock-input">
                <input type="number" id="stock-input-${product.id}" value="${product.stock}" min="0">
            </div>
        `;
        adminProductList.appendChild(item);
    });
}

// ... [Existing Cart Logic Functions] ...

// Event Listeners
function setupEventListeners() {
    // ... [Existing Listeners] ...

    // Admin Modal - Re-select to be safe (Cleaned up: Handled by inline onclick now)
    // We keep existing listeners for other parts, but remove the ones we moved to global functions

    // Window Click to Close Modals (Keep this one)
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeModal(cartModal);
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === document.getElementById('admin-modal')) {
            window.closeAdminModal();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeModal(cartModal);
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === adminModal) {
            adminModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ... [Existing Listeners continued] ...
}


function updateLoginStatus() {
    if (userProfile) {
        loginTrigger.innerHTML = '<i class="fa-solid fa-user-check" style="color: var(--light-moss);"></i>';
        loginTrigger.title = "แก้ไขข้อมูลผู้ส่ง";
    } else {
        loginTrigger.innerHTML = '<i class="fa-solid fa-user"></i>';
        loginTrigger.title = "ข้อมูลผู้ส่ง";
    }
}

// Render Products
function renderProducts(filter) {
    productContainer.innerHTML = '';

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        // Calculate display stock (Actual Stock - In Cart)
        // This ensures the user sees the numbers go down while shopping
        const cartItem = cart.find(item => item.id === product.id);
        const qtyInCart = cartItem ? cartItem.qty : 0;
        const availableStock = product.stock - qtyInCart;

        const isOut = availableStock <= 0;

        const productCard = document.createElement('div');
        productCard.className = 'product-card dark-glass';
        productCard.innerHTML = `
            ${isOut ? '<div class="out-of-stock">หมดชั่วคราว</div>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="${isOut ? 'grayscale' : ''}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-stock">คงเหลือ: ${availableStock} ชิ้น</div>
                <div class="product-price-row">
                    <span class="product-price">${product.price.toLocaleString()} ฿</span>
                    ${!isOut ? `
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// Check Login Status
function checkLogin() {
    if (!userProfile) {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        return false;
    }
    return true;
}

// Helper to update specific product card UI
function updateProductCardStock(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    const qtyInCart = cartItem ? cartItem.qty : 0;
    const availableStock = product.stock - qtyInCart;

    const buttons = document.querySelectorAll(`button[onclick="addToCart(${productId})"]`);
    buttons.forEach(btn => {
        const card = btn.closest('.product-card');
        if (card) {
            const stockDisplay = card.querySelector('.product-stock');
            if (stockDisplay) {
                stockDisplay.innerText = `คงเหลือ: ${Math.max(0, availableStock)} ชิ้น`;
            }
            if (availableStock <= 0) {
                const currentCategory = document.querySelector('.filter-btn.active').dataset.category;
                renderProducts(currentCategory);
            }
        }
    });
}

// Cart Logic
window.addToCart = function (productId) {
    if (!checkLogin()) return;

    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    const currentQty = existingItem ? existingItem.qty : 0;

    if (currentQty < product.stock) {
        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        showToast(`เพิ่ม ${product.name} แล้ว!`);
        updateCartUI();
        updateProductCardStock(productId); // Update display only
    } else {
        showToast(`ขออภัย สินค้าหมดแล้วครับ`, "error");
    }
};

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    updateProductCardStock(productId); // Restore display stock
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    const product = products.find(p => p.id === productId);

    if (item && product) {
        const newQty = item.qty + delta;

        if (delta > 0) {
            if (newQty <= product.stock) {
                item.qty = newQty;
            } else {
                showToast(`สินค้าหมดแล้ว`, "error");
                return;
            }
        } else {
            item.qty = newQty;
        }

        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }

        updateCartUI();
        updateProductCardStock(productId);
    }
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let count = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        count += item.qty;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    <span style="margin-left: auto;">${(item.price * item.qty).toLocaleString()} ฿</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">ลบออก</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.innerText = count;
    cartSubtotal.innerText = subtotal.toLocaleString();
    cartTotalAmount.innerText = (subtotal > 0 ? subtotal + SHIPPING_FEE : 0).toLocaleString();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--light-moss);">ไม่มีสินค้าในตะกร้า</p>';
    }
}

// Event Listeners
function setupEventListeners() {
    // Scroll Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Category Filter
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderProducts(e.target.dataset.category);
        }
    });

    // Cart Modal Interception
    cartTrigger.addEventListener('click', () => {
        if (!checkLogin()) return;
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeCart.addEventListener('click', () => closeModal(cartModal));

    // Registration Form
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        userProfile = {
            name: document.getElementById('user-name').value,
            phone: document.getElementById('user-phone').value,
            address: document.getElementById('user-address').value,
            note: document.getElementById('user-note').value
        };
        sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
        closeModal(loginModal);
        showToast("กรอกเสร็จสิ้นพร้อม shopต่อได้เลย!");
        updateLoginStatus();
    });

    loginTrigger.addEventListener('click', () => {
        if (userProfile) {
            document.getElementById('user-name').value = userProfile.name || '';
            document.getElementById('user-phone').value = userProfile.phone || '';
            document.getElementById('user-address').value = userProfile.address || '';
            document.getElementById('user-note').value = userProfile.note || '';
        }
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeLogin.addEventListener('click', () => closeModal(loginModal));

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeModal(cartModal);
        if (e.target === loginModal) closeModal(loginModal);
    });

    // Copy Summary
    copySummaryBtn.addEventListener('click', () => {
        if (!checkLogin()) return;
        if (cart.length === 0) {
            showToast("ตะกร้าว่างอยู่ครับ", "error");
            return;
        }

        let summary = "📦 รายการสั่งซื้อ Siwabeetles Shop:\n";
        summary += `👤 ลูกค้า: ${userProfile.name}\n`;
        summary += `📞 เบอร์โทร: ${userProfile.phone}\n`;
        summary += `📍 ที่อยู่: ${userProfile.address}\n`;
        if (userProfile.note) summary += `✍️ เพิ่มเติม: ${userProfile.note}\n`;
        summary += "------------------\n";

        cart.forEach(item => {
            summary += `- ${item.name} x ${item.qty} = ${(item.price * item.qty).toLocaleString()} ฿\n`;
        });

        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
        summary += `------------------\n`;
        summary += `🛒 ยอดรวมสินค้า: ${subtotal.toLocaleString()} บาท\n`;
        summary += `🚚 ค่าจัดส่ง: ${SHIPPING_FEE} บาท\n`;
        summary += `💰 ยอดรวมทั้งสิ้น: ${(subtotal + SHIPPING_FEE).toLocaleString()} บาท`;

        navigator.clipboard.writeText(summary).then(() => {
            showToast("คัดลอกรายการแล้ว ส่งให้ทางเพจได้เลย!");
        });
    });

    // Checkout (Redirect to FB)
    checkoutBtn.addEventListener('click', () => {
        if (!checkLogin()) return;

        if (cart.length === 0) {
            showToast("ตะกร้าว่างอยู่ครับ", "error");
            return;
        }

        // Deduct Stock on Checkout
        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.id);
            if (product) {
                product.stock = Math.max(0, product.stock - cartItem.qty);
            }
        });

        // Save updated stock to localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Clear Cart
        cart = [];
        updateCartUI();

        // Re-render to show new stock level
        const currentCategory = document.querySelector('.filter-btn.active').dataset.category;
        renderProducts(currentCategory);

        showToast("สั่งซื้อสำเร็จ! กำลังไปที่ Facebook...");

        // Redirect to FB after a short delay
        setTimeout(() => {
            window.open('https://www.facebook.com/siwakorn.bunde.2024', '_blank');
        }, 1500);
    });
}

function showToast(message, type = "success") {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Icon based on type
    const icon = type === "error"
        ? '<i class="fa-solid fa-circle-exclamation"></i>'
        : '<i class="fa-solid fa-circle-check"></i>';

    toast.innerHTML = `${icon}<span>${message}</span>`;

    toastContainer.appendChild(toast);

    // Remove after 3 seconds with fade out
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Global function for Admin Modal
window.openAdminModal = function () {
    // Security Check at Entrance
    const password = prompt("🔒 กรุณาใส่รหัสลับแอดมิน เพื่อเข้าสู่เมนูจัดการสต็อก:");

    if (password === "admin888") {
        console.log("Access Granted");
        renderAdminProducts();
        const adminModal = document.getElementById('admin-modal');
        if (adminModal) {
            adminModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            showToast("ยินดีต้อนรับแอดมิน! 🛠️", "success");
        } else {
            console.error("Admin modal element not found!");
        }
    } else if (password !== null) {
        showToast("รหัสผ่านไม่ถูกต้อง! ห้ามเข้าครับ", "error");
    }
};

window.closeAdminModal = function () {
    const adminModal = document.getElementById('admin-modal');
    if (adminModal) {
        adminModal.classList.remove('active');
        document.body.style.overflow = '';
    }
};



window.saveStock = function () {
    console.log("Save Stock Clicked");
    products.forEach(product => {
        const input = document.getElementById(`stock-input-${product.id}`);
        if (input) {
            product.stock = parseInt(input.value) || 0;
        }
    });

    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Update UI
    const currentCategory = document.querySelector('.filter-btn.active').dataset.category;
    renderProducts(currentCategory);

    // Close Modal
    window.closeAdminModal();

    showToast("บันทึกสต็อกเรียบร้อยแล้ว!");
};

// Global for inline onclick
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;

// Ensure init runs
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

