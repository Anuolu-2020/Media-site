import { musicLinks } from "./musicLinks.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  getBlob,
  getBytes,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

import { firebaseConfig } from "./fireStoreConnect.js";

// Get all the references to the audio player button
let previousBtn = document.getElementById("previousBtn");
let playPauseBtn = document.getElementById("playPauseBtn");
let nextBtn = document.getElementById("nextBtn");
let artistName = document.getElementById("artistName");
let songName = document.getElementById("songName");
let volume = document.getElementById("volumeBtn");
let audioIcon = document.getElementById("volumeIcon");
let repeatBtn = document.getElementById("repeatBtn");
let shuffleBtn = document.getElementById("shuffleBtn");
let audioCollaspe = document.getElementById("audioCollapse");
let audioPlayer = document.getElementById("audioPlayer");
let songImg = document.getElementById("songImg");

//link the icons to the button
previousBtn.src = "./ICONS/previous.png";
playPauseBtn.src = "./ICONS/play.png";
nextBtn.src = "./ICONS/next.png";
audioIcon.src = "./ICONS/volume-up.png";
repeatBtn.src = "./ICONS/replay.png";
shuffleBtn.src = "./ICONS/shuffle.png";
audioCollaspe.src = "./ICONS/expand-audio.png";
songImg.src = "../songs-cover/work of art.jpeg"; //place holder source

//For Detecting mobile Screen
function hasAccelerometer() {
  return "DeviceMotionEvent" in window;
}
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}
//volume display based on device
if (hasAccelerometer() && isTouchDevice()) {
  volume.style.visibility = "visible";
} else {
  audioIcon.addEventListener("mouseenter", () => {
    volume.style.visibility = "visible";
  });

  audioPlayer.addEventListener("mouseleave", () => {
    volume.style.visibility = "hidden";
  });
}

//play buttons
let playButton = document.querySelectorAll(".play-button");

//Top songs url arrray
let topSongsUrl = [
  musicLinks.basquiat,
  musicLinks.Ngozi,
  musicLinks.modupe,
  musicLinks.charm,
  musicLinks.reason,
];

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

let audio = document.getElementById("audio");
let currentSongIndex = 0;
//"/Songs/Ngozi - Crayon&Ayra Starr.m4a"
//topSongs fetch
function playSong(index) {
  const fileRef = ref(storage, topSongsUrl[index]);
  getBlob(fileRef).then((blob) => {
    let url = URL.createObjectURL(blob);
    audio.src = url;
    audio.play();
  });
}

// Add event listeners to play buttons
playButton.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    currentSongIndex = idx; // Update the current song index
    playSong(currentSongIndex);
  });
});

// Listen for the 'ended' event on the audio element to play the next song
audio.addEventListener("ended", () => {
  // Increment the current song index and play the next song
  currentSongIndex = (currentSongIndex + 1) % topSongsUrl.length;
  playSong(currentSongIndex);
});

previousBtn.addEventListener("click", () => {
  // decrement the current song index and play the next song
  if (currentSongIndex === 0) {
    currentSongIndex = topSongsUrl.length - 1;
  } else {
    currentSongIndex = (currentSongIndex - 1) % topSongsUrl.length;
  }
  playSong(currentSongIndex);
});

nextBtn.addEventListener("click", () => {
  // Increment the current song index and play the next song
  currentSongIndex =
    (currentSongIndex - 1 + topSongsUrl.length) % topSongsUrl.length;
  playSong(currentSongIndex);
});
