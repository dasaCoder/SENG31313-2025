
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname, event) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");
function openmenu() {
    sidemenu.style.right = "0";
    document.body.style.overflow = "hidden";
}
function closemenu() {
    sidemenu.style.right = "-200px";
    document.body.style.overflow = "auto";
}

document.addEventListener('click', function (event) {
    if (!event.target.closest('#sidemenu') && !event.target.closest('.fa-bars') && window.innerWidth <= 600) {
        closemenu();
    }
});



const scriptURL = 'https://script.google.com/macros/s/AKfycbw48HtB4twhHFgt9AJZOU1L-T0bf6q3Wjz9iwhJ55O7EO8Gq3PYfOPzG_G2OlwBYOnJ/exec'
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Show loading state on button only
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            // Success handling
            msg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            msg.style.display = "block";
            msg.style.color = "#fff";
            msg.style.background = "#4CAF50";
            
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                msg.style.display = "none";
            }, 5000);
        })
        .catch(error => {
            // Error handling
            msg.innerHTML = '<i class="fas fa-times-circle"></i> Failed to send message. Please try again.';
            msg.style.display = "block";
            msg.style.color = "#fff";
            msg.style.background = "#ff004f";
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            console.error('Error!', error.message);
        });
});