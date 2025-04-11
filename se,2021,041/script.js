var hamburger = document.querySelector(".hamb");
var navlist = document.querySelector(".nav-list");
var links = document.querySelector(".nav-list li");

hamburger.addEventListener("click",function(){
    this.classList.toggle("click");
    navlist.classList.toggle("open");
});


var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link")
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab")
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}

document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            header.classList.add('header-bg');
        } else {
            header.classList.remove('header-bg');
        }
    });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzEGYnFRTBRJDwbzvTTfEvR67aUbn15PnzGup2_o4CDSiWnva_yzFEV0RQAUqlAwWUu/exec'
  const form = document.forms['submit-to-google-sheet']

  const msg = document.getElementById('msg');

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML="Message sent successfully!";
        setTimeout(function(){
            msg.innerHTML=""
        },5000)
        form.reset();
      }
        
        )
      .catch(error => console.error('Error!', error.message))
  })

  document.addEventListener('DOMContentLoaded', function () {
    var mainText = document.querySelector('.main-text');
    mainText.classList.add('loaded');
});