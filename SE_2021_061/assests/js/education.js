document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach((item) => {
        observer.observe(item);
    });

    // Add hover effect for timeline dots
    document.querySelectorAll('.timeline-dot').forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            const content = dot.parentElement.querySelector('.timeline-content');
            content.style.transform = 'scale(1.05)';
        });

        dot.addEventListener('mouseleave', () => {
            const content = dot.parentElement.querySelector('.timeline-content');
            content.style.transform = 'translateY(-5px)';
        });
    });

    // Add typing animation for headings
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.innerHTML = '';
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        type();
    };

    // Initialize typing animation for main heading
    const mainHeading = document.querySelector('.main-text h2');
    typeWriter(mainHeading, 'My Education', 100);
});

// Add particle background effect
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
};

createParticles(); 