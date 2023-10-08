export function constructPlaylistSong() {
  let playlist = document.getElementById("playlist");
  let songs = document.createElement("div");
  songs.classList.add("songs");
  playlist.appendChild(songs);
  let playlistImg = document.createElement("div");
  playlistImg.classList.add("playlist-img");
  songs.appendChild(playlistImg);
  let playlistInfo = document.createElement("div");
  playlistInfo.classList.add("playlist-info");
  songs.appendChild(playlistInfo);

  let playlistSongName = document.createElement("div");
  playlistSongName.classList.add("playlist-songName");
  playlistInfo.appendChild(playlistSongName);

  let playlistSongArtist = document.createElement("div");
  playlistSongArtist.classList.add("playlist-songArtist");
  playlistInfo.appendChild(playlistSongArtist);

  let playlistDuration = document.createElement("div");
  playlistDuration.classList.add("playlist-duration");
  songs.appendChild(playlistDuration);
  //   let songs = document.getElementsByClassName(".songs");
  //   let img = document.createElement("img");
  //   img.src = "./songs-cover/modupe.jpeg";
  //   img.classList.add("playlist-img");

  //   for (let i = 0; i < songs.length; i++) {
  //     songs[i].appendChild(img);
  //     songs[i].classList.add("playlist-info");
  //     songs[i].classList.add("playlist-duration");
  //   }
  //   let playlistInfo = document.getElementsByClassName("playlist-info");
  //   for (let i = 0; i < playlistInfo.length; i++) {
  //     playlistInfo[i].classList.add("playlist-songName");
  //     playlistInfo[i].classList.add("playlist-songArtist");
  //   }
}
