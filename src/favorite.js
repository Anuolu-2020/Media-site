import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getStorage,
  ref,
  getBlob,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

import { firebaseConfig } from "./fireStoreConnect.js";

import {
  topSongsUrl,
  gospelSongUrl,
  artistName,
  songName,
  songImg,
} from "./audioPlayer.js";

let audioPlayer = document.getElementById("audioPlayer");
let audio = document.getElementById("audio");
let progressSlide = document.getElementById("progressSlide");
let isPlaying = false;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

function playSong(index) {
  const fileRef = ref(storage, topSongsUrl[index]);
  getBlob(fileRef).then((blob) => {
    let url = URL.createObjectURL(blob);
    audio.src = url;
    audio.play();
    isPlaying = true;
    playPauseBtn.src = "./ICONS/pause.png";
  });
}

//Retrieve button saved properties
let properties = JSON.parse(localStorage.getItem("favoriteProperties"));

//Retrieve button saved properties
let gosProperties = JSON.parse(localStorage.getItem("gosFaveProperties"));

let favoriteAppeared = false;
let gosFavoriteAppeared = false;

if (properties === null || properties.length === 0) {
  let page = document.querySelector(".music-card");

  let message = document.createElement("h3");
  message.classList.add("message");

  page.appendChild(message);

  favoriteAppeared = false;
} else {
  favoriteAppeared = true;
  //Create favorite ui card based on number of saved favorites
  for (let i = 0; i < properties.length; i++) {
    let faveBtnProperty = properties[i];

    let musicCard = document.querySelector(".music-card");

    let card = document.createElement("section");
    card.classList.add("card");

    let favoriteCover = document.createElement("section");
    favoriteCover.classList.add("favoriteCover");

    //Song cover
    favoriteCover.style.backgroundImage = `url(${faveBtnProperty.cover}`;

    let playButton = document.createElement("img");
    playButton.classList.add("play-button");

    playButton.src = "./ICONS/play-arrow.png";

    favoriteCover.appendChild(playButton);

    card.appendChild(favoriteCover);

    let songName = document.createElement("h3");
    songName.classList.add("songName");

    //Artist song
    songName.innerText = faveBtnProperty.name;

    card.appendChild(songName);

    let songArtist = document.createElement("h3");
    songArtist.classList.add("songArtist");
    //Artist name
    songArtist.innerText = faveBtnProperty.artist;

    card.appendChild(songArtist);

    musicCard.appendChild(card);
  }
}

if (gosProperties === null || gosProperties.length === 0) {
  let page = document.querySelector(".music-card");

  let message = document.createElement("h3");
  message.classList.add("message");

  page.appendChild(message);

  gosFavoriteAppeared = false;
} else {
  gosFavoriteAppeared = true;
  //Create favorite ui card based on number of saved favorites
  for (let i = 0; i < gosProperties.length; i++) {
    let faveBtnProperty = gosProperties[i];

    let musicCard = document.querySelector(".music-card");

    let card = document.createElement("section");
    card.classList.add("card");

    let favoriteCover = document.createElement("section");
    favoriteCover.classList.add("favoriteCover");

    //Song cover
    favoriteCover.style.backgroundImage = `url(${faveBtnProperty.cover}`;

    let playButton = document.createElement("img");
    playButton.classList.add("gosPlay");

    playButton.src = "./ICONS/play-arrow.png";

    favoriteCover.appendChild(playButton);

    card.appendChild(favoriteCover);

    let songName = document.createElement("h3");
    songName.classList.add("songName");

    //Artist song
    songName.innerText = faveBtnProperty.name;

    card.appendChild(songName);

    let songArtist = document.createElement("h3");
    songArtist.classList.add("songArtist");
    //Artist name
    songArtist.innerText = faveBtnProperty.artist;

    card.appendChild(songArtist);

    musicCard.appendChild(card);
  }
}

//reference for playing top songs and albums
let play = document.querySelectorAll(".play-button");

play.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    let prop = properties[idx];
    audioPlayer.style.display = "flex";
    progressSlide.style.display = "block";
    artistName.innerText = prop.artist;
    songName.innerText = prop.name;
    songImg.src = prop.cover;
    playSong(prop.id);
  });
});

//play gospel song
function playGospelSong(index) {
  const fileRef = ref(storage, gospelSongUrl[index]);
  getBlob(fileRef).then((blob) => {
    let url = URL.createObjectURL(blob);
    audio.src = url;
    audio.play();
    isPlaying = true;
    playPauseBtn.src = "./ICONS/pause.png";
  });
}

//Play buttons for gospel song
let gospelPlay = document.querySelectorAll(".gosPlay");

gospelPlay.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    let prop = gosProperties[idx];
    audioPlayer.style.display = "flex";
    progressSlide.style.display = "block";
    artistName.innerText = prop.artist;
    songName.innerText = prop.name;
    songImg.src = prop.cover;
    playGospelSong(prop.id);
  });
});

//Favorite page Ablum section
let albumProperties = JSON.parse(localStorage.getItem("favoriteAlbumProp"));
let albumMusic = document.querySelector(".albumMusic");

if (albumProperties === null || albumProperties.length === 0) {
  let message = document.createElement("h3");
  message.classList.add("message");

  message.innerText = "NO FAVORITE ALBUM";

  albumMusic.append(message);
} else {
  for (let i = 0; i < albumProperties.length; i++) {
    let faveBtnProperty = albumProperties[i];

    let musicCard = document.querySelector(".albumMusic");

    let card = document.createElement("section");
    card.classList.add("card");

    let favoriteCover = document.createElement("section");
    favoriteCover.classList.add("favoriteCover");

    //Song cover
    favoriteCover.style.backgroundImage = `url(${faveBtnProperty.cover}`;

    let playButton = document.createElement("img");
    playButton.classList.add("gosPlay");

    playButton.src = "./ICONS/play-arrow.png";

    favoriteCover.appendChild(playButton);

    card.appendChild(favoriteCover);

    let songName = document.createElement("h3");
    songName.classList.add("songName");

    //Artist song
    songName.innerText = faveBtnProperty.name;

    card.appendChild(songName);

    let songArtist = document.createElement("h3");
    songArtist.classList.add("songArtist");
    //Artist name
    songArtist.innerText = faveBtnProperty.artist;

    card.appendChild(songArtist);

    musicCard.appendChild(card);
  }
}

if (!favoriteAppeared && !gosFavoriteAppeared) {
  let message = document.querySelector(".message");
  message.innerText = "NO FAVORITES";
} else if (favoriteAppeared && gosFavoriteAppeared) {
  let message = document.querySelector(".message");
  // message.style.display = "none";
} else if (!favoriteAppeared && gosFavoriteAppeared) {
  let message = document.querySelector(".message");
  message.style.display = "none";
} else {
  let message = document.querySelector(".message");
  message.style.display = "none";
}
