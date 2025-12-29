// ========== SWIPER INITIALIZATION ==========
// Wait for DOM and Swiper library to be ready
(function initSwiper() {
    if (typeof Swiper === 'undefined') {
        // Retry after a short delay if Swiper hasn't loaded yet
        setTimeout(initSwiper, 100);
        return;
    }
    
    try {
        const swiper = new Swiper('.mySwiper', {
            loop: true,
            autoplay: {
                delay: 50000,
                disableOnInteraction: false,
            },
            speed: 800,
            effect: 'slide',
            
            pagination: {
                // el: '.swiper-pagination',
                // clickable: true,
                // dynamicBullets: true,
            },
            
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Set navigation arrow color to theme green
            on: {
                init: function() {
                    const navButtons = document.querySelectorAll('.swiper-button-prev, .swiper-button-next');
                    navButtons.forEach(btn => {
                        btn.style.setProperty('--swiper-navigation-color', '#4CAF4F');
                        btn.style.color = '#4CAF4F';
                    });
                }
            },
            
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                },
            }
        });
    } catch (error) {
        console.error('Error initializing Swiper:', error);
    }
})();

// ========== NAVBAR BACKGROUND CHANGE ON SCROLL ==========
// Use passive listener for better performance
const navbar = document.getElementById('navbar');
const scrollThreshold = 100;

// Throttle scroll events for better performance
let ticking = false;
function updateNavbar() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuToggle.classList.toggle('active');
        
        // Update aria attributes for accessibility
        menuToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        mobileMenu.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && menuToggle) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenu.setAttribute('aria-hidden', 'true');
                }
            }
        }
    }, { passive: true });

    // Close menu when window resizes to desktop - throttle for performance
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 768 && mobileMenu && menuToggle) {
                mobileMenu.classList.add('hidden');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            }
        }, 250);
    }, { passive: true });
}

// ========== CLOSE MOBILE MENU ON LINK CLICK ==========
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        menuToggle.classList.remove('active');
    });
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Allow default behavior for empty hashes and specific links
        const skipLinks = ['#', '#home', '#login', '#signup', '#register', '#learn', '#start', 
                          '#twitter', '#facebook', '#linkedin'];
        
        if (skipLinks.includes(href)) {
            return; // Allow default behavior
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navbar = document.getElementById('navbar');
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
            
            // Update URL without triggering scroll
            if (history.pushState) {
                history.pushState(null, null, href);
            }
        }
    }, { passive: false });
});

// ========== CLIENT LOGOS SWIPER INITIALIZATION ==========
// Initialize Swiper slider for client logos section
// Features: Auto-play every 5 seconds, infinite loop, no pagination or arrows
(function initClientSwiper() {
    if (typeof Swiper === 'undefined') {
        setTimeout(initClientSwiper, 100);
        return;
    }
    
    try {
        const clientSwiper = new Swiper('.clientSwiper', {
            // Enable infinite loop
            loop: true,
            
            // Auto-play configuration
            autoplay: {
                delay: 5000, // 5 seconds delay between slides
                disableOnInteraction: false, // Continue autoplay after user interaction
            },
            
            // Transition speed
            speed: 1000,
            
            // Display 1 slide at a time (containing 6 logos)
            slidesPerView: 1,
            spaceBetween: 30,
            
            // Slide effect
            effect: 'slide',
            
            // Disable pagination dots
            pagination: false,
            
            // Disable navigation arrows
            navigation: false,
            
            // Allow touch/swipe on mobile devices
            allowTouchMove: true,
            
            // Responsive breakpoints
            breakpoints: {
                // Mobile devices (320px and up)
                320: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                // Tablet devices (768px and up)
                768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                // Desktop devices (1024px and up)
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1400: {
                    slidesPerView: 6,
                    spaceBetween: 30,
                },
            }
        });
    } catch (error) {
        console.error('Error initializing client logos Swiper:', error);
    }
})();

// ========== ACTIVE NAVIGATION MENU DETECTION ==========
// Function to update active menu item based on scroll position
function updateActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navbar a[href^="#"], #mobile-menu a[href^="#"]');
    const scrollPosition = window.pageYOffset + 150; // Offset for navbar height
    const bannerSection = document.querySelector('.swiper-container');

    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Check if we're at the top (banner/home section)
    if (bannerSection && window.pageYOffset < bannerSection.offsetHeight - 100) {
        const homeLinks = document.querySelectorAll('a[href="#home"]');
        homeLinks.forEach(link => link.classList.add('active'));
        return;
    }

    // Find the current section in view
    let activeSectionFound = false;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSectionFound = true;
            // Add active class to corresponding nav links
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Call on scroll - use passive listener and throttle
let menuUpdateTicking = false;
function throttledUpdateActiveMenu() {
    if (!menuUpdateTicking) {
        window.requestAnimationFrame(function() {
            updateActiveMenu();
            menuUpdateTicking = false;
        });
        menuUpdateTicking = true;
    }
}

window.addEventListener('scroll', throttledUpdateActiveMenu, { passive: true });

// Call on page load
updateActiveMenu();

// ========== BACK TO TOP BUTTON FUNCTIONALITY ==========
// Get the back to top button element
const backToTopButton = document.getElementById('backToTop');

// Show/hide button based on scroll position - optimized with throttling
let backToTopTicking = false;
function updateBackToTopButton() {
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    backToTopTicking = false;
}

window.addEventListener('scroll', function() {
    if (!backToTopTicking) {
        window.requestAnimationFrame(function() {
            updateBackToTopButton();
            throttledUpdateActiveMenu();
        });
        backToTopTicking = true;
    }
}, { passive: true });

// Smooth scroll to top on button click
if (backToTopButton) {
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // Update focus for accessibility
        this.blur();
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ Nexcent Landing Page - Loaded Successfully');
    });
} else {
    console.log('✅ Nexcent Landing Page - Loaded Successfully');
}