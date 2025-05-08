const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("#navbar");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

const typedText = document.querySelector(".typed-text");
if (typedText) {
  const phrases = ["Web Designer", "Full-Stack Developer", "UI/UX Enthusiast"];
  let idx = 0,
    char = 0,
    isDeleting = false,
    delay = 80;

  function type() {
    let current = phrases[idx];
    if (!isDeleting) {
      typedText.textContent = current.substring(0, char + 1);
      char++;
      if (char === current.length) {
        isDeleting = true;
        delay = 1200;
      } else {
        delay = 80;
      }
    } else {
      typedText.textContent = current.substring(0, char - 1);
      char--;
      if (char === 0) {
        isDeleting = false;
        idx = (idx + 1) % phrases.length;
        delay = 400;
      } else {
        delay = 40;
      }
    }
    setTimeout(type, delay);
  }
  type();
}

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for reaching out!");
    this.reset();
  });

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});
