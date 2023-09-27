import { songLinks, name, otherLinks } from "./links.js";

console.log(songLinks.reason, name);

let profile_pic = document.getElementById("profile-img");
profile_pic.src = otherLinks.profile_pic;

let settingsImg = document.getElementById("settings-profile");
settingsImg.src = otherLinks.profile_pic;

let songCards = document.querySelectorAll(".card");

songCards.forEach((card) => {
  card.style.backgroundImage = `url(${songLinks.workOfArt})`;
});

function sidebarCollapse() {
  let sidebarTexts = document.querySelectorAll(".sidebar-text");
  let marginIncrease = document.getElementById("music-page");
  // const currentMargin = window.getComputedStyle(marginIncrease).marginLeft;
  // const newMargin = parseInt(currentMargin) + 20 + "px";
  sidebarTexts.forEach(function (sidebarText) {
    if (sidebarText.style.display === "none") {
      sidebarText.style.display = "inline-flex";
      // currentMargin.style.marginLeft = newMargin;
      marginIncrease.style.marginLeft = "180px";
    } else {
      sidebarText.style.display = "none";
      marginIncrease.style.marginLeft = "90px";
    }
  });
}

function profileToggle() {
  let profilebar = document.getElementById("settings-container");
  if (profilebar.style.display === "none") {
    profilebar.style.display = "inline-flex";
  } else {
    profilebar.style.display = "none";
  }
}

document.getElementById("profile-img").addEventListener("click", profileToggle);
document.getElementById("main-menu").addEventListener("click", sidebarCollapse);
