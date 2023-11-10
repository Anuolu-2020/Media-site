import { otherLinks } from "./links.js";

//profile picture
let profile_pic = document.getElementById("profile-img");
profile_pic.src = otherLinks.profile_pic;

//profile picture in settings bar
let settingsImg = document.getElementById("settings-profile");
settingsImg.src = otherLinks.profile_pic;

//sidebar collapse function for library page
function sidebarCollapse() {
  let sidebarTexts = document.querySelectorAll(".sidebar-text");
  let marginIncrease = document.getElementById("libraryPage");

  sidebarTexts.forEach(function (sidebarText) {
    if (sidebarText.style.display === "none") {
      sidebarText.style.display = "flex";
      //   marginIncrease.style.marginLeft = "180px";
    } else {
      sidebarText.style.display = "none";
      //   marginIncrease.style.marginLeft = "90px";
    }
  });
}

//profile icon to show settings bar function
function profileToggle() {
  let profilebar = document.getElementById("settings-container");
  if (profilebar.style.display === "none") {
    profilebar.style.display = "inline-flex";
  } else {
    profilebar.style.display = "none";
  }
}

//search bar icon for mobile view function
function mobileSearchBar() {
  let searchInput = document.getElementById("mobile-search-input");
  if (searchInput.style.display === "none") {
    searchInput.style.display = "flex";
  } else {
    searchInput.style.display = "none";
  }
}

//Event listners for sidebar, profile icon and mobile search bar
document.getElementById("profile-img").addEventListener("click", profileToggle);
document.getElementById("main-menu").addEventListener("click", sidebarCollapse);
//For mobile searchbar
document
  .getElementById("mobile-searchbar")
  .addEventListener("click", mobileSearchBar);
