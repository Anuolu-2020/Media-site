let upNextSelect = document.getElementById("upNext-select");
let lyricsSelect = document.getElementById("lyrics-select");

let playlist = document.getElementById("playlist");
let lyrics = document.getElementById("lyrics");

//Is up next currently selected
let isPlaylistUpNext = true;

if (isPlaylistUpNext) {
  upNextSelect.style.borderBottom = "2px solid white";
}

//when u click on lyrics
lyricsSelect.addEventListener("click", () => {
  isPlaylistUpNext = false;
  lyricsSelect.style.borderBottom = "2px solid white";
  upNextSelect.style.borderBottom = "";
  playlist.style.display = "none";
  lyrics.style.display = "flex";
});

//When u click on up next
upNextSelect.addEventListener("click", () => {
  isPlaylistUpNext = true;
  upNextSelect.style.borderBottom = "2px solid white";
  playlist.style.display = "flex";
  lyrics.style.display = "none";
  lyricsSelect.style.borderBottom = "";
});
