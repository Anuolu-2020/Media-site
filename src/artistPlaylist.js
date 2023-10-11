import { songArtists } from "./links.js";
import { musicLinks } from "./musicLinks.js";
import { playlistArtistSongUi } from "./audioScreen.js";
import { playArtistSong } from "./audioPlayer.js";


let musicCovers = {
  calmDown: "./songs-cover/calm down.jpeg",
  charm: "./songs-cover/charm.jpeg",
  holiday: "./songs-cover/holiday.jpeg",
  basquiat: "./songs-cover/work of art.jpeg",
  lonelyAtTheTop: "./songs-cover/work of art.jpeg",
  twoThirty: "./songs-cover/2.30.jpeg",
  remember: "./songs-cover/remember.jpeg",
  sunshine: "./songs-cover/work of art.jpeg",
  ngozi: "./songs-cover/Ngozi.jpeg",
  modupe: "./songs-cover/modupe.jpeg",
  belleFull: "./songs-cover/belleful.jpeg",
  ijoLaba: "./songs-cover/ijo(laba laba).jpeg",
  manOfTheYear: "./songs-cover/manOfTheYear.jpeg",
  dejavu: "./songs-cover/dejavu.jpeg",
  karma: "./songs-cover/manOfTheYear.jpeg",
  unavailable: "./songs-cover/timeless.jpeg",
  feel: "./songs-cover/timeless.jpeg",
  noCompetition: "./songs-cover/timeless.jpeg",
  inTheGarden: "./songs-cover/timeless.jpeg",
  reason: "./songs-cover/Reason(song).jpeg",
  comeCloser: "./songs-cover/reason.jpeg",
  itsYours: "./songs-cover/reason.jpeg",
  soso: "./songs-cover/soso(Remix).jpeg",
  chemical: "./songs-cover/chemical.jpeg",
  betterNow: "./songs-cover/better now.jpeg",
  circles: "./songs-cover/circles.jpeg",
  sunflower: "./songs-cover/sunflower.jpeg",
};

export const artistSongs = [
  {
    name: songArtists.art1,
    cover: [musicCovers.calmDown, musicCovers.charm, musicCovers.holiday],
    songsName: ["Calm Down ft Selena Gomez", "Charm", "Holiday"],
    songDuration: [],
    url: [musicLinks.calmDown, musicLinks.charm, musicLinks.holiday],
  },
  {
    name: songArtists.art2,
    cover: [
      musicCovers.basquiat,
      musicCovers.lonelyAtTheTop,
      musicCovers.twoThirty,
      musicCovers.remember,
      musicCovers.sunshine,
    ],
    songsName: [
      "Basquiat",
      "Lonely At The Top",
      "2:30",
      "Remember",
      "Sunshine",
    ],
    songDuration: [],
    url: [
      musicLinks.basquiat,
      musicLinks.lonelyAtTheTop,
      musicLinks.twoThirty,
      musicLinks.remember,
      musicLinks.sunshine,
    ],
  },
  {
    name: songArtists.art3,
    cover: [
      musicCovers.ngozi,
      musicCovers.modupe,
      musicCovers.belleFull,
      musicCovers.ijoLaba,
    ],
    songsName: [
      "Ngozi ft Arya Starr",
      "Modupe",
      "Belle Full ft Victony & Ktizo",
      "Ijo (Laba Laba)",
    ],
    songDuration: [],
    url: [
      musicLinks.Ngozi,
      musicLinks.modupe,
      musicLinks.belleFull,
      musicLinks.ijoLaba,
    ],
  },
  {
    name: songArtists.art5,
    cover: [musicCovers.manOfTheYear, musicCovers.dejavu, musicCovers.karma],
    songsName: ["Man Of The Year", "Dejavu", "Karma"],
    songDuration: [],
    url: [musicLinks.manOfTheYear, musicLinks.dejavu, musicLinks.karma],
  },
  {
    name: songArtists.art6,
    cover: [
      musicCovers.unavailable,
      musicCovers.feel,
      musicCovers.noCompetition,
      musicCovers.inTheGarden,
    ],
    songsName: [
      "Unavailable ft Musa Keys",
      "Feel",
      "No Competition ft Asake",
      "In The Garden ft Morravey",
    ],
    songDuration: [],
    url: [
      musicLinks.unavailable,
      musicLinks.feel,
      musicLinks.noCompetition,
      musicLinks.inTheGarden,
    ],
  },
  {
    name: songArtists.art7,
    cover: [
      musicCovers.reason,
      musicCovers.comeCloser,
      musicCovers.itsYours,
      musicCovers.soso,
    ],
    songsName: ["Reason", "Come Closer", "It's Yours", "Soso ft Ozuna"],
    songDuration: [],
    url: [
      musicLinks.reason,
      musicLinks.comeCloser,
      musicLinks.itsYours,
      musicLinks.soso,
    ],
  },
  {
    name: songArtists.art8,
    cover: [
      musicCovers.chemical,
      musicCovers.betterNow,
      musicCovers.circles,
      musicCovers.sunflower,
    ],
    songsName: ["Chemical", "Better Now", "Circles", "Sunflower ft Swae Lee"],
    songDuration: [],
    url: [
      musicLinks.chemical,
      musicLinks.betterNow,
      musicLinks.circles,
      musicLinks.sunflower,
    ],
  },
];

export function highlightArtistPlaylist(artistIndex, index) {
  if (isArtistPlaylist) {
    let songsUi = document.querySelectorAll(".songs");
    songsUi.forEach((song, idx) => {
      song.addEventListener("click", () => {
        let song = songArtists[artistIndex];
        // audio.pause();
        let songName = song.songsName;
        let songCover = song.cover;
        playArtistSong(artistIndex, idx);
        songImg.src = songCover[idx];
        //img for audio screen
        audioScreenImg.src = songCover[idx];
        songName.innerHTML = songName[idx];
        artistName.innerHTML = song.artist;
        if (idx === index) {
          song.style.backgroundColor = "rgb(138, 45, 138)";
        }
      });
      if (idx === index) {
        song.style.backgroundColor = "rgb(138, 45, 138)";
      } else {
        // Reset the background color for other songs
        song.style.backgroundColor = "";
      }
    });
  }
}
