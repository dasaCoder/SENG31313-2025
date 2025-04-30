// main.js
AOS.init({
  duration: 1000,
  once: true,
});

gsap.registerPlugin(ScrollTrigger);

gsap.from(".home-content h1", {
  scrollTrigger: ".home-content h1",
  opacity: 0,
  y: 50,
  duration: 1,
});
