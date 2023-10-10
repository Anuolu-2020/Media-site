const audio = document.getElementById("audio");
const loader = document.getElementById("Loading");
let playPauseBtn = document.getElementById("playPauseBtn");

function showLoader() {
  // Display the loader
  loader.style.display = "block";
  playPauseBtn.style.display = "none";
}

function hideLoader() {
  // Hide the loader
  loader.style.display = "none";
  playPauseBtn.style.display = "block";
}

audio.addEventListener("canplay", hideLoader);

audio.addEventListener("loadstart", showLoader);
