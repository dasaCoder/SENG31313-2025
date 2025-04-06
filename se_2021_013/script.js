const sidebar = document.getElementById('sidebar');

// Show sidebar after scrolling past the hero section
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.7) {
        sidebar.classList.add('show-sidebar');
    } else {
        sidebar.classList.remove('show-sidebar');
    }
    
});
