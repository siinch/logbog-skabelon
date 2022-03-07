let owner = "Kaj Børge";
// Set title
document.getElementsByTagName("title")[0]
.innerHTML = owner +"s Portfolio";

// Navigation bar Javascript
// find the topnav object
let topnav = document.getElementById("topnav");

// define the tabs
let tabs = [
  {name: owner, href: "index.html", class: "home"},
  {name: "Projects", href: "projects.html"},
  {name: "Notes", href: "notes.html"}
];


// create the tabs
for (let tab of tabs) {
  let newtab = document.createElement("a");
  newtab.innerHTML = tab.name;
  newtab.href = tab.href;
  if(tab.class != undefined)
    newtab.className = tab.class;
  topnav.appendChild(newtab);
}

// add responsiveness to the topnav
let dropDownButton = document.createElement("a");
href="javascript:void(0);"
dropDownButton.className += "icon";
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