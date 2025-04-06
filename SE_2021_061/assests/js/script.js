document.addEventListener("DOMContentLoaded", () => {
    const positions = [
        { title: "Software Engineer", description: "A passionate Software Engineer with expertise in building scalable and efficient software solutions." },
        { title: "Full Stack Developer", description: "Experienced in both frontend and backend development, creating seamless web applications." },
        { title: "UI/UX Designer", description: "Specialized in crafting intuitive and visually appealing user interfaces and experiences." }
    ];

    const positionElement = document.getElementById("position");
    const descriptionElement = document.getElementById("description");

    let index = 0;

    function updateContent() {
        const { title, description } = positions[index];
        positionElement.textContent = "";
        descriptionElement.textContent = "";

        let charIndex = 0;

        const typingInterval = setInterval(() => {
            if (charIndex < title.length) {
                positionElement.textContent += title[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
                descriptionElement.textContent = description;
                descriptionElement.style.animation = "fadeIn 1s ease-in-out forwards";
                setTimeout(() => {
                    index = (index + 1) % positions.length;
                    updateContent();
                }, 3000); // Wait 3 seconds before switching
            }
        }, 100); // Typing speed
    }

    updateContent();
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-buttons .btn");
    const skillCategories = document.querySelectorAll(".skill-category");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            skillCategories.forEach(skill => {
                if (filter === "all" || skill.classList.contains(filter)) {
                    skill.classList.remove("hidden");
                } else {
                    skill.classList.add("hidden");
                }
            });
        });
    });
});