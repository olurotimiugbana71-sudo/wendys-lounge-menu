// ==============================================
// WENDY'S LOUNGE - MENU INTERACTIVITY
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Category Filtering System
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    function filterCategories(category) {
        // Update active button
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
        
        // Show/hide sections with animation
        menuSections.forEach(section => {
            if (category === 'all' || section.dataset.category === category) {
                section.classList.remove('hidden');
                section.style.animation = 'none';
                section.offsetHeight; // Trigger reflow
                section.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                section.classList.add('hidden');
            }
        });
    }
    
    // Add click handlers to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterCategories(category);
            
            // Smooth scroll to top of menu sections
            window.scrollTo({
                top: document.querySelector('.category-nav').offsetTop - 10,
                behavior: 'smooth'
            });
        });
    });
    
    // Auto-scroll specials carousel
    const carousel = document.getElementById('specialsCarousel');
    let scrollInterval;
    
    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }, 4000);
    }
    
    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }
    
    // Start auto-scroll
    startAutoScroll();
    
    // Pause on hover/touch
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    carousel.addEventListener('touchstart', stopAutoScroll);
    carousel.addEventListener('touchend', () => {
        setTimeout(startAutoScroll, 2000);
    });
    
    // Logo Fallback Handler
    const logo = document.getElementById('mainLogo');
    const logoFallback = document.getElementById('logoFallback');
    
    if (logo) {
        logo.addEventListener('error', function() {
            this.style.display = 'none';
            if (logoFallback) {
                logoFallback.style.display = 'flex';
            }
        });
        
        // Check if logo loaded properly
        if (!logo.complete || logo.naturalWidth === 0) {
            logo.style.display = 'none';
            if (logoFallback) {
                logoFallback.style.display = 'flex';
            }
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.menu-item, .category-btn, .special-item').forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Print functionality
    window.addEventListener('keydown', function(e) {
        // Ctrl+P or Cmd+P to print menu
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            // Default print behavior will work
        }
    });
    
    console.log('🍸 Wendy\'s Lounge Menu Ready!');
    console.log('📱 Scan QR Code to view menu');
    console.log('🕐 Happy Hour: 5PM - 7PM Daily');
});