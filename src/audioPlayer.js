import { musicLinks } from "./musicLinks.js";
import {
  songLinks,
  songArtists,
  topSongTitle,
  albumLinks,
  albumArtists,
  albumName,
} from "./links.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  getBlob,
  getBytes,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
import { constructPlaylistSong } from "./audioScreen.js";
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

//top songs audio cover
export let songCover = [
  songLinks.workOfArt,
  songLinks.Ngozi,
  songLinks.modupe,
  songLinks.charm,
  songLinks.reason,
];

//top songs name
let topSongName = [
  topSongTitle.num1,
  topSongTitle.num2,
  topSongTitle.num3,
  topSongTitle.num4,
  topSongTitle.num5,
];

//Top songs artist names
let topSongArtist = [
  songArtists.art2,
  songArtists.art4,
  songArtists.art3,
  songArtists.art1,
  songArtists.art7,
];

//albums
const albums = [
  {
    //Trench to Triumph
    name: albumName.num1,
    artist: albumArtists.num1,
    cover: albumLinks.trenchToTriumph,
    songsName: ["Ngozi ft Arya Starr", "Modupe"],
    url: [musicLinks.Ngozi, musicLinks.modupe],
  },
  {
    //Thy Kingdom come
    name: albumName.num2,
    artist: albumArtists.num2,
    cover: albumLinks.thyKingdomCome,
    songsName: ["Man of the year"],
    url: [musicLinks.manOfTheYear],
  },
  {
    //Timeless
    name: albumName.num3,
    artist: albumArtists.num3,
    cover: albumLinks.timeless,
    songsName: ["Unavailable"],
    url: [musicLinks.unavailable],
  },
  {
    //Boy Alone
    name: albumName.num4,
    artist: albumArtists.num4,
    cover: albumLinks.boyAlone,
    songsName: ["Reason"],
    url: [musicLinks.reason],
  },
  {
    //Rave & roses
    name: albumName.num5,
    artist: albumArtists.num5,
    cover: albumLinks.raveRoses,
    songsName: ["Calm Down ft Selena Gomez", "Charm", "Holiday"],
    url: [musicLinks.calmDown, musicLinks.charm, musicLinks.holiday],
  },
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
let isPlayingAlbum = false; //Tracking for playing album
let albumIndex = 0;

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
// let albumCard = document.querySelectorAll(".albumCover");

playButton.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    constructPlaylistSong();
    if (idx === 5) {
      let album = albums[0];
      songImg.src = album.cover;
      songName.innerHTML = album.songsName[0];
      artistName.innerHTML = album.artist;
      albumIndex = 0; // Update the current song index
      isPlayingAlbum = true;
      playAlbum(albumIndex, 0);
    } else if (idx === 6) {
      let album = albums[1];
      songImg.src = album.cover;
      songName.innerHTML = album.songsName[0];
      artistName.innerHTML = album.artist;
      albumIndex = 1; // Update the current song index
      isPlaying = true;
      playAlbum(albumIndex, 0);
    } else if (idx === 7) {
      let album = albums[2];
      songImg.src = album.cover;
      songName.innerHTML = album.songsName[0];
      artistName.innerHTML = album.artist;
      albumIndex = 2; // Update the current song index
      isPlaying = true;
      playAlbum(albumIndex, 0);
    } else if (idx === 8) {
      let album = albums[3];
      songImg.src = album.cover;
      songName.innerHTML = album.songsName[0];
      artistName.innerHTML = album.artist;
      albumIndex = 3; // Update the current song index
      isPlayingAlbum = true;
      playAlbum(albumIndex, 0);
    } else if (idx === 9) {
      let album = albums[4];
      songImg.src = album.cover;
      songName.innerHTML = album.songsName[0];
      artistName.innerHTML = album.artist;
      albumIndex = 4; // Update the current song index
      isPlayingAlbum = true;
      playAlbum(albumIndex, 0);
    } else {
      songImg.src = songCover[idx];
      songName.innerHTML = topSongName[idx];
      artistName.innerHTML = topSongArtist[idx];
      currentSongIndex = idx; // Update the current song index
      isPlayingAlbum = false;
      playSong(currentSongIndex);
    }
  });
});

//Repeat button
repeatBtn.addEventListener("click", () => {
  isRepeatActive = !isRepeatActive;
  repeatBtn.src = isRepeatActive
    ? "./ICONS/replay-checked.png"
    : "./ICONS/replay.png";
});

// Listen for the 'ended' event on the audio element to play the next song
//Autoplay handler
audio.addEventListener("ended", () => {
  if (isRepeatActive) {
    audio.currentTime = 0;
    audio.play();
  } else if (isShuffleActive) {
    //top songs shuffling
    currentSongIndex = Math.floor(Math.random() * topSongsUrl.length);
    playSong(currentSongIndex);
  } else if (isShuffleActive && isPlayingAlbum) {
    //Album song shuffling //not working yet
    let album = albums[albumIndex];
    let albumUrl = album.url;
    currentSongIndex = Math.floor(Math.random() * albumUrl.length);
    playAlbum(albumIndex, currentSongIndex);
  } else if (isPlayingAlbum) {
    //Auto play to the next song in an album
    let album = albums[albumIndex];
    let albumSongName = album.songsName;
    let albumArtist = album.artist;
    let albumCover = album.cover;
    let albumUrl = album.url;
    currentSongIndex = (currentSongIndex + 1) % albumUrl.length;
    songName.innerHTML = albumSongName[currentSongIndex];
    songImg.src = albumCover;
    artistName.innerHTML = albumArtist;
    playAlbum(albumIndex, currentSongIndex);
  } else {
    // Increment the current song index and play the next song
    currentSongIndex = (currentSongIndex + 1) % topSongsUrl.length;
    songName.innerHTML = topSongName[currentSongIndex];
    songImg.src = songCover[currentSongIndex];
    artistName.innerHTML = topSongArtist[currentSongIndex];
    playSong(currentSongIndex);
  }
});

//Shuffle button
shuffleBtn.addEventListener("click", () => {
  isShuffleActive = !isShuffleActive;
  shuffleBtn.src = isShuffleActive
    ? "./ICONS/shuffle-checked.png"
    : "./ICONS/shuffle.png";

  //Experimental not working yet
  if (isShuffleActive && isPlayingAlbum) {
    let album = albums[albumIndex];
    let albumUrl = album.url;
    for (let i = albumUrl.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [albumUrl[i], albumUrl[j]] = [albumUrl[j], albumUrl[i]];
    }
  } else if (isShuffleActive) {
    for (let i = topSongsUrl.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [topSongsUrl[i], topSongsUrl[j]] = [topSongsUrl[j], topSongsUrl[i]];
    }
  }
});

//previous button to go to the previoua song
previousBtn.addEventListener("click", () => {
  if (isPlayingAlbum) {
    let album = albums[albumIndex];
    let albumSongName = album.songsName;
    let albumArtist = album.artist;
    let albumCover = album.cover;
    let albumUrl = album.url;
    if (currentSongIndex === 0) {
      currentSongIndex = albumUrl.length - 1;
    } else {
      currentSongIndex = (currentSongIndex - 1) % albumUrl.length;
    }
    songName.innerHTML = albumSongName[currentSongIndex];
    songImg.src = albumCover;
    artistName.innerHTML = albumArtist;

    playAlbum(albumIndex, currentSongIndex);
  } else {
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
  }
});

//next button to go to the next song
nextBtn.addEventListener("click", () => {
  if (isPlayingAlbum) {
    let album = albums[albumIndex];
    let albumSongName = album.songsName;
    let albumArtist = album.artist;
    let albumCover = album.cover;
    let albumUrl = album.url;
    currentSongIndex =
      (currentSongIndex - 1 + albumUrl.length) % albumUrl.length;
    songName.innerHTML = albumSongName[currentSongIndex];
    songImg.src = albumCover;
    artistName.innerHTML = albumArtist;

    playAlbum(albumIndex, currentSongIndex);
  } else {
    // Increment the current song index and play the next song
    currentSongIndex =
      (currentSongIndex - 1 + topSongsUrl.length) % topSongsUrl.length;
    songName.innerHTML = topSongName[currentSongIndex];
    songImg.src = songCover[currentSongIndex];
    artistName.innerHTML = topSongArtist[currentSongIndex];

    playSong(currentSongIndex);
  }
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
