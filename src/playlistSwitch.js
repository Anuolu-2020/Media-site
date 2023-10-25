// import { lyricHandler } from "./audioPlayer.js";

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

//Fetch handler for top song lyrics
let topSongsLyricsData = async () => {
  try {
    const response = await fetch("./Lyrics/topSongs.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
};

//Fetch handler for gospel songs
let gospelSongsLyricsData = async () => {
  try {
    const response = await fetch("./Lyrics/gospelSongs.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
};

(async () => {
  const lyric = await gospelSongsLyricsData();
  console.log(lyric["goodnessOfGod"]);
})();

/////////////////////////////////////////////////
////LYRICS HANDLER//////////////////

export function topSongLyricHandler(index) {
  let topSongLyric = ["Basquiat", "Ngozi", "Modupe", "Charm", "Reason"];

  // Call the async function to read the JSON file
  (async () => {
    const lyric = await topSongsLyricsData();

    lyrics.innerText = JSON.stringify(lyric[`${topSongLyric[index]}`], 2);
  })();
}
