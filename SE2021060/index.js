//togle bar funstion
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Close the mobile menu when clicking outside of it
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    mobileMenu.classList.remove('active');
  }
});

//about section function
function showTab(tabName) {
  let contents = document.querySelectorAll('.tab-content');
  contents.forEach(content => {
    content.style.display = 'none';
  });
  const tab = document.getElementById(tabName);
  tab.style.display = 'block';

  let contentsbutton = document.querySelectorAll('.tab-button');
  contentsbutton.forEach(content => {
    content.classList.remove('active');

  });
  const buttonname = tabName + "Btn";
  const button = document.getElementById(buttonname);
  button.classList.add('active');

}

document.addEventListener('DOMContentLoaded', () => {
  showTab('languages');
});

//email function
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_2l35k38", "template_z4zmuc7", this)
    .then(function () {
      alert("Message sent successfully!");
      document.getElementById("contact-form").reset();
    }, function (error) {
      alert("Failed to send message. Error: " + JSON.stringify(error));
    });
});

(function () {
  emailjs.init("d8eG9GfvXDYoTRI_p");
})();

//header scroll function
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.classList.add('headerScroll')
  } else {
    header.classList.remove('headerScroll')
  }
})




