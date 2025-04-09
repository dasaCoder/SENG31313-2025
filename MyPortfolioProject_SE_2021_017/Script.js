const video1=document.getElementById('projectVideo1');
const video2=document.getElementById('projectVideo2');
const video3=document.getElementById('projectVideo3');
const hoverSign=document.querySelector('.hover-sign');

//sidebar elements//
const sidebar=document.querySelector('.sidebar');
const menu=document.querySelector('.menu-icon');
const close=document.querySelector('.close-icon');

const videoList=[video1,video2,video3];

videoList.forEach(function(video){

    video.addEventListener('mouseover',function(){
        video.muted = true;
        video.play();
        hoverSign.classList.add('hover-sign-active');

    })
    video.addEventListener('mouseout',function(){
        video.pause();
        hoverSign.classList.remove('hover-sign-active');
    })
})

//sidebar elements//
menu.addEventListener('click',function(){
    sidebar.classList.remove('close-sidebar');
    sidebar.classList.add('open-sidebar');
})

close.addEventListener('click',function(){
    sidebar.classList.remove('open-sidebar');
    sidebar.classList.add('close-sidebar');
    
})

// Initialize EmailJS with your public API key
emailjs.init("2r67Y-xnEYZ27p4Je"); // Replace with your actual public API key

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission from reloading the page
  
  // Get form values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Prepare data for the email template
  var templateParams = {
    name: name,
    email: email,
    message: message
  };

  // Send email using EmailJS
  emailjs.send("service_y4bsx9i", "template_qm50ccs", templateParams)
    .then(function(response) {
      console.log("Success:", response);
      alert("Your message has been sent successfully!");
    }, function(error) {
      console.log("Error:", error);
      alert("Failed to send message. Please try again.");
    });
});
