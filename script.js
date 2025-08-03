// JS placeholder for future interactivity 

document.addEventListener('DOMContentLoaded', function() {

    // Hero Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            document.querySelector('.carousel-container').style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        // Initially hide all but the first slide
        slides.forEach((slide, i) => {
             if(i !== 0) slide.classList.remove('active'); else slide.classList.add('active');
        });

        resetInterval();
    }

    // Services Slider
    const servicesContainer = document.querySelector('.services-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (servicesContainer) {
        const serviceCards = document.querySelectorAll('.service-card');
        const cardWidth = serviceCards[0].offsetWidth + 20; // card width + gap
        let currentIndex = 0;

        nextBtn.addEventListener('click', () => {
            if (currentIndex < serviceCards.length - 3) { // Show 3 cards at a time
                currentIndex++;
                servicesContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                servicesContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }
        });
    }

    // Hamburger menu functionality (ensure on all pages, all screen sizes, accessible)
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const navbarMain = document.querySelector('.navbar-main');
    if (hamburger && navbar) {
        // ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'main-menu');
        hamburger.setAttribute('tabindex', '0');
        hamburger.setAttribute('role', 'button');
        // Toggle menu on click or Enter/Space
        function toggleMenu(e) {
            if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                const isOpen = navbar.classList.toggle('open');
                hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                if (isOpen && navbarMain) {
                    // Focus first link in menu
                    const firstLink = navbarMain.querySelector('.navbar-menu a');
                    if (firstLink) firstLink.focus();
                }
            }
        }
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', toggleMenu);
        // Close menu when clicking outside or on a link (mobile UX)
        document.addEventListener('click', function(e) {
            if (navbar.classList.contains('open') && !navbar.contains(e.target) && !e.target.classList.contains('hamburger')) {
                navbar.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        document.querySelectorAll('.navbar-menu a').forEach(link => {
            link.addEventListener('click', function() {
                if(window.innerWidth <= 900) {
                    navbar.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
            // Keyboard navigation: close menu on Escape
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    navbar.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.focus();
                }
            });
        });
        // Close menu on Escape key from hamburger
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navbar.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.blur();
            }
        });
        // Focus trap: keep focus inside menu when open
        document.addEventListener('keydown', function(e) {
            if (navbar.classList.contains('open') && (e.key === 'Tab')) {
                const focusableEls = navbarMain.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
                const firstEl = focusableEls[0];
                const lastEl = focusableEls[focusableEls.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === firstEl) {
                        e.preventDefault();
                        lastEl.focus();
                    }
                } else {
                    if (document.activeElement === lastEl) {
                        e.preventDefault();
                        firstEl.focus();
                    }
                }
            }
        });
    }

    // Smooth scroll for anchor links
   // ...existing code...

// Smooth scroll for anchor links - Modified to exclude "Our Service" link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip if it's the "Our Service" link
    if (anchor.textContent.trim() !== 'Our Service') {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// ...existing code...

    // Scroll-based animation logic
    function animateOnScroll() {
        const fadeEls = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        fadeEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    function triggerAnimationsAfterLoad() {
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('resize', animateOnScroll);
        animateOnScroll(); // Initial call
    }
    if (document.readyState === 'complete') {
        triggerAnimationsAfterLoad();
    } else {
        window.addEventListener('load', triggerAnimationsAfterLoad);
    }

    // Add fade-in/slide-in classes to main sections/cards if not present
    document.querySelectorAll('section, .product-card, .service-card, .about-team-member').forEach((el, i) => {
        if (!el.classList.contains('fade-in') && !el.classList.contains('slide-in-left') && !el.classList.contains('slide-in-right')) {
            if (i % 3 === 0) el.classList.add('fade-in');
            else if (i % 3 === 1) el.classList.add('slide-in-left');
            else el.classList.add('slide-in-right');
        }
    });

});
// Optimize all images for lazy loading (performance)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
});
// For further speedup, minify styles.css and script.js in production.
// Minified version for performance
document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".hamburger"),t=document.querySelector(".navbar");if(e&&t){e.addEventListener("click",function(e){e.stopPropagation(),t.classList.toggle("open")}),document.addEventListener("click",function(e){t.classList.contains("open")&&!t.contains(e.target)&&!e.target.classList.contains("hamburger")&&t.classList.remove("open")}),document.querySelectorAll(".navbar-menu a").forEach(n=>{n.addEventListener("click",function(){window.innerWidth<=900&&t.classList.remove("open")})})}function n(){document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach(function(e){e.getBoundingClientRect().top<window.innerHeight-60&&e.classList.add("visible")})}function o(){window.addEventListener("scroll",n),window.addEventListener("resize",n),n()}"complete"===document.readyState?o():window.addEventListener("load",o),document.querySelectorAll("section, .product-card, .service-card, .about-team-member").forEach(function(e,t){e.classList.contains("fade-in")||e.classList.contains("slide-in-left")||e.classList.contains("slide-in-right")||(0===t%3?e.classList.add("fade-in"):1===t%3?e.classList.add("slide-in-left"):e.classList.add("slide-in-right"))})}); 
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.querySelector('.dropdown > a');
  dropdown.addEventListener('click', function (e) {
    e.preventDefault(); // prevent navigation
    this.parentElement.classList.toggle('active');
  });
});
