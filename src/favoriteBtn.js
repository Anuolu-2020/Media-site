import {
  songCover,
  topSongName,
  topSongArtist,
  gospelSongCover,
  gospelSongName,
  gospelSongArtist,
} from "./audioPlayer.js";

import { albumName, albumArtists, albumLinks } from "./links.js";

let faveBtn = document.querySelectorAll(".favorite-button");
let gosFaveBtn = document.querySelectorAll(".gosFave");

let favBtnStates = [false, false, false, false, false];

let albumFavBtnStates = [false, false, false, false, false];

let gosFaveBtnStates = [false, false, false, false, false];

let savedFavoriteArray = [];

let savedGosFaveArray = [];

let savedAlbumArray = [];

//favorite button data schema
function savedFavoriteProperties(index) {
  let properties = {
    id: index,
    cover: `${songCover[index]}`,
    name: `${topSongName[index]}`,
    artist: `${topSongArtist[index]}`,
  };

  return properties;
}

//Properties schema for favorite gospel song
function savedGosFavProp(index) {
  let properties = {
    id: index,
    cover: `${gospelSongCover[index]}`,
    name: `${gospelSongName[index]}`,
    artist: `${gospelSongArtist[index]}`,
  };

  return properties;
}

let nameOfAlbum = [
  albumName.num1,
  albumName.num2,
  albumName.num3,
  albumName.num4,
  albumName.num5,
];

let albumArtistName = [
  albumArtists.num1,
  albumArtists.num2,
  albumArtists.num3,
  albumArtists.num4,
  albumArtists.num5,
];

let albumCover = [
  albumLinks.trenchToTriumph,
  albumLinks.thyKingdomCome,
  albumLinks.timeless,
  albumLinks.boyAlone,
  albumLinks.raveRoses,
];

let nameOfsongsAlbum = [
  [
    "Ngozi ft Arya Starr",
    "Modupe",
    "Belle Full ft Victony & Ktizo",
    "Ijo (Laba Laba)",
  ],
  ["Man of the year", "Dejavu", "Karma"],
  [
    "Unavailable ft Musa Keys",
    "FEEL",
    "No Competition ft Asake",
    "In The Garden ft Morravey",
  ],
  ["Reason", "Come Closer", "It's Yours", "Soso ft Ozuna"],
  ["Calm Down ft Selena Gomez", "Charm", "Holiday"],
];

//Properties schema for favorite gospel song
function savedAlbumFavProp(index) {
  let properties = {
    id: index,
    cover: `${albumCover[index - 5]}`,
    name: `${nameOfAlbum[index - 5]}`,
    artist: `${albumArtistName[index - 5]}`,
    songsName: nameOfsongsAlbum[index - 5],
  };

  return properties;
}

/////////////////////

faveBtn.forEach((btn, id) => {
  btn.addEventListener("click", () => {
    let notify = document.getElementById("notifyAction");
    let notifyText = document.getElementById("notifyText");
    //if its an album
    if (id >= 4) {
      if (localStorage.getItem("albumFaveStates") === null) {
        btn.classList.add("clicked");
        btn.classList.add("pulse");

        //change state of button
        albumFavBtnStates[id - 5] = !albumFavBtnStates[id - 5];

        //Save new button state to a variable
        let jsonFaveBtnStates = JSON.stringify(albumFavBtnStates);

        //Store the new button state
        localStorage.setItem("albumFaveStates", jsonFaveBtnStates);

        let newAlbumProperty = savedAlbumFavProp(id);
        savedAlbumArray.push(newAlbumProperty);

        //Set property for the first time
        let arrayProperties = JSON.stringify(savedAlbumArray);

        //store the new property for albums
        localStorage.setItem("favoriteAlbumProp", arrayProperties);

        btn.src = "./ICONS/favourite-checked.png";

        notify.style.display = "flex";
        notifyText.innerText = "Saved To Favorites";
        //state found
      } else {
        //Retrieve saved state
        let faveBtnData = localStorage.getItem("albumFaveStates");

        //Parse state to javascript object
        let retrievedFaveBtnData = JSON.parse(faveBtnData);

        //Retrieve button saved properties
        let albumProperties = JSON.parse(
          localStorage.getItem("favoriteAlbumProp")
        );

        //if button state is true
        if (retrievedFaveBtnData[id - 5] === true) {
          btn.classList.remove("clicked");
          btn.classList.remove("pulse");

          //return array without the removed item
          let newArrayProperty = albumProperties.filter((prop) => {
            return prop.id !== id;
          });

          //Save the modified retrieved properties properties back
          localStorage.setItem(
            "favoriteAlbumProp",
            JSON.stringify(newArrayProperty)
          );

          btn.src = "./ICONS/favourite-icon.png";

          notify.style.display = "flex";
          notifyText.innerText = "Removed From Favorites";

          //button state is false
        } else {
          btn.classList.add("clicked");
          btn.classList.add("pulse");

          //Add album property to retrived properties
          albumProperties.push(savedAlbumFavProp(id));

          //Save the modified retrieved album properties
          localStorage.setItem(
            "favoriteAlbumProp",
            JSON.stringify(albumProperties)
          );

          btn.src = "./ICONS/favourite-checked.png";

          notify.style.display = "flex";
          notifyText.innerText = "Saved To Favorites";
        }

        //change button state
        retrievedFaveBtnData[id - 5] = !retrievedFaveBtnData[id - 5];
        let jsonFaveBtnData = JSON.stringify(retrievedFaveBtnData);
        //store the state
        localStorage.setItem("albumFaveStates", jsonFaveBtnData);
      }
    }

    if (id <= 4) {
      //For favorite top songs
      if (localStorage.getItem("faveStates") === null) {
        btn.classList.add("clicked");
        btn.classList.add("pulse");

        //change state of button
        favBtnStates[id] = !favBtnStates[id];

        //Save new button state to a variable
        let jsonFaveBtnStates = JSON.stringify(favBtnStates);

        //Store the new button state
        localStorage.setItem("faveStates", jsonFaveBtnStates);

        let newProperty = savedFavoriteProperties(id);
        savedFavoriteArray.push(newProperty);

        //Set property for the first time
        let arrayProperties = JSON.stringify(savedFavoriteArray);

        //store the new property for albums
        localStorage.setItem("favoriteProperties", arrayProperties);

        btn.src = "./ICONS/favourite-checked.png";

        notify.style.display = "flex";
        notifyText.innerText = "Saved To Favorites";
        //state found
      } else {
        //Retrieve saved state
        let faveBtnData = localStorage.getItem("faveStates");

        //Parse state to javascript object
        let retrievedFaveBtnData = JSON.parse(faveBtnData);

        //Retrieve button saved properties
        let properties = JSON.parse(localStorage.getItem("favoriteProperties"));

        //if button state is true
        if (retrievedFaveBtnData[id] === true) {
          btn.classList.remove("clicked");
          btn.classList.remove("pulse");

          //return array without the removed item
          let newArrayProperty = properties.filter((prop) => {
            return prop.id !== id;
          });

          //Save the modified retrieved properties properties back
          localStorage.setItem(
            "favoriteProperties",
            JSON.stringify(newArrayProperty)
          );

          btn.src = "./ICONS/favourite-icon.png";

          notify.style.display = "flex";
          notifyText.innerText = "Removed From Favorites";

          //button state is false
        } else {
          btn.classList.add("clicked");
          btn.classList.add("pulse");

          //Add album property to retrived properties
          properties.push(savedFavoriteProperties(id));

          //Save the modified retrieved album properties
          localStorage.setItem("favoriteAlbumProp", JSON.stringify(properties));

          btn.src = "./ICONS/favourite-checked.png";

          notify.style.display = "flex";
          notifyText.innerText = "Saved To Favorites";
        }

        //change button state
        retrievedFaveBtnData[id] = !retrievedFaveBtnData[id];
        let jsonFaveBtnData = JSON.stringify(retrievedFaveBtnData);
        //store the state
        localStorage.setItem("faveStates", jsonFaveBtnData);
      }
    }
  });
});

//////////////////////////////////

//Gospel song favourite button
gosFaveBtn.forEach((btn, id) => {
  btn.addEventListener("click", () => {
    let notify = document.getElementById("notifyAction");
    let notifyText = document.getElementById("notifyText");
    //If no states found in localStorage
    if (localStorage.getItem("gosFaveStates") === null) {
      btn.classList.add("clicked");
      btn.classList.add("pulse");
      let newProperty = savedGosFavProp(id);
      savedGosFaveArray.push(newProperty);

      //Set property for the first time
      let properties = JSON.stringify(savedGosFaveArray);

      btn.src = "./ICONS/favourite-checked.png";

      notify.style.display = "flex";
      notifyText.innerText = "Saved To Favorites";

      //change state of button
      gosFaveBtnStates[id] = !gosFaveBtnStates[id];

      //store the new property
      localStorage.setItem("gosFaveProperties", properties);

      //Save new button state to a variable
      let jsonFaveBtnStates = JSON.stringify(gosFaveBtnStates);

      //Store the new button state
      localStorage.setItem("gosFaveStates", jsonFaveBtnStates);

      //If saved State found
    } else {
      //Retrieve saved state
      let faveBtnData = localStorage.getItem("gosFaveStates");

      //Parse state to javascript object
      let retrievedFaveBtnData = JSON.parse(faveBtnData);

      //Retrieve button saved properties
      let properties = JSON.parse(localStorage.getItem("gosFaveProperties"));

      //if button state is true/favorite already
      if (retrievedFaveBtnData[id] === true) {
        btn.classList.remove("clicked");
        btn.classList.remove("pulse");

        //return array without the removed item
        let newArrayProperty = properties.filter((prop) => {
          return prop.id !== id;
        });

        //Save the modified retrieved properties properties back
        localStorage.setItem(
          "gosFaveProperties",
          JSON.stringify(newArrayProperty)
        );
        btn.src = "./ICONS/favourite-icon.png";

        notify.style.display = "flex";
        notifyText.innerText = "Removed From Favorites";

        //If button state is false/ not favorite yet
      } else {
        btn.classList.add("clicked");
        btn.classList.add("pulse");

        //Add property to retrived properties
        properties.push(savedGosFavProp(id));

        //Save the modified retrieved properties
        localStorage.setItem("gosFaveProperties", JSON.stringify(properties));
        btn.src = "./ICONS/favourite-checked.png";

        notify.style.display = "flex";
        notifyText.innerText = "Saved To Favorites";
      }
      //Modify state of gospel button
      retrievedFaveBtnData[id] = !retrievedFaveBtnData[id];
      //convert to json
      let jsonFaveBtnData = JSON.stringify(retrievedFaveBtnData);
      //save state
      localStorage.setItem("gosFaveStates", jsonFaveBtnData);
    }
  });
});

//Close notification for favorites
let closeNotify = document.getElementById("closeNotify");

closeNotify.addEventListener("click", () => {
  let notify = document.getElementById("notifyAction");

  notify.style.display = "none";
});
