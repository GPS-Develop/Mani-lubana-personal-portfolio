/**
 * Portfolio Interactive Functionality
 * Author: Gurpreet Lubana
 */

// ==========================================================================
// DOM Ready Check
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// ==========================================================================
// Main Initialization
// ==========================================================================

function initializePortfolio() {
    setupSmoothScrolling();
    setupParallaxEffects();
    setupProjectCardHovers();
    setupScrollAnimations();
    setupContactForm();
    setupThemeToggle();
    setupLoadingAnimations();
}

// ==========================================================================
// Smooth Scrolling
// ==========================================================================

function setupSmoothScrolling() {
    // Add smooth scrolling for any anchor links
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
}

// ==========================================================================
// Parallax Effects
// ==========================================================================

function setupParallaxEffects() {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = scrolled * speed;
            const rotation = scrolled * 0.1;
            
            shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Only add parallax on larger screens to avoid performance issues
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', requestTick);
    }
}

// ==========================================================================
// Project Card Interactions
// ==========================================================================

function setupProjectCardHovers() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click tracking for analytics (if needed)
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                trackProjectClick(this.querySelector('h3').textContent);
            }
        });
    });
}

// ==========================================================================
// Scroll Animations
// ==========================================================================

function setupScrollAnimations() {
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

    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .section {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        .section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// Contact Form Enhancement
// ==========================================================================

function setupContactForm() {
    // Add mailto link enhancement
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add subject and body to email
            const subject = 'Portfolio Contact - Opportunity Discussion';
            const body = 'Hi Gurpreet,\n\nI visited your portfolio and would like to discuss...\n\nBest regards,';
            
            const currentHref = this.getAttribute('href');
            const enhancedHref = `${currentHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            this.setAttribute('href', enhancedHref);
        });
    });
}

// ==========================================================================
// Theme Toggle (Future Enhancement)
// ==========================================================================

function setupThemeToggle() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Create theme toggle button (hidden by default)
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.display = 'none'; // Hidden for now
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button icon
        const icon = this.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// ==========================================================================
// Loading Animations
// ==========================================================================

function setupLoadingAnimations() {
    // Add staggered animation to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.1}s`;
        category.classList.add('fade-in-up');
    });

    // Add staggered animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });

    // Add animation CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .fade-in-up {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
}

// ==========================================================================
// Analytics & Tracking
// ==========================================================================

function trackProjectClick(projectName) {
    // Placeholder for analytics tracking
    console.log(`Project clicked: ${projectName}`);
    
    // If using Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'project_click', {
            'project_name': projectName,
            'event_category': 'portfolio_interaction'
        });
    }
}

// ==========================================================================
// Performance Optimization
// ==========================================================================

// Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
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

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==========================================================================
// Accessibility Enhancements
// ==========================================================================

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab
    if (e.key === 'Tab' && e.target === document.body) {
        const mainContent = document.querySelector('main') || document.querySelector('.card');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// Add focus management for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const link = this.querySelector('.project-link');
            if (link) {
                link.click();
            }
        }
    });
});

// ==========================================================================
// Error Handling
// ==========================================================================

window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
    // Could send to error tracking service
});

// ==========================================================================
// Utility Functions
// ==========================================================================

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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================================================
// Export for testing (if needed)
// ==========================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePortfolio,
        setupSmoothScrolling,
        setupParallaxEffects,
        setupProjectCardHovers,
        trackProjectClick
    };
}