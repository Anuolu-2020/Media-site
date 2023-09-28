import {
  songLinks,
  albumLinks,
  otherLinks,
  topSongTitle,
  songArtists,
  albumArtists,
  albumName,
} from "./links.js";

console.log(songLinks.reason, albumLinks.trenchToTriumph);

let profile_pic = document.getElementById("profile-img");
profile_pic.src = otherLinks.profile_pic;

let settingsImg = document.getElementById("settings-profile");
settingsImg.src = otherLinks.profile_pic;

let songCards = document.querySelectorAll(".songCover");
let albumsCards = document.querySelectorAll(".albumCover");
let topSongNames = document.querySelectorAll(".topSongsName");
let topSongsArtist = document.querySelectorAll(".topSongsArtist");
let albumsNameTxt = document.querySelectorAll(".albumName");
let albumArtistTxt = document.querySelectorAll(".albumArtist");

let topSongs = [
  songLinks.workOfArt,
  songLinks.Ngozi,
  songLinks.modupe,
  songLinks.charm,
  songLinks.reason,
];

let topSongTitles = [
  topSongTitle.num1,
  topSongTitle.num2,
  topSongTitle.num3,
  topSongTitle.num4,
  topSongTitle.num5,
];

let topSongArtist = [
  songArtists.art2,
  songArtists.art4,
  songArtists.art3,
  songArtists.art1,
  songArtists.art7,
];

let albums = [
  albumLinks.trenchToTriumph,
  albumLinks.thyKingdomCome,
  albumLinks.timeless,
  albumLinks.boyAlone,
  albumLinks.raveRoses,
];

let albumNames = [
  albumName.num1,
  albumName.num2,
  albumName.num3,
  albumName.num4,
  albumName.num5,
];

let albumsArtist = [
  albumArtists.num1,
  albumArtists.num2,
  albumArtists.num3,
  albumArtists.num4,
  albumArtists.num5,
];
songCards.forEach((card, idx) => {
  card.src = `${topSongs[idx]}`;
});

topSongNames.forEach((name, idx) => {
  name.innerHTML = topSongTitles[idx];
});

topSongsArtist.forEach((artist, idx) => {
  artist.innerHTML = topSongArtist[idx];
});

albumsCards.forEach((albumCard, idx) => {
  albumCard.src = `${albums[idx]}`;
});

albumsNameTxt.forEach((albumname, idx) => {
  albumname.innerHTML = albumNames[idx];
});

albumArtistTxt.forEach((albumArt, idx) => {
  albumArt.innerHTML = albumsArtist[idx];
});

function sidebarCollapse() {
  let sidebarTexts = document.querySelectorAll(".sidebar-text");
  let marginIncrease = document.getElementById("music-page");

  sidebarTexts.forEach(function (sidebarText) {
    if (sidebarText.style.display === "none") {
      sidebarText.style.display = "flex";
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

function mobileSearchBar() {
  let searchInput = document.getElementById("mobile-search-input");
  if (searchInput.style.display === "none") {
    searchInput.style.display = "flex";
  } else {
    searchInput.style.display = "none";
  }
}
document.getElementById("profile-img").addEventListener("click", profileToggle);
document.getElementById("main-menu").addEventListener("click", sidebarCollapse);
document
  .getElementById("mobile-searchbar")
  .addEventListener("click", mobileSearchBar);
