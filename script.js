// ========================================
// DJ SMOKE STREAM - INTERACTIVE FEATURES
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // LOADING SCREEN
    // ========================================
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 2000);
    });

    // ========================================
    // NAVIGATION
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // ========================================
    // SMOKE PARTICLES BACKGROUND
    // ========================================
    const canvas = document.getElementById('smoke-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 100 + 50;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size
            );
            gradient.addColorStop(0, `rgba(139, 0, 255, ${this.opacity})`);
            gradient.addColorStop(0.5, `rgba(57, 255, 20, ${this.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = [];
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // ========================================
    // COUNTDOWN TIMER
    // ========================================
    function updateCountdown() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);

        const diff = midnight - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========================================
    // TRACK WAVEFORMS
    // ========================================
    const waveformCanvases = document.querySelectorAll('.waveform');
    
    waveformCanvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const bars = 50;
        const barWidth = canvas.width / bars;

        function drawWaveform() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < bars; i++) {
                const barHeight = Math.random() * canvas.height * 0.8;
                const x = i * barWidth;
                const y = canvas.height - barHeight;

                const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
                gradient.addColorStop(0, '#8B00FF');
                gradient.addColorStop(1, '#39FF14');

                ctx.fillStyle = gradient;
                ctx.fillRect(x, y, barWidth - 2, barHeight);
            }
        }

        drawWaveform();
        setInterval(drawWaveform, 100);
    });

    // ========================================
    // EMAIL POPUP
    // ========================================
    const emailPopup = document.getElementById('email-popup');
    const popupClose = document.querySelector('.popup-close');

    // Show popup after 10 seconds
    setTimeout(() => {
        if (emailPopup && !sessionStorage.getItem('emailPopupShown')) {
            emailPopup.classList.add('active');
        }
    }, 10000);

    // Close popup
    if (popupClose) {
        popupClose.addEventListener('click', () => {
            emailPopup.classList.remove('active');
            sessionStorage.setItem('emailPopupShown', 'true');
        });
    }

    // Close popup when clicking outside
    if (emailPopup) {
        emailPopup.addEventListener('click', (e) => {
            if (e.target === emailPopup) {
                emailPopup.classList.remove('active');
                sessionStorage.setItem('emailPopupShown', 'true');
            }
        });
    }

    // ========================================
    // FORM SUBMISSIONS
    // ========================================
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thanks for subscribing! Check your email for exclusive content.');
            newsletterForm.reset();
        });
    }

    // Popup Email Form
    const popupEmailForm = document.getElementById('popupEmailForm');
    if (popupEmailForm) {
        popupEmailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Welcome to the Smoke Stream! Check your email for exclusive access.');
            emailPopup.classList.remove('active');
            sessionStorage.setItem('emailPopupShown', 'true');
            popupEmailForm.reset();
        });
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
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

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.track-card, .event-card, .tier-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ========================================
    // TRACK PLAYER (PLACEHOLDER)
    // ========================================
    const playButtons = document.querySelectorAll('.play-button, .btn-icon');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Placeholder for actual audio player functionality
            console.log('Play button clicked');
            
            // Visual feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // ========================================
    // CUSTOM CURSOR (OPTIONAL)
    // ========================================
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #8B00FF;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        box-shadow: 0 0 10px #8B00FF;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });

    // Enlarge cursor on hover over interactive elements
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#39FF14';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#8B00FF';
        });
    });

    // ========================================
    // PARALLAX EFFECT
    // ========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ========================================
    // STATS COUNTER ANIMATION
    // ========================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const targetValue = statNumber.textContent;
                
                if (!isNaN(targetValue)) {
                    animateCounter(statNumber, parseInt(targetValue), 2000);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ========================================
    // VINYL ROTATION ON HOVER
    // ========================================
    const vinyl = document.querySelector('.vinyl');
    if (vinyl) {
        vinyl.addEventListener('mouseenter', () => {
            vinyl.style.animationPlayState = 'running';
        });
        vinyl.addEventListener('mouseleave', () => {
            vinyl.style.animationPlayState = 'paused';
        });
    }

    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c🌊 DJ SMOKE STREAM 🔥', 'font-size: 20px; color: #8B00FF; font-weight: bold; text-shadow: 0 0 10px #8B00FF;');
    console.log('%cAI LOUNGE AFTER DARK', 'font-size: 14px; color: #39FF14; font-weight: bold;');
    console.log('%cWhere midnight never ends and the beats never stop.', 'font-size: 12px; color: #00D9FF;');
    console.log('%c128 BPM • ∞ POSSIBILITIES • 420 VIBES', 'font-size: 10px; color: #b0b0b0;');

});

// ========================================
// 3D DJ BOOTH (THREE.JS)
// ========================================
function init3DScene() {
    const container = document.getElementById('dj-booth-3d');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create turntable
    const geometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x8B00FF,
        emissive: 0x8B00FF,
        emissiveIntensity: 0.5,
        shininess: 100
    });
    const turntable = new THREE.Mesh(geometry, material);
    scene.add(turntable);

    // Add vinyl record
    const vinylGeometry = new THREE.CylinderGeometry(1.8, 1.8, 0.05, 32);
    const vinylMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1a1a1a,
        emissive: 0x39FF14,
        emissiveIntensity: 0.2
    });
    const vinyl = new THREE.Mesh(vinylGeometry, vinylMaterial);
    vinyl.position.y = 0.15;
    scene.add(vinyl);

    // Add lights
    const pointLight = new THREE.PointLight(0x8B00FF, 1, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x39FF14, 1, 100);
    pointLight2.position.set(5, 5, -5);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 5;
    camera.position.y = 2;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        vinyl.rotation.y += 0.01;
        turntable.rotation.y += 0.005;
        
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize 3D scene when Three.js is loaded
if (typeof THREE !== 'undefined') {
    init3DScene();
}
