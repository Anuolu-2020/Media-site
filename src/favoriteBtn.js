import {
  songCover,
  topSongName,
  topSongArtist,
  gospelSongCover,
  gospelSongName,
  gospelSongArtist,
} from "./audioPlayer.js";

let faveBtn = document.querySelectorAll(".favorite-button");
let gosFaveBtn = document.querySelectorAll(".gosFave");

let favBtnStates = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

let gosFaveBtnStates = [false, false, false, false, false];

let savedFavoriteArray = [];

let savedGosFaveArray = [];
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

faveBtn.forEach((btn, id) => {
  btn.addEventListener("click", () => {
    //If no states found in localStorage
    if (localStorage.getItem("faveStates") === null) {
      btn.classList.add("clicked");
      btn.classList.add("pulse");
      let newProperty = savedFavoriteProperties(id);
      savedFavoriteArray.push(newProperty);

      //Set property for the first time
      let properties = JSON.stringify(savedFavoriteArray);

      btn.src = "./ICONS/favourite-checked.png";
      //change state of button
      favBtnStates[id] = !favBtnStates[id];

      //store the new property
      localStorage.setItem("favoriteProperties", properties);

      //Save new button state to a variable
      let jsonFaveBtnStates = JSON.stringify(favBtnStates);

      //Store the new button state
      localStorage.setItem("faveStates", jsonFaveBtnStates);

      //If saved State found
    } else {
      //Retrieve saved state
      let faveBtnData = localStorage.getItem("faveStates");

      //Parse state to javascript object
      let retrievedFaveBtnData = JSON.parse(faveBtnData);

      //Retrieve buutton saved properties
      let properties = JSON.parse(localStorage.getItem("favoriteProperties"));

      //if button state is true/favorite already
      if (retrievedFaveBtnData[id] === true) {
        btn.classList.remove("clicked");
        btn.classList.remove("pulse");

        //return array without the removed item
        let newArrayProperty = properties.filter((prop) => {
          return prop.id !== id;
        });

        // console.log("New Property:", newArrayProperty);

        //Save the modified retrieved properties properties back
        localStorage.setItem(
          "favoriteProperties",
          JSON.stringify(newArrayProperty)
        );
        btn.src = "./ICONS/favourite-icon.png";

        //If button state is false/ not favorite yet
      } else {
        btn.classList.add("clicked");
        btn.classList.add("pulse");

        //Add property to retrived properties
        properties.push(savedFavoriteProperties(id));

        // console.log(JSON.stringify(retrievedProperties));
        //Save the modified retrieved properties
        localStorage.setItem("favoriteProperties", JSON.stringify(properties));
        btn.src = "./ICONS/favourite-checked.png";
      }

      retrievedFaveBtnData[id] = !retrievedFaveBtnData[id];
      let jsonFaveBtnData = JSON.stringify(retrievedFaveBtnData);
      localStorage.setItem("faveStates", jsonFaveBtnData);
    }
    // console.log(favBtnStates[id], id);
    // console.log(JSON.parse(localStorage.getItem("faveStates")));
  });
});

//Gospel song favourite button
gosFaveBtn.forEach((btn, id) => {
  btn.addEventListener("click", () => {
    //If no states found in localStorage
    if (localStorage.getItem("gosFaveStates") === null) {
      btn.classList.add("clicked");
      btn.classList.add("pulse");
      let newProperty = savedGosFavProp(id);
      savedGosFaveArray.push(newProperty);

      //Set property for the first time
      let properties = JSON.stringify(savedGosFaveArray);

      btn.src = "./ICONS/favourite-checked.png";
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

        // console.log("New Property:", newArrayProperty);

        //Save the modified retrieved properties properties back
        localStorage.setItem(
          "gosFaveProperties",
          JSON.stringify(newArrayProperty)
        );
        btn.src = "./ICONS/favourite-icon.png";

        //If button state is false/ not favorite yet
      } else {
        btn.classList.add("clicked");
        btn.classList.add("pulse");

        //Add property to retrived properties
        properties.push(savedGosFavProp(id));

        // console.log(JSON.stringify(retrievedProperties));
        //Save the modified retrieved properties
        localStorage.setItem("gosFaveProperties", JSON.stringify(properties));
        btn.src = "./ICONS/favourite-checked.png";
      }
      //Modify state of gospel button
      retrievedFaveBtnData[id] = !retrievedFaveBtnData[id];
      //convert to json
      let jsonFaveBtnData = JSON.stringify(retrievedFaveBtnData);
      //save state
      localStorage.setItem("gosFaveStates", jsonFaveBtnData);
    }
    // console.log(favBtnStates[id], id);
    // console.log(JSON.parse(localStorage.getItem("faveStates")));
  });
});
