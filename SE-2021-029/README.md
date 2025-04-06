# Imansha Dilshan's Portfolio website

This project implements a responsive webpage with a toggleable navbar, scroll animations, sticky header, and animated footer. It uses HTML, CSS, and JavaScript to achieve the desired functionality and effects.

## Features

- **Navbar Toggle**: The menu icon toggles the navbar visibility, switching between open and closed states.
- **Scroll Effects**: Sections of the page are highlighted and animated based on the scroll position.
- **Sticky Header**: The header becomes sticky at the top of the page when scrolling down.
- **Footer Animation**: The footer appears with an animation when the user reaches the bottom of the page.
  
## File Structure

/project-folder ├── index.html ├── style.css ├── script.js └── README.md


## Installation

1. Clone or download the repository.

Usage
Click the menu icon (#menu-icon) to toggle the visibility of the navbar.

Scroll through the page to see sections highlighted and animated as you reach them.

The header will become sticky when scrolling down the page.

As you reach the bottom of the page, the footer will animate into view.

Code Breakdown
HTML (index.html)
Navigation Bar: Includes a toggleable menu for mobile responsiveness.

Sections: Different sections of content on the page that are animated on scroll.

Footer: Includes an animated footer that triggers when the user scrolls to the bottom.

CSS (style.css)
Responsive Layout: Ensures that the navbar is hidden on mobile by default and only visible when toggled.

Animations: Smooth transitions and animations are applied to sections and footer when they come into view.

Sticky Header: The header becomes sticky when the user scrolls down beyond 100px.

JavaScript (script.js)
Navbar Toggle: When the menu icon is clicked, the navbar toggles its visibility by adding/removing the active class.

Scroll Effects: Each section is checked during the scroll event, adding and removing the show-animate class based on the scroll position.

Sticky Header: The header becomes sticky when scrolling past 100px.

Footer Animation: The footer is animated when the user scrolls to the bottom of the page.

Dependencies
None. This project uses vanilla HTML, CSS, and JavaScript.

Author
Imansha Dilshan


