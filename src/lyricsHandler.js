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

//Fetch handler for album songs
let albumSongsLyricsData = async () => {
  try {
    const response = await fetch("./Lyrics/albumSongs.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
};

//Fetch handler for album songs
let artistSongsLyricsData = async () => {
  try {
    const response = await fetch("./Lyrics/artistSongs.json");

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

export function albumSongLyricHandler(index, songIndex) {
  let albumLyricKey = [
    "trenchToTriumph",
    "thyKingdomCome",
    "timeless",
    "boyAlone",
    "raveRoses",
  ];

  (async () => {
    const albumLyricData = await albumSongsLyricsData();
    let songLyric = albumLyricData[`${albumLyricKey[index]}`];

    let trenchToTriumph = ["Ngozi", "Modupe", "belleFull", "ijoLaba"];
    let thyKingdomCome = ["manOfYear", "dejavu", "Karma"];
    let timeless = ["unavailable", "feel", "noCompettion", "inTheGarden"];
    let boyAlone = ["reason", "comeCloser", "itYours", "soso"];
    let raveRoses = ["calmDown", "Charm", "Holiday"];

    let albumSongs = [
      trenchToTriumph,
      thyKingdomCome,
      timeless,
      boyAlone,
      raveRoses,
    ];

    lyrics.innerText = songLyric[`${albumSongs[index][songIndex]}`];
  })();
}

export function artistSongLyricHandler(index, songIndex) {
  let artistLyricKey = [
    "Rema",
    "Asake",
    "Crayon",
    "SeyiVibez",
    "Davido",
    "omahLay",
    "postMalone",
  ];

  (async () => {
    const songLyricData = await artistSongsLyricsData();
    let songLyric = songLyricData[`${artistLyricKey[index]}`];

    let Crayon = ["Ngozi", "Modupe", "belleFull", "ijoLaba"];
    let SeyiVibez = ["manOfYear", "dejavu", "Karma"];
    let davido = ["unavailable", "feel", "noCompettion", "inTheGarden"];
    let omahLay = ["reason", "comeCloser", "itYours", "soso"];
    let rema = ["calmDown", "Charm", "Holiday"];
    let asake = ["Basquiat", "lonelyAtTheTop", "2:30", "Remember", "Sunshine"];
    let postMalone = ["Chemical", "betterNow", "Circles", "Sunflower"];

    let artists = [rema, asake, Crayon, SeyiVibez, davido, omahLay, postMalone];

    lyrics.innerText = songLyric[`${artists[index][songIndex]}`];
  })();
}
