// Function to load external HTML files dynamically
function loadHTML(id, file, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error("File not found");
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();  // Call setupMenuToggle after header is loaded
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Function to add event listeners for mobile menu toggle
function setupMenuToggle() {
    const menuToggle = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const body = document.body;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: "smooth" });

            // Toggle mobile menu
            mobileMenu.classList.toggle("hidden");

            // Toggle shadow class on menu
            if (!mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.add("shadow-lg");
                body.classList.add("no-scroll");
                preventScroll();
            } else {
                mobileMenu.classList.remove("shadow-lg");
                body.classList.remove("no-scroll");
                enableScroll();
            }
        });

        // Close menu if clicking outside
        document.addEventListener("click", (event) => {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("shadow-lg");
                body.classList.remove("no-scroll");
                enableScroll();
            }
        });
    }
}

// Prevent scrolling + add bump animation
function preventScroll() {
    document.body.style.overflow = "hidden";

    // Trigger shake animation on scroll attempts
    document.addEventListener("wheel", applyBumpEffect, { passive: false });
    document.addEventListener("touchmove", applyBumpEffect, { passive: false });
}

function enableScroll() {
    document.body.style.overflow = "";

    document.removeEventListener("wheel", applyBumpEffect);
    document.removeEventListener("touchmove", applyBumpEffect);
}

// Bump shake effect
function applyBumpEffect(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 500);
}

// Load header and footer
loadHTML("header-container", "../common/header.html", setupMenuToggle);
loadHTML("footer-container", "../common/footer.html");
