// Enhanced JavaScript for Inuka Properties Website

// Video Loading Handler
function initVideoHandling() {
    const videoContainer = document.querySelector('.video-container');
    const iframe = document.querySelector('.video-container iframe');
    const fallback = document.querySelector('.video-fallback');
    
    if (videoContainer && iframe) {
        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'video-loading';
        loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading video...';
        videoContainer.appendChild(loadingDiv);
        
        // Handle video load
        iframe.addEventListener('load', function() {
            loadingDiv.style.display = 'none';
            iframe.style.opacity = '1';
            if (fallback) fallback.style.display = 'none';
        });
        
        // Handle video error
        iframe.addEventListener('error', function() {
            loadingDiv.style.display = 'none';
            iframe.style.display = 'none';
            if (fallback) fallback.style.display = 'flex';
        });
        
        // Timeout fallback
        setTimeout(() => {
            if (loadingDiv.style.display !== 'none') {
                loadingDiv.style.display = 'none';
                iframe.style.display = 'none';
                if (fallback) fallback.style.display = 'flex';
            }
        }, 8000); // 8 second timeout
    }
}

// Show video error with fallback
function showVideoError() {
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'video-error';
        errorDiv.innerHTML = `
            <h4><i class="fas fa-exclamation-triangle"></i> Video Not Available</h4>
            <p>Sorry, the video couldn't load. You can watch it directly on YouTube:</p>
            <a href="https://www.youtube.com/watch?v=M7k2QPoKOJ0" target="_blank" rel="noopener">
                <i class="fab fa-youtube"></i> Watch on YouTube
            </a>
        `;
        videoContainer.appendChild(errorDiv);
    }
}

// Mobile Navigation Toggle
let hamburger, navMenu, navLinks;

// Initialize mobile navigation
function initMobileNav() {
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on non-dropdown links
    navLinks.forEach(link => {
        if (!link.closest('.dropdown')) {
            link.addEventListener('click', closeMobileMenu);
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Initialize dropdowns when menu opens
    if (navMenu.classList.contains('active')) {
        setTimeout(() => {
            initMobileDropdowns();
        }, 100);
    } else {
        // Close all dropdowns when menu closes
        closeAllDropdowns();
    }
}

// Close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    closeAllDropdowns();
}

// Mobile Dropdown Menu Functionality
function initMobileDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (link && menu) {
            // Remove existing event listeners to prevent duplicates
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add new click event listener
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Dropdown clicked:', dropdown.classList.contains('active'));
                
                // Close other dropdowns first
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                
                console.log('Dropdown state:', dropdown.classList.contains('active'));
            });
        }
    });
}

// Close all dropdowns
function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        closeAllDropdowns();
    }
});

// Counter Animation Functionality
function initCounterAnimation() {
    const counterItems = document.querySelectorAll('.counter-item');
    
    if (counterItems.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterItem = entry.target;
                const counterValue = counterItem.querySelector('.counter-value');
                const target = parseInt(counterItem.dataset.target);
                
                if (counterValue && !counterItem.classList.contains('animated')) {
                    counterItem.classList.add('animated');
                    animateCounter(counterValue, target);
                    
                    // Add entrance animation
                    counterItem.style.animation = 'counterSlideIn 0.8s ease-out forwards';
                }
            }
        });
    }, observerOptions);
    
    counterItems.forEach(item => {
        counterObserver.observe(item);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initCounterAnimation();
    initMobileDropdowns();
    initVideoHandling();
});

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
        // Form submission handler
        topSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearch();
        });
        
        // Search button click handler (for mobile touch)
        const searchBtn = topSearchForm.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleSearch();
            });
        }
        
        // Enter key handler
        topSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
        
        // Enhanced focus/blur effects for mobile
        topSearchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.4)';
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'all 0.3s ease';
        });
        
        topSearchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Mobile-specific enhancements
        if ('ontouchstart' in window) {
            // Add touch feedback
            topSearchInput.addEventListener('touchstart', function() {
                this.parentElement.style.background = 'rgba(255, 255, 255, 0.3)';
            });
            
            topSearchInput.addEventListener('touchend', function() {
                this.parentElement.style.background = 'rgba(255, 255, 255, 0.15)';
            });
        }
        
        // Prevent zoom on input focus (iOS Safari)
        topSearchInput.addEventListener('focus', function() {
            this.style.fontSize = '16px';
        });
        
        topSearchInput.addEventListener('blur', function() {
            this.style.fontSize = '';
        });
    }
    
    function handleSearch() {
        const searchQuery = topSearchInput.value.trim();
        
        if (!searchQuery) {
            showNotification('Please enter a search term', 'error');
            topSearchInput.focus();
            return;
        }
        
        // Show loading state
        const searchBtn = topSearchForm.querySelector('.search-btn');
        const originalIcon = searchBtn.innerHTML;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchBtn.disabled = true;
        topSearchInput.disabled = true;
        
        // Simulate search and redirect to properties page with search query
        setTimeout(() => {
            const searchParams = new URLSearchParams({
                search: searchQuery
            });
            window.location.href = `land-for-sale.html?${searchParams.toString()}`;
        }, 800);
    }
}

// Hero Section Button Functionality - Simplified
function enhanceHeroButtons() {
    // Remove any potential interference with button functionality
    // Let the href links work naturally
    console.log('Hero buttons are ready for natural navigation');
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
