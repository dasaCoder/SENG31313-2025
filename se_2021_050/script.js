document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active-page');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding page
            const pageId = this.getAttribute('data-page') + '-page';
            document.getElementById(pageId).classList.add('active-page');
        });
    });
    
    // Set home as default active page if no hash in URL
    if (!window.location.hash) {
        document.querySelector('.nav-links a[data-page="home"]').classList.add('active');
        document.getElementById('home-page').classList.add('active-page');
    }
    
    // You can add more functionality here as needed
});