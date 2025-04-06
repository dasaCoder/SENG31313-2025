const titles = [
    "I am a Software Engineer",
    "I am a Full-Stack Developer",
    "I am a Devops Engineer"
];

let index = 0;
let charIndex = 0;
const heroTitle = document.getElementById("hero-title");

function typeTitle() {
    if (charIndex < titles[index].length) {
        heroTitle.innerHTML = titles[index].slice(0, charIndex + 1) + "|";
        charIndex++;
        setTimeout(typeTitle, 100);
    } else {
        setTimeout(eraseTitle, 2000);
    }
}

function eraseTitle() {
    if (charIndex > 0) {
        heroTitle.innerHTML = titles[index].slice(0, charIndex - 1) + "|";
        charIndex--;
        setTimeout(eraseTitle, 50);
    } else {
        index = (index + 1) % titles.length;
        setTimeout(typeTitle, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeTitle();
});


const skillData = {
  languages: [
    { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Go", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    { name: "C", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "C++", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
],

frameworks: [
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Spring Boot", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Express", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Bootstrap", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Tailwind CSS", img: "https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" }
],
tools: [
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "VS Code", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Postman", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "IntelliJ IDEA", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" },
  { name: "Figma", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
],

technologies: [
  { name: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "AWS", img: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png" },
  { name: "Kubernetes", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Jenkins", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" }
]

};

const tabs = document.querySelectorAll(".skill-tab");
const displayContainer = document.getElementById("skill-display");

function renderSkills(type) {
    displayContainer.innerHTML = "";
    skillData[type].forEach(skill => {
        const card = document.createElement("div");
        card.className = "skill-card";
        card.innerHTML = `
            <img src="${skill.img}" alt="${skill.name}" />
            <p>${skill.name}</p>
        `;
        displayContainer.appendChild(card);
    });
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelector(".skill-tab.active")?.classList.remove("active");
        tab.classList.add("active");
        renderSkills(tab.dataset.skill);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    renderSkills("languages");
});


// Fade-in animation on scroll
const fadeElements = document.querySelectorAll(".fade-on-scroll");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

fadeElements.forEach(el => observer.observe(el));



//project section 
const projects = [
  {
    title: "Financial Expense Tracker",
    description: "A platform to track your financial expenses using React, CSS, Spring Boot, and MySQL.",
    image: "assert/financeTracker.jpg",
    github: "https://github.com/yourname/notes-app"
  },
  {
    title: "Fuel Management System",
    description: "A system to help manage people's fuel usage using React, Tailwind CSS, Spring Boot, and MySQL.",
    image: "assert/fuelmanagment.jpg",
    github: "https://github.com/lakshitha779988/Fuel-Management-System"
  },
  {
    title: "E-Life",
    description: "An e-commerce platform for selling mobile accessories and listing service providers using HTML, CSS, JavaScript, PHP, and MySQL.",
    image: "assert/techtrove.jpg",
    github: "https://github.com/lakshitha779988/TechTrove"
  },
  {
    title: "YouTube Video Downloader",
    description: "A Python CLI application for downloading YouTube videos.",
    image: "assert/youtube_downloader.png",
    github: "https://github.com/lakshitha779988/YoutubeVedioDownloader-python"
  },
  {
    title: "Turtle Race",
    description: "A simple racing game built with Python using the Turtle graphics library.",
    image: "assert/turtle_race.jpg",
    github: "https://github.com/lakshitha779988/TurtleRace-python"
  },
  {
    title: "Snake Game",
    description: "The classic Snake game recreated using Python and the Turtle graphics library.",
    image: "assert/snake_game.jpg",
    github: "https://github.com/lakshitha779988/SnakeGame-python"
  },
  {
    title: "To-Do Application",
    description: "A simple to-do list app built with HTML, CSS, and JavaScript.",
    image: "assert/todo.jpg",
    github: "https://github.com/lakshitha779988/To-Do-List"
  },
  {
    title: "YouTube Clone",
    description: "A front-end clone of YouTube built using HTML, CSS, and JavaScript.",
    image: "assert/youtube_clone.jpg",
    github: "https://github.com/lakshitha779988/Youtube-clone"
  },
  {
    title: "XORA – SaaS Landing Page",
    description: "A responsive SaaS landing page built using React and Tailwind CSS.",
    image: "assert/Xora.jpg",
    github: "https://github.com/lakshitha779988/saas_landing_page"
  },
  {
    title: "Nike Landing Page",
    description: "A visually appealing Nike brand landing page created with React and Tailwind CSS.",
    image: "assert/nike.jpg",
    github: "https://nikelakshitha.netlify.app/"
  },
  {
    title: "Friends Land",
    description: "A social web application for creating, updating, and deleting posts by multiple users. Built with React (TypeScript), MongoDB, Clerk, and Express.js.",
    image: "assert/friends_land.jpg",
    github: "https://friends-land.web.app/"
  }
];

  
  const projectGrid = document.getElementById("projectGrid");
  
  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card");
  
    card.innerHTML = `
      <div class="project-img">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.github}" target="_blank" class="git-link">View Code</a>
      </div>
    `;
  
    projectGrid.appendChild(card);
  });
  
  //Article section

  const articles = [
    {
      title: "Start Development With Go Lang",
      date: "March 10, 2025",
      description: "A beginner-friendly guide to getting started with Go (Golang), covering its syntax, use cases, and how it differs from other languages.",
      image: "assert/go.png",
      link: "https://medium.com/@lakshitha779988/start-development-with-go-lang-670937f8f7e2"
    },
    {
      title: "React Components",
      date: "February 25, 2025",
      description: "An in-depth look at React components, how they work, and how to build reusable UI elements efficiently with examples.",
      image: "assert/react_componet.png",
      link: "https://medium.com/@lakshitha779988/react-components-28cf83e87ef0"
    },
    {
      title: "Understanding the Technology Behind React",
      date: "January 18, 2025",
      description: "Explore the core concepts and internal workings of React, including the virtual DOM, JSX, and component lifecycle.",
      image: "assert/react.png",
      link: "https://medium.com/@lakshitha779988/understanding-the-technology-behind-react-db3338aebec3"
    }
  ];
  
  const articleGrid = document.getElementById("articleGrid");
  
  articles.forEach(article => {
    const card = document.createElement("div");
    card.classList.add("article-card");
  
    card.innerHTML = `
      <div class="article-img">
        <img src="${article.image}" alt="${article.title}">
      </div>
      <div class="article-content">
        <h3>${article.title}</h3>
        <div class="date">${article.date}</div>
        <p>${article.description}</p>
        <a href="${article.link}" target="_blank">Read More</a>
      </div>
    `;
  
    articleGrid.appendChild(card);
  });
  

  //light mode dark mode 
  // Function to toggle between dark and light mode
const toggleMode = () => {
    const bodyElement = document.body;
    if (bodyElement.classList.contains('dark-mode')) {
        bodyElement.classList.remove('dark-mode');
        bodyElement.classList.add('light-mode');
    } else {
        bodyElement.classList.remove('light-mode');
        bodyElement.classList.add('dark-mode');
    }
};

// Event listener to toggle dark/light mode when the button is clicked
document.getElementById('mode-toggle-button').addEventListener('click', toggleMode);
