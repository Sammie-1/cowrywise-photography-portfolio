/**
 * Photography Portfolio - Animation System
 * Lightweight, performance-first animations using Intersection Observer API
 * Respects user's motion preferences
 */

// Check if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animation configuration
const animationConfig = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (!prefersReducedMotion) {
        initScrollAnimations();
        initParallaxEffect();
        initHeroTextAnimation();
        initSlideNavigation();
        initFormAnimations();
        initSmoothScroll();
    }
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: animationConfig.threshold,
        rootMargin: animationConfig.rootMargin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay for grid items
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.fade-up, .fade-in, .scale-in, .slide-left, .slide-right'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Parallax effect for hero section
 */
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-bg-image');
    const testimonialBackground = document.querySelector('.testimonial-bg-image');
    
    let ticking = false;
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        if (heroBackground) {
            const heroOffset = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${heroOffset}px) scale(1.1)`;
        }
        
        if (testimonialBackground) {
            const testimonialSection = testimonialBackground.closest('.testimonial');
            const rect = testimonialSection.getBoundingClientRect();
            const testimonialScroll = (rect.top - window.innerHeight) * -0.3;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                testimonialBackground.style.transform = `translateY(${testimonialScroll}px) scale(1.1)`;
            }
        }
        
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/**
 * Hero text typing/fade animation
 */
function initHeroTextAnimation() {
    const profileName = document.querySelector('.profile-name');
    const profileDesc = document.querySelector('.profile-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (profileName) {
        setTimeout(() => profileName.classList.add('animate-in'), 500);
    }
    if (profileDesc) {
        setTimeout(() => profileDesc.classList.add('animate-in'), 1000);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.classList.add('animate-in'), 1500);
    }
}

/**
 * Interactive slide navigation
 */
function initSlideNavigation() {
    const slideButtons = document.querySelectorAll('.slide-btn');
    const slides = [
        {
            name: 'Jimoh Lawal',
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis  enim velit mollit. Exercitation v  enim velit mollit. Exercitation v  enim vetxercitation veniam consequat sunt nostrud amet.',
            image: 'assets/profile.png'
        },
        {
            name: 'Visual Storyteller',
            description: 'Capturing moments that speak louder than words. Every photograph tells a unique story, frozen in time, waiting to be discovered and cherished by those who view it.',
            image: 'assets/profile.png'
        },
        {
            name: 'Award Winner',
            description: 'Recognized internationally for excellence in photography. My work has been featured in numerous exhibitions and publications, celebrating the art of visual storytelling.',
            image: 'assets/profile.png'
        }
    ];
    
    let currentSlide = 0;
    
    slideButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const profileName = document.querySelector('.profile-name');
            const profileDesc = document.querySelector('.profile-description');
            const profileImage = document.querySelector('.profile-image');
            
            if (index === 0) { // Previous
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            } else { // Next
                currentSlide = (currentSlide + 1) % slides.length;
            }
            
            // Fade out
            profileName.style.opacity = '0';
            profileDesc.style.opacity = '0';
            profileImage.style.opacity = '0';
            
            // Update content and fade in
            setTimeout(() => {
                profileName.textContent = slides[currentSlide].name;
                profileDesc.textContent = slides[currentSlide].description;
                profileImage.src = slides[currentSlide].image;
                
                profileName.style.opacity = '1';
                profileDesc.style.opacity = '1';
                profileImage.style.opacity = '1';
            }, 500);
            
            // Button press animation
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = 'scale(1)', 200);
        });
    });
}

/**
 * Form field animations and interactions
 */
function initFormAnimations() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(input => {
        // Focus animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Ripple effect on click
        input.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Submit button animation
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            const form = this.closest('form');
            if (form && form.checkValidity()) {
                e.preventDefault();
                animateSubmit(this);
            }
        });
    }
}

/**
 * Create ripple effect
 */
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
}

/**
 * Animate form submission
 */
function animateSubmit(button) {
    const originalText = button.textContent;
    button.textContent = 'SENDING...';
    button.classList.add('loading');
    
    setTimeout(() => {
        button.textContent = '✓ SENT!';
        button.classList.remove('loading');
        button.classList.add('success');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('success');
        }, 2500);
    }, 2000);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Add hover tilt effect to portfolio items
 */
document.addEventListener('DOMContentLoaded', () => {
    if (!prefersReducedMotion) {
        const portfolioItems = document.querySelectorAll('.portfolio-small, .portfolio-medium');
        
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.5s ease';
            });
            
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

