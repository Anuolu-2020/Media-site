import { musicLinks } from "./musicLinks.js";
import { songLinks, songArtists, topSongTitle } from "./links.js";
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
let artistName = document.getElementById("audioArtist");
let songName = document.getElementById("audioName");
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

let songCover = [
  songLinks.workOfArt,
  songLinks.Ngozi,
  songLinks.modupe,
  songLinks.charm,
  songLinks.reason,
];

let topSongName = [
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

let audio = document.getElementById("audio");
let currentSongIndex = 0;
let isRepeatActive = false; //Track repeat state
let isPlaying = false; //Track Playing state
let isShuffleActive = false; //Track Shuffle state

//topSongs fetch
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

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    audio.play();
    isPlaying = true;
    playPauseBtn.src = "./ICONS/pause.png";
  }
});

//audio pause function
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.src = "./ICONS/play.png";
}

// Add event listeners to play buttons
playButton.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    songImg.src = songCover[idx];
    songName.innerHTML = topSongName[idx];
    artistName.innerHTML = topSongArtist[idx];
    currentSongIndex = idx; // Update the current song index
    playSong(currentSongIndex);
  });
});

//Repeat button
repeatBtn.addEventListener("click", () => {
  isRepeatActive = !isRepeatActive;
  repeatBtn.src = isRepeatActive
    ? "./ICONS/replay-checked.png"
    : "./ICONS/replay.png";
});

//Shuffle button
shuffleBtn.addEventListener("click", () => {
  isShuffleActive = !isShuffleActive;
  shuffleBtn.src = isShuffleActive
    ? "./ICONS/shuffle-checked.png"
    : "./ICONS/shuffle.png";

  if (isShuffleActive) {
    for (let i = topSongsUrl.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [topSongsUrl[i], topSongsUrl[j]] = [topSongsUrl[j], topSongsUrl[i]];
    }
  }
});

// Listen for the 'ended' event on the audio element to play the next song
audio.addEventListener("ended", () => {
  if (isRepeatActive) {
    audio.currentTime = 0;
    audio.play();
  } else if (isShuffleActive) {
    currentSongIndex = Math.floor(Math.random() * topSongsUrl.length);
    playSong(currentSongIndex);
  } else {
    // Increment the current song index and play the next song
    currentSongIndex = (currentSongIndex + 1) % topSongsUrl.length;
    songName.innerHTML = topSongName[currentSongIndex];
    songImg.src = songCover[currentSongIndex];
    artistName.innerHTML = topSongArtist[currentSongIndex];
    playSong(currentSongIndex);
  }
});

//previous button to go to the previoua song
previousBtn.addEventListener("click", () => {
  // decrement the current song index and play the next song
  if (currentSongIndex === 0) {
    currentSongIndex = topSongsUrl.length - 1;
  } else {
    currentSongIndex = (currentSongIndex - 1) % topSongsUrl.length;
  }
  songName.innerHTML = topSongName[currentSongIndex];
  songImg.src = songCover[currentSongIndex];
  artistName.innerHTML = topSongArtist[currentSongIndex];

  playSong(currentSongIndex);
});

//next button to go to the next song
nextBtn.addEventListener("click", () => {
  // Increment the current song index and play the next song
  currentSongIndex =
    (currentSongIndex - 1 + topSongsUrl.length) % topSongsUrl.length;
  songName.innerHTML = topSongName[currentSongIndex];
  songImg.src = songCover[currentSongIndex];
  artistName.innerHTML = topSongArtist[currentSongIndex];

  playSong(currentSongIndex);
});

//audio volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

//audio duration information
let songDuration = document.getElementById("songDuration");
//formatting the time
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

//audio playback progress
let progressSlide = document.getElementById("progressSlide");
let isSeeking = false; // Track if user is dragging the progress slider
progressSlide.addEventListener("input", () => {
  // Update the audio's currentTime based on the progress slider's value
  const newTime = (progressSlide.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

progressSlide.addEventListener("change", () => {
  // Update the audio's currentTime based on the final progress slider value
  const newTime = (progressSlide.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

//audio time update
audio.addEventListener("timeupdate", () => {
  // Update the progress slider and current time display
  if (!isSeeking) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressSlide.value = progress;
    songDuration.innerText = `${formatTime(audio.currentTime)} / ${formatTime(
      audio.duration
    )}`;
  }
});
