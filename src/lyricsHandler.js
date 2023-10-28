let lyrics = document.getElementById("lyrics");

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

/////////////////////////////////////////////////
////LYRICS HANDLER//////////////////

export function topSongLyricHandler(index) {
  let topSongLyric = ["Basquiat", "Ngozi", "Modupe", "Charm", "Reason"];

  // Call the async function to read the JSON file
  (async () => {
    const lyric = await topSongsLyricsData();

    lyrics.innerText = lyric[`${topSongLyric[index]}`];
  })();
}

export function gospelSongLyricHandler(index) {
  let gospelSongLyric = [
    "goodnessOfGod",
    "recklessLove",
    "ebenezeri",
    "ebenezer",
    "bola",
  ];

  (async () => {
    const lyric = await gospelSongsLyricsData();
    lyrics.innerText = lyric[`${gospelSongLyric[index]}`];
  })();
}
