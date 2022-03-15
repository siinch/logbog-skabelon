// Navigation bar Javascript
// find the topnav object
let topnav = document.getElementById("topnav");

// add responsiveness to the topnav
let dropDownButton = document.createElement("a");
href="javascript:void(0);"
dropDownButton.className += "icon";
dropDownButton.onclick = collapseTopNav;
dropDownButton.innerHTML = "<i class='fa fa-bars'></i>";
topnav.appendChild(dropDownButton);

function collapseTopNav() {
    if (!topnav.classList.contains("responsive")) {
      topnav.classList.add("responsive");
    } else {
      topnav.classList.remove("responsive");
    }
  }

  // When the user scrolls the page, execute myFunction
window.onscroll = followTopNav;

// Get the offset position of the navbar
var sticky = topnav.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function followTopNav() {
  if (window.pageYOffset >= sticky) {
    topnav.classList.add("sticky")
  } else {
    topnav.classList.remove("sticky");
  }
} 