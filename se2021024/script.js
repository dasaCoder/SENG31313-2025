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