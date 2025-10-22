// ==================== MANUFACTURERS DATA ====================

const manufacturers = [
    {
        name: "Toshkent Premium Food",
        category: "oziq-ovqat",
        products: "High-quality organic products, natural sweets and healthy food products",
        location: "Tashkent, Chilonzor",
        phone: "+998 90 123 45 67",
        social: {
            telegram: "@toshkent_premium_food",
            instagram: "@toshkent_premium_official"
        },
        likes: 2450,
        image: "🎯",
        rating: 4.8,
        verified: true
    },
    {
        name: "Samarqand Luxury Textile",
        category: "kiyim",
        products: "Modern and traditional clothing, high-quality fabrics and accessories",
        location: "Samarkand, Registon Street",
        phone: "+998 91 234 56 78",
        social: {
            telegram: "@samarqand_luxury",
            instagram: "@samarqand_textile_official"
        },
        likes: 1890,
        image: "👕",
        rating: 4.9,
        verified: true
    },
    {
        name: "Buxoro Smart Electronics",
        category: "elektronika",
        products: "Modern electronics, smartphones, laptops and home appliances",
        location: "Bukhara, Mustaqillik Street",
        phone: "+998 92 345 67 89",
        social: {
            telegram: "@buxoro_electronics",
            instagram: "@buxoro_smart_tech"
        },
        likes: 3120,
        image: "📱",
        rating: 4.7,
        verified: true
    },
    {
        name: "Andijon Modern Furniture",
        category: "uy-jihozlari",
        products: "Modern furniture, office and home furnishings. Custom furniture service",
        location: "Andijan, Bobur Street",
        phone: "+998 93 456 78 90",
        social: {
            telegram: "@andijon_furniture",
            instagram: "@andijon_modern_home"
        },
        likes: 1560,
        image: "🏠",
        rating: 4.6,
        verified: true
    },
    {
        name: "Farg'ona Active Sport",
        category: "sport",
        products: "Sports clothing, training equipment and fitness gear",
        location: "Fergana, Mustaqillik Square",
        phone: "+998 94 567 89 01",
        social: {
            telegram: "@fargona_sport",
            instagram: "@fargona_active_official"
        },
        likes: 2280,
        image: "⚽",
        rating: 4.8,
        verified: true
    },
    {
        name: "Qarshi Construction Pro",
        category: "qurulish",
        products: "Construction materials, professional tools and building services",
        location: "Qarshi, Amir Temur Street",
        phone: "+998 95 678 90 12",
        social: {
            telegram: "@qarshi_construction",
            instagram: "@qarshi_build_pro"
        },
        likes: 1750,
        image: "🔨",
        rating: 4.5,
        verified: true
    },
    {
        name: "Nukus Organic Valley",
        category: "oziq-ovqat",
        products: "Organic and natural products, fresh dairy and meat products",
        location: "Nukus, Karakalpakstan",
        phone: "+998 96 789 01 23",
        social: {
            telegram: "@nukus_organic",
            instagram: "@nukus_valley_organic"
        },
        likes: 1340,
        image: "🥛",
        rating: 4.7,
        verified: true
    },
    {
        name: "Urganch Fashion House",
        category: "kiyim",
        products: "Fashion clothing, designer collections and exclusive accessories",
        location: "Urgench, Khorezm Region",
        phone: "+998 97 890 12 34",
        social: {
            telegram: "@urganch_fashion",
            instagram: "@urganch_fashion_house"
        },
        likes: 2890,
        image: "👗",
        rating: 4.9,
        verified: true
    }
];

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    displayManufacturers(manufacturers);
    setupEventListeners();
    animateCounters();
    setupLanguageDropdown();
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    
    // Search and filter events
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterManufacturers, 300));
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', filterManufacturers);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeLanguageDropdown();
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#languageBtn') && !e.target.closest('#languageDropdown')) {
            closeLanguageDropdown();
        }
    });
}

// ==================== LANGUAGE DROPDOWN ====================
function setupLanguageDropdown() {
    const languageBtn = document.getElementById('languageBtn');
    
    if (languageBtn) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleLanguageDropdown();
        });
    }
}

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

function closeLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        dropdown.classList.add('hidden');
    }
}

// ==================== LANGUAGE CHANGE ====================
function changeLang(lang) {
    const currentLangElement = document.getElementById('currentLang');
    
    // Update current language display
    const langMap = {
        'uz': 'UZ',
        'ru': 'RU',
        'en': 'EN'
    };
    
    if (currentLangElement) {
        currentLangElement.textContent = langMap[lang];
    }
    
    // Close dropdown
    closeLanguageDropdown();
    
    // Here you can add actual translation logic
    console.log('Language changed to:', lang);
    
    // You can store language preference in localStorage
    localStorage.setItem('selectedLanguage', lang);
}

// ==================== DEBOUNCE UTILITY ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== DISPLAY MANUFACTURERS ====================
function displayManufacturers(list) {
    const grid = document.getElementById('manufacturersGrid');
    
    if (!grid) return;
    
    if (list.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-6xl mb-4">😔</div>
                <h3 class="text-2xl font-semibold text-gray-600 mb-2">No results found</h3>
                <p class="text-gray-500">Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = list.map(manufacturer => createManufacturerCard(manufacturer)).join('');
}

// ==================== CREATE MANUFACTURER CARD ====================
function createManufacturerCard(m) {
    return `
        <div class="manufacturer-card bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="p-6">
                <!-- Header -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="text-4xl">${m.image}</div>
                        <div>
                            <h3 class="font-bold text-lg text-gray-900">${m.name}</h3>
                            <div class="flex items-center space-x-2 mt-1">
                                <span class="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">
                                    ${getCategoryName(m.category)}
                                </span>
                                ${m.verified ? '<i class="fas fa-check-circle text-orange-500" title="Verified"></i>' : ''}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Description -->
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${m.products}</p>
                
                <!-- Info -->
                <div class="space-y-2 mb-4 text-sm">
                    <div class="flex items-center text-gray-500">
                        <i class="fas fa-map-marker-alt w-4 mr-2"></i>
                        <span>${m.location}</span>
                    </div>
                    <div class="flex items-center text-gray-500">
                        <i class="fas fa-phone w-4 mr-2"></i>
                        <span>${m.phone}</span>
                    </div>
                </div>
                
                <!-- Rating & Likes -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-1 text-yellow-400">
                        ${'★'.repeat(Math.floor(m.rating))}
                        <span class="text-gray-600 text-sm ml-1">${m.rating}</span>
                    </div>
                    <div class="flex items-center space-x-1 text-red-500">
                        <i class="fas fa-heart text-sm"></i>
                        <span class="text-sm">${formatNumber(m.likes)}</span>
                    </div>
                </div>
                
                <!-- Button -->
                <button onclick="showManufacturerDetails('${escapeHtml(m.name)}')" 
                        class="w-full btn-primary text-white py-3 rounded-lg font-semibold">
                    <i class="fas fa-info-circle mr-2"></i>View Details
                </button>
            </div>
        </div>
    `;
}

// ==================== GET CATEGORY NAME ====================
function getCategoryName(category) {
    const categoryNames = {
        'oziq-ovqat': 'Food & Beverage',
        'kiyim': 'Clothing',
        'elektronika': 'Electronics',
        'uy-jihozlari': 'Home Goods',
        'sport': 'Sports',
        'qurulish': 'Construction'
    };
    return categoryNames[category] || category;
}

// ==================== FILTER MANUFACTURERS ====================
function filterManufacturers() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    
    if (!searchInput || !categorySelect) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    
    const filteredList = manufacturers.filter(manufacturer => {
        const matchesSearch = 
            manufacturer.name.toLowerCase().includes(searchTerm) ||
            manufacturer.products.toLowerCase().includes(searchTerm) ||
            manufacturer.location.toLowerCase().includes(searchTerm);
        
        const matchesCategory = 
            selectedCategory === '' || 
            manufacturer.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayManufacturers(filteredList);
}

// ==================== SEARCH MANUFACTURERS ====================
function searchManufacturers() {
    filterManufacturers();
}

// ==================== SHOW MANUFACTURER DETAILS ====================
function showManufacturerDetails(manufacturerName) {
    const manufacturer = manufacturers.find(m => m.name === manufacturerName);
    
    if (!manufacturer) return;
    
    const modal = createModal(manufacturer);
    document.body.appendChild(modal);
    
    // Trigger animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// ==================== CREATE MODAL ====================
function createModal(m) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-8">
                <!-- Header -->
                <div class="flex justify-between items-start mb-6">
                    <h2 class="text-3xl font-bold text-gray-900">${m.name}</h2>
                    <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <!-- Content -->
                <div class="space-y-6">
                    <!-- Image and Info -->
                    <div class="flex items-center space-x-4">
                        <div class="text-5xl">${m.image}</div>
                        <div>
                            <span class="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                                ${getCategoryName(m.category)}
                            </span>
                            <div class="flex items-center space-x-2 mt-2">
                                <div class="flex items-center text-yellow-400">
                                    ${'★'.repeat(Math.floor(m.rating))}
                                    <span class="text-gray-600 text-sm ml-1">${m.rating}</span>
                                </div>
                                <span class="text-gray-400">•</span>
                                <div class="flex items-center text-red-500">
                                    <i class="fas fa-heart text-sm mr-1"></i>
                                    ${formatNumber(m.likes)}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Products -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-2">About Products:</h3>
                        <p class="text-gray-600">${m.products}</p>
                    </div>
                    
                    <!-- Contact & Social -->
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="bg-orange-50 p-4 rounded-lg">
                            <h4 class="font-semibold mb-3">Contact Information</h4>
                            <div class="space-y-2 text-sm">
                                <div class="flex items-center">
                                    <i class="fas fa-map-marker-alt text-orange-500 w-5"></i>
                                    <span>${m.location}</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-phone text-orange-500 w-5"></i>
                                    <span>${m.phone}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold mb-3">Social Media</h4>
                            <div class="space-y-2 text-sm">
                                <a href="https://t.me/${m.social.telegram.replace('@', '')}" 
                                   target="_blank"
                                   class="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                                    <i class="fab fa-telegram w-5"></i>
                                    <span>${m.social.telegram}</span>
                                </a>
                                <a href="https://instagram.com/${m.social.instagram.replace('@', '')}" 
                                   target="_blank"
                                   class="flex items-center text-pink-600 hover:text-pink-800 transition-colors">
                                    <i class="fab fa-instagram w-5"></i>
                                    <span>${m.social.instagram}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex gap-4">
                        <button onclick="window.location.href='tel:${m.phone}'" 
                                class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
                            <i class="fas fa-phone mr-2"></i>Call Now
                        </button>
                        <button onclick="window.open('https://t.me/${m.social.telegram.replace('@', '')}', '_blank')" 
                                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                            <i class="fab fa-telegram mr-2"></i>Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    return modal;
}

// ==================== CLOSE MODAL ====================
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

// ==================== SCROLL TO JOIN ====================
function scrollToJoin() {
    const joinSection = document.getElementById('join');
    if (joinSection) {
        joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMobileMenu();
}

// ==================== ANIMATE COUNTERS ====================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / speed;
                
                let current = 0;
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ==================== UTILITY FUNCTIONS ====================

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ==================== SCROLL EFFECTS ====================
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.glass-nav');
    
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== LOAD SAVED LANGUAGE ====================
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        changeLang(savedLang);
    }
});

// ==================== CONSOLE GREETING ====================
console.log('%c👋 Welcome to Do\'konchi!', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cConnecting Businesses Across Borders', 'color: #f7931e; font-size: 14px;');

// Scroll to Manufacturers Section
function scrollToManufacturers() {
    document.querySelector('#manufacturers')?.scrollIntoView({ behavior: 'smooth' });
}