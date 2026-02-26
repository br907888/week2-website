/* Every Witch Way - Main JavaScript */

// Toggle mobile navigation
function toggleNav() {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.querySelector('.nav-toggle');

    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.querySelector('.nav-toggle');
    const header = document.querySelector('header');

    if (navLinks && navLinks.classList.contains('active')) {
        if (!header.contains(event.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Close mobile nav when window is resized to desktop size
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navLinks = document.getElementById('navLinks');
        const navToggle = document.querySelector('.nav-toggle');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (navToggle) {
            navToggle.classList.remove('active');
        }
    }
});

// Page transition handling
document.addEventListener('DOMContentLoaded', function() {
    // Add page wrapper class for animations
    const pageWrapper = document.querySelector('.page-wrapper');

    // Handle internal link clicks for smooth page transitions
    const internalLinks = document.querySelectorAll('a[href^="index"], a[href^="menu"], a[href^="about"], a[href^="locations"], a[href^="contact"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't animate if it's the current page
            if (this.classList.contains('active')) {
                e.preventDefault();
                return;
            }

            // Add fade out class and navigate after animation
            if (pageWrapper) {
                e.preventDefault();
                pageWrapper.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    // Scroll reveal animation
    initScrollReveal();

    // Dark mode
    initDarkMode();
});

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.featured-item, .menu-item, .team-member, .location-card, .mission-point, .info-item');

    // Add reveal class to elements
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // Check if element is in viewport
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    // Initial check
    checkReveal();

    // Check on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkReveal();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Dark Mode
function initDarkMode() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Apply saved preference on load
    const saved = localStorage.getItem('theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        toggle.textContent = saved === 'dark' ? 'Light Mode' : 'Dark Mode';
    }

    toggle.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        toggle.textContent = next === 'dark' ? 'Light Mode' : 'Dark Mode';
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Form submission handler (for contact page)
function handleSubmit(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Get form container
    const formContainer = document.querySelector('.contact-form');

    // Create success screen
    const successScreen = document.createElement('div');
    successScreen.className = 'form-success-screen';
    successScreen.innerHTML = `
        <div class="success-icon">
            <svg viewBox="0 0 52 52" class="checkmark">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        </div>
        <h3>Message Sent!</h3>
        <p>Thank you, <strong>${name}</strong>!</p>
        <p>We've received your message and will get back to you at <strong>${email}</strong> within 24-48 hours.</p>
        <button class="btn btn-primary" onclick="resetContactForm()">Send Another Message</button>
    `;

    // Hide form with animation
    const form = document.getElementById('contactForm');
    form.style.opacity = '0';
    form.style.transform = 'scale(0.95)';

    setTimeout(() => {
        form.style.display = 'none';
        formContainer.appendChild(successScreen);

        // Trigger animation
        setTimeout(() => {
            successScreen.classList.add('active');
        }, 50);
    }, 300);

    // Reset form (hidden)
    form.reset();
}

// Reset contact form to allow sending another message
function resetContactForm() {
    const formContainer = document.querySelector('.contact-form');
    const successScreen = document.querySelector('.form-success-screen');
    const form = document.getElementById('contactForm');

    // Fade out success screen
    successScreen.classList.remove('active');
    successScreen.classList.add('fade-out');

    setTimeout(() => {
        successScreen.remove();
        form.style.display = 'block';

        // Re-enable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
        }

        // Fade form back in
        setTimeout(() => {
            form.style.opacity = '1';
            form.style.transform = 'scale(1)';
        }, 50);
    }, 300);
}

// Add loading state to buttons on form submit
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
            }
        });
    });
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
        }
    }
});

// Active navigation highlighting based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Header shadow on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
    }
});
