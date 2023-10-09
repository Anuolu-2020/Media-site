import { songCover, topSongName, topSongArtist } from "./audioPlayer.js";

//Top Songs duration in order
let topSongDuration = ["2:14", "3:41", "2:55", "3:24", "2:27"];
let audioScreen = document.getElementById("audio-screen");
let sidebarTexts = document.querySelectorAll(".sidebar-text");
let playlistOrigin = document.getElementById("playlist-origin");
let audioCollapse = document.getElementById("audioCollapse");
let rotationDegree = 180;
let isPlaylistVisible = false;

//For constructing of songs ui in the playlist sidebar
export function playlistTopSongUi() {
  if (isPlaylistVisible) {
    // Playlist UI is already visible, so return early
    return;
  }

  let playlist = document.getElementById("playlist");
  audioScreen.style.display = "flex";
  document.body.style.overflowY = "hidden";
  playlistOrigin.innerText = "Playing from Top Songs";

  //Rotating animation of the collapse button
  audioCollapse.style.transform = `rotate(${rotationDegree}deg)`;

  sidebarTexts.forEach((text) => {
    text.style.display = "none";
  });

  //Creating Songs ui based on the amount of songs available
  for (let i = 0; i < songCover.length; i++) {
    let songs = document.createElement("div");
    songs.classList.add("songs");
    playlist.appendChild(songs);
    let playlistImg = document.createElement("img");
    playlistImg.classList.add("playlist-img");

    //images source for the playlist images
    playlistImg.src = songCover[i];
    songs.appendChild(playlistImg);

    let playlistInfo = document.createElement("div");
    playlistInfo.classList.add("playlist-info");
    songs.appendChild(playlistInfo);

    let playlistSongName = document.createElement("div");
    playlistSongName.classList.add("playlist-songName");

    //playlist song name
    playlistSongName.innerText = topSongName[i];
    playlistInfo.appendChild(playlistSongName);

    let playlistSongArtist = document.createElement("div");
    playlistSongArtist.classList.add("playlist-songArtist");

    //Names of artist of the playlist
    playlistSongArtist.innerText = topSongArtist[i];
    playlistInfo.appendChild(playlistSongArtist);

    let playlistDuration = document.createElement("div");
    playlistDuration.classList.add("playlist-duration");

    //Songs duration for top songs
    playlistDuration.innerText = topSongDuration[i];
    songs.appendChild(playlistDuration);
  }
  isPlaylistVisible = true;
}
