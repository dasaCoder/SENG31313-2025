let words=document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters=word.textContent.split("")
    console.log(letters)
    word.textContent=""
    letters.forEach((letter)=>{
        let span=document.createElement("span")
        span.textContent=letter
        span.className="letter"
        word.append(span)

    })
})


let currentWordIndex=0;
let maxWordIndex=words.length-1;
words[currentWordIndex].style.opacity="1"


let changeText=()=>{
    let currentWord=words[currentWordIndex];
    let nextWord=currentWordIndex==maxWordIndex?words[0]:words[currentWordIndex+1]

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className="letter out"
        },i*80)
    })
    nextWord.style.opacity="1"
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className="letter out"
        setTimeout(()=>{
            letter.className="letter in"
        },340+i*80)
    })

  currentWordIndex=currentWordIndex==maxWordIndex?0:currentWordIndex+1

}
changeText()
setInterval(changeText,3000)



const circles=document.querySelectorAll(".circle");
circles.forEach(elem=>{
    var dots=elem.getAttribute("data-dots")
    var marked=elem.getAttribute("data-percent")
    var percent=Math.floor(dots*marked/100)
    var points=""
    var rotate=360/dots

    for(let i=0;i<dots;i++){
        points+=`<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`
    }
    elem.innerHTML=points
    const pointsMarked=elem.querySelectorAll(".points")
    for(let i=0;i<percent;i++){
        pointsMarked[i].classList.add('marked')
    }
})

//mix it up portfolio section
var mixer=mixitup('.portfolio-gallery')


//active menu
let menuLi=document.querySelectorAll("header ul li a")
let section=document.querySelectorAll("section")

function activeMenu(){
    let len=section.length;
    while(--len && window.scrollY +97 <section[len].offsetTop){
        menuLi.forEach(sec=>sec.classList.remove("active"));
        menuLi[len-1].classList.add("active");
    }
}


window.addEventListener("scroll",activeMenu)
activeMenu()

//sticky navbar

const header=document.querySelector("header")
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",this.window.scrollY>50)
})


//toggle icon navbar
let menuIcon=document.querySelector("#menu-icon");
let navlist=document.querySelector(".navlist")

menuIcon.onclick=()=>{
    menuIcon.classList.toggle("bx-x")
    navlist.classList.toggle("open")
}

window.onscroll=()=>{
    menuIcon.classList.remove("bx-x")
    navlist.classList.remove("open")
}

//parallax

const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items")
        }else{
            entry.target.classList.remove("show-items")
        }
    })
})


const scrollScale=document.querySelectorAll(".scroll-scale")
scrollScale.forEach((el)=>observer.observe(el))


const scrollBottom=document.querySelectorAll(".scroll-bottom")
scrollBottom.forEach((el)=>observer.observe(el))


const scrollTop=document.querySelectorAll(".scroll-top")
scrollTop.forEach((el)=>observer.observe(el))



//send Email

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("k4Z7v5eeAT3Qf70yD"); // Replace with your EmailJS user ID

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;

        // EmailJS template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            address: address,
            phone: phone,
            message: message,
        };

        // Send email
        emailjs.send("service_0m4k8f9", "template_o4ly2zl", templateParams)
            .then(response => {
                showToast("Message sent successfully!", "success");
                document.getElementById("contact-form").reset();
            })
            .catch(error => {
                console.error("Error sending email:", error);
                showToast("Failed to send message. Please try again.", "error");
            });

                // Function to show toast message
                function showToast(message, type) {
                    const toastContainer = document.getElementById("toast-container");
                    const toast = document.createElement("div");
                    toast.className = `toast ${type === "error" ? "error" : ""}`;
                    
                    // Create close button
                    const closeBtn = document.createElement("button");
                    closeBtn.className = "close-btn";
                    closeBtn.innerText = "×";
                    closeBtn.onclick = () => {
                        toast.classList.add("fade-out");
                        setTimeout(() => toast.remove(), 500); // Remove after fade-out
                    };
                
                    toast.textContent = message;
                    toast.appendChild(closeBtn); // Add close button to the toast
                    toastContainer.appendChild(toast);
                
                    // Show close button with smooth transition on hover
                    setTimeout(() => toast.classList.add("show"), 10);
                
                    // Automatically remove the toast after 3 seconds
                    setTimeout(() => {
                        toast.classList.add("fade-out");
                        setTimeout(() => toast.remove(), 500);
                    }, 3000);
                }
                
});
    });
