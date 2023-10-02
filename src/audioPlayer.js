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
songImg.src = "../songs-cover/work of art.jpeg";

//For Detecting mobile Screen
function hasAccelerometer() {
  return "DeviceMotionEvent" in window;
}
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}

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
