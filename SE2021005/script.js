document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
        menuToggle.innerHTML = navLinks.classList.contains("show") ? '<i class="bi bi-x"></i>' : '<i class="bi bi-list"></i>';
    });
});


  document.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll(".custom-nav-links");
    let currentPath = window.location.pathname;

    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".custom-nav-links a");

    function setActiveLink() {
        let index = sections.length;

        while (--index >= 0 && window.scrollY + 150 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove("active"));
        if (index >= 0) {
            const activeSection = sections[index].getAttribute("id");
            const activeLink = document.querySelector(`.custom-nav-links a[href="#${activeSection}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    }

    window.addEventListener("scroll", setActiveLink);
});

document.getElementById("projectFilter").addEventListener("change", function () {
    let selectedCategory = this.value;
    let projects = document.querySelectorAll(".project");

    projects.forEach(project => {
        if (selectedCategory === "all" || project.classList.contains(selectedCategory)) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });

    updateShowMoreButton();
});

document.getElementById("menu-toggle").addEventListener("click", function() {
    let navLinks = document.getElementById("nav-links");
    navLinks.style.display = (navLinks.style.display === "flex") ? "none" : "flex";
});


const text = "I am Thanoogithan, a Full Stack Developer & ML Enthusiast.";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.querySelector(".animated-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}
window.onload = typeEffect;

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Submit the form data using fetch
        fetch(form.action, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(new FormData(form)).toString(),
        })
        .then(() => {
            successMessage.style.display = "block";
            form.reset();
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 4000);
        })
        .catch(() => {
            alert("Oops! Something went wrong.");
        });
    });

    // Scroll animation effect
    const fadeElements = document.querySelectorAll(".scroll-fade");

    function handleScroll() {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on load
});
