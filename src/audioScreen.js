import {
  songCover,
  topSongName,
  topSongArtist,
  albums,
  audioScreenImg,
  artistName,
  songName,
  audio,
  playAlbum,
} from "./audioPlayer.js";
import { artistSongs } from "./artistPlaylist.js";

// import { albumName } from "./links.js";
//Top Songs duration in order
let topSongDuration = ["2:14", "3:41", "2:55", "3:24", "2:27"];
let audioScreen = document.getElementById("audio-screen");
let sidebarTexts = document.querySelectorAll(".sidebar-text");
let playlistOrigin = document.getElementById("playlist-origin");
let audioCollapse = document.getElementById("audioCollapse");
let audioPlayer = document.getElementById("audioPlayer");
let progressSlide = document.getElementById("progressSlide");

let rotationDegree = 180;
let isPlaylistVisible = false;

//For constructing of songs ui in the playlist sidebar
export function playlistTopSongUi() {
  if (isPlaylistVisible) {
    // Playlist UI is already visible, so return early
    let songsUi = document.querySelectorAll(".songs");
    songsUi.forEach((song) => {
      song.remove();
    });
  }

  let playlist = document.getElementById("playlist");
  audioScreen.style.display = "flex";
  document.body.style.overflowY = "hidden";
  playlistOrigin.innerText = "Playing from Today's Top Songs";

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

let albumSongsDuration = [
  ["3:41", "2:55", "3:11", "3:06"],
  ["2:24", "2:41", "2:34"],
  ["2:49", "2:34", "2:36", "2:45"],
  ["2:27", "2:35", "2:45", "3:22"],
  ["3:59", "2:39", "3:24"],
];

export function playlistAlbumSongUi(albumIndex) {
  if (isPlaylistVisible) {
    // Playlist UI is already visible, so return early
    let songsUi = document.querySelectorAll(".songs");
    songsUi.forEach((song) => {
      song.remove();
    });
  }

  let album = albums[albumIndex];
  let albumName = album.name;
  let albumSongs = album.songsName;
  let albumArtist = album.artist;
  let albumCover = album.cover;
  let albumDuration = albumSongsDuration[albumIndex];

  let playlist = document.getElementById("playlist");
  audioScreen.style.display = "flex";
  document.body.style.overflowY = "hidden";
  playlistOrigin.innerText = `Playing from ${albumName}`;

  //Rotating animation of the collapse button
  audioCollapse.style.transform = `rotate(${rotationDegree}deg)`;

  sidebarTexts.forEach((text) => {
    text.style.display = "none";
  });

  //Creating Songs ui based on the amount of songs available
  for (let i = 0; i < albumSongs.length; i++) {
    let songs = document.createElement("div");
    songs.classList.add("songs");
    playlist.appendChild(songs);
    let playlistImg = document.createElement("img");
    playlistImg.classList.add("playlist-img");

    //images source for the playlist images
    playlistImg.src = albumCover;
    songs.appendChild(playlistImg);

    let playlistInfo = document.createElement("div");
    playlistInfo.classList.add("playlist-info");
    songs.appendChild(playlistInfo);

    let playlistSongName = document.createElement("div");
    playlistSongName.classList.add("playlist-songName");

    //playlist song name
    playlistSongName.innerText = albumSongs[i];
    playlistInfo.appendChild(playlistSongName);

    let playlistSongArtist = document.createElement("div");
    playlistSongArtist.classList.add("playlist-songArtist");

    //Names of artist of the playlist
    playlistSongArtist.innerText = albumArtist;
    playlistInfo.appendChild(playlistSongArtist);

    let playlistDuration = document.createElement("div");
    playlistDuration.classList.add("playlist-duration");

    //Songs duration for top songs
    playlistDuration.innerText = albumDuration[i];
    songs.appendChild(playlistDuration);
  }
  isPlaylistVisible = true;
}

export function playlistArtistSongUi(songIndex) {
  if (isPlaylistVisible) {
    // Playlist UI is already visible, so return early
    let songsUi = document.querySelectorAll(".songs");
    songsUi.forEach((song) => {
      song.remove();
    });
  }

  let artistSong = artistSongs[songIndex];
  let artistName = artistSong.name;
  let artistSongName = artistSong.songsName; //array
  let artistSongCover = artistSong.cover; //array
  let artistSongDuration = artistSong.songDuration; //array

  let playlist = document.getElementById("playlist");
  audioScreen.style.display = "flex";
  audioPlayer.style.display = "flex";
  progressSlide.style.display = "flex";
  document.body.style.overflowY = "hidden";
  playlistOrigin.innerText = `Playing from ${artistName} songs`;

  //Rotating animation of the collapse button
  audioCollapse.style.transform = `rotate(${rotationDegree}deg)`;

  sidebarTexts.forEach((text) => {
    text.style.display = "none";
  });

  //Creating Songs ui based on the amount of songs available
  for (let i = 0; i < artistSongName.length; i++) {
    let songs = document.createElement("div");
    songs.classList.add("songs");
    playlist.appendChild(songs);
    let playlistImg = document.createElement("img");
    playlistImg.classList.add("playlist-img");

    //images source for the playlist images
    playlistImg.src = artistSongCover[i];
    songs.appendChild(playlistImg);

    let playlistInfo = document.createElement("div");
    playlistInfo.classList.add("playlist-info");
    songs.appendChild(playlistInfo);

    let playlistSongName = document.createElement("div");
    playlistSongName.classList.add("playlist-songName");

    //playlist song name
    playlistSongName.innerText = artistSongName[i];
    playlistInfo.appendChild(playlistSongName);

    let playlistSongArtist = document.createElement("div");
    playlistSongArtist.classList.add("playlist-songArtist");

    //Names of artist of the playlist
    playlistSongArtist.innerText = artistName;
    playlistInfo.appendChild(playlistSongArtist);

    let playlistDuration = document.createElement("div");
    playlistDuration.classList.add("playlist-duration");

    //Songs duration for top songs
    playlistDuration.innerText = artistSongDuration[i];
    songs.appendChild(playlistDuration);
  }
  isPlaylistVisible = true;
}
// function highlightPlaylistSong(index) {
//   //playlistUi static Hover effect
//   let songsUi = document.querySelectorAll(".songs");
//   songsUi.forEach((song, idx) => {
//     song.addEventListener("click", () => {
//       audio.pause();
//       isPlayingAlbum = true;
//       playSong(idx);
//       songImg.src = songCover[idx];
//       //img for audio screen
//       audioScreenImg.src = songCover[idx];
//       songName.innerHTML = topSongName[idx];
//       artistName.innerHTML = topSongArtist[idx];
//       if (idx === index) {
//         song.style.backgroundColor = "rgb(138, 45, 138)";
//       }
//     });
//     if (idx === index) {
//       song.style.backgroundColor = "rgb(138, 45, 138)";
//     } else {
//       // Reset the background color for other songs
//       song.style.backgroundColor = "";
//     }
//   });
// }


// export function highlightPlaylistSong(songIndex) {
//   //playlistUi static Hover effect
//   let songsUi = document.querySelectorAll(".songs");
//   songsUi.forEach((song, idx) => {
//     if (idx === index) {
//       song.style.backgroundColor = "rgb(138, 45, 138)";
//     } else {
//       // Reset the background color for other songs
//       song.style.backgroundColor = "";
//     }
//   });
// }
