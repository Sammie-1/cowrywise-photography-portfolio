const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animationConfig = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};
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

function initScrollAnimations() {
    const observerOptions = {
        threshold: animationConfig.threshold,
        rootMargin: animationConfig.rootMargin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.fade-up, .fade-in, .scale-in, .slide-left, .slide-right'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

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

function initHeroTextAnimation() {
    const heroTitle = document.querySelector('.hero__title');
    const heroDescription = document.querySelector('.hero__description');
    const heroActions = document.querySelector('.hero__actions');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('animate-in'), 500);
    }
    if (heroDescription) {
        setTimeout(() => heroDescription.classList.add('animate-in'), 1000);
    }
    if (heroActions) {
        setTimeout(() => heroActions.classList.add('animate-in'), 1500);
    }
}

function initSlideNavigation() {
    const slideButtons = document.querySelectorAll('.hero__carousel-button');
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
            const heroTitle = document.querySelector('.hero__title');
            const heroDescription = document.querySelector('.hero__description');
            const heroImage = document.querySelector('.hero__image');
            
            if (index === 0) {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            } else {
                currentSlide = (currentSlide + 1) % slides.length;
            }
            
            heroTitle.style.opacity = '0';
            heroDescription.style.opacity = '0';
            heroImage.style.opacity = '0';
            
            setTimeout(() => {
                heroTitle.textContent = slides[currentSlide].name;
                heroDescription.textContent = slides[currentSlide].description;
                heroImage.src = slides[currentSlide].image;
                
                heroTitle.style.opacity = '1';
                heroDescription.style.opacity = '1';
                heroImage.style.opacity = '1';
            }, 500);
            
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = 'scale(1)', 200);
        });
    });
}

function initFormAnimations() {
    const formInputs = document.querySelectorAll('.contact__input');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    const submitBtn = document.querySelector('.contact__submit');
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

document.addEventListener('DOMContentLoaded', () => {
    if (!prefersReducedMotion) {
        const portfolioItems = document.querySelectorAll('.portfolio__card--medium, .portfolio__card--large');
        
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

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});