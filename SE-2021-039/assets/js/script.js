document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loaded");
});

document.addEventListener("scroll", function () {
    let elements = document.querySelectorAll(".hidden");
    elements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
            el.classList.add("show");
        }
    });
});


window.addEventListener("scroll", function () {
    let parallax = document.querySelector(".parallax");
    let scrollPosition = window.scrollY;
    parallax.style.backgroundPositionY = scrollPosition * 0.5 + "px";
});


// Page Load Animation
window.addEventListener("load", function () {
    document.body.classList.add("loaded");
});

// Reveal Sections on Load
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll(".section");
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add("show");
        }, index * 500); // Delay each section for a cascading effect
    });
});


document.addEventListener("mousemove", function(e) {
    let cursor = document.querySelector(".custom-cursor");
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
});


// Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Get all the skill spans
    const skillItems = document.querySelectorAll('.skills-list span');

    // Loop through each skill item to add event listeners for hover and click
    skillItems.forEach(function(skill) {

        // Hover effect: Display skill name when hovering
        skill.addEventListener('mouseenter', function() {
            const skillText = skill.innerText;
            const skillImage = skill.querySelector('img');
            skill.setAttribute('title', skillText);  // Show skill name on hover
        });

        // Click effect: Show skill description when clicked
        skill.addEventListener('click', function() {
            alert(`You clicked on ${skill.innerText}!`);
            // You can replace the alert with more complex functionality like showing more details about the skill.
        });
    });

});

document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".skills-category");
    const categoryTitles = document.querySelectorAll(".category-title");

    // Scroll Animation - Fade in Categories
    function handleScroll() {
        categories.forEach((category) => {
            const categoryTop = category.getBoundingClientRect().top;
            if (categoryTop < window.innerHeight - 100) {
                category.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on page load in case some categories are already in view

    // Toggle Skill Lists on Click
    categoryTitles.forEach((title) => {
        title.addEventListener("click", function () {
            const skillList = this.nextElementSibling;
            if (skillList.style.maxHeight) {
                skillList.style.maxHeight = null;
            } else {
                skillList.style.maxHeight = skillList.scrollHeight + "px";
            }
        });
    });
});
