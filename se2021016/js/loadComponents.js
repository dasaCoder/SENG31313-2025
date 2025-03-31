function loadHTML(id, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Load header and footer dynamically
loadHTML("header-container", "../common/header.html"); 
loadHTML("footer-container", "../common/footer.html");  