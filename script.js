// Handle mobile menu toggle
// Function to generate modal content based on product title
function generateModalContent(title) {
    const contentMap = {
        'Laptop Series 5': [
            `Discover sleek craftsmanship that blends minimalist design with effortless agility.
            Harness the latest Intel Core processing power for fluid apps and rapid multitasking.
            Enjoy a vivid touch display with lifelike color and dependable, all day endurance.

            Built ultralight and durable, it slips into your bag without sacrificing performance.
            Wake instantly, unlock securely, and glide through tasks with whisper quiet cooling.
            An edge to edge touchscreen supports pen input for sketching, notes, and edits.

            Stay connected with WiFi 6E and speedy ports, including Thunderbolt for pro gear.
            Rapid charging delivers hours of use in minutes to keep you moving between meetings.
            Tuned speakers and AI noise reduction make calls and streaming crystal clear anywhere.`
        ],
        'Gamebox Series X': [
            'Immerse yourself in true next-generation gaming with 4K resolution and 120 FPS.',
            'Experience faster load times and seamless game switching with Quick Resume.',
            'Access hundreds of high-quality games with Gamebox Game Pass subscription.'
        ],
        'System Os 11': [
            'A modern, intuitive interface designed for productivity and creativity.',
            'Enhanced security features protect your data and privacy.',
            'Seamless integration with Applesoft 100 and other productivity tools.'
        ]
    };
    return contentMap[title] || [
        'Discover the latest innovations from Applesoft.',
        'Experience cutting-edge technology designed for modern life.',
        'Join millions of satisfied customers worldwide.'
    ];
}

document.addEventListener('DOMContentLoaded', () => {

    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add cart counter simulation
    let cartCount = 0;
    const cartLink = document.querySelector('.nav-links a[href="#"]');
    if (cartLink && cartLink.textContent.includes('Cart')) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            cartLink.textContent = `Cart (${cartCount})`;
        });
    }

    // Modal functionality
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.querySelector('.close-button');

    // Add click event to all "Learn more" links
    document.querySelectorAll('.learn-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.product-card');
            const title = card.querySelector('h1').textContent;
            const content = generateModalContent(title);
            
            modalTitle.textContent = title;
            modalText.innerHTML = content.map(text => `<p>${text}</p>`).join('');
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });

    // const openLearnModal = (e) => {
    //     e.preventDefault();
    //     const card = link.closest('.product-card');
    //     const title = card.querySelector('h1').textContent;
    //     const content = generateModalContent(title);
        
    //     modalTitle.textContent = title;
    //     modalText.innerHTML = content.map(text => `<p>${text}</p>`).join('');
    //     modal.style.display = 'block';
    //     document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    // }

    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});