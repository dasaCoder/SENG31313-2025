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

    // Load education section and initialize animations after successful load
    const educationLoaded = await loadSection(
      "SE-2021-037/sections/education.html",
      "education-container"
    );

    // Initialize education animations after a short delay to ensure the new DOM is rendered
if (educationLoaded) {
  const checkContentLoaded = setInterval(() => {
    const educationSection = document
      .getElementById("education-container")
      .querySelector("section");
    if (educationSection) {
      clearInterval(checkContentLoaded);
      initEducationAnimations();
    }
  }, 100); // Check every 100ms
}

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

// Education timeline Anime.js animations
function initEducationAnimations() {
  // Always target the education section inside the container
  const container = document.getElementById("education-container");
  if (!container) {
    console.warn("Education container not found");
    return;
  }

  const educationSection = container.querySelector("section");
  if (!educationSection) {
    console.warn("Education section not found inside container");
    return;
  }

  // Select elements within the loaded education section
  const header = educationSection.querySelector("h2.gsap-header");
  const subheader = educationSection.querySelector("h3.gsap-subheader");
  const divider = educationSection.querySelector(".gsap-divider");
  const timelineItems = educationSection.querySelectorAll(".gsap-item");
  const timelineLines = educationSection.querySelectorAll(".gsap-line");
  const dots = educationSection.querySelectorAll(".rounded-full");

  // Check if Anime.js is loaded
  if (typeof anime === "undefined") {
    console.warn("Anime.js not loaded - falling back to CSS animations");
    // Apply CSS animations as fallback
    applyFallbackAnimations(educationSection);
    return;
  }

  // Set initial states
  if (header) header.style.opacity = 0;
  if (subheader) subheader.style.opacity = 0;
  if (divider) {
    divider.style.opacity = 0;
    divider.style.width = 0;
  }

  timelineItems.forEach((item) => {
    item.style.opacity = 0;
    item.style.transform = "translateY(30px)";
  });

  timelineLines.forEach((line) => {
    line.style.height = 0;
  });

  dots.forEach((dot) => {
    dot.style.opacity = 0;
    dot.style.transform = "scale(0)";
  });

  // Create intersection observer for triggering animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate header elements
          if (header) {
            anime({
              targets: header,
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 800,
              easing: "easeOutQuad",
            });
          }

          if (subheader) {
            anime({
              targets: subheader,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              easing: "easeOutQuad",
              delay: 200,
            });
          }

          if (divider) {
            anime({
              targets: divider,
              opacity: [0, 1],
              width: ["0", "5rem"],
              duration: 1000,
              easing: "easeOutQuad",
              delay: 400,
            });
          }

          // Animate timeline lines
          if (timelineLines.length > 0) {
            anime({
              targets: Array.from(timelineLines),
              height: ["0%", "100%"],
              duration: 1500,
              easing: "easeOutQuad",
              delay: 300,
            });
          }

          // Animate timeline items one by one
          if (timelineItems.length > 0) {
            anime({
              targets: Array.from(timelineItems),
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              easing: "easeOutQuad",
              delay: anime.stagger(150, { start: 500 }),
            });
          }

          // Animate timeline dots
          if (dots.length > 0) {
            anime({
              targets: Array.from(dots),
              opacity: [0, 1],
              scale: [0, 1],
              duration: 500,
              easing: "spring(1, 80, 10, 0)",
              delay: anime.stagger(150, { start: 800 }),
            });
          }

          // Disconnect observer after triggering animation
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe the education section
  observer.observe(educationSection);
}

// Fallback CSS animations when neither GSAP nor Anime.js is available
function applyFallbackAnimations(section) {
  if (!section) return;

  // Add a class to trigger CSS animations
  section.classList.add("animate-fallback");

  // Apply inline CSS animations to elements
  const header = section.querySelector("h2.gsap-header");
  if (header) {
    header.style.animation = "fadeInUp 0.8s forwards";
    header.style.opacity = "0";
  }

  const subheader = section.querySelector("h3.gsap-subheader");
  if (subheader) {
    subheader.style.animation = "fadeInUp 0.8s forwards 0.2s";
    subheader.style.opacity = "0";
  }

  const divider = section.querySelector(".gsap-divider");
  if (divider) {
    divider.style.animation = "growWidth 1s forwards 0.4s";
    divider.style.opacity = "0";
    divider.style.width = "0";
  }

  const timelineItems = section.querySelectorAll(".gsap-item");
  timelineItems.forEach((item, index) => {
    item.style.animation = `fadeInUp 0.6s forwards ${0.6 + index * 0.15}s`;
    item.style.opacity = "0";
  });

  const timelineLines = section.querySelectorAll(".gsap-line");
  timelineLines.forEach((line) => {
    line.style.animation = "growHeight 1.5s forwards 0.3s";
    line.style.height = "0";
  });

  const dots = section.querySelectorAll(".rounded-full");
  dots.forEach((dot, index) => {
    dot.style.animation = `scaleIn 0.5s forwards ${0.8 + index * 0.15}s`;
    dot.style.opacity = "0";
    dot.style.transform = "scale(0)";
  });

  // Add keyframes to document if they don't exist
  if (!document.getElementById("animation-keyframes")) {
    const style = document.createElement("style");
    style.id = "animation-keyframes";
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes growWidth {
        from { opacity: 0; width: 0; }
        to { opacity: 1; width: 5rem; }
      }
      @keyframes growHeight {
        from { height: 0; }
        to { height: 100%; }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
}
