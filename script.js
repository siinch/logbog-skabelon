// Set title
document.getElementsByTagName("title")[0]
.innerHTML = "My Portfolio";

// Navigation bar Javascript
// find the topnav object
let topnav = document.getElementById("topnav");

// define the tabs
let tabs = [
  {name: "Home", href: "index.html"},
  {name: "Projects", href: "projects.html"},
  {name: "Notes", href: "notes.html"}
];


// create the tabs
for (let tab of tabs) {
  let newtab = document.createElement("a");
  newtab.innerHTML = tab.name;
  newtab.href = tab.href; 
  topnav.appendChild(newtab);
}

// add responsiveness to the topnav
let dropDownButton = document.createElement("a");
href="javascript:void(0);"
dropDownButton.className += " icon";
dropDownButton.onclick = collapseTopNav;
dropDownButton.innerHTML = "<i class='fa fa-bars'></i>";
topnav.appendChild(dropDownButton);

function collapseTopNav() {
    if (topnav.className === "topnav") {
      topnav.className += " responsive";
    } else {
      topnav.className = "topnav";
    }
  }

// Accordion Javascript
var acc = document.getElementsByClassName("accordion");
var i;


for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}