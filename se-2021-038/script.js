//HEADER

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const darkModeElements = document.querySelectorAll('.dark-mode-text, .dark-mode-icon, .dark-mode-hamburger');

  // Animation for header
  // gsap.from('#logo', {
  //     duration: 0.1,
  //     y: -50,
  //     opacity: 0,
  //     ease: 'power3.out',
  // });

  // gsap.from('.nav-link', {
  //     duration: 0.1,
  //     y: -50,
  //     opacity: 0,
  //     ease: 'power3.out',
  // });

  // Sticky Header
  function handleScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
      navbar.classList.add('bg-black');
      navbar.classList.remove('bg-white');

      // Change colors for dark mode
      darkModeElements.forEach(element => {
        if (element.classList.contains('dark-mode-text')) {
          element.classList.remove('text-gray-800');
          element.classList.add('text-white');
        } else if (element.classList.contains('dark-mode-icon')) {
          element.classList.remove('text-gray-400');
          element.classList.add('text-gray-300');
        } else if (element.classList.contains('dark-mode-hamburger')) {
          element.classList.remove('text-gray-800');
          element.classList.add('text-white');
        }
      });
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.remove('bg-black');
      navbar.classList.add('bg-white');

      // Revert colors for light mode
      darkModeElements.forEach(element => {
        if (element.classList.contains('dark-mode-text')) {
          element.classList.add('text-gray-800');
          element.classList.remove('text-white');
        } else if (element.classList.contains('dark-mode-icon')) {
          element.classList.add('text-gray-400');
          element.classList.remove('text-gray-300');
        } else if (element.classList.contains('dark-mode-hamburger')) {
          element.classList.add('text-gray-800');
          element.classList.remove('text-white');
        }
      });
    }
  }


  // Initial call to set correct state on page load
  handleScroll();

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Mobile menu functionality
  function openMobileMenu() {
    mobileMenu.classList.add('open');
    // Use GSAP for more refined animation
    gsap.from('#mobileMenu a', {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
  }

  // Event listeners for mobile menu
  hamburgerBtn.addEventListener('click', openMobileMenu);
  closeMenuBtn.addEventListener('click', closeMobileMenu);

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Add active class to nav links when scrolling to sections
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight &&
        sectionId
      ) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('text-[#4C9EEB]');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-[#4C9EEB]');
          }
        });
      }
    });
  }

  // Add scroll event for nav highlighting
  window.addEventListener('scroll', highlightNavOnScroll);

  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
});






//Welcome Popup

const welcomePopup = document.getElementById('welcomePopup');
const viewPortfolioBtn = document.getElementById('viewPortfolioBtn');

// Show popup after 1 second
setTimeout(() => {
  // Make the popup visible first (but still opacity 0)
  gsap.set(welcomePopup, { visibility: 'visible' });

  // Animate the popup appearing
  gsap.to(welcomePopup, {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  });

  // Animate the modal with a slight bounce
  const popupContent = welcomePopup.querySelector('.relative');
  gsap.from(popupContent, {
    y: 50,
    scale: 0.9,
    duration: 0.6,
    ease: 'back.out(1.5)'
  });
}, 1000);

// Close popup when the button is clicked
viewPortfolioBtn.addEventListener('click', () => {
  gsap.to(welcomePopup, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      welcomePopup.style.visibility = 'hidden';
      // Optionally scroll to portfolio section
      const portfolioSection = document.getElementById('navbar');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Also close when clicking outside the popup
welcomePopup.addEventListener('click', (e) => {
  if (e.target === welcomePopup) {
    gsap.to(welcomePopup, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        welcomePopup.style.visibility = 'hidden';
      }
    });
  }
});





//HERO SECTION

const professions = ["Software Engineering", "App Development", "Web Development"];
let currentIndex = 0;
const professionElement = document.querySelector('.profession-text');

function typeText(text, callback) {
  let i = 0;
  professionElement.textContent = "";

  function type() {
    if (i < text.length) {
      professionElement.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100); // Typing speed
    } else {
      setTimeout(() => deleteText(callback), 1500); // Pause before deleting
    }
  }

  type();
}

function deleteText(callback) {
  let text = professionElement.textContent;
  let i = text.length;

  function erase() {
    if (i > 0) {
      professionElement.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(erase, 50); // Deleting speed
    } else {
      callback();
    }
  }

  erase();
}

function updateProfession() {
  typeText(professions[currentIndex], () => {
    currentIndex = (currentIndex + 1) % professions.length;
    updateProfession();
  });
}

setTimeout(updateProfession, 1000);


gsap.from('.profile-image img', {
  opacity: 0,
  scale: 0.8,
  duration: 1.2,
  ease: "power3.out"
});






// About section

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.to('#about-col-1', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2
      });

      gsap.to('#about-col-2', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.4
      });

      gsap.to('#about-col-3', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.6
      });

      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

aboutObserver.observe(document.getElementById('about'));







// What I Do section
document.addEventListener('DOMContentLoaded', function () {
  gsap.set('.service-card', { opacity: 0, y: 50 });

  const servicesObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      gsap.to('.service-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });

      servicesObserver.unobserve(document.querySelector('#what-i-do'));
    }
  }, { threshold: 0.2 });

  servicesObserver.observe(document.querySelector('#what-i-do'));
});







// Portfolio section

const portfolioItems = document.querySelectorAll('.portfolio-item');

const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.to(portfolioItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15
      });

      portfolioObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

portfolioObserver.observe(document.getElementById('portfolio'));



// Portfolio hover effect
portfolioItems.forEach(item => {
  const overlay = item.querySelector('.portfolio-overlay');

  item.addEventListener('mouseenter', () => {
    gsap.to(overlay, { opacity: 1, duration: 0.1 });
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(overlay, { opacity: 0, duration: 0.1 });
  });
});

// Portfolio filtering functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      btn.classList.remove('bg-[#4C9EEB]');
      btn.classList.remove('text-white');
      btn.classList.add('bg-gray-200');
      btn.classList.add('text-gray-700');
    });

    this.classList.add('active');
    this.classList.add('bg-[#4C9EEB]');
    this.classList.add('text-white');
    this.classList.remove('bg-gray-200');
    this.classList.remove('text-gray-700');

    const filter = this.getAttribute('data-filter');

    // Filter items
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');

      if (filter === 'all' || filter === category) {
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          display: 'block'
        });
      } else {
        gsap.to(item, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          onComplete: () => {
            item.style.display = 'none';
          }
        });
      }
    });
  });
});







// Skills section
document.addEventListener('DOMContentLoaded', function () {
  // Initialize skill progress bars
  const skillBars = document.querySelectorAll('.skill-progress-bar');

  // Function to animate skill bars
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      bar.style.width = '0%';

      setTimeout(() => {
        bar.style.width = progress + '%';
      }, 300);
    });
  }

  // Animate on scroll
  function checkIfInView() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const position = skillsSection.getBoundingClientRect();

    // If skills section is in viewport
    if (position.top < window.innerHeight && position.bottom >= 0) {
      animateSkillBars();
      // Remove event listener after animation is triggered
      window.removeEventListener('scroll', checkIfInView);
    }
  }

  // Check if skills section is in view on load
  checkIfInView();

  // Add scroll event listener
  window.addEventListener('scroll', checkIfInView);
});







// Experience section

// Add CSS styles for timeline elements
if (!document.querySelector('style#timeline-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'timeline-styles';
  styleElement.textContent = `
      .timeline-dot {
          position: absolute;
          left: -10px;
          top: 10px;
          width: 16px;
          height: 16px;
          background-color: #4C9EEB;
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 0 5px rgba(76, 158, 235, 0.8);
      }
      .timeline-item:not(:last-child)::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 30px;
          bottom: -10px;
          width: 2px;
          background-color: #e1e4e8;
      }
  `;
  document.head.appendChild(styleElement);
}

function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length > 0) {
    gsap.set(timelineItems, { opacity: 0, y: 50 });

    gsap.to(timelineItems, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#experience",
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });
  }
}

let retryCount = 0;
function waitForScrollTrigger(callback) {
  if (typeof ScrollTrigger !== 'undefined') {
    callback();
  } else if (retryCount < 10) {
    retryCount++;
    setTimeout(() => waitForScrollTrigger(callback), 100);
  } else {
    console.error("ScrollTrigger not loaded. Ensure GSAP ScrollTrigger is included.");
  }
}

waitForScrollTrigger(animateTimeline);






// Testimonials section
const testimonialSwiper = new Swiper('.testimonial-slider', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }
});

// Testimonials Section Animations
const testimonialSection = document.querySelector('#testimonials');

// Animate section title
gsap.from('.section-title', {
  scrollTrigger: {
    trigger: testimonialSection,
    start: 'top 70%',
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
});

// Reveal the testimonial slider
gsap.to('.testimonial-slider', {
  scrollTrigger: {
    trigger: testimonialSection,
    start: 'top 60%',
  },
  opacity: 1,
  duration: 1,
  ease: 'power2.out',
  delay: 0.4
});

// Staggered animation for individual testimonials
gsap.from('.swiper-slide', {
  scrollTrigger: {
    trigger: '.testimonial-slider',
    start: 'top 70%',
  },
  y: 60,
  opacity: 0,
  stagger: 0.2,
  duration: 0.8,
  ease: 'back.out(1.7)',
  delay: 0.6
});






// Contact Section
const contactSection = document.querySelector('#contact');

// Animate contact form
gsap.to('#contact-form', {
  scrollTrigger: {
    trigger: contactSection,
    start: 'top 60%',
  },
  opacity: 1,
  x: 0,
  duration: 0.8,
  ease: 'power3.out'
});

// Animate contact info
gsap.to('#contact-info', {
  scrollTrigger: {
    trigger: contactSection,
    start: 'top 60%',
  },
  opacity: 1,
  x: 0,
  duration: 0.8,
  delay: 0.3,
  ease: 'power3.out'
});

// Animate contact form elements
gsap.from('#contact-form input, #contact-form textarea', {
  scrollTrigger: {
    trigger: '#contact-form',
    start: 'top 70%',
  },
  y: 20,
  opacity: 0,
  stagger: 0.1,
  duration: 0.6,
  delay: 0.5,
  ease: 'power2.out'
});

// Animate contact info elements
gsap.from('#contact-info .flex.items-start', {
  scrollTrigger: {
    trigger: '#contact-info',
    start: 'top 70%',
  },
  x: -30,
  opacity: 0,
  stagger: 0.15,
  duration: 0.7,
  delay: 0.7,
  ease: 'power2.out'
});

// Animate social media icons
gsap.from('#contact-info .flex.space-x-4 a', {
  scrollTrigger: {
    trigger: '#contact-info .flex.space-x-4',
    start: 'top 85%',
  },
  scale: 0,
  opacity: 0,
  stagger: 0.1,
  duration: 0.5,
  delay: 1,
  ease: 'back.out(1.7)'
});

// Adding hover animations to buttons
const addHoverAnimation = (selector) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power1.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power1.out'
      });
    });
  });
};

// Apply hover animations
addHoverAnimation('button[type="submit"]');
addHoverAnimation('.swiper-button-next, .swiper-button-prev');

document.addEventListener('DOMContentLoaded', () => {

});







// Footer animations
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.from('.footer-col', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

      footerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const footerSection = document.getElementById('footer');
if (footerSection) {
  footerObserver.observe(footerSection);
}






// Back to top button

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    gsap.to(backToTopBtn, {
      opacity: 1,
      duration: 0.3,
      display: 'block'
    });
  } else {
    gsap.to(backToTopBtn, {
      opacity: 0,
      duration: 0.3
    });
  }
});

// Smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');

    if (targetId === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});



// Form validation

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm2.addEventListener('submit', async function (e) {
    e.preventDefault();

    let isValid = true;
    const requiredFields = contactForm2.querySelectorAll('input, textarea');

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('border-red-500');

        let errorMessage = field.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
          errorMessage = document.createElement('p');
          errorMessage.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
          errorMessage.textContent = 'This field is required';
          field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
      } else {
        field.classList.remove('border-red-500');
        const errorMessage = field.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
          errorMessage.remove();
        }
      }
    });

    if (isValid) {
      const formData = new FormData(contactForm2);

      try {
        const response = await fetch(contactForm2.action, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json'
          }
        });

        if (response.ok) {
          const successMessage = document.createElement('div');
          successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
          successMessage.innerHTML = '<strong>Success!</strong> Your message has been sent.';

          const wrapper = document.getElementById('form-wrapper');
          contactForm2.appendChild(successMessage);

          contactForm2.reset();

          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }
      } catch (error) {
        alert('Something went wrong. Try again!');
      }
    }
  });

  contactForm2.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', function () {
      this.classList.remove('border-red-500');

      const errorMessage = this.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
      }
    });
  });
}
