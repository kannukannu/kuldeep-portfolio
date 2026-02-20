/* ============================================
   KULDEEP PORTFOLIO - OPTIMIZED SMOOTH INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initParticles();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initTypingEffect();
    initCounterAnimation();
    initScrollAnimations();
    initFormHandler();
    initTiltEffects();
    initLazyLoading();
    initBackToTop();
});

/* Preloader */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 1000);
    });
    
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 3000);
}

/* Optimized Particles - Reduced count */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = window.innerWidth < 768 ? 15 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 20}s;
            animation-duration: ${20 + Math.random() * 15}s;
            opacity: ${0.1 + Math.random() * 0.3};
            width: ${2 + Math.random() * 3}px;
            height: ${2 + Math.random() * 3}px;
        `;
        container.appendChild(particle);
    }
}

/* Navbar with throttled scroll */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                updateActiveNavLink(navLinks);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function updateActiveNavLink(navLinks) {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* Mobile Menu */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!hamburger || !mobileMenu) return;
    
    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMenu);
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* Smooth Scroll with easing */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* Typing Effect - Optimized */
function initTypingEffect() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    
    const phrases = [
        'scalable web applications',
        'robust REST & GraphQL APIs',
        'real-time Socket.io apps',
        'secure payment integrations',
        'cloud-native solutions',
        'CI/CD pipelines'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        let delay;
        
        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            delay = 30;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            delay = 60;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            delay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }
        
        setTimeout(type, delay);
    }
    
    setTimeout(type, 800);
}

/* Counter Animation - Optimized */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    function animateCounter(counter) {
        const target = parseInt(counter.dataset.target);
        const duration = 1500;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            counter.textContent = Math.floor(target * easeOut);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }
}

/* Scroll Animations - Optimized with IntersectionObserver */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .timeline-item, .project-card, .about-content, .about-visual, .info-card, .highlight-card, .section-header, .more-projects-card, .contact-form-wrapper'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

/* Tilt Effects - Only on desktop, optimized */
function initTiltEffects() {
    if (window.innerWidth < 1024) return;
    
    const cards = document.querySelectorAll('.project-card, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        }, { passive: true });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        }, { passive: true });
    });
}

/* Form Handler */
function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-circle-notch fa-spin"></i>';
        submitBtn.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        form.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

/* Lazy Loading for images */
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) img.src = img.dataset.src;
        });
    }
}

/* Back to Top Button */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* Parallax - Throttled */
let parallaxTicking = false;
window.addEventListener('scroll', () => {
    if (!parallaxTicking && window.innerWidth > 768) {
        requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                const opacity = Math.max(0, 1 - scrolled / 600);
                const translateY = scrolled * 0.15;
                heroContent.style.transform = `translate3d(0, ${translateY}px, 0)`;
                heroContent.style.opacity = opacity;
            }
            
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
}, { passive: true });

/* Console Easter Egg */
console.log(`
%c╔═══════════════════════════════════════════════════════════╗
%c║   KULDEEP - Full-Stack Developer & DevOps Engineer        ║
%c║   7+ Years Experience | Angular | React | Node.js | Python ║
%c║                                                           ║
%c║   🔗 github.com/developer-kuldeep                         ║
%c║   💼 linkedin.com/in/kuldeep-engineer                     ║
%c╚═══════════════════════════════════════════════════════════╝
`,
'color: #6366f1', 'color: #818cf8', 'color: #a5b4fc',
'color: #6366f1', 'color: #10b981', 'color: #10b981', 'color: #6366f1'
);
