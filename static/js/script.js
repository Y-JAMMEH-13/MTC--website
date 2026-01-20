// ========================================
// MTC Website - Main JavaScript
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('mobile-active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-active');
            }
        });
    }

    // ========================================
    // Sticky Navbar on Scroll
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class when not at top
        if (scrollTop > 20) {
            navbar.classList.add('scrolled');

            // Highlight/Shadow specifically when scrolling up
            if (scrollTop < lastScrollTop) {
                navbar.classList.add('scroll-up');
            } else {
                navbar.classList.remove('scroll-up');
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.remove('scroll-up');
        }

        lastScrollTop = scrollTop;
    });

    // ========================================
    // Staggered Scroll Reveal Animation (Intersection Observer)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // If it's a grid container, stagger its children
                if (element.classList.contains('grid')) {
                    const children = element.children;
                    Array.from(children).forEach((child, index) => {
                        child.style.transitionDelay = `${index * 100}ms`; // 100ms stagger
                        child.classList.add('revealed');
                    });
                } else {
                    // Regular element
                    element.classList.add('revealed');
                }

                // Stop observing once revealed
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe sections and grids
    const scrollElements = document.querySelectorAll('.scroll-reveal, .grid');

    // Initial setup for grid items (opacity 0)
    document.querySelectorAll('.grid > *').forEach(item => {
        item.classList.add('scroll-reveal-item');
    });

    scrollElements.forEach(el => observer.observe(el));

    // ========================================
    // Active Navigation Link
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-link');

    navLinksAll.forEach(link => {
        const linkHref = link.getAttribute('href');

        // Remove active class from all links
        link.classList.remove('active');

        // Add active class to current page link
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only prevent default if it's not just "#"
            if (href !== '#') {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Form Validation (for contact page)
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // If validation passes (in a real app, this would send to a server)
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // ========================================
    // Card Hover Effect Enhancement
    // ========================================
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // ========================================
    // Loading Animation (Optional)
    // ========================================
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // ========================================
    // Animated Background (Math & Tech Symbols)
    // ========================================
    // ========================================
    // Animated Background (Math & Tech Symbols)
    // ========================================
    function createFloatingSymbols(container, count, minSize, maxSize) {
        const symbols = ['π', '∞', '∑', '∫', '{ }', '</>', '√', 'y', '∆', 'f(x)', '01', '≠', '≈', '∇'];

        for (let i = 0; i < count; i++) {
            const symbol = document.createElement('div');
            symbol.classList.add('floating-symbol');
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];

            // Random Positioning and Animation Properties
            const leftPos = Math.random() * 100; // 0% to 100%
            const fontSize = Math.random() * (maxSize - minSize) + minSize; // Random size in range
            const duration = Math.random() * 20 + 15; // 15s to 35s
            const delay = Math.random() * 15; // 0s to 15s

            symbol.style.left = `${leftPos}%`;
            symbol.style.fontSize = `${fontSize}rem`;
            symbol.style.animationName = 'floatUp';
            symbol.style.animationDuration = `${duration}s`;
            symbol.style.animationDelay = `-${delay}s`; // Start mid-animation
            symbol.style.animationTimingFunction = 'linear';
            symbol.style.animationIterationCount = 'infinite';

            container.appendChild(symbol);
        }
    }

    // ========================================
    // StriveCloud-style Background Generator
    // ========================================
    function createGradientBlobs(container) {
        // Updated colors to mirror the Logo palette (Precision Extracted)
        const colors = [
            'rgba(26, 26, 253, 0.12)',  // Bright Blue (#1a1afd)
            'rgba(21, 137, 22, 0.1)',   // Green (#158916)
            'rgba(254, 56, 7, 0.08)',   // Bright Red (#fe3807)
            'rgba(139, 26, 28, 0.08)',  // Thick Red (#8b1a1c)
            'rgba(0, 0, 128, 0.08)',    // Navy (#000080)
            'rgba(228, 228, 255, 0.15)' // Light Blue Tint (#e4e4ff)
        ];
        const blobCount = 8; // Increased count for full palette coverage

        for (let i = 0; i < blobCount; i++) {
            const blob = document.createElement('div');
            blob.classList.add('gradient-blob');
            blob.style.background = `radial-gradient(circle, ${colors[i % colors.length]} 0%, rgba(255,255,255,0) 70%)`;

            // Random Size & Position
            const size = Math.random() * 400 + 400; // 400px - 800px
            blob.style.width = `${size}px`;
            blob.style.height = `${size}px`;
            blob.style.left = `${Math.random() * 80}%`;
            blob.style.top = `${Math.random() * 60}%`;

            // Random Animation Delay
            blob.style.animationDelay = `${Math.random() * -20}s`;

            container.appendChild(blob);
        }
    }

    function initAnimatedBackgrounds() {
        // 0. Gradient Blobs (Base Layer)
        const blobContainer = document.createElement('div');
        blobContainer.classList.add('blob-container');
        document.body.prepend(blobContainer);
        createGradientBlobs(blobContainer);

        // 1. Global Background (Fixed, smaller symbols)
        const globalBg = document.createElement('div');
        globalBg.id = 'animated-background';
        // Insert after blobs, before content
        blobContainer.after(globalBg);
        createFloatingSymbols(globalBg, 25, 1, 3); // 25 symbols, size 1-3rem

        // 2. Hero Section Background (Absolute, larger symbols)
        // Note: Using document.querySelectorAll to handle if multiple hero sections exist (edge case) or just robustness
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroBg = document.createElement('div');
            heroBg.classList.add('hero-background');
            // Insert into the hero section (which now has relative positioning context for this absolute child)
            // BUT wait - plan says attach to body for full height?
            // Actually, CSS for .hero-background is top:0, left:0, width:100%, height:100%.
            // If we put it in .hero-section (which is margined), it will be relative to that.
            // To achieve "behind navbar", we should append to body but position it absolutely at top.

            heroSection.appendChild(heroBg);
            // It has z-index -1, blobs have -2. This sits on top of blobs.

            createFloatingSymbols(heroBg, 12, 4, 7); // 12 big symbols
        }
    }

    initAnimatedBackgrounds();

});


