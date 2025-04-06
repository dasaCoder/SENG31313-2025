
document.getElementById("menu-toggle").addEventListener("click", function() {
    let navLinks = document.getElementById("nav-links");
    navLinks.style.display = (navLinks.style.display === "flex") ? "none" : "flex";
});


const text = "I am Thanoogithan, a Full Stack Developer & ML Enthusiast.";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.querySelector(".animated-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}
window.onload = typeEffect;

  