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