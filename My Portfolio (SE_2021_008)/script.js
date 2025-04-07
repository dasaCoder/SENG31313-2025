//taggle icon navbar
let menuIcon = document.querySelector("#menu-btn");  
let navbar = document.querySelector(".navbar");
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
}



//scroll sections
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove("active");
        document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
      });
      //active section for animation on scroll
      sec.classList.add("show-animate");
    }
    else {
      sec.classList.remove("show-animate");
    }
  });

  //sticky header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);


//remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

//animation footer on scroll
 let footer = document.querySelector("footer");

 footer.classList.toggle("show-animate", this.innerHeight + this.scrollY >=document.scrollingElement.scrollHeight );

}


// contact form submission

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent default to wait for the fetch

  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData
  })
  .then(response => {
    if (response.ok) {
      alert("Message sent successfully!");
      form.reset(); // ✅ clear all fields
    } else {
      alert("Failed to send. Try again!");
    }
  })
  .catch(error => {
    alert("Error submitting the form.");
    console.error(error);
  });
});