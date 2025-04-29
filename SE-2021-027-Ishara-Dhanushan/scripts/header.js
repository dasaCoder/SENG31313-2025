// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            // Toggle the menu visibility classes
            mobileMenu.classList.toggle('opacity-0');
            mobileMenu.classList.toggle('-translate-y-4');
            mobileMenu.classList.toggle('pointer-events-none');
            mobileMenu.classList.toggle('translate-y-0');
            mobileMenu.classList.toggle('opacity-100');
        });
    } else {
        console.error('Mobile menu elements not found');
    }
});