document.addEventListener("DOMContentLoaded", function () {
  let upNextSelect = document.getElementById("upNext-select");
  let lyricsSelect = document.getElementById("lyrics-select");

  let playlist = document.getElementById("playlist");
  let lyrics = document.getElementById("lyrics");

  let isPlaylistUpNext = true;

  if (isPlaylistUpNext) {
    upNextSelect.style.borderBottom = "2px solid white";
  }

  upNextSelect.addEventListener("click", () => {
    isPlaylistUpNext = true;
    upNextSelect.style.borderBottom = "2px solid white";
    playlist.style.display = "flex";
    lyrics.style.display = "none";
    lyricsSelect.style.borderBottom = "";
  });

  lyricsSelect.addEventListener("click", () => {
    isPlaylistUpNext = false;
    lyricsSelect.style.borderBottom = "2px solid white";
    upNextSelect.style.borderBottom = "";
    playlist.style.display = "none";
    lyrics.style.display = "flex";
  });
});
