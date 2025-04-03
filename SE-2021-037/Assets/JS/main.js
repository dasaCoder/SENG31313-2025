// Function to load HTML sections
async function loadSection(url, containerId) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading section from ${url}:`, error);
  }
}

// Load all sections when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  // Load all sections
  await loadSection("SE-2021-037/sections/header.html", "header-container");
  await loadSection("SE-2021-037/sections/hero.html", "hero-container");
  await loadSection("SE-2021-037/sections/education.html", "education-container");
  await loadSection("SE-2021-037/sections/skills.html", "skills-container");
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

      if (navLinks.classList.contains("flex-col")) {
        navLinks.querySelectorAll("li").forEach((li) => {
          li.classList.add("my-3");
        });
      } else {
        navLinks.querySelectorAll("li").forEach((li) => {
          li.classList.remove("my-3");
        });
      }
    });
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute("href"));
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on Scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".opacity-0").forEach((item) => {
    observer.observe(item);
  });
});
