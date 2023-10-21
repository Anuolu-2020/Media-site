let faveBtn = document.querySelectorAll(".favorite-button");

let isFaveSaved = false;

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

faveBtn.forEach((btn, id) => {
  btn.addEventListener("click", () => {
    if (localStorage.getItem("faveStates") === null) {
      favBtnStates[id] = !favBtnStates[id];
      let jsonFaveBtnStates = JSON.stringify(favBtnStates);
      localStorage.setItem("faveStates", jsonFaveBtnStates);
    } else {
      let faveBtnData = localStorage.getItem("faveStates");
      let retrievedFaveBtnData = JSON.parse(faveBtnData);
      if (retrievedFaveBtnData[id] === true) {
        btn.src = "./ICONS/favourite-icon.png";
      } else {
        btn.src = "./ICONS/favourite-checked.png";
      }
      retrievedFaveBtnData[id] = !retrievedFaveBtnData[id];
      let jsonFaveBtnData = JSON.stringify(retrievedFaveBtnData);
      localStorage.setItem("faveStates", jsonFaveBtnData);
    }
    // console.log(favBtnStates[id], id);
    console.log(JSON.parse(localStorage.getItem("faveStates")));
  });
});
