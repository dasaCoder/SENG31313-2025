document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", () => {
        // Toggle the hidden class to show/hide the mobile menu
        mobileMenu.classList.toggle("hidden");
    });

    // Optional: Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add("hidden");
        }
    });
});

