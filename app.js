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

    let cart = [];
    let userProfile = null;
    let products = [...defaultProducts];
    let pendingItemId = null;

    const getEl = (id) => document.getElementById(id);

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
            }, (error) => {
                console.error("Firebase Sync Error:", error);
                renderProducts('all'); // Stay with local defaults
            });
        } catch (err) {
            console.error("Firebase Setup Error:", err);
            renderProducts('all');
        }

        updateCartUI();
        updateLoginStatus();
        setupEventListeners();
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

    window.toggleAvatarSelection = () => {
        const grid = getEl('avatar-selection');
        if (grid) grid.style.display = grid.style.display === 'none' ? 'block' : 'none';
    };

    window.selectAvatar = async (url) => {
        if (!userProfile || !userProfile.username) return;

        try {
            await database.ref('users/' + userProfile.username + '/avatar').set(url);
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

    function updateLoginStatus() {
        const trigger = getEl('login-trigger');
        if (!trigger) return;

        const saved = sessionStorage.getItem('user');
        if (saved) {
            try {
                userProfile = JSON.parse(saved);
            } catch (e) {
                console.error("Session parse error", e);
                userProfile = null;
            }
        } else {
            userProfile = null;
        }

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
            if (userDisplay) userDisplay.textContent = userProfile.username;

            // Render Avatar
            const avatarImg = getEl('profile-avatar-img');
            if (avatarImg) {
                avatarImg.src = userProfile.avatar || 'images/beetle_avatar.png';
            }

            // Render Delivery Info
            const deliveryContent = getEl('delivery-info-content');
            if (deliveryContent) {
                const savedInfo = sessionStorage.getItem('deliveryInfo');
                if (savedInfo) {
                    const info = JSON.parse(savedInfo);
                    deliveryContent.innerHTML = `
                    <div style="margin-bottom: 5px;"><strong>ชื่อ:</strong> ${info.name}</div>
                    <div style="margin-bottom: 5px;"><strong>โทร:</strong> ${info.phone}</div>
                    <div style="margin-bottom: 5px; word-break: break-word;"><strong>ที่อยู่:</strong> ${info.address}</div>
                    ${info.note ? `<div style="word-break: break-word; color: var(--dappled-gold); font-size: 0.85rem; background: rgba(0,0,0,0.2); padding: 5px; border-radius: 4px; border-left: 2px solid var(--dappled-gold);"><strong>หมายเหตุ:</strong> ${info.note}</div>` : ''}
                `;
                } else {
                    deliveryContent.innerHTML = `<p style="opacity: 0.7; color: #ffadad;">ยังไม่มีข้อมูลจัดส่ง<br><small>(กรุณาระบุข้อมูลสำหรับตัวคุณเอง)</small></p>`;
                }
            }

            // Show admin button only for 'siwakon' (case-insensitive)
            if (adminBtn) {
                adminBtn.style.display = (userProfile.username && userProfile.username.toLowerCase() === 'siwakon') ? 'block' : 'none';
            }
        } else {
            trigger.innerHTML = '<i class="fa-solid fa-user"></i>';
            if (profileView) profileView.style.display = 'none';
            // Default to login form if not logged in
            if (loginForm) loginForm.style.display = 'block';
            if (registerForm) registerForm.style.display = 'none';
            if (modalTitle) modalTitle.textContent = 'เข้าสู่ระบบ';
        }
    }

    window.handleLogout = () => {
        userProfile = null;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('deliveryInfo');
        showToast("ออกจากระบบแล้ว");
        updateLoginStatus();
        window.closeLoginModal();
    };

    window.handleDeleteAccount = async () => {
        if (!userProfile || !userProfile.username) return;

        const confirmDelete = confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบบัญชี "${userProfile.username}"?\nการดำเนินการนี้จะลบข้อมูลที่อยู่จัดส่งและประวัติทั้งหมดถาวร ไม่สามารถกู้คืนได้`);

        if (confirmDelete) {
            try {
                await database.ref('users/' + userProfile.username).remove();
                showToast("ลบบัญชีผู้ใช้งานเรียบร้อยแล้ว");
                window.handleLogout();
            } catch (err) {
                console.error("Delete Account Error:", err);
                showToast("เกิดข้อผิดพลาดในการลบบัญชี", "error");
            }
        }
    };

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
            const card = document.createElement('div');
            card.className = 'product-card glass';
            card.innerHTML = `
                <div class="product-image">
                    ${isOutOfStock ? '<div class="out-of-stock-badge">หมดชั่วคราว</div>' : ''}
                    <img src="${p.image}" alt="${p.name}" class="${isOutOfStock ? 'grayscale' : ''}" onerror="this.src='https://placehold.co/400x400?text=No+Image'">
                </div>
                <div class="product-info">
                    <span class="product-category">${(p.category || 'misc').toUpperCase()}</span>
                    <h3 class="product-name">${p.name || 'สินค้าไม่ได้ระบุชื่อ'}</h3>
                    <div class="product-stock-label" style="color: ${isOutOfStock ? '#ff4d4d' : '#40916c'}">
                        คงเหลือ: ${p.stock || 0} ชิ้น
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                        <span class="product-price">${p.price || 0} ฿</span>
                        ${!isOutOfStock ? `
                        <button class="add-to-cart-btn" onclick="window.addToCart(${p.id})">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                        ` : ''}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        console.log(`Successfully rendered ${filtered.length} products`);
    }

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

    function updateCartUI() {
        const countBadge = getEl('cart-count');
        if (countBadge) {
            const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
            countBadge.innerText = totalQty;
        }
        renderCart();
    }

    window.closeLoginModal = () => {
        const modal = getEl('login-modal');
        if (modal) modal.classList.remove('active');
    };

    window.toggleAuthMode = () => {
        const modal = getEl('login-modal');
        if (modal) modal.classList.toggle('reg-mode');
    };

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

    async function handleLogin(e) {
        e.preventDefault();
        const username = getEl('login-username')?.value?.trim();
        const password = getEl('login-password')?.value;
        if (!username || !password) return showToast("กรุณากรอกข้อมูล", "error");

        try {
            const snapshot = await database.ref('users/' + username).once('value');
            const userData = snapshot.val();

            if (!userData) {
                return showToast("ไม่พบชื่อผู้ใช้นี้", "error");
            }

            const hashedPassword = CryptoJS.SHA256(password).toString();
            if (userData.passwordHash !== hashedPassword) {
                return showToast("รหัสผ่านไม่ถูกต้อง", "error");
            }

            userProfile = {
                username: userData.username,
                avatar: userData.avatar || 'images/beetle_avatar.png'
            };
            sessionStorage.setItem('user', JSON.stringify(userProfile));

            // Restore delivery info from Firebase if it exists
            if (userData.deliveryInfo) {
                sessionStorage.setItem('deliveryInfo', JSON.stringify(userData.deliveryInfo));
            }

            showToast("เข้าสู่ระบบสำเร็จ");
            window.closeLoginModal();
            updateLoginStatus();

            // If there's a pending item, try to add it now
            if (pendingItemId) {
                window.addToCart(pendingItemId);
                // Note: pendingItemId will be cleared by either addToCart (calling it again) 
                // or the delivery form handler if that's the next step.
                // If it hits delivery info check, it sets pendingItemId again.
                // If it succeeds, we should probably clear it here if it wasn't cleared.
                // Actually, addToCart doesn't clear it. Let's check delivery handler.
            }
        } catch (err) {
            console.error("Login error:", err);
            showToast("เกิดข้อผิดพลาด กรุณาลองใหม่", "error");
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        const username = getEl('reg-username')?.value?.trim();
        const password = getEl('reg-password')?.value;

        if (!username || !password) return showToast("กรุณากรอกข้อมูลให้ครบ", "error");
        if (password.length < 4) return showToast("รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร", "error");

        try {
            // Check if username exists
            const snapshot = await database.ref('users/' + username).once('value');
            if (snapshot.exists()) {
                return showToast("ชื่อผู้ใช้นี้มีอยู่แล้ว", "error");
            }

            // Assign random avatar for new user
            const randomAvatar = availableAvatars[Math.floor(Math.random() * availableAvatars.length)];

            // Hash password and save
            const hashedPassword = CryptoJS.SHA256(password).toString();
            await database.ref('users/' + username).set({
                username: username,
                passwordHash: hashedPassword,
                avatar: randomAvatar,
                createdAt: new Date().toISOString()
            });

            showToast("สมัครสมาชิกสำเร็จ!");
            // Switch back to login form
            const loginForm = getEl('login-form');
            const registerForm = getEl('register-form');
            const modalTitle = getEl('modal-title');
            if (registerForm) registerForm.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
            if (modalTitle) modalTitle.textContent = 'เข้าสู่ระบบ';
        } catch (err) {
            console.error("Register error:", err);
            showToast("เกิดข้อผิดพลาด กรุณาลองใหม่", "error");
        }
    }

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

        // Cart Trigger - Check for delivery info first
        const cartTrigger = getEl('cart-trigger');
        if (cartTrigger) {
            cartTrigger.addEventListener('click', () => {
                const deliveryInfo = sessionStorage.getItem('deliveryInfo');
                if (!deliveryInfo) {
                    // Show delivery info modal first
                    const deliveryModal = getEl('delivery-modal');
                    if (deliveryModal) deliveryModal.classList.add('active');
                } else {
                    // Open cart directly
                    const cartModal = getEl('cart-modal');
                    if (cartModal) cartModal.classList.add('active');
                }
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
                if (userProfile && userProfile.username) {
                    database.ref('users/' + userProfile.username + '/deliveryInfo').set(deliveryInfo)
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

    // --- Payment & Admin Functions ---
    window.openPayment = () => {
        if (cart.length === 0) return showToast("กรุณาเพิ่มสินค้าลงตะกร้าก่อนชำระเงิน", "error");
        const modal = getEl('payment-modal');
        if (modal) modal.classList.add('active');
    };

    window.closePayment = () => {
        const modal = getEl('payment-modal');
        if (modal) modal.classList.remove('active');
    };

    window.confirmPayment = () => {
        window.open('https://www.facebook.com/siwakorn.bunde.2024', '_blank');
        showToast("กำลังไปที่หน้า Facebook เพื่อส่งหลักฐานการโอน");
        window.closePayment();
        // Reset cart after payment confirmation
        cart = [];
        updateCartUI();
    };

    window.downloadQR = () => {
        const link = document.createElement('a');
        link.href = 'images/04e5eb92-d450-422e-b525-4149d8d04dd8.jpg';
        link.download = 'promptpay-qr.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("บันทึกรูป QR Code แล้ว");
    };

    window.toggleAdminLogin = () => {
        if (userProfile && userProfile.username.toLowerCase() === 'siwakon') {
            const adminModal = getEl('admin-modal');
            if (adminModal) {
                adminModal.classList.add('active');
                renderAdminProducts();
            }
        }
    };

    function renderAdminProducts() {
        const container = getEl('admin-product-list');
        if (!container) return;
        container.innerHTML = '';

        products.forEach(p => {
            if (!p || !p.name || p.name === 'สินค้าไม่ได้ระบุชื่อ') return;
            const div = document.createElement('div');
            div.className = 'admin-product-item';
            div.style = "display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.03); padding: 10px; border-radius: 8px; margin-bottom: 10px;";
            div.innerHTML = `
                <img src="${p.image}" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">
                <div style="flex: 1;">
                    <div style="font-size: 0.9rem; font-weight: 600;">${p.name}</div>
                    <div style="font-size: 0.8rem; opacity: 0.7;">ID: ${p.id}</div>
                </div>
                <div style="width: 80px;">
                    <label style="font-size: 0.7rem; display: block; margin-bottom: 3px;">สต็อก</label>
                    <input type="number" value="${p.stock}" id="stock-input-${p.id}" 
                        style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 4px; padding: 4px;">
                </div>
            `;
            container.appendChild(div);
        });
    }

    window.saveStock = () => {
        // Collect latest values from inputs
        products.forEach((p) => {
            const input = getEl(`stock-input-${p.id}`);
            if (input) {
                p.stock = parseInt(input.value) || 0;
            }
        });

        // Save the entire products array back to Firebase
        // This is more robust than partial updates if indices shifted
        database.ref('products').set(products).then(() => {
            showToast("บันทึกสต็อกสินค้าเรียบร้อยแล้ว");
            window.closeAdminModal();
        }).catch(err => {
            console.error("Firebase Save Error:", err);
            // Show more detailed error if possible
            const errorMsg = err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
            showToast(errorMsg, "error");
        });
    };

    window.closeAdminModal = () => {
        const modal = getEl('admin-modal');
        if (modal) modal.classList.remove('active');
    };

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
