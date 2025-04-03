// Function to load HTML sections
async function loadSection(url, containerId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;
      return true; // Successfully loaded
    } else {
      console.warn(`Container '${containerId}' not found.`);
      return false;
    }
  } catch (error) {
    console.error(`Error loading section from ${url}:`, error);
    return false;
  }
}

// Load all sections when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load sections sequentially
    await loadSection("SE-2021-037/sections/header.html", "header-container");
    await loadSection("SE-2021-037/sections/hero.html", "hero-container");
    await loadSection("SE-2021-037/sections/about.html", "about-container");
    await loadSection(
      "SE-2021-037/sections/education.html",
      "education-container"
    );
    await loadSection("SE-2021-037/sections/skills.html", "skills-container");
    await loadSection(
      "SE-2021-037/sections/projects.html",
      "projects-container"
    );
    await loadSection("SE-2021-037/sections/contact.html", "contact-container");

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("hidden");
        navLinks.classList.toggle("flex");
        navLinks.classList.toggle("flex-col");
        navLinks.classList.toggle("absolute");
        navLinks.classList.toggle("top-20");
        navLinks.classList.toggle("left-0");
        navLinks.classList.toggle("w-full");
        navLinks.classList.toggle("bg-white");
        navLinks.classList.toggle("shadow-lg");
        navLinks.classList.toggle("p-5");
        navLinks.classList.toggle("z-50");

        navLinks.querySelectorAll("li").forEach((li) => {
          li.classList.toggle("my-3", navLinks.classList.contains("flex-col"));
        });
      });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute("href"));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  } catch (error) {
    console.error("Error initializing DOM content:", error);
  }
});
