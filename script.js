document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const skillSections = document.querySelectorAll(".skills-grid");

    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove 'active' class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Hide all skill sections
            skillSections.forEach(section => section.classList.remove("active"));

            // Get selected category and show its skills
            const category = this.getAttribute("data-category");
            document.getElementById(category).classList.add("active");
        });
    });
});


