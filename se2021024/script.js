var tabs = document.querySelectorAll(".tab");
var contents = document.querySelectorAll(".tab-content");

tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
        tabs.forEach(function(t){
            // Remove 'active' from all tabs
            t.classList.remove("active");
        });
        tab.classList.add("active");

        var target = tab.getAttribute("data-tab");

        //hide all the content
        contents.forEach(function(content){
            content.classList.remove("active");
            content.style.display = "none";
        });

        //show matching content
        var activeContent = document.getElementById(target);
        if(activeContent) {
            activeContent.classList.add("active");
            activeContent.style.display = "flex";
            activeContent.style.justifyContent = "space-between";
        }
    });
});


//Skills
var skill_tabs = document.querySelectorAll(".skill-tab");
var skill_contents = document.querySelectorAll(".skill-tab-content");

skill_tabs.forEach(function(skill_tab){
    skill_tab.addEventListener("click", function(){
        skill_tabs.forEach(function(t){
            // Remove 'active' from all tabs
            t.classList.remove("active");
        });
        skill_tab.classList.add("active");

        var skill_target = skill_tab.getAttribute("skill-data-tab");

        //hide all the content
        skill_contents.forEach(function(skill_content){
            skill_content.classList.remove("active");
            skill_content.style.display = "none";
        });

        //show matching content
        var skill_activeContent = document.getElementById(skill_target);
        if(skill_activeContent) {
            skill_activeContent.classList.add("active");
            skill_activeContent.style.display = "block";
            skill_activeContent.style.justifyContent = "space-between";
        }
    });
});


//Contact
const form = document.querySelector('.contact-form');

  form.addEventListener('submit', function (e) {
    setTimeout(() => {
      form.reset(); // Clears all fields
    }, 1000); // Give a tiny delay to let Formspree catch it
  });



  function showTab(tabId, event) {
    // Remove "active" from all tab buttons
    var project_tabs = document.querySelectorAll(".tab-btn");
    project_tabs.forEach(function(tab){
        tab.classList.remove("active");
    });
    
    // Hide all tab contents
    var project_contents = document.querySelectorAll(".tab-content");
    project_contents.forEach(function(content){
        content.classList.remove("active");
    });

    // Activate selected tab and button
    var selected_tab = document.getElementById(tabId);
    selected_tab.classList.add("active");

    // Highlight the clicked button
    event.currentTarget.classList.add('active');
}

