window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

// projecr section - modal
const projectModals = document.querySelectorAll(".projects-model");
const imgCards = document.querySelectorAll(".img-card");
const projectCloseBtns = document.querySelectorAll(".projects-close-btn");

var projectModal = function(modalClicks) {
    projectModals[modalClicks].classList.add("active");
}

imgCards.forEach((imgCard, i) => {
    imgCard.addEventListener("click", () => {
        projectModal(i);
    });
});

projectCloseBtns.forEach((projectCloseBtn) => {
    projectCloseBtn.addEventListener("click", () => {
        projectModals.forEach((projectModalView) => {
            projectModalView.classList.remove("active");
        });
    });
});

// scroll to top button
const scrollTopBtn = document.querySelector(".scrollToTop-btn");

window.addEventListener("scroll", function() {
    scrollTopBtn.classList.toggle("active", window.scrollY > 500);
});

scrollTopBtn.addEventListener("click", ()=> {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// navigation menu  items activate on page scroll
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - 50;
        let id = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
        }
        else {
            document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");
        }
    });
});

//website dark/light theme
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeBtn.classList.toggle("sun");

    updateAboutImage();

    localStorage.setItem("saved-theme", getCurrentTheme());
    localStorage.setItem("saved-icon", getCurrentIcon());
});

const getCurrentTheme = () => document.body.classList.contains("dark-theme") ? "dark" : "light";
const getCurrentIcon = () => themeBtn.classList.contains("sun") ? "sun" : "moon";
const aboutImg = document.querySelector(".about-img img");
const homeImg = document.querySelector(".home-img img");

const updateAboutImage = () => {
    if (document.body.classList.contains("dark-theme")) {
        aboutImg.src = "images/about-dark2.png";
        homeImg.src = "images/home-dark.png";
    } else {
        aboutImg.src = "images/about-light.png";
        homeImg.src = "images/home-light.png";
    }
};

const savedTheme = localStorage.getItem("saved-theme");
const savedIcon = localStorage.getItem("saved-icon");

if (savedTheme) {
    document.body.classList[savedTheme === "dark" ? "add" : "remove"]("dark-theme");
    themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("sun");

    updateAboutImage();
}

//responsive nativation menu
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-items a");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navigation.classList.remove("active");
    });
});

// Get the form and success message elements
const contactForm = document.querySelector('.contact-form');
const successMessage = document.getElementById('successMessage');

// Add form submit event listener
contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Show success message
    successMessage.classList.add('active');

    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('active');
    }, 5000);

    // Reset form
    contactForm.reset();
});

//scroll reveal animation
ScrollReveal({ 
    reset: true,
    distance: '60px',
    duration: 2500,
    delay: 100
});

//Targeting elements to reveal
ScrollReveal().reveal('.home .info h2, .section-title-01, .section-title-02', {delay: 500, origin: 'left'});
ScrollReveal().reveal('.home .info h3, .home .info p, .about-info .btn', {delay: 600, origin: 'right'});
ScrollReveal().reveal('.home .info .btn', {delay: 700, origin: 'bottom'});
ScrollReveal().reveal('.media-icons i, .contact-left li', {delay: 500, origin: 'left', interval: 200});
ScrollReveal().reveal('.home-img, .about-img', {delay: 500, origin: 'bottom'});
ScrollReveal().reveal('.about .description, .contact-right', {delay: 600, origin: 'right'});
ScrollReveal().reveal('.about .professional-list li', {delay: 500, origin: 'right', interval: 200});
ScrollReveal().reveal('.skills-description, .contact-card, .contact-left h2', {delay: 700, origin: 'left'});
ScrollReveal().reveal('.education, .projects .img-card', {delay: 800, origin: 'bootom', interval: 200});
ScrollReveal().reveal('.footer-container, .footer-copyright', {delay: 500, origin: 'top', interval: 200});




