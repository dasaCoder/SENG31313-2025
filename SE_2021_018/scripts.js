// Tab switching
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Side menu open/close
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

// Google Sheet form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbykKK9Vacp-xTCDeL6UACm-Z38voUkSIvf4xx-HGBP4hiDaezpfzQg3dzpDFd5Sy4df/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "Message sent successfully";
                setTimeout(function () {
                    msg.innerHTML = "";
                }, 5000);
                form.reset();
            })
            .catch(error => console.error('Error!', error.message));
    });
}

// Auto-typing title effect
const titles = [
    "💻 DevOps Enthusiast ",
    "🌐 Full Stack Explorer",
    "✍️ Tech Blogger",
    "☁️ Cloud Learner ",
];

let titleIndex = 0;
let charIndex = 0;
const titleElement = document.getElementById('title');
let typing = true;

function typeTitle() {
    if (charIndex < titles[titleIndex].length) {
        titleElement.textContent += titles[titleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeTitle, 100);
    } else {
        setTimeout(deleteTitle, 1000);
    }
}

function deleteTitle() {
    if (charIndex > 0) {
        titleElement.textContent = titleElement.textContent.slice(0, -1);
        charIndex--;
        setTimeout(deleteTitle, 50);
    } else {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeTitle, 1000);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    typeTitle(); // Start typing when DOM is ready
});
