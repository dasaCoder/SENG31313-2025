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

// Contact Section initialization: animations and form handling
function initializeContactSection() {
  // Check if an element is in the viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Handle scroll-triggered animations for contact section elements
  function handleScrollAnimation() {
    // Animate contact heading
    const contactHeading = document.getElementById("contact-heading");
    if (
      contactHeading &&
      isElementInViewport(contactHeading) &&
      contactHeading.classList.contains("opacity-0")
    ) {
      contactHeading.classList.remove("opacity-0", "translate-y-10");
      contactHeading.classList.add(
        "transition-all",
        "duration-1000",
        "ease-out",
        "opacity-100",
        "translate-y-0"
      );
    }

    // Animate contact info card and its child items
    const infoCard = document.getElementById("contact-info-card");
    if (
      infoCard &&
      isElementInViewport(infoCard) &&
      infoCard.classList.contains("opacity-0")
    ) {
      setTimeout(() => {
        infoCard.classList.remove("opacity-0", "-translate-x-10");
        infoCard.classList.add(
          "transition-all",
          "duration-1000",
          "ease-out",
          "opacity-100",
          "translate-x-0"
        );

        // Animate each contact item with a delay
        const contactItems = document.querySelectorAll(".contact-item");
        contactItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.remove("opacity-0");
            item.classList.add(
              "transition-all",
              "duration-700",
              "ease-out",
              "opacity-100"
            );
          }, 300 * (index + 1));
        });

        // Animate social links
        setTimeout(() => {
          const socialLinks = document.getElementById("social-links");
          if (socialLinks) {
            socialLinks.classList.remove("opacity-0");
            socialLinks.classList.add(
              "transition-all",
              "duration-700",
              "ease-out",
              "opacity-100"
            );
          }
        }, 1200);
      }, 300);
    }

    // Animate contact form card and its form fields
    const formCard = document.getElementById("contact-form-card");
    if (
      formCard &&
      isElementInViewport(formCard) &&
      formCard.classList.contains("opacity-0")
    ) {
      setTimeout(() => {
        formCard.classList.remove("opacity-0", "translate-x-10");
        formCard.classList.add(
          "transition-all",
          "duration-1000",
          "ease-out",
          "opacity-100",
          "translate-x-0"
        );

        // Animate each form field with a delay
        const formFields = document.querySelectorAll(".form-field");
        formFields.forEach((field, index) => {
          setTimeout(() => {
            field.classList.remove("opacity-0");
            field.classList.add(
              "transition-all",
              "duration-700",
              "ease-out",
              "opacity-100"
            );
          }, 200 * (index + 1));
        });
      }, 500);
    }
  }

  // Trigger animations on scroll and initial load
  window.addEventListener("scroll", handleScrollAnimation);
  setTimeout(handleScrollAnimation, 300);

  // Handle contact form submission animation
  // Handle contact form submission animation
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm && submitBtn) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Button loading animation
      submitBtn.innerHTML =
        '<i class="mr-2 fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      submitBtn.classList.add("bg-teal-400");

      const formData = new FormData(contactForm);

      // Wait 2 seconds for animation, then send the form via AJAX
      setTimeout(async () => {
        try {
          const response = await fetch(
            "https://formsubmit.co/ajax/minindubim%40gmail.com",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
              },
              body: formData,
            }
          );

          if (response.ok) {
            // Success animation
            submitBtn.innerHTML =
              '<i class="mr-2 fas fa-check"></i> Message Sent!';
            submitBtn.classList.remove("bg-teal-400");
            submitBtn.classList.add("bg-green-500");

            // Reset form after a delay
            setTimeout(() => {
              contactForm.reset();
              submitBtn.innerHTML =
                '<i class="mr-2 fas fa-paper-plane"></i> Send Message';
              submitBtn.disabled = false;
              submitBtn.classList.remove("bg-green-500");
              submitBtn.classList.add("bg-teal-500");
            }, 3000);
          } else {
            throw new Error("FormSubmit response not OK");
          }
        } catch (error) {
          console.error("Form submission error:", error);
          submitBtn.innerHTML = '<i class="mr-2 fas fa-times"></i> Failed!';
          submitBtn.classList.remove("bg-teal-400");
          submitBtn.classList.add("bg-red-500");

          // Reset button after a delay
          setTimeout(() => {
            submitBtn.innerHTML =
              '<i class="mr-2 fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
            submitBtn.classList.remove("bg-red-500");
            submitBtn.classList.add("bg-teal-500");
          }, 3000);
        }
      }, 2000);
    });
  }

  // Add hover animations to contact info icons
  const contactIcons = document.querySelectorAll(
    ".contact-item div:first-child"
  );
  contactIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.classList.add("animate-pulse");
    });

    icon.addEventListener("mouseleave", function () {
      this.classList.remove("animate-pulse");
    });
  });

  // Optional: Add typing effect to the message textarea
  const messageField = document.getElementById("message");
  if (messageField) {
    messageField.addEventListener("focus", function () {
      if (this.value === "") {
        const placeholder = "Hi there! I'm interested in...";
        let i = 0;

        const typingEffect = setInterval(() => {
          if (this.value === "") {
            // Continue only if user hasn't started typing
            if (i < placeholder.length) {
              this.setAttribute(
                "placeholder",
                placeholder.substring(0, i + 1) + "|"
              );
              i++;
            } else {
              clearInterval(typingEffect);
              this.setAttribute("placeholder", placeholder);
            }
          } else {
            clearInterval(typingEffect);
          }
        }, 100);
      }
    });

    messageField.addEventListener("blur", function () {
      this.setAttribute("placeholder", "Your message here...");
    });
  }
}

// ------------------------
// Education Section Animations
// ------------------------

function initializeEducationSection() {
  // Elements to animate in the education section
  const elementsToAnimate = [
    document.getElementById("education-heading"),
    document.getElementById("education-item-1"),
    document.getElementById("education-item-2"),
    document.getElementById("education-item-3"),
    document.getElementById("education-item-4"),
  ];

  // Function to check if an element is in the viewport
  function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Function to animate elements when they come into view
  function animateOnScroll() {
    elementsToAnimate.forEach((element) => {
      if (
        element &&
        isInViewport(element) &&
        element.classList.contains("opacity-0")
      ) {
        // Add a slight delay for each element to create a cascade effect
        setTimeout(() => {
          element.classList.remove("opacity-0");
          element.classList.add("opacity-100");

          // Remove transform for smooth transition
          if (element.classList.contains("-translate-x-10")) {
            element.classList.remove("-translate-x-10");
            element.classList.add("translate-x-0");
          } else if (element.classList.contains("translate-x-10")) {
            element.classList.remove("translate-x-10");
            element.classList.add("translate-x-0");
          } else if (element.classList.contains("translate-y-10")) {
            element.classList.remove("translate-y-10");
            element.classList.add("translate-y-0");
          }
        }, 150);
      }
    });
  }

  // Add transition effects to all elements
  elementsToAnimate.forEach((element) => {
    if (element) {
      element.classList.add("transition-all", "duration-1000", "ease-out");
    }
  });

  // Run on load and scroll
  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("resize", animateOnScroll);

  // Initial check in case elements are already in viewport when page loads
  animateOnScroll();
}

// ------------------------
// About Section Animations
// ------------------------

// Extracted from the inline script in about.html
function initializeAboutAnimations() {
  // Show cards when they come into view
  setTimeout(function () {
    var cards = document.querySelectorAll(".card-animate");
    cards.forEach(function (card) {
      card.classList.add("show");
    });
  }, 600);

  // Animate skill bars
  setTimeout(function () {
    var skillBars = document.querySelectorAll(".skill-progress-bar");
    skillBars.forEach(function (bar) {
      var width = bar.getAttribute("data-width");
      bar.style.width = width + "%";
    });
  }, 1500);

  // Intersection Observer for elements that should animate when scrolled into view
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    // Observe all elements with animation classes
    document
      .querySelectorAll(
        ".fade-in, .fade-in-delay-1, .fade-in-delay-2, .slide-in-left, .slide-in-right"
      )
      .forEach((el) => {
        observer.observe(el);
      });
  }
}

// Load sections and initialize functionalities when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load other sections as needed
    await loadSection("./sections/header.html", "header-container");
    // Load hero section and initialize typed text effect afterward
    const heroLoaded = await loadSection(
      "/SE-2021-037/sections/hero.html",
      "hero-container"
    );
    if (heroLoaded) {
      initializeTypedText();
    }
    await loadSection("sections/about.html", "about-container");
    // Load education section then initialize its animations
    const educationLoaded = await loadSection(
      "/SE-2021-037/sections/education.html",
      "education-container"
    );
    if (educationLoaded) {
      initializeEducationSection();
    }
    const skillsLoaded = await loadSection(
      "/SE-2021-037/sections/skills.html",
      "skills-container"
    );
    if (skillsLoaded) {
      initializeSkillsSection();
    }

    // Load projects section then initialize the carousel
    const projectsLoaded = await loadSection(
      "/SE-2021-037/sections/projects.html",
      "projects-container"
    );
    if (projectsLoaded) {
      initializeCarousel();
    }

    // Load the contact section then initialize its functionality
    const contactLoaded = await loadSection(
      "/SE-2021-037/sections/contact.html",
      "contact-container"
    );
    if (contactLoaded) {
      initializeContactSection();
    }

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

    // If the about section is present on the page, initialize its animations.
    if (document.getElementById("about")) {
      initializeAboutAnimations();
    }
  } catch (error) {
    console.error("Error initializing DOM content:", error);
  }
});
