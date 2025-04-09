let navMenu = document.getElementById('navMenu'); 
let toggleBtn = document.getElementById('toggleBtn');

function myMenuFunction() {
  if (navMenu.className == 'nav-menu') {
    navMenu.className += ' responsive';
    toggleBtn.className = 'uil uil-multiply';
  } else {
    navMenu.className = 'nav-menu';
    toggleBtn.className = 'uil uil-bars';
  }
}

function closeMenu() {
  navMenu.className = 'nav-menu';
}

let navLinks = document.querySelectorAll('.nav-link');

function hideNav() {
  navMenu.className = 'nav-menu';
  toggleBtn.className = 'uil uil-bars';
}

navLinks.forEach(link => {
  link.addEventListener('click', hideNav);
});

window.addEventListener('scroll', headerShadow);
window.onload = headerShadow;

function headerShadow() {
  const navHeader = document.getElementById('header');

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = '0 4px 10px #000000BB';
    navHeader.style.height = '70px';
    navHeader.style.lineHeight = '70px';
    navHeader.style.background = '#00000078';
    navHeader.style.backdropFilter = 'blur(10px)';
  } else {
    navHeader.style.boxShadow = 'none';
    navHeader.style.height = '90px';
    navHeader.style.lineHeight = '90px';
    navHeader.style.background = '#000000';
    navHeader.style.backdropFilter = 'blur(0px)';
  }
}

const sr = ScrollReveal({
    origin:'top',
    distance:'75px',
    duration:1650,
    reset:false
})

sr.reveal('.featured-name',{delay:50})
sr.reveal('.featured-text-info',{delay:50})
sr.reveal('.featured-text-btn',{delay:60})
sr.reveal('.social-icons',{delay:90})

sr.reveal('.project-box',{delay:70})
sr.reveal('.service-box',{delay:70})

sr.reveal('.topheader',{})
sr.reveal('.top-header',{})

const srLeft = ScrollReveal({
  origin:'left',
  distance:'80px',
  duration:1750,
  reset:false
})

srLeft.reveal('.contact-info',{delay:60})
srLeft.reveal('.col-contact-info',{delay:60})

const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 1750,
  reset: false
});

srRight.reveal('.skills-title',{delay:60})
srRight.reveal('.skill-box',{delay:50})
srRight.reveal('.form',{delay:80})
srRight.reveal('.profile-image',{delay:60})

const sections = document.querySelectorAll('section[id]');

function scrollActive(){
  const scrollY = window.scrollY;
  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
    sectionTop = current.offsetTop-100,
    sectionId = current.getAttribute('id');

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      document.querySelector('.' + sectionId).classList.add('active-link');
    }else{
      document.querySelector('.' + sectionId).classList.remove('active-link');
    }
  })
}

window.addEventListener('load',scrollActive);
window.addEventListener('scroll',scrollActive);

const easingFunctions = {
  easeInOutCubic: t => t < 0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
}

let currentEasingFunction = `easeInOutCubic`;

function scrollToTarget(target, offset=0, duration=2000, easingType = currentEasingFunction){
  if(window.scrollAnimation){
    cancelAnimationFrame(window.scrollAnimation);
    window.scrollAnimation = null;
  }

  const targetPosition = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY; 
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition - offset;

  if(Math.abs(distance) < 3){
    window.scrollTo(0, targetPosition-offset);
    return;
  }

  const startTime = performance.now();
  const easingFunction = easingFunctions[easingType] || easingFunctions.easeInOutCubic;

  function scrollAnimation(currentTime){
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFunction(progress);
    const scrollAmount = startPosition + distance * easedProgress;

    window.scroll(0, scrollAmount);

    if(progress < 1){
      window.scrollAnimation = requestAnimationFrame(scrollAnimation);
    } else {
      window.scrollAnimation = null;
    }
  }
  window.scrollAnimation = requestAnimationFrame(scrollAnimation);
}

function scrollToHome(){
  scrollToTarget(0, 0, 2000); 
}

function scrollToAbout(){
  const aboutSection = document.getElementById('about');
  scrollToTarget(aboutSection, 0, 2000);
}

function scrollToServices(){
  const servicesSection = document.getElementById('services');
  scrollToTarget(servicesSection, 0, 2000); 
}

function scrollToContact(){
  const contactSection = document.getElementById('contact');
  scrollToTarget(contactSection, 0, 2000);
}

let blueBtn = document.querySelector('.blue-btn');
blueBtn.addEventListener('click',()=>{
  scrollToContact();
});

// Add this to your main.js file
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Particle settings
  const particles = [];
  const particleCount = 100;
  const particleColor = 'rgba(129, 81, 241, 0.5)'; // Using your accent color
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.5 + 0.1
    });
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Reset particles that go off screen
      if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129, 81, 241, ${p.opacity})`;
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});