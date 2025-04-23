document.addEventListener('DOMContentLoaded', () => {
    // Content page title hover effect
    if (document.querySelector('.content-page')) {
        const title = document.querySelector('.title');
        title.addEventListener('mouseenter', () => {
            document.body.style.backgroundColor = '#756A6A';
        });
        
        title.addEventListener('mouseleave', () => {
            document.body.style.backgroundColor = 'var(--background)';
        });
    }

    // Enhanced randomization function
    function randomizeSquares() {
        const sections = document.querySelectorAll('.section, .background-squares-content');
        
        sections.forEach(section => {
            const squares = section.querySelectorAll('.square');
            squares.forEach(square => {
                // More random position ranges
                const randomX = Math.random() * 100; // 0-100% of container width
                const randomY = Math.random() * 100; // 0-100% of container height
                
                // More varied sizes (80px to 220px)
                const randomSize = Math.floor(Math.random() * (220 - 80 + 1)) + 80;
                
                // Random rotation
                const randomRotation = Math.random() * 45 - 22.5; // -22.5 to +22.5 degrees
                
                // Random movement speed
                const randomSpeed = (Math.random() * 0.5 + 0.3).toFixed(2); // 0.3 to 0.8
                
                square.style.left = `${randomX}%`;
                square.style.top = `${randomY}%`;
                square.style.width = `${randomSize}px`;
                square.style.height = `${randomSize}px`;
                square.style.transform = `rotate(${randomRotation}deg)`;
                square.dataset.speed = randomSpeed;
            });
        });
    }

    // Call randomization on load and every 10 seconds for content pages
    randomizeSquares();
    if (document.querySelector('.content-page')) {
        setInterval(randomizeSquares, 10000);
    }

    // Add fade-in animation for content pages
    function handleContentPageFades() {
        const fadeElements = document.querySelectorAll('.fade-element');
        let delay = 0;
        
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, delay);
            delay += 200;
        });
    }

    // Initialize content page animations if we're on a content page
    if (document.querySelector('.main-content')) {
        handleContentPageFades();
    }

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const squares = document.querySelectorAll('.square');

    const handleScroll = () => {
        // Get the middle of the viewport
        const viewportMiddle = window.scrollY + (window.innerHeight / 2);

        // Reset all navigation states first
        navLinks.forEach(link => link.classList.remove('active'));

        // Check each section
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const sectionBottom = sectionTop + rect.height;

            // If viewport middle is within this section
            if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
                // Update navigation
                navLinks[index].classList.add('active');
                if (navIndicator) {
                    navIndicator.style.transform = `translateY(${index * 48}px)`;
                }

                // Show content
                section.querySelectorAll('.fade-element').forEach(el => {
                    el.classList.add('visible');
                });
                section.querySelectorAll('.square').forEach(square => {
                    square.classList.add('visible');
                });
            } else {
                // Hide content when far from viewport
                const buffer = window.innerHeight / 2;
                if (rect.top > window.innerHeight + buffer || rect.bottom < -buffer) {
                    section.querySelectorAll('.fade-element').forEach(el => {
                        el.classList.remove('visible');
                    });
                    section.querySelectorAll('.square').forEach(square => {
                        square.classList.remove('visible');
                    });
                }
            }
        });
    };

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Simple parallax effect with more dramatic movement
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        document.querySelectorAll('.square.visible').forEach(square => {
            const speed = parseFloat(square.dataset.speed) || 1.5;
            const rotateX = mouseY * 15;
            const rotateY = mouseX * 15;
            const scale = 1 + (Math.abs(mouseX) + Math.abs(mouseY)) * 0.1;
            
            square.style.transform = `
                translate3d(${mouseX * 100 * speed}px, 
                           ${mouseY * 100 * speed}px, 
                           ${(Math.abs(mouseX) + Math.abs(mouseY)) * 50}px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
        });
    });

    // Listen for scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    handleScroll();

    // Subtle noise animation
    const noise = document.querySelector('.noise');
    setInterval(() => {
        noise.style.transform = `translate(${Math.random() * 10}px, ${Math.random() * 10}px)`;
    }, 50);

    // Navigation hover effect
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            links.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.style.opacity = '0.3';
                }
            });
        });
        
        link.addEventListener('mouseleave', () => {
            links.forEach(otherLink => {
                otherLink.style.opacity = '0.7';
            });
        });
    });

    // Add scroll event listener to handle fade animations
    document.addEventListener('scroll', () => {
        const fadeElements = document.querySelectorAll('.fade-element');
        const fadeSquares = document.querySelectorAll('.fade-square');
        
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
        
        fadeSquares.forEach(square => {
            if (isElementInViewport(square)) {
                square.classList.add('visible');
            }
        });
    });

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add title hover effect
    const titles = document.querySelectorAll('h1 a, h2 a');
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            document.body.classList.add('title-hover');
        });
        
        title.addEventListener('mouseleave', () => {
            document.body.classList.remove('title-hover');
        });
    });
}); 