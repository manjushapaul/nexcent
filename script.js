// ========== SWIPER INITIALIZATION ==========
const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
        delay: 50000,
      //  disableOnInteraction: false,
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

// ========== NAVBAR BACKGROUND CHANGE ON SCROLL ==========
const navbar = document.getElementById('navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add white background and shadow when scrolled
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
    } 
    // Remove white background when at top
    else {
        navbar.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Close menu when window resizes to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            mobileMenu.classList.add('hidden');
            menuToggle.classList.remove('active');
        }
    });
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
        if (href !== '#' && href !== '#home' && href !== '#login' && href !== '#signup' && 
            href !== '#register' && href !== '#learn' && href !== '#start' &&
            href !== '#twitter' && href !== '#facebook' && href !== '#linkedin') {
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== CLIENT LOGOS SWIPER INITIALIZATION ==========
// Initialize Swiper slider for client logos section
// Features: Auto-play every 5 seconds, infinite loop, no pagination or arrows
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

// Call on scroll
window.addEventListener('scroll', updateActiveMenu);

// Call on page load
updateActiveMenu();

// ========== BACK TO TOP BUTTON FUNCTIONALITY ==========
// Get the back to top button element
const backToTopButton = document.getElementById('backToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', function() {
    // Show button when user scrolls down more than 300px
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
    
    // Update active menu on scroll
    updateActiveMenu();
});

// Smooth scroll to top on button click
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

console.log('✅ Nexcent Landing Page - Loaded Successfully');