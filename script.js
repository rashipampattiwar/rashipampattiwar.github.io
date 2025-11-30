// Navigation functionality for horizontal scrolling
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const horizontalContainer = document.querySelector('.horizontal-container');
    let currentSection = 0;

    // Handle navigation clicks
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = parseInt(this.getAttribute('data-section'));
            scrollToSection(targetSection);
        });
    });

    // Scroll to specific section
    function scrollToSection(sectionIndex) {
        currentSection = sectionIndex;
        const translateX = -(sectionIndex * 100);
        horizontalContainer.style.transform = `translateX(${translateX}vw)`;
        
        // Update active nav link
        navLinks.forEach((nav, index) => {
            nav.classList.toggle('active', index === sectionIndex);
        });
    }

    // Mouse wheel horizontal scrolling
    let isScrolling = false;
    
    document.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        e.preventDefault();
        
        if (e.deltaY > 0 && currentSection < 3) {
            // Scroll right
            isScrolling = true;
            scrollToSection(currentSection + 1);
            setTimeout(() => { isScrolling = false; }, 800);
        } else if (e.deltaY < 0 && currentSection > 0) {
            // Scroll left
            isScrolling = true;
            scrollToSection(currentSection - 1);
            setTimeout(() => { isScrolling = false; }, 800);
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });

    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0 && currentSection < 3) {
                // Swipe left - go to next section
                scrollToSection(currentSection + 1);
            } else if (deltaX < 0 && currentSection > 0) {
                // Swipe right - go to previous section
                scrollToSection(currentSection - 1);
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' && currentSection < 3) {
            scrollToSection(currentSection + 1);
        } else if (e.key === 'ArrowLeft' && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });

    // Animate stars on load
    function animateStars() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.opacity = '0';
                star.style.transform = 'scale(0) rotate(180deg)';
                
                setTimeout(() => {
                    star.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    star.style.opacity = '1';
                    star.style.transform = 'scale(1) rotate(0deg)';
                }, 100);
            }, index * 200);
        });
    }

    // Initial animation
    setTimeout(animateStars, 500);

    // Gallery item interactions
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent.`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Add floating animation to stars
    function floatingAnimation() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 3 + Math.random() * 2;
            
            star.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
        });
    }

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px) rotate(0deg);
            }
            100% {
                transform: translateY(-10px) rotate(2deg);
            }
        }
        
        .gallery-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .star {
            cursor: pointer;
        }

        /* Smooth horizontal scrolling */
        .horizontal-container {
            transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    `;
    document.head.appendChild(style);

    // Initialize floating animation
    setTimeout(floatingAnimation, 1000);

    // Add click animation to stars
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            this.style.transform += ' scale(1.2)';
            
            setTimeout(() => {
                this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            }, 200);
        });
    });

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});