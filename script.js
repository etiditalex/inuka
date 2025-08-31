// Enhanced JavaScript for Inuka Properties Website

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Dropdown Menu Functionality
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (link && menu) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns first
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Close dropdowns when mobile menu is closed
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        // Close all dropdowns when hamburger is clicked
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
}

// Property Search Form Handler
const propertySearchForm = document.getElementById('propertySearchForm');
if (propertySearchForm) {
    propertySearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const propertyType = document.getElementById('propertyType').value;
        const location = document.getElementById('location').value;
        const priceRange = document.getElementById('priceRange').value;
        
        if (!propertyType || !location) {
            showNotification('Please select both property type and location', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = propertySearchForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Searching...';
        submitBtn.disabled = true;
        
        // Simulate search (replace with actual API call)
        setTimeout(() => {
            // Redirect to land for sale page with search parameters
            const searchParams = new URLSearchParams({
                type: propertyType,
                location: location,
                price: priceRange
            });
            
            window.location.href = `land-for-sale.html?${searchParams.toString()}`;
        }, 1500);
    });
}

// Newsletter Subscription Handler
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value;
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual newsletter subscription)
        setTimeout(() => {
            showNotification('Thank you for subscribing! You\'ll receive our latest updates soon.', 'success');
            newsletterForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.trust-item, .feature-card, .office-card, .about-content').forEach(el => {
    observer.observe(el);
});

// Form validation enhancement
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
            e.preventDefault();
            showNotification('Please fill in all required fields', 'error');
        }
    });
});

// Enhanced mobile experience
function enhanceMobileExperience() {
    // Add touch-friendly interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.fontSize = '16px';
        });
        
        input.addEventListener('blur', () => {
            input.style.fontSize = '';
        });
    });
}

// Initialize enhanced mobile experience
enhanceMobileExperience();

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Top Bar Search Functionality
function initTopSearch() {
    const topSearchForm = document.getElementById('topSearchForm');
    const topSearchInput = document.getElementById('topSearchInput');
    
    if (topSearchForm && topSearchInput) {
        topSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchQuery = topSearchInput.value.trim();
            
            if (!searchQuery) {
                showNotification('Please enter a search term', 'error');
                return;
            }
            
            // Show loading state
            const searchBtn = this.querySelector('.search-btn');
            const originalIcon = searchBtn.innerHTML;
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            searchBtn.disabled = true;
            
            // Simulate search and redirect to properties page with search query
            setTimeout(() => {
                const searchParams = new URLSearchParams({
                    search: searchQuery
                });
                window.location.href = `land-for-sale.html?${searchParams.toString()}`;
            }, 1000);
        });
        
        // Add focus effect
        topSearchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.3)';
        });
        
        topSearchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    }
}

// Hero Section Button Functionality
function enhanceHeroButtons() {
    const exploreBtn = document.querySelector('.hero .btn-primary');
    const bookVisitBtn = document.querySelector('.hero .btn-secondary');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading and redirect
            setTimeout(() => {
                window.location.href = 'land-for-sale.html';
            }, 800);
        });
    }
    
    if (bookVisitBtn) {
        bookVisitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading and redirect
            setTimeout(() => {
                window.location.href = 'book-visit.html';
            }, 800);
        });
    }
}

// Smooth scroll to sections
function smoothScrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click handlers for smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollToSection(targetId);
        });
    });
    
    // Initialize hero button enhancements
    enhanceHeroButtons();
    
    // Initialize top search functionality
    initTopSearch();
});

// Console welcome message
console.log('%c🏠 Welcome to Inuka Properties!', 'color: #2dabe1; font-size: 20px; font-weight: bold;');
console.log('%cYour Elite Partner in Real Estate', 'color: #ec1c26; font-size: 14px;');
