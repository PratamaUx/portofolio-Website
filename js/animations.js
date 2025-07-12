// Animation JavaScript Functions

// Animation Manager Class
class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadingAnimations();
        this.setupParticleSystem();
        this.setupTypingAnimation();
        this.setupCounterAnimations();
        this.setupProgressBars();
        this.setupFloatingElements();
        this.setupGlitchEffect();
        this.setupRippleEffect();
    }
    
    setupScrollAnimations() {
        if (this.isReducedMotion) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements with animation classes
        const animationClasses = [
            '.scroll-animate',
            '.scroll-animate-left',
            '.scroll-animate-right',
            '.scroll-animate-scale',
            '.stagger-animate'
        ];
        
        animationClasses.forEach(className => {
            document.querySelectorAll(className).forEach(element => {
                scrollObserver.observe(element);
            });
        });
        
        this.observers.set('scroll', scrollObserver);
    }
    
    animateElement(element) {
        const animationType = this.getAnimationType(element);
        
        switch (animationType) {
            case 'fadeInUp':
                this.fadeInUp(element);
                break;
            case 'fadeInLeft':
                this.fadeInLeft(element);
                break;
            case 'fadeInRight':
                this.fadeInRight(element);
                break;
            case 'scaleIn':
                this.scaleIn(element);
                break;
            case 'stagger':
                this.staggerAnimation(element);
                break;
            default:
                element.classList.add('animated');
        }
    }
    
    getAnimationType(element) {
        if (element.classList.contains('scroll-animate-left')) return 'fadeInLeft';
        if (element.classList.contains('scroll-animate-right')) return 'fadeInRight';
        if (element.classList.contains('scroll-animate-scale')) return 'scaleIn';
        if (element.classList.contains('stagger-animate')) return 'stagger';
        return 'fadeInUp';
    }
    
    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animated');
        });
    }
    
    fadeInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'all 0.8s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            element.classList.add('animated');
        });
    }
    
    fadeInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'all 0.8s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
            element.classList.add('animated');
        });
    }
    
    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.8s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            element.classList.add('animated');
        });
    }
    
    staggerAnimation(element) {
        const children = element.children;
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        element.classList.add('animated');
    }
    
    setupHoverAnimations() {
        // Hover lift effect
        document.querySelectorAll('.hover-lift').forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    element.style.transform = 'translateY(-5px)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });
        
        // Hover scale effect
        document.querySelectorAll('.hover-scale').forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    element.style.transform = 'scale(1.05)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
        
        // Hover glow effect
        document.querySelectorAll('.hover-glow').forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    element.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = '';
            });
        });
    }
    
    setupLoadingAnimations() {
        // Page loading animation
        window.addEventListener('load', () => {
            const loader = document.querySelector('.page-loader');
            if (loader) {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }
            
            // Animate hero section
            this.animateHeroSection();
        });
    }
    
    animateHeroSection() {
        if (this.isReducedMotion) return;
        
        const heroElements = [
            '.hero-greeting',
            '.hero-title',
            '.hero-subtitle',
            '.hero-stats',
            '.hero-buttons',
            '.hero-image'
        ];
        
        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.8s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    setupParticleSystem() {
        if (this.isReducedMotion) return;
        
        const particleContainer = document.querySelector('.particles');
        if (!particleContainer) return;
        
        this.createParticles(particleContainer, 50);
    }
    
    createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = left + '%';
            particle.style.animationDuration = animationDuration + 's';
            particle.style.animationDelay = delay + 's';
            
            container.appendChild(particle);
        }
    }
    
    setupTypingAnimation() {
        if (this.isReducedMotion) return;
        
        document.querySelectorAll('.text-typewriter').forEach(element => {
            this.typeWriter(element);
        });
    }
    
    typeWriter(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Blinking cursor
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' 
                        ? '2px solid var(--primary-color)' 
                        : 'none';
                }, 500);
            }
        }, 100);
    }
    
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = element.textContent.replace(/\d/g, '').replace(/\+/g, '');
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBar(entry.target);
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    }
    
    animateProgressBar(element) {
        const percentage = element.getAttribute('data-percentage') || '0';
        element.style.width = '0%';
        
        setTimeout(() => {
            element.style.transition = 'width 2s ease';
            element.style.width = percentage + '%';
        }, 100);
    }
    
    setupFloatingElements() {
        if (this.isReducedMotion) return;
        
        document.querySelectorAll('.floating-element').forEach((element, index) => {
            const delay = index * 0.5;
            element.style.animationDelay = delay + 's';
            element.classList.add('animate-float');
        });
    }
    
    setupGlitchEffect() {
        if (this.isReducedMotion) return;
        
        document.querySelectorAll('.glitch').forEach(element => {
            element.setAttribute('data-text', element.textContent);
            
            // Random glitch trigger
            setInterval(() => {
                if (Math.random() > 0.95) {
                    element.classList.add('glitch-active');
                    setTimeout(() => {
                        element.classList.remove('glitch-active');
                    }, 200);
                }
            }, 1000);
        });
    }
    
    setupRippleEffect() {
        document.querySelectorAll('.btn-ripple').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }
    
    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Parallax scrolling effect
    setupParallax() {
        if (this.isReducedMotion) return;
        
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Magnetic effect for buttons
    setupMagneticEffect() {
        if (this.isReducedMotion) return;
        
        document.querySelectorAll('.magnetic').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // Smooth reveal animation
    revealElement(element, direction = 'up') {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return;
        }
        
        const transforms = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(-30px)',
            right: 'translateX(30px)',
            scale: 'scale(0.8)'
        };
        
        element.style.opacity = '0';
        element.style.transform = transforms[direction] || transforms.up;
        element.style.transition = 'all 0.8s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0) scale(1)';
        });
    }
    
    // Batch reveal for multiple elements
    revealElements(elements, stagger = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.revealElement(element);
            }, index * stagger);
        });
    }
    
    // Cleanup method
    destroy() {
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers.clear();
        this.animatedElements.clear();
    }
    
    // Public methods
    animateOnScroll(element, callback) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    }
    
    addHoverAnimation(element, animation) {
        element.addEventListener('mouseenter', () => {
            if (!this.isReducedMotion) {
                element.classList.add(animation);
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove(animation);
        });
    }
    
    pulseElement(element, duration = 1000) {
        if (this.isReducedMotion) return;
        
        element.style.animation = `pulse ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
    
    shakeElement(element, duration = 500) {
        if (this.isReducedMotion) return;
        
        element.style.animation = `shake ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
}

// Utility animation functions
const AnimationUtils = {
    // Easing functions
    easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOut: (t) => t * (2 - t),
    easeIn: (t) => t * t,
    
    // Animate value from start to end
    animateValue: (start, end, duration, callback, easing = AnimationUtils.easeInOut) => {
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            const currentValue = start + (end - start) * easedProgress;
            
            callback(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    // Animate CSS property
    animateCSS: (element, property, start, end, duration, unit = '') => {
        AnimationUtils.animateValue(start, end, duration, (value) => {
            element.style[property] = value + unit;
        });
    },
    
    // Chain animations
    chainAnimations: (...animations) => {
        return animations.reduce((promise, animation) => {
            return promise.then(() => new Promise(resolve => {
                animation(resolve);
            }));
        }, Promise.resolve());
    }
};

// Initialize animation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const animationManager = new AnimationManager();
    
    // Make animation manager globally available
    window.animationManager = animationManager;
    window.AnimationUtils = AnimationUtils;
    
    // Add animation styles
    const animationStyles = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .glitch-active {
            animation: glitch 0.3s linear infinite;
        }
        
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease;
        }
        
        .page-loader.fade-out {
            opacity: 0;
        }
        
        .magnetic {
            transition: transform 0.3s ease;
        }
        
        .parallax {
            will-change: transform;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .animate-float,
            .animate-bounce,
            .animate-pulse,
            .glitch-active,
            .magnetic {
                animation: none !important;
                transform: none !important;
            }
        }
    `;
    
    if (!document.querySelector('#animation-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'animation-styles';
        styleSheet.textContent = animationStyles;
        document.head.appendChild(styleSheet);
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationManager, AnimationUtils };
}

