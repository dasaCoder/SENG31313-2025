// Page Loader Script
window.addEventListener("load", () => {
  document.querySelector(".main")?.classList.remove("hidden");

  const initialHash = window.location.hash || "#home";
  const targetSection = document.querySelector(initialHash);
  if (targetSection) targetSection.classList.add("active");

  document.querySelector(".page-loader")?.classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".page-loader")?.style.setProperty("display", "none");
  }, 500);
});

// Utility Functions
function showOverlay() {
  document.querySelector(".overlay")?.classList.add("active");
  document.body.classList.add("hide-scrolling");
}

function hideOverlay() {
  document.querySelector(".overlay")?.classList.remove("active");
  document.body.classList.remove("hide-scrolling");
}

function navigateToSection(targetHash, updateHistory = true) {
  const current = document.querySelector("section.active");
  const next = document.querySelector(targetHash);

  if (!next || current === next) return;

  showOverlay();
  current?.classList.add("fade-out");

  setTimeout(() => {
    current?.classList.remove("active", "fade-out");
    next.classList.add("active");

    if (updateHistory) {
      history.pushState({ section: targetHash }, "", targetHash);
    }

    window.scrollTo(0, 0);
    hideOverlay();
  }, 500);
}

// Toggle Header Menu (Burger)
const navToggler = document.querySelector(".nav-toggler");
if (navToggler) {
  navToggler.addEventListener("click", () => {
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
  });
}

function hideSection() {
  document.querySelector("section.active")?.classList.toggle("fade-out");
}

function toggleNavbar() {
  document.querySelector(".header")?.classList.toggle("active");
}

// Active Sections
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("link-item") && e.target.hash !== "") {
    const targetHash = e.target.hash;
    const targetSection = document.querySelector(targetHash);
    if (!targetSection) return;

    showOverlay();
    navToggler?.classList.add("hide");

    if (e.target.classList.contains("nav-item")) {
      toggleNavbar();
    } else {
      hideSection();
      document.body.classList.add("hide-scrolling");
    }

    setTimeout(() => {
      navigateToSection(targetHash);
      navToggler?.classList.remove("hide");
    }, 500);
  }
});

// About Tabs Script
const tabsContainer = document.querySelector('.about-tabs');
const aboutSection = document.querySelector('.about-section');

if (tabsContainer && aboutSection) {
  tabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-item') && !e.target.classList.contains('active')) {
      tabsContainer.querySelector('.active')?.classList.remove('active');
      e.target.classList.add('active');

      const target = e.target.getAttribute('data-target');
      if (!target) return;

      aboutSection.querySelector('.tab-content.active')?.classList.remove('active');
      aboutSection.querySelector(target)?.classList.add('active');
    }
  });
}

// Portfolio Popup Script
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('view-project-btn')) {
    const portfolioItem = e.target.closest('.portfolio-item');
    if (!portfolioItem) return;

    togglePortfolioPopup();
    document.querySelector('.portfolio-popup')?.scrollTo(0, 0);
    portfolioItemDetails(portfolioItem);
  }
});

function togglePortfolioPopup() {
  document.querySelector('.portfolio-popup')?.classList.toggle('open');
  document.body.classList.toggle('hide-scrolling');
  document.querySelector('.main')?.classList.toggle('fade-out');
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('pp-inner')) {
    togglePortfolioPopup();
  }
});

function portfolioItemDetails(portfolioItem) {
  const thumbnailImg = portfolioItem.querySelector('.portfolio-item-thumbnail img')?.src;
  const title = portfolioItem.querySelector('.portfolio-item-title')?.innerHTML;
  const details = portfolioItem.querySelector('.portfolio-item-details')?.innerHTML;

  if (thumbnailImg) document.querySelector('.pp-thumbnail img').src = thumbnailImg;
  if (title) document.querySelector('.pp-header h3').innerHTML = title;
  if (details) document.querySelector('.pp-body').innerHTML = details;
}

document.querySelector('.pp-close')?.addEventListener('click', togglePortfolioPopup);

// Browser Navigation (Back/Forward)
window.addEventListener("popstate", () => {
  const sectionId = window.location.hash || "#home";
  navigateToSection(sectionId, false);
});
