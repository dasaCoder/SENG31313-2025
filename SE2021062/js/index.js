// Ensure smooth scrolling on navigation item click
document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 70, // Adjust for navbar height
            behavior: 'smooth'
        });
    });
});
