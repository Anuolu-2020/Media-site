import {
  songLinks,
  albumLinks,
  otherLinks,
  topSongTitle,
  songArtists,
  albumArtists,
  albumName,
  artistImage,
} from "./links.js";

// console.log(songLinks.reason, albumLinks.trenchToTriumph);

//profile picture
let profile_pic = document.getElementById("profile-img");
profile_pic.src = otherLinks.profile_pic;

//profile picture in settings bar
let settingsImg = document.getElementById("settings-profile");
settingsImg.src = otherLinks.profile_pic;

//References to html classes
let songCards = document.querySelectorAll(".songCover");
let albumsCards = document.querySelectorAll(".albumCover");
let topSongNames = document.querySelectorAll(".topSongsName");
let topSongsArtist = document.querySelectorAll(".topSongsArtist");
let albumsNameTxt = document.querySelectorAll(".albumName");
let albumArtistTxt = document.querySelectorAll(".albumArtist");
let artistImages = document.querySelectorAll(".artist");
let artistNames = document.querySelectorAll(".artistName");

//arrays of links to images of top songs
let topSongs = [
  songLinks.workOfArt,
  songLinks.Ngozi,
  songLinks.modupe,
  songLinks.charm,
  songLinks.reason,
];

//arrays of links to title of top song
let topSongTitles = [
  topSongTitle.num1,
  topSongTitle.num2,
  topSongTitle.num3,
  topSongTitle.num4,
  topSongTitle.num5,
];

//arrays of links to names of top songs artists
let topSongArtist = [
  songArtists.art2,
  songArtists.art4,
  songArtists.art3,
  songArtists.art1,
  songArtists.art7,
];

//arrays of links to names of ablums
let albums = [
  albumLinks.trenchToTriumph,
  albumLinks.thyKingdomCome,
  albumLinks.timeless,
  albumLinks.boyAlone,
  albumLinks.raveRoses,
];

//arrays of links to names of albums
let albumNames = [
  albumName.num1,
  albumName.num2,
  albumName.num3,
  albumName.num4,
  albumName.num5,
];

//arrays of links to artists of albums
let albumsArtist = [
  albumArtists.num1,
  albumArtists.num2,
  albumArtists.num3,
  albumArtists.num4,
  albumArtists.num5,
];

//arrays of artist images
let artistImg = [
  artistImage.rema,
  artistImage.asake,
  artistImage.crayon,
  artistImage.seyiVibez,
  artistImage.davido,
  artistImage.omahLay,
  artistImage.postMalone,
];

//arrays of all artists names
let artists = [
  songArtists.art1,
  songArtists.art2,
  songArtists.art3,
  songArtists.art5,
  songArtists.art6,
  songArtists.art7,
  songArtists.art8,
];

//looping over top song cards to display image
songCards.forEach((card, idx) => {
  card.style.backgroundImage = `url(${topSongs[idx]})`;
});

//looping over top song cards to display names
topSongNames.forEach((name, idx) => {
  name.innerHTML = topSongTitles[idx];
});

//looping over top song cards to display artists names
topSongsArtist.forEach((artist, idx) => {
  artist.innerHTML = topSongArtist[idx];
});

//looping over albums cards to display image
albumsCards.forEach((albumCard, idx) => {
  albumCard.style.backgroundImage = `url(${albums[idx]})`;
});

//looping over albums cards to display name of albums
albumsNameTxt.forEach((albumname, idx) => {
  albumname.innerHTML = albumNames[idx];
});

//looping over albums cards to artist name
albumArtistTxt.forEach((albumArt, idx) => {
  albumArt.innerHTML = albumsArtist[idx];
});

//looping over artist cards to display their images
artistImages.forEach((artist, idx) => {
  artist.src = artistImg[idx];
});

artistNames.forEach((names, idx) => {
  names.innerHTML = artists[idx];
});

//sidebar collapse function
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
document
  .getElementById("mobile-searchbar")
  .addEventListener("click", mobileSearchBar);

//play, favorite and add to library buttons
let playIcon = document.querySelectorAll(".play-button");
let favoriteIcon = document.querySelectorAll(".favorite-button");
let libraryIcon = document.querySelectorAll(".add-button");

playIcon.forEach((play) => {
  play.src = "./ICONS/play-icon.png";
});

favoriteIcon.forEach((favorite) => {
  favorite.src = "./ICONS/favourite-icon.png";
});

libraryIcon.forEach((library) => {
  library.src = "./ICONS/library.png";
});

songCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    let playIcon = card.querySelector(".play-button");
    let favoriteIcon = card.querySelector(".favorite-button");
    let libraryIcon = card.querySelector(".add-button");

    playIcon.style.opacity = "0.7";
    favoriteIcon.style.opacity = "0.7";
    libraryIcon.style.opacity = "0.7";
  });

  card.addEventListener("mouseleave", () => {
    let playIcon = card.querySelector(".play-button");
    let favoriteIcon = card.querySelector(".favorite-button");
    let libraryIcon = card.querySelector(".add-button");

    playIcon.style.opacity = "0";
    favoriteIcon.style.opacity = "0";
    libraryIcon.style.opacity = "0";
  });
});

albumsCards.forEach((albmCard) => {
  console.log(albmCard);
  albmCard.addEventListener("mouseenter", () => {
    let playIcon = albmCard.querySelector(".play-button");
    let favoriteIcon = albmCard.querySelector(".favorite-button");
    let libraryIcon = albmCard.querySelector(".add-button");

    playIcon.style.opacity = "0.7";
    favoriteIcon.style.opacity = "0.7";
    libraryIcon.style.opacity = "0.7";
  });

  albmCard.addEventListener("mouseleave", () => {
    let playIcon = albmCard.querySelector(".play-button");
    let favoriteIcon = albmCard.querySelector(".favorite-button");
    let libraryIcon = albmCard.querySelector(".add-button");

    playIcon.style.opacity = "0";
    favoriteIcon.style.opacity = "0";
    libraryIcon.style.opacity = "0";
  });
});