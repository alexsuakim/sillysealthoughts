// Get all nav links
const navLinks = document.querySelectorAll('nav a');

// Loop through all links and add 'active' class to the current page
navLinks.forEach(link => {
  const linkPath = link.getAttribute('href');
  
  // Check if the link's path matches the current page's path
  if (window.location.pathname === linkPath || window.location.pathname.startsWith(linkPath + '/')) {
    link.classList.add('active');
  }
});
