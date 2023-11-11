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
  albums,
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

    audio.addEventListener("ended", () => {
      songName.innerText = prop.name;
    });
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

    audio.addEventListener("ended", () => {
      songName.innerText = prop.name;
    });
  });
});

//Favorite page Album section
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
    playButton.classList.add("albumPlay");

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

//Album songs ui creation
let albumPlayButton = document.querySelectorAll(".albumPlay");
let displayCard = document.querySelector(".playFaveAlbum");
let albumName = document.querySelector(".faveAlbumName");
let isPlaylistVisible = false;
let albumIndex = 0;

albumPlayButton.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    displayCard.style.display = "flex";

    let albumProperties = JSON.parse(localStorage.getItem("favoriteAlbumProp"));
    let prop = albumProperties[idx];
    let songsName = prop.songsName;
    let album = prop.name;

    albumIndex = idx;

    albumName.textContent = `${album} Songs`;

    if (isPlaylistVisible) {
      // Playlist UI is already visible, so return early
      let songsUi = document.querySelectorAll(".song");
      songsUi.forEach((song) => {
        song.remove();
      });
    }

    for (let i = 0; i < songsName.length; i++) {
      let song = document.createElement("section");
      song.classList.add("song");

      let songImage = document.createElement("img");
      songImage.classList.add("songImage");
      songImage.src = prop.cover;
      song.appendChild(songImage);

      let info = document.createElement("section");
      info.classList.add("info");

      let name = document.createElement("section");
      name.classList.add("name");
      name.textContent = songsName[i];

      info.appendChild(name);

      let artist = document.createElement("section");
      artist.classList.add("artist");
      artist.textContent = prop.artist;

      info.appendChild(artist);

      song.appendChild(info);

      let playButton = document.createElement("img");

      playButton.classList.add("playButton");

      playButton.src = "./ICONS/play-arrow.png";

      playButton.addEventListener("click", () => {
        playAlbumSong(i);
      });

      song.appendChild(playButton);

      displayCard.appendChild(song);
    }

    isPlaylistVisible = true;
  });
});

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

//close favorite album display card
let closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  displayCard.style.display = "none";
});

function playAlbum(index, songIndex) {
  let album = albums[index];
  let albumUrl = album.url;
  const fileRef = ref(storage, albumUrl[songIndex]);
  getBlob(fileRef).then((blob) => {
    let url = URL.createObjectURL(blob);
    audio.src = url;
    audio.play();
    isPlaying = true;
    playPauseBtn.src = "./ICONS/pause.png";
  });
}

let songIndex = 0;
function playAlbumSong(idx) {
  let albumProperties = JSON.parse(localStorage.getItem("favoriteAlbumProp"));
  let prop = albumProperties[albumIndex];
  let trackName = prop.songsName;
  let index = prop.id - 5;
  audioPlayer.style.display = "flex";
  progressSlide.style.display = "block";
  artistName.innerText = prop.name;
  songName.innerText = trackName[idx];
  songIndex = idx;
  songImg.src = prop.cover;
  playAlbum(index, idx);

  audio.addEventListener("ended", () => {
    songName.innerText = trackName[idx];
  });
}
