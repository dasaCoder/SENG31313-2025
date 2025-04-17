// page loader scripts

window.addEventListener("load",()=>{
  document.querySelector(".main").classList.remove("hidden");
  const initialHash = window.location.hash ;
  document.querySelector(initialHash).classList.add("active");
    //  page loader

  document.querySelector(".page-loader").classList.add("fade-out");
  setTimeout(()=>{
    document.querySelector(".page-loader").style.display = "none";
  },500);
});


// toggle header menue(burger) scripts
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click",()=>{
  hideSection();
  toggleNavbar();
  document.body.classList.toggle("hide-scrolling");
});

function hideSection(){
  document.querySelector("section.active").classList.toggle("fade-out");
}

function toggleNavbar(){
  document.querySelector(".header").classList.toggle("active");
}


// Active sections

document.addEventListener("click",(e)=>{
  if(e.target.classList.contains("link-item")&& e.target.hash !==""){
   
  //  this overlay for prevent multiple clicks
    document.querySelector(".overlay").classList.add("active");
    navToggler.classList.add("hide")
    if(e.target.classList.contains("nav-item")){
          toggleNavbar();
    }
    else{
          hideSection();
          document.body.classList.add("hide-scrolling");
    }
    const targetHash = e.target.hash;

    setTimeout(()=>{
      
      document.querySelector("section.active").classList.remove("active", "fade-out");
      document.querySelector(targetHash).classList.add("active");
      
      // Push to browser history
      history.pushState({ section: targetHash }, "", targetHash);
    
      window.scrollTo(0, 0);
      document.body.classList.remove("hide-scrolling");
      navToggler.classList.remove("hide");
      document.querySelector(".overlay").classList.remove("active");
    },500);
    
  }
})

//  About Tabs script


const tabsContainer = document.querySelector('.about-tabs');
aboutSection = document.querySelector('.about-section');


tabsContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('tab-item') && !e.target.classList.contains('active')){
 
    tabsContainer.querySelector('.active').classList.remove( 'active');
    e.target.classList.add('active');
    
    const target = e.target.getAttribute('data-target');
    
    aboutSection.querySelector('.tab-content.active').classList.remove('active');
    aboutSection.querySelector(target).classList.add('active');
  }

});

// portfolio popup scripts

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('view-project-btn')){
    togglePortfolioPopup();
    document.querySelector('.portfolio-popup').scrollTo(0, 0);
    portfolioItemDetails(e.target.parentElement);
  }
})




function togglePortfolioPopup(){
  document.querySelector('.portfolio-popup').classList.toggle('open');
  document.body.classList.toggle('hide-scrolling');
  document.querySelector('.main').classList.toggle('fade-out');
}

// hide popup when clicking outside of it
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('pp-inner')){
    togglePortfolioPopup();
  }
})

function portfolioItemDetails(portfolioItem){

    document.querySelector('.pp-thumbnail img').src = 
    portfolioItem.querySelector('.portfolio-item-thumbnail img').src;

    document.querySelector('.pp-header h3').innerHTML =
    portfolioItem.querySelector('.portfolio-item-title').innerHTML;
  
    document.querySelector('.pp-body').innerHTML =
    portfolioItem.querySelector('.portfolio-item-details').innerHTML;
}

document.querySelector('.pp-close').addEventListener('click', togglePortfolioPopup);


//navigation functionality for browser ///////////////////////////////////////////////

window.addEventListener("popstate", () => {
  const sectionId = window.location.hash || "#home";
  const current = document.querySelector("section.active");
  const next = document.querySelector(sectionId);

  if (!next || current === next) return;

  document.querySelector(".overlay").classList.add("active");
  document.body.classList.add("hide-scrolling");
  
  current.classList.add("fade-out");

  setTimeout(() => {
    current.classList.remove("active", "fade-out");
    next.classList.add("active");

    window.scrollTo(0, 0);
    document.body.classList.remove("hide-scrolling");
    document.querySelector(".overlay").classList.remove("active");
  }, 500);
});
