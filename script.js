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

}); 