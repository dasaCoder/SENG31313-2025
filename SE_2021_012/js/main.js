const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const yearElement = document.getElementById('year');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

yearElement.textContent = new Date().getFullYear();

filterButtons.forEach(button => {
    button.addEventListener('click', () => {

        filterButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

projectItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.closest('.project-link')) {
            e.preventDefault();
            const projectTitle = item.querySelector('h3').textContent;
            const projectDescription = item.querySelector('p').textContent;

            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <h2>${projectTitle}</h2>
                <p>${projectDescription}</p>
                <p>This is a detailed view of the project. In a real implementation, you would load more details here, possibly from a JSON file or API.</p>
                <div class="project-images">
                    <img src="images/project1.jpg" alt="Project Screenshot">
                    <img src="images/project2.jpg" alt="Project Screenshot">
                </div>
                <div class="project-actions">
                    <a href="#" class="btn btn-primary">Live Demo</a>
                    <a href="#" class="btn btn-secondary">View Code</a>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

if (document.getElementById('particles-js')) {
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('Particles.js loaded');
    });
}

const skillItems = document.querySelectorAll('.skill-item');
const animateSkills = () => {
    skillItems.forEach(item => {
        const progress = item.querySelector('.progress');
        const width = progress.style.width;
        progress.style.width = '0';

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                progress.style.width = width;
                observer.unobserve(item);
            }
        });

        observer.observe(item);
    });
};

if (skillItems.length > 0) {
    animateSkills();
}

document.addEventListener('scroll', () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollableHeight) * 100;
    document.getElementById('scroll-down-btn').style.setProperty('--progress', `${scrollProgress}%`);
});

document.querySelector('.scroll-down').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
});