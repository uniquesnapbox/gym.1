// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats sections
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Fade-in Scroll Animation
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all fade-in sections
document.querySelectorAll('.fade-in-section').forEach(section => {
    fadeInObserver.observe(section);
});

// Card Scroll Animation
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add scroll animation to cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.program-card, .testimonial-card, .pricing-card, .team-card, .value-card, .service-card, .google-review-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        scrollObserver.observe(element);
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// Booking Form Handler
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('bookingName').value;
        const phone = document.getElementById('bookingPhone').value;
        const program = document.getElementById('bookingProgram').value;
        
        // Create WhatsApp message
        const message = `Hi! I want to book a free trial.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${phone}%0APreferred Program: ${encodeURIComponent(program)}`;
        
        // Redirect to WhatsApp
        window.open(`https://wa.me/917099481497?text=${message}`, '_blank');
        
        // Show success notification
        showNotification('Redirecting to WhatsApp...', 'success');
        
        // Reset form
        bookingForm.reset();
    });
}

// Franchise Form Handler
const franchiseForm = document.getElementById('franchiseForm');
if (franchiseForm) {
    franchiseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('franchiseName').value;
        const city = document.getElementById('franchiseCity').value;
        const phone = document.getElementById('franchisePhone').value;
        const investment = document.getElementById('franchiseInvestment').value;
        
        // Create WhatsApp message
        const message = `Franchise Enquiry%0A%0AName: ${encodeURIComponent(name)}%0ACity: ${encodeURIComponent(city)}%0APhone: ${phone}%0AInvestment Range: ${investment}`;
        
        // Redirect to WhatsApp
        window.open(`https://wa.me/917099481497?text=${message}`, '_blank');
        
        // Show success notification
        showNotification('Redirecting to WhatsApp...', 'success');
        
        // Reset form
        franchiseForm.reset();
        toggleFranchiseForm();
    });
}

// Toggle Franchise Form
function toggleFranchiseForm() {
    const wrapper = document.getElementById('franchiseFormWrapper');
    if (wrapper) {
        if (wrapper.style.display === 'none' || wrapper.style.display === '') {
            wrapper.style.display = 'block';
            setTimeout(() => {
                wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            wrapper.style.display = 'none';
        }
    }
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.firstName || !data.lastName || !data.email || !data.message) {
            showNotification('Please fill in all required fields!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address!', 'error');
            return;
        }
        
        // Show success message
        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Form Data:', data);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, var(--primary-color), var(--accent-color))' : 'linear-gradient(135deg, #ff4444, #cc0000)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 18px 30px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 25px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Pricing Plan Selection
document.querySelectorAll('.pricing-btn').forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('h3').textContent;
        const planPrice = this.closest('.pricing-card').querySelector('.amount').textContent;
        
        // Redirect to WhatsApp with plan details
        const message = `Hi! I want to join the ${planName} plan ($${planPrice}/month).`;
        window.open(`https://wa.me/917099481497?text=${encodeURIComponent(message)}`, '_blank');
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Minimal Parallax Effect for Cinematic Hero (optional, can be removed for pure static)
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// Image Lazy Loading (for better performance)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Video Modal (if Watch Video button is clicked)
const videoButtons = Array.from(document.querySelectorAll('button')).filter(button =>
    button.textContent.toLowerCase().includes('watch video')
);
videoButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Create modal for video
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <iframe width="800" height="450" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    frameborder="0" allowfullscreen>
                </iframe>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Form Input Animations
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add to Cart / Join functionality
let selectedPlan = null;

document.querySelectorAll('.pricing-btn').forEach((btn, index) => {
    btn.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        const planPrice = card.querySelector('.amount').textContent;
        
        selectedPlan = {
            name: planName,
            price: planPrice,
            features: Array.from(card.querySelectorAll('.pricing-features li:not(.disabled)')).map(li => li.textContent.trim())
        };
        
        console.log('Selected Plan:', selectedPlan);
        
        // Show confirmation
        showNotification(`${planName} plan selected! Redirecting to checkout...`);
        
        setTimeout(() => {
            // Redirect to contact page or checkout
            window.location.href = 'contact.html';
        }, 1500);
    });
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#FFB800' : '#ff4444'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 20px 30px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .video-modal .modal-content {
        position: relative;
        max-width: 90%;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 40px;
        color: white;
        cursor: pointer;
        font-weight: 300;
    }
    
    .close-modal:hover {
        color: #FFB800;
    }
    
    .form-group.focused label {
        color: #FFB800;
    }
`;
document.head.appendChild(style);

// Initialize Website
console.log('%c🏋️ Fitness Sports Center - Premium Gym Website 💪', 'color: #FFB800; font-size: 16px; font-weight: bold;');
console.log('📱 WhatsApp Booking: +91 70994 81497');
console.log('✅ All systems ready!');
console.log('✨ Premium micro-interactions active');
