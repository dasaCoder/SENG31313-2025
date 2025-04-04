// Function to load HTML sections and execute any inline scripts
async function loadSection(url, containerId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;

      // Execute any inline scripts if needed
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });

      return true;
    } else {
      console.warn(`Container '${containerId}' not found.`);
      return false;
    }
  } catch (error) {
    console.error(`Error loading section from ${url}:`, error);
    return false;
  }
}

// Carousel initialization extracted into its own function
function initializeCarousel() {
  // Get carousel elements
  const carouselInner = document.getElementById("carousel-inner");
  const slides = document.querySelectorAll(".carousel-item");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const indicators = document.getElementById("carousel-indicators");

  if (
    !carouselInner ||
    slides.length === 0 ||
    !prevBtn ||
    !nextBtn ||
    !indicators
  ) {
    console.warn("Carousel elements not found. Initialization aborted.");
    return;
  }

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create indicator dots
  indicators.innerHTML = ""; // clear existing indicators if any
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("carousel-indicator");
    dot.setAttribute("data-index", i);
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    indicators.appendChild(dot);
  }

  const dots = document.querySelectorAll(".carousel-indicator");

  // Update carousel state
  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Function to go to a specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Attach event listeners to controls
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  updateCarousel();

  // Auto-advance the carousel
  let interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }, 5000);

  // Pause auto-advance on hover
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseenter", () => {
    clearInterval(interval);
  });
  carousel.addEventListener("mouseleave", () => {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }, 5000);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }
  });
}

// Typed text initialization extracted into its own function
function initializeTypedText() {
  const typedElement = document.getElementById("typed-text");
  if (!typedElement) return;

  if (typeof Typed !== "undefined") {
    new Typed("#typed-text", {
      strings: ["Web Developer", "Software Engineer", "Fullstack Developer"],
      typeSpeed: 500,
      backSpeed: 500,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: false,
    });
    console.log("Typed.js initialized successfully");
  } else {
    console.error("Typed.js library not loaded properly");
    fallbackTyping();
  }
}

// Fallback function using plain JavaScript if Typed.js fails
function fallbackTyping() {
  const textElement = document.getElementById("typed-text");
  if (!textElement) return;

  const roles = ["Web Developer", "Software Engineer", "Fullstack Developer"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 80;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeText, typeSpeed);
  }

  typeText();
}

// Skills Section initialization: tab switching and scroll animations
function initializeSkillsSection() {
  const tabButtons = document.querySelectorAll("#skills .tab-btn");
  const tabContents = document.querySelectorAll("#skills .tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all tabs and hide all contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.add("hidden"));

      // Activate clicked tab and its corresponding content
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.remove("hidden");

      animateProgressBars();
    });
  });

  function checkPosition() {
    const elements = document.querySelectorAll("#skills .slide-up");
    elements.forEach((element) => {
      const positionFromTop = element.getBoundingClientRect().top;
      if (positionFromTop - window.innerHeight <= 0) {
        element.classList.add("animated");
      }
    });
    animateProgressBars();
  }

  function animateProgressBars() {
    const progressBars = document.querySelectorAll("#skills .progress-bar");
    progressBars.forEach((bar) => {
      const positionFromTop = bar.getBoundingClientRect().top;
      if (positionFromTop - window.innerHeight <= 0) {
        bar.classList.add("animated");
      }
    });
  }

  window.addEventListener("scroll", checkPosition);
  window.addEventListener("resize", checkPosition);
  checkPosition();
}

// Load sections and initialize functionalities when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load other sections as needed
    await loadSection("SE-2021-037/sections/header.html", "header-container");
    // Load hero section and initialize typed text effect afterward
    const heroLoaded = await loadSection(
      "SE-2021-037/sections/hero.html",
      "hero-container"
    );
    if (heroLoaded) {
      initializeTypedText();
    }
    await loadSection("SE-2021-037/sections/about.html", "about-container");
    await loadSection(
      "SE-2021-037/sections/education.html",
      "education-container"
    );
    const skillsLoaded = await loadSection(
      "SE-2021-037/sections/skills.html",
      "skills-container"
    );
    if (skillsLoaded) {
      initializeSkillsSection();
    }

    // Load projects section then initialize the carousel
    const projectsLoaded = await loadSection(
      "SE-2021-037/sections/projects.html",
      "projects-container"
    );
    if (projectsLoaded) {
      initializeCarousel();
    }

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
