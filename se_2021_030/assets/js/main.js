/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener("click", (event) => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener("click", (event) => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav_link");
const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav_link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper(".projects_container", {
  loop: true,
  spaceBetween: 24,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    1200: {
      slidesPerView: 2,
      spaceBetween: -56,
    },
  },
  mousewheel: true,
  keyboard: true,
});

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestomial = new Swiper(".testimonial_container", {
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*=============== EMAIL JS ===============*/

const contactForm = document.getElementById("contact-form"),
  contactProject = document.getElementById("contactProject"),
  contactName = document.getElementById("contactName"),
  contactEmail = document.getElementById("contactEmail"),
  contactMessage = document.getElementById("contactMessage");

// Initialize EmailJS
emailjs.init("1ohWDV__PZXKUoxS-"); // Replace with your actual Public Key

const sendEmail = (e) => {
  e.preventDefault();

  // Check if the fields have values
  if (
    contactProject.value === "" ||
    contactName.value === "" ||
    contactEmail.value === ""
  ) {
    // Add and remove color
    contactMessage.classList.remove("contact-blue");
    contactMessage.classList.add("contact-red");

    // Show message
    contactMessage.textContent = "Please fill in all fields.";
  } else {
    // Send the email
    emailjs
      .sendForm(
        "service_s0vfu9e", // Your Service ID
        "template_9umwdfk", // Your Template ID
        "#contact-form", // Your form selector
        "1ohWDV__PZXKUoxS-" // Your Public Key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response); // Debug success

          // Show success message
          contactMessage.classList.remove("contact-red");
          contactMessage.classList.add("contact-blue");
          contactMessage.textContent = "Message sent successfully!";

          // Clear the form after 5 seconds
          setTimeout(() => {
            contactMessage.textContent = "";
            contactForm.reset();
          }, 5000);
        },
        (error) => {
          console.error("Failed to send email:", error); // Debug error

          // Show error message
          contactMessage.classList.remove("contact-blue");
          contactMessage.classList.add("contact-red");
          contactMessage.textContent =
            "Failed to send message. Please try again.";
        }
      );
  }
};

// Clear validation message on input
[contactName, contactEmail, contactProject].forEach((field) => {
  field.addEventListener("input", () => {
    contactMessage.textContent = "";
    contactMessage.classList.remove("contact-red");
  });
});

// Add event listener to the form
contactForm.addEventListener("submit", sendEmail);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");
    const sectionsClass = document.querySelector(
      ".nav_menu a[href*=" + sectionId + "]"
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  if (this.scrollY >= 350) {
    scrollUp.classList.add("show-scroll");
  } else {
    scrollUp.classList.remove("show-scroll");
  }
};
window.addEventListener("scroll", scrollUp);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";
// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) {
    header.classList.add("bg-header");
  } else {
    header.classList.remove("bg-header");
  }
};
window.addEventListener("scroll", scrollHeader);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true,
});

sr.reveal(
  `.home_data, .projects_container, .testimonial_container, .footer_container`
);
sr.reveal(`.home_info div`, { delay: 200, origin: "bottom", interval: 50 });
sr.reveal(`.skills_content:nth-child(1), .contact_content:nth-child(1)`, {
  origin: "left",
});
sr.reveal(`.skills_content:nth-child(2), .contact_content:nth-child(2)`, {
  origin: "right",
});
sr.reveal(`.education_content, .services_card`, { interval: 100 });
sr.reveal(`.about_container`, { interval: 100 });

const typingEffectElement = document.getElementById("typing-effect");
const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typingEffectElement.textContent = currentRole.substring(0, charIndex--);
  } else {
    typingEffectElement.textContent = currentRole.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000); // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length; // Move to the next role
    setTimeout(typeEffect, 500); // Pause before typing the next role
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100); // Typing and deleting speed
  }
}

// Start the typing effect
typeEffect();

// Add ripple effect to the button
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = `${e.clientX - button.offsetLeft}px`;
    ripple.style.top = `${e.clientY - button.offsetTop}px`;
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600); // Remove ripple after animation
  });
});
