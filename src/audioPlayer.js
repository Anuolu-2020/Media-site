import { musicLinks } from "./musicLinks.js";
import {
  songLinks,
  songArtists,
  topSongTitle,
  albumLinks,
  albumArtists,
  albumName,
  gospelSongs,
  gospelSongTitle,
  gospelArtist,
} from "./links.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  getBlob,
  getBytes,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
import {
  playlistTopSongUi,
  playlistAlbumSongUi,
  playlistArtistSongUi,
  playlistGospelSongUi,
} from "./audioScreen.js";
import { artistSongs } from "./artistPlaylist.js";

import { firebaseConfig } from "./fireStoreConnect.js";

// Get all the references to the audio player button
let previousBtn = document.getElementById("previousBtn");
let playPauseBtn = document.getElementById("playPauseBtn");
let nextBtn = document.getElementById("nextBtn");
export let artistName = document.getElementById("audioArtist");
export let songName = document.getElementById("audioName");
let volume = document.getElementById("volumeBtn");
let audioIcon = document.getElementById("volumeIcon");
let repeatBtn = document.getElementById("repeatBtn");
let shuffleBtn = document.getElementById("shuffleBtn");
let audioCollaspe = document.getElementById("audioCollapse");
let audioPlayer = document.getElementById("audioPlayer");
let songImg = document.getElementById("songImg");

//play buttons
let playButton = document.querySelectorAll(".play-button");

//Play buttons for gospel song
let gospelPlay = document.querySelectorAll(".gosPlay");

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

//Top songs url arrray
export let topSongsUrl = [
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
export let topSongName = [
  topSongTitle.num1,
  topSongTitle.num2,
  topSongTitle.num3,
  topSongTitle.num4,
  topSongTitle.num5,
];

//Top songs artist names
export let topSongArtist = [
  songArtists.art2,
  songArtists.art4,
  songArtists.art3,
  songArtists.art1,
  songArtists.art7,
];

//albums
export const albums = [
  {
    //Trench to Triumph
    name: albumName.num1,
    artist: albumArtists.num1,
    cover: albumLinks.trenchToTriumph,
    songsName: [
      "Ngozi ft Arya Starr",
      "Modupe",
      "Belle Full ft Victony & Ktizo",
      "Ijo (Laba Laba)",
    ],
    url: [
      musicLinks.Ngozi,
      musicLinks.modupe,
      musicLinks.belleFull,
      musicLinks.ijoLaba,
    ],
  },
  {
    //Thy Kingdom come
    name: albumName.num2,
    artist: albumArtists.num2,
    cover: albumLinks.thyKingdomCome,
    songsName: ["Man of the year", "Dejavu", "Karma"],
    url: [musicLinks.manOfTheYear, musicLinks.dejavu, musicLinks.karma],
  },
  {
    //Timeless
    name: albumName.num3,
    artist: albumArtists.num3,
    cover: albumLinks.timeless,
    songsName: [
      "Unavailable ft Musa Keys",
      "FEEL",
      "No Competition ft Asake",
      "In The Garden ft Morravey",
    ],
    url: [
      musicLinks.unavailable,
      musicLinks.feel,
      musicLinks.noCompetition,
      musicLinks.inTheGarden,
    ],
  },
  {
    //Boy Alone
    name: albumName.num4,
    artist: albumArtists.num4,
    cover: albumLinks.boyAlone,
    songsName: ["Reason", "Come Closer", "It's Yours", "Soso ft Ozuna"],
    url: [
      musicLinks.reason,
      musicLinks.comeCloser,
      musicLinks.itsYours,
      musicLinks.soso,
    ],
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

export let gospelSongCover = [
  gospelSongs.goodnessOfGod,
  gospelSongs.recklessLove,
  gospelSongs.ebenezeri,
  gospelSongs.ebenezer,
  gospelSongs.bola,
];

export let gospelSongName = [
  gospelSongTitle.num1,
  gospelSongTitle.num2,
  gospelSongTitle.num3,
  gospelSongTitle.num4,
  gospelSongTitle.num5,
];

export let gospelSongArtist = [
  gospelArtist.num1,
  gospelArtist.num2,
  gospelArtist.num3,
  gospelArtist.num4,
  gospelArtist.num5,
];

//Url Array for gospel songs
let gospelSongUrl = [
  musicLinks.goodnessOfGod,
  musicLinks.recklessLove,
  musicLinks.ebenezeri,
  musicLinks.ebenezer,
  musicLinks.bola,
];

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export let audio = document.getElementById("audio");
let currentSongIndex = 0;
let isRepeatActive = false; //Track repeat state
let isPlaying = false; //Track Playing state
let isShuffleActive = false; //Track Shuffle state
let isPlayingAlbum = false; //Tracking for playing album
let isArtistPlaylist = false; //Tracking artist song playlist
let isPlayingGospel = false; //Tracking Gospel song

let albumIndex = 0; //Tracking album index
let artistIndex = 0; //Tracking artist index

let albumSongIndex = 0; //Tracking album song index
let artistSongIndex = 0; //Tracking artist song index
let gospelSongIndex = 0;

//for playing topSongs fetch
export function playSong(index) {
  const fileRef = ref(storage, topSongsUrl[index]);
  getBlob(fileRef).then((blob) => {
    let url = URL.createObjectURL(blob);
    audio.src = url;
    audio.play();
    isPlaying = true;
    playPauseBtn.src = "./ICONS/pause.png";
  });
}

//For playing album songs
export function playAlbum(index, songIndex) {
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

//For playing artist songs
export function playArtistSong(index, songIndex) {
  let song = artistSongs[index];
  let songUrl = song.url;
  const fileRef = ref(storage, songUrl[songIndex]);
  getBlob(fileRef).then((blob) => {
    let url = URL.createObjectURL(blob);
    audio.src = url;
    audio.play();
    isPlaying = true;
    playPauseBtn.src = "./ICONS/pause.png";
  });
}

//for playing gospel song
export function playGospelSong(index) {
  const fileRef = ref(storage, gospelSongUrl[index]);
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

//for artist songs
let artists = document.querySelectorAll(".card2");
//Artist clickable images
artists.forEach((art, idx) => {
  art.addEventListener("click", () => {
    isArtistPlaylist = true;
    artistIndex = idx;
    playlistArtistSongUi(idx);
    //play artist songs
    let songsUi = document.querySelectorAll(".songs");
    songsUi.forEach((song, idx2) => {
      if (isArtistPlaylist) {
        song.addEventListener("click", () => {
          let song = artistSongs[artistIndex];
          // audio.pause();
          let musicName = song.songsName;
          let songCover = song.cover;
          songImg.src = songCover[idx2];
          playArtistSong(artistIndex, idx2);
          //img for audio screen
          audioScreenImg.src = songCover[idx2];
          songName.innerHTML = musicName[idx2];
          artistName.innerHTML = song.name;
          artistSongIndex = idx2;
          // if (idx === idx2) {
          //   song.style.backgroundColor = "rgb(138, 45, 138)";
          // }
        });
        if (idx === currentSongIndex) {
          song.style.backgroundColor = "rgb(138, 45, 138)";
        } else {
          // Reset the background color for other songs
          song.style.backgroundColor = "";
        }
      }
    });
  });
});

//Displaying static highlight effect for current song playing
function highlightPlaylistSong(index) {
  //playlistUi static Hover effect
  let songsUi = document.querySelectorAll(".songs");
  songsUi.forEach((song, idx) => {
    song.addEventListener("click", () => {
      audio.pause();
      // isPlayingAlbum = true;
      playSong(idx);
      songImg.src = songCover[idx];
      //img for audio screen
      audioScreenImg.src = songCover[idx];
      songName.innerHTML = topSongName[idx];
      artistName.innerHTML = topSongArtist[idx];
      if (idx === index) {
        song.style.backgroundColor = "rgb(138, 45, 138)";
      }
    });
    if (idx === index) {
      song.style.backgroundColor = "rgb(138, 45, 138)";
    } else {
      // Reset the background color for other songs
      song.style.backgroundColor = "";
    }
  });
}

function highlightPlaylistAlbum(albumIndex, index) {
  //playlistUi static Hover effect
  let songsUi = document.querySelectorAll(".songs");
  songsUi.forEach((song, idx) => {
    song.addEventListener("click", () => {
      isPlayingAlbum = true;
      let album = albums[albumIndex];
      // audio.pause();
      albumSongIndex = idx;
      playAlbum(albumIndex, albumSongIndex);
      songImg.src = album.cover;
      //img for audio screen
      audioScreenImg.src = album.cover;
      songName.innerHTML = album.songsName[idx];
      artistName.innerHTML = album.artist;
      // if (idx === index) {
      //   song.style.backgroundColor = "rgb(138, 45, 138)";
      // } else {
      //   song.style.backgroundColor = "";
      // }
    });
    if (idx === index) {
      song.style.backgroundColor = "rgb(138, 45, 138)";
    } else {
      // Reset the background color for other songs
      song.style.backgroundColor = "";
    }
  });
}

function highlightPlaylistGospel(index) {
  //playlistUi static Hover effect
  let songsUi = document.querySelectorAll(".songs");
  songsUi.forEach((song, idx) => {
    song.addEventListener("click", () => {
      audio.pause();
      // isPlayingAlbum = true;
      // index = idx;
      playGospelSong(idx);
      songImg.src = gospelSongCover[idx];
      //img for audio screen
      audioScreenImg.src = gospelSongCover[idx];
      songName.innerHTML = gospelSongName[idx];
      artistName.innerHTML = gospelSongArtist[idx];
      if (idx === index) {
        song.style.backgroundColor = "rgb(138, 45, 138)";
      }
    });
    if (idx === index) {
      song.style.backgroundColor = "rgb(138, 45, 138)";
    } else {
      // Reset the background color for other songs
      song.style.backgroundColor = "";
    }
  });
}

// Add event listeners to play buttons
// let albumCard = document.querySelectorAll(".albumCover");
export let audioScreenImg = document.getElementById("screen");

//Play button for topsong and album
playButton.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    // audio.pause();
    displayAudioBar();
    playlistTopSongUi();
    if (idx === 5) {
      let album = albums[0];
      songImg.src = album.cover;
      audioScreenImg.src = album.cover;
      songName.innerHTML = album.songsName[albumSongIndex];
      artistName.innerHTML = album.artist;
      albumIndex = 0; // Update the current song index
      isArtistPlaylist = false;
      isPlayingGospel = false;
      isPlayingAlbum = true;
      playlistAlbumSongUi(albumIndex);
      highlightPlaylistAlbum(albumIndex, albumSongIndex);
      playAlbum(albumIndex, albumSongIndex);
    } else if (idx === 6) {
      let album = albums[1];
      songImg.src = album.cover;
      audioScreenImg.src = album.cover;
      songName.innerHTML = album.songsName[albumSongIndex];
      artistName.innerHTML = album.artist;
      albumIndex = 1; // Update the current song index
      isArtistPlaylist = false;
      isPlayingGospel = false;
      isPlaying = true;
      playlistAlbumSongUi(albumIndex);
      highlightPlaylistAlbum(albumIndex, albumSongIndex);
      playAlbum(albumIndex, albumSongIndex);
    } else if (idx === 7) {
      let album = albums[2];
      songImg.src = album.cover;
      audioScreenImg.src = album.cover;
      songName.innerHTML = album.songsName[albumSongIndex];
      artistName.innerHTML = album.artist;
      albumIndex = 2; // Update the current song index
      isArtistPlaylist = false;
      isPlayingGospel = false;
      isPlaying = true;
      playlistAlbumSongUi(albumIndex);
      highlightPlaylistAlbum(albumIndex, albumSongIndex);
      playAlbum(albumIndex, albumSongIndex);
    } else if (idx === 8) {
      let album = albums[3];
      songImg.src = album.cover;
      audioScreenImg.src = album.cover;
      songName.innerHTML = album.songsName[albumSongIndex];
      artistName.innerHTML = album.artist;
      albumIndex = 3; // Update the current song index
      isArtistPlaylist = false;
      isPlayingGospel = false;
      isPlayingAlbum = true;
      playlistAlbumSongUi(albumIndex);
      highlightPlaylistAlbum(albumIndex, albumSongIndex);
      playAlbum(albumIndex, albumSongIndex);
    } else if (idx === 9) {
      let album = albums[4];
      songImg.src = album.cover;
      audioScreenImg.src = album.cover;
      songName.innerHTML = album.songsName[albumSongIndex];
      artistName.innerHTML = album.artist;
      albumIndex = 4; // Update the current song index
      isArtistPlaylist = false;
      isPlayingGospel = false;
      isPlayingAlbum = true;
      playlistAlbumSongUi(albumIndex);
      highlightPlaylistAlbum(albumIndex, albumSongIndex);
      playAlbum(albumIndex, albumSongIndex);
    } else {
      songImg.src = songCover[idx];
      //img for audio screen
      audioScreenImg.src = songCover[idx];
      songName.innerHTML = topSongName[idx];
      artistName.innerHTML = topSongArtist[idx];
      currentSongIndex = idx; // Update the current song index
      isArtistPlaylist = false;
      isPlayingGospel = false;
      isPlayingAlbum = false;
      highlightPlaylistSong(currentSongIndex);
      playSong(currentSongIndex);
    }
  });
});

gospelPlay.forEach((play, idx) => {
  play.addEventListener("click", () => {
    displayAudioBar();
    playlistGospelSongUi();
    songImg.src = gospelSongCover[idx];
    //img for audio screen
    audioScreenImg.src = gospelSongCover[idx];
    songName.innerHTML = gospelSongName[idx];
    artistName.innerHTML = gospelSongArtist[idx];
    gospelSongIndex = idx; // Update the current song index
    isPlayingAlbum = false;
    isArtistPlaylist = false;
    isPlayingGospel = true;
    highlightPlaylistGospel(gospelSongIndex);
    playGospelSong(gospelSongIndex);
  });
});

//Repeat button
repeatBtn.addEventListener("click", () => {
  isRepeatActive = !isRepeatActive;
  repeatBtn.src = isRepeatActive
    ? "./ICONS/replay-checked.png"
    : "./ICONS/replay.png";
});

//previous button to go to the previoua song
previousBtn.addEventListener("click", () => {
  audio.pause();
  if (isPlayingAlbum) {
    let album = albums[albumIndex];
    let albumSongName = album.songsName;
    let albumArtist = album.artist;
    let albumCover = album.cover;
    let albumUrl = album.url;
    if (albumSongIndex === 0) {
      albumSongIndex = albumUrl.length - 1;
    } else {
      albumSongIndex = (albumSongIndex - 1) % albumUrl.length;
    }
    songName.innerHTML = albumSongName[albumSongIndex];
    songImg.src = albumCover;
    artistName.innerHTML = albumArtist;
    highlightPlaylistAlbum(albumIndex, albumSongIndex);
    playAlbum(albumIndex, albumSongIndex);
  } else if (isArtistPlaylist) {
    let artist = artistSongs[artistIndex];
    let artistSongName = artist.songsName; //Array
    let artist_name = artist.name;
    let artist_song_cover = artist.cover; //Array
    let artistSongUrl = artist.url; //Array
    if (artistSongIndex === 0) {
      artistSongIndex = artistSongUrl.length - 1;
    } else {
      artistSongIndex = (artistSongIndex - 1) % artistSongUrl.length;
    }
    songName.innerText = artistSongName[artistSongIndex];
    songImg.src = artist_song_cover[artistSongIndex];
    audioScreenImg.src = artist_song_cover[artistSongIndex];
    artistSongName.innerText = artist_name;
    playArtistSong(artistIndex, artistSongIndex);
  } else if (isPlayingGospel) {
    if (gospelSongIndex === 0) {
      gospelSongIndex = gospelSongUrl.length - 1;
    } else {
      gospelSongIndex = (gospelSongIndex - 1) % gospelSongUrl.length;
    }
    songName.innerHTML = gospelSongName[gospelSongIndex];
    songImg.src = gospelSongCover[gospelSongIndex];
    artistName.innerHTML = gospelSongArtist[gospelSongIndex];
    highlightPlaylistGospel(gospelSongIndex);
    playGospelSong(gospelSongIndex);
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
    highlightPlaylistSong(currentSongIndex);
    playSong(currentSongIndex);
  }
});

//next button to go to the next song
nextBtn.addEventListener("click", () => {
  audio.pause();
  if (isPlayingAlbum) {
    let album = albums[albumIndex];
    let albumSongName = album.songsName;
    let albumArtist = album.artist;
    let albumCover = album.cover;
    let albumUrl = album.url;
    albumSongIndex = (albumSongIndex + 1) % albumUrl.length;
    songName.innerHTML = albumSongName[albumSongIndex];
    songImg.src = albumCover;
    artistName.innerHTML = albumArtist;
    highlightPlaylistAlbum(albumIndex, albumSongIndex);
    playAlbum(albumIndex, albumSongIndex);
  } else if (isArtistPlaylist) {
    let artist = artistSongs[artistIndex];
    let artistSongName = artist.songsName; //Array
    let artist_name = artist.name;
    let artist_song_cover = artist.cover; //Array
    let artistSongUrl = artist.url; //Array
    artistSongIndex = (artistSongIndex + 1) % artistSongUrl.length;
    songName.innerText = artistSongName[artistSongIndex];
    songImg.src = artist_song_cover[artistSongIndex];
    audioScreenImg.src = artist_song_cover[artistSongIndex];
    artistSongName.innerText = artist_name;
    playArtistSong(artistIndex, artistSongIndex);
  } else if (isPlayingGospel) {
    // Increment the gospel song index and play the next song
    gospelSongIndex = (gospelSongIndex + 1) % gospelSongUrl.length;
    songName.innerHTML = gospelSongName[gospelSongIndex];
    songImg.src = gospelSongCover[gospelSongIndex];
    artistName.innerHTML = gospelSongArtist[gospelSongIndex];
    highlightPlaylistGospel(gospelSongIndex);
    playGospelSong(gospelSongIndex);
  } else {
    // Increment the current song index and play the next song
    currentSongIndex = (currentSongIndex + 1) % topSongsUrl.length;
    songName.innerHTML = topSongName[currentSongIndex];
    songImg.src = songCover[currentSongIndex];
    artistName.innerHTML = topSongArtist[currentSongIndex];
    highlightPlaylistSong(currentSongIndex);
    playSong(currentSongIndex);
  }
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
    highlightPlaylistSong(currentSongIndex);
    playSong(currentSongIndex);
  } else if (isPlayingAlbum) {
    //Auto play to the next song in an album
    let album = albums[albumIndex];
    let albumSongName = album.songsName;
    let albumArtist = album.artist;
    let albumCover = album.cover;
    let albumUrl = album.url;
    albumSongIndex = (albumSongIndex + 1) % albumUrl.length;
    songName.innerText = albumSongName[albumSongIndex];
    songImg.src = albumCover;
    artistName.innerHTML = albumArtist;
    highlightPlaylistAlbum(albumIndex, albumSongIndex);
    playAlbum(albumIndex, albumSongIndex);
  } else if (isArtistPlaylist) {
    let artist = artistSongs[artistIndex];
    let artistSongName = artist.songsName; //Array
    let artist_name = artist.name;
    let artist_song_cover = artist.cover; //Array
    let artistSongUrl = artist.url; //Array
    artistSongIndex = (artistSongIndex + 1) % artistSongUrl.length;
    songName.innerText = artistSongName[artistSongIndex];
    songImg.src = artist_song_cover[artistSongIndex];
    audioScreenImg.src = artist_song_cover[artistSongIndex];
    artistSongName.innerText = artist_name;
    playArtistSong(artistIndex, artistSongIndex);
  } else if (isPlayingGospel) {
    // Increment the gospel song index and play the next song
    gospelSongIndex = (gospelSongIndex + 1) % gospelSongUrl.length;
    songName.innerText = gospelSongName[gospelSongIndex];
    audioScreenImg.src = gospelSongCover[gospelSongIndex];
    songImg.src = gospelSongCover[gospelSongIndex];
    artistName.innerHTML = gospelSongArtist[gospelSongIndex];
    highlightPlaylistGospel(gospelSongIndex);
    playGospelSong(gospelSongIndex);
  } else {
    // Increment the current song index and play the next song
    currentSongIndex = (currentSongIndex + 1) % topSongsUrl.length;
    songName.innerText = topSongName[currentSongIndex];
    audioScreenImg.src = songCover[currentSongIndex];
    songImg.src = songCover[currentSongIndex];
    artistName.innerHTML = topSongArtist[currentSongIndex];
    highlightPlaylistSong(currentSongIndex);
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

//audio screen collapse button
let audioScreen = document.getElementById("audio-screen");
let audioCollapse = document.getElementById("audioCollapse");
let collapsed = true;

audioCollapse.addEventListener("click", () => {
  rotateAudioCollapse();
  if (collapsed) {
    audioScreen.style.display = "flex";
    document.body.style.overflowY = "hidden";
    collapsed = false;
  } else {
    audioScreen.style.display = "none";
    document.body.style.overflowY = "auto";
    collapsed = true;
  }
});

let rotationDegree = 0;
function rotateAudioCollapse() {
  rotationDegree += 180;
  audioCollapse.style.transform = `rotate(${rotationDegree}deg)`;
}

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

function displayAudioBar() {
  audioPlayer.style.display = "flex";
  progressSlide.style.display = "block";
}
