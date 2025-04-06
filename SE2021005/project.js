document.getElementById("projectFilter").addEventListener("change", function () {
    let selectedCategory = this.value;
    let projects = document.querySelectorAll(".project");

    projects.forEach(project => {
        if (selectedCategory === "all" || project.classList.contains(selectedCategory)) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });

    updateShowMoreButton();
});

// this section for future uses if i will make more project this will help me.
let showMoreBtn = document.createElement("button");
showMoreBtn.id = "showMoreBtn";
showMoreBtn.innerText = "Show More";
document.querySelector(".container").appendChild(showMoreBtn);

function updateShowMoreButton() {
    let projects = document.querySelectorAll(".project");
    let visibleProjects = [...projects].filter(p => p.style.display !== "none");


    visibleProjects.forEach((project, index) => {
        project.style.display = index < 6 ? "block" : "none";
    });

    
    if (visibleProjects.length > 6) {
        showMoreBtn.style.display = "block";
    } else {
        showMoreBtn.style.display = "none";
    }
}


showMoreBtn.addEventListener("click", function () {
    document.querySelectorAll(".project").forEach(project => {
        project.style.display = "block";
    });
    showMoreBtn.style.display = "none";
});

document.getElementById("projectFilter").dispatchEvent(new Event("change"));

  