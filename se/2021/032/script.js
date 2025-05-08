// Simple fade-in animation for sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const options = {
      threshold: 0.3
    };
  
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);
  
    sections.forEach(section => {
      section.classList.add('hidden');
      observer.observe(section);
    });
  });
  

 
 
  document.addEventListener("DOMContentLoaded", function () {
    const readMoreBtn = document.getElementById("read-more-btn");
    const moreText = document.getElementById("more-text");
  
    readMoreBtn.addEventListener("click", function () {
      if (moreText.style.display === "none") {
        moreText.style.display = "block";
        readMoreBtn.textContent = "Read Less";
      } else {
        moreText.style.display = "none";
        readMoreBtn.textContent = "Read More";
      }
    });
  });

  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form[name='contact']");
    if (form) {
      form.addEventListener("submit", function () {
        alert("Thanks for contacting me! I’ll get back to you soon.");
      });
    }
  });

 
  

