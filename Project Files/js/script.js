scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach(scroller => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector('.scroller-inner');
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute('aria-hidden', true);
            scrollerInner.appendChild(duplicatedItem);
        })
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const hamMenu = document.querySelector('.hamburger-menu')
    const offScreenNav = document.querySelector('#navbar')
    const navLinks = document.querySelectorAll("#navbar .nav-link");

    hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        offScreenNav.classList.toggle("active");
    });

    // When any nav link is clicked, close menu and reset hamburger
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            offScreenNav.classList.remove("active");
            hamMenu.classList.remove("active");
        });
    });

    window.addEventListener("scroll", () => {
        if (offScreenNav.classList.contains("active")) {
          hamMenu.classList.remove("active");
          offScreenNav.classList.remove("active");
        }
      });
});


const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
