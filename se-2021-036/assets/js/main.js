// Basic tab functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active', 'bg-violet-500', 'text-white'));
            tabButtons.forEach(btn => btn.classList.add('bg-gray-800', 'text-gray-300'));
            tabContents.forEach(content => content.classList.add('hidden'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active', 'bg-violet-500', 'text-white');
            button.classList.remove('bg-gray-800', 'text-gray-300');

            // Show corresponding content
            const tabId = button.dataset.tab;
            const tabContent = document.getElementById(`${tabId}-tab`);
            tabContent.classList.remove('hidden');
            tabContent.classList.add('active');
        });
    });

    // Scroll animation for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all elements with the class 'scroll-animate'
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});