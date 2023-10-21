import {
  songLinks,
  albumLinks,
  otherLinks,
  topSongTitle,
  songArtists,
  albumArtists,
  albumName,
  artistImage,
  gospelSongs,
  gospelSongTitle,
  gospelArtist,
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

let gospelCards = document.querySelectorAll(".gospelCover");
let gospelSongName = document.querySelectorAll(".gospelName");
let gospelArtistName = document.querySelectorAll(".gospelArtist");

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

//Arrays of links to gospel songs cover
let gospelSongCover = [
  gospelSongs.goodnessOfGod,
  gospelSongs.recklessLove,
  gospelSongs.ebenezeri,
  gospelSongs.ebenezer,
  gospelSongs.bola,
];

let gospelArtists = [
  gospelArtist.num1,
  gospelArtist.num2,
  gospelArtist.num3,
  gospelArtist.num4,
  gospelArtist.num5,
];

let gospelTitle = [
  gospelSongTitle.num1,
  gospelSongTitle.num2,
  gospelSongTitle.num3,
  gospelSongTitle.num4,
  gospelSongTitle.num5,
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

gospelCards.forEach((gospelCard, idx) => {
  gospelCard.style.backgroundImage = `url(${gospelSongCover[idx]})`;
});

gospelSongName.forEach((name, idx) => {
  name.innerHTML = gospelTitle[idx];
});

gospelArtistName.forEach((songName, idx) => {
  songName.innerHTML = gospelArtists[idx];
});

//sidebar collapse function
function sidebarCollapse() {
  let sidebarTexts = document.querySelectorAll(".sidebar-text");
  let marginIncrease = document.getElementById("music-page");
  sidebarTexts.forEach(function (sidebarText) {
    if (sidebarText.style.display === "none") {
      sidebarText.style.display = "flex";
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
//For mobile searchbar
document
  .getElementById("mobile-searchbar")
  .addEventListener("click", mobileSearchBar);

//play, favorite and add to library buttons
let playIcon = document.querySelectorAll(".play-button");
let favoriteIcon = document.querySelectorAll(".favorite-button");
let libraryIcon = document.querySelectorAll(".add-button");

/* Play, favourite and add to libray buttons fo gospel
songs*/
let gosPlay = document.querySelectorAll(".gosPlay");
let gosFave = document.querySelectorAll(".gosFave");
let gosAdd = document.querySelectorAll(".gosAdd");

let isHovered = false;

playIcon.forEach((play) => {
  play.src = "./ICONS/play-icon.png";

  play.addEventListener("mouseover", () => {
    isHovered = true;
    if (isHovered) {
      play.src = "./ICONS/play-checked.png";
    }
  });

  play.addEventListener("mouseout", () => {
    play.src = "./ICONS/play-icon.png";
    isHovered = false;
  });
});

gosPlay.forEach((play) => {
  play.src = "./ICONS/play-icon.png";

  play.addEventListener("mouseover", () => {
    isHovered = true;
    if (isHovered) {
      play.src = "./ICONS/play-checked.png";
    }
  });

  play.addEventListener("mouseout", () => {
    play.src = "./ICONS/play-icon.png";
    isHovered = false;
  });
});

favoriteIcon.forEach((favorite, id) => {
  let btnState = JSON.parse(localStorage.getItem("faveStates"));

  //  let favoriteIcon = card.querySelector(".favorite-button");
  if (btnState[id] === true) {
    favorite.src = "./ICONS/favourite-checked.png";
  } else {
    favorite.src = "./ICONS/favourite-icon.png";
  }
});

gosFave.forEach((favorite) => {
  favorite.src = "./ICONS/favourite-icon.png";
});

gosAdd.forEach((library) => {
  library.src = "./ICONS/library.png";
});

libraryIcon.forEach((library) => {
  library.src = "./ICONS/library.png";
});

//For Detecting mobile Screen
function hasAccelerometer() {
  return "DeviceMotionEvent" in window;
}

function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}

//For song cover buttons
songCards.forEach((card) => {
  let playIcon = card.querySelector(".play-button");
  let favoriteIcon = card.querySelector(".favorite-button");
  let libraryIcon = card.querySelector(".add-button");

  //Display buttons if on mobile device
  if (hasAccelerometer() && isTouchDevice()) {
    playIcon.style.opacity = "1";
    favoriteIcon.style.opacity = "1";
    libraryIcon.style.opacity = "1";
  } else {
    card.addEventListener("mouseenter", () => {
      playIcon.style.opacity = "0.7";
      favoriteIcon.style.opacity = "0.7";
      libraryIcon.style.opacity = "0.7";
    });

    card.addEventListener("mouseleave", () => {
      playIcon.style.opacity = "0";
      favoriteIcon.style.opacity = "0";
      libraryIcon.style.opacity = "0";
    });
  }
});

albumsCards.forEach((albmCard) => {
  let playIcon = albmCard.querySelector(".play-button");
  let favoriteIcon = albmCard.querySelector(".favorite-button");
  let libraryIcon = albmCard.querySelector(".add-button");

  if (hasAccelerometer() && isTouchDevice()) {
    playIcon.style.opacity = "1";
    favoriteIcon.style.opacity = "1";
    libraryIcon.style.opacity = "1";
  } else {
    albmCard.addEventListener("mouseenter", () => {
      playIcon.style.opacity = "0.7";
      favoriteIcon.style.opacity = "0.7";
      libraryIcon.style.opacity = "0.7";
    });

    albmCard.addEventListener("mouseleave", () => {
      playIcon.style.opacity = "0";
      favoriteIcon.style.opacity = "0";
      libraryIcon.style.opacity = "0";
    });
  }
});

gospelCards.forEach((gospelCard) => {
  let playIcon = gospelCard.querySelector(".gosPlay");
  let favoriteIcon = gospelCard.querySelector(".gosFave");
  let libraryIcon = gospelCard.querySelector(".gosAdd");

  if (hasAccelerometer() && isTouchDevice()) {
    playIcon.style.opacity = "1";
    favoriteIcon.style.opacity = "1";
    libraryIcon.style.opacity = "1";
  } else {
    gospelCard.addEventListener("mouseenter", () => {
      playIcon.style.opacity = "0.7";
      favoriteIcon.style.opacity = "0.7";
      libraryIcon.style.opacity = "0.7";
    });

    gospelCard.addEventListener("mouseleave", () => {
      playIcon.style.opacity = "0";
      favoriteIcon.style.opacity = "0";
      libraryIcon.style.opacity = "0";
    });
  }
});
