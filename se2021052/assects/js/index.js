document.addEventListener("DOMContentLoaded", () => {
  // Typing effect
  const roles = ["Frontend Developer", "Backend Developer", "Freelancer"];
  let roleIndex = 0;
  let charIndex = 0;
  const typingElement = document.querySelector(".typing");

  function typeEffect() {
    if (charIndex < roles[roleIndex].length) {
      typingElement.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 100);
    } else {
      setTimeout(eraseEffect, 1000);
    }
  }

  function eraseEffect() {
    if (charIndex > 0) {
      typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseEffect, 50);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 500);
    }
  }

  typeEffect();

  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll(".fade-in");

  function fadeInOnScroll() {
    fadeElements.forEach((element) => {
      const elementPos = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementPos < windowHeight - 100) {
        element.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll(); // Run on page load

  // Smooth scroll for anchor links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Animate zoomIn element
  const animatedElement = document.querySelector(".animate__zoomIn");
  if (animatedElement) {
    animatedElement.classList.remove("animate__zoomIn");
    void animatedElement.offsetWidth; // Reflow trick
    animatedElement.classList.add("animate__zoomIn");
  }

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
      } else {
        alert('Message sent successfully!');
        e.target.reset();
      }
    });
  }
});
