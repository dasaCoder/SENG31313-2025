//HEADER

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const darkModeElements = document.querySelectorAll('.dark-mode-text, .dark-mode-icon, .dark-mode-hamburger');

    // Animation for header
    gsap.from('#logo', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'power3.out',
    });

    gsap.from('.nav-link', {
        duration: 0.1,
        y: -50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
    });

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






//HERO SECTION

// GSAP Typewriting Animation for Profession Text
const professions = ["Software Engineering", "App Development", "Web Development"];
let currentIndex = 0;
const professionElement = document.querySelector('.profession-text');

function typeText(text, callback) {
    let i = 0;
    professionElement.textContent = ""; // Clear text

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
        updateProfession(); // Loop to next profession
    });
}

// Start animation
setTimeout(updateProfession, 1000);


// Reveal animation for the image
gsap.from('.profile-image img', {
    opacity: 0,
    scale: 0.8,
    duration: 1.2,
    ease: "power3.out"
});





// About section animations on scroll
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
document.addEventListener('DOMContentLoaded', function() {
    // Initial setup - hide cards
    gsap.set('.service-card', { opacity: 0, y: 50 });
    
    // Create the intersection observer
    const servicesObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Animate in the cards when the section is visible
            gsap.to('.service-card', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
            
            // Once animation has run, no need to observe anymore
            servicesObserver.unobserve(document.querySelector('#what-i-do'));
        }
    }, { threshold: 0.2 });
    
    // Start observing the services section
    servicesObserver.observe(document.querySelector('#what-i-do'));
});





// Portfolio section animations on scroll
const portfolioItems = document.querySelectorAll('.portfolio-item');

const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger animation for portfolio items
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

// Portfolio filtering functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active class from all buttons
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      btn.classList.remove('bg-[#4C9EEB]');
      btn.classList.remove('text-white');
      btn.classList.add('bg-gray-200');
      btn.classList.add('text-gray-700');
    });
    
    // Add active class to clicked button
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
        // Show the item with animation
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          display: 'block'
        });
      } else {
        // Hide the item with animation
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


// Footer animations
const footerObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
  // Animate footer columns with staggered effect
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

// -----------------
// Back to top button
// -----------------
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

// -----------------
// Smooth scrolling
// -----------------
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

// -----------------
// Form validation (if contact form exists)
// -----------------
const contactForm = document.getElementById('contact-form');

if (contactForm) {
contactForm.addEventListener('submit', function(e) {
e.preventDefault();

// Basic form validation
let isValid = true;
const requiredFields = contactForm.querySelectorAll('[required]');

requiredFields.forEach(field => {
  if (!field.value.trim()) {
    isValid = false;
    field.classList.add('border-red-500');
    
    // Add error message if it doesn't exist
    let errorMessage = field.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
      errorMessage = document.createElement('p');
      errorMessage.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
      errorMessage.textContent = 'This field is required';
      field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
  } else {
    field.classList.remove('border-red-500');
    
    // Remove error message if it exists
    const errorMessage = field.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
      errorMessage.remove();
    }
  }
});

// If form is valid, you can submit it or show success message
if (isValid) {
  // For demo, just show success message
  const successMessage = document.createElement('div');
  successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4';
  successMessage.innerHTML = '<strong>Success!</strong> Your message has been sent.';
  
  contactForm.appendChild(successMessage);
  
  // Reset form
  contactForm.reset();
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}
});

// Remove validation styling on input
contactForm.querySelectorAll('input, textarea').forEach(field => {
field.addEventListener('input', function() {
  this.classList.remove('border-red-500');
  
  const errorMessage = this.nextElementSibling;
  if (errorMessage && errorMessage.classList.contains('error-message')) {
    errorMessage.remove();
  }
});
});
}
