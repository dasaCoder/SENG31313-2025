// Function to load external HTML files dynamically
function loadHTML(id, file, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();  // Execute the callback after content is loaded
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Function to add event listeners for the mobile menu toggle
function setupMenuToggle() {
    const menuToggle = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const body = document.body;  // Reference to the body
    const content = document.getElementById("main-content"); // Element to apply blur to (the background)

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            // Scroll to the top of the page smoothly
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            // Add bump animation effect
            body.classList.add("bump");

            // Toggle mobile menu visibility
            mobileMenu.classList.toggle("hidden");

            // Add a subtle blur to the content area (background), but not the navbar
            content.classList.toggle("blur-sm");

            // Add or remove the "no-scroll" class for preventing scrolling
            body.classList.toggle("no-scroll");

            // Enable the "bumping" effect when the menu is opened
            if (body.classList.contains("no-scroll")) {
                preventScroll();
            } else {
                enableScroll();
            }
        });

        // Close the menu if clicked outside
        document.addEventListener("click", (event) => {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add("hidden");
                content.classList.remove("blur-sm"); // Remove blur if the menu is closed
                body.classList.remove("no-scroll"); // Re-enable scrolling when the menu is closed

                // Enable scrolling after closing the menu
                enableScroll();
            }
        });
    }
}

// Function to prevent scrolling and add bump effect
function preventScroll() {
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Listen for scroll attempts and trigger bump animation
    document.addEventListener('wheel', applyBumpEffect);
    document.addEventListener('touchmove', applyBumpEffect);
}

// Function to remove bump effect and re-enable scrolling
function enableScroll() {
    document.body.style.overflow = ''; // Restore normal scrolling

    // Remove bumping effect listeners
    document.removeEventListener('wheel', applyBumpEffect);
    document.removeEventListener('touchmove', applyBumpEffect);
}

// Apply bump effect when scroll is attempted
function applyBumpEffect(event) {
    const body = document.body;
    body.classList.add("shake"); // Add the shake class to simulate bumping

    // Stop the event from propagating to prevent scroll
    event.preventDefault();
    event.stopImmediatePropagation();

    // Remove bumping effect after the animation completes
    setTimeout(() => {
        body.classList.remove("shake");
    }, 500); // Time duration should match the animation duration
}

// Load header and footer dynamically and call setupMenuToggle after loading the header
loadHTML("header-container", "../common/header.html", setupMenuToggle);  // Apply toggle functionality after loading the header
loadHTML("footer-container", "../common/footer.html");  // No need for callback for footer
