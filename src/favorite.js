let musicCard = document.querySelector(".music-card");

let card = document.createElement("section");
card.classList.add("card");

let favoriteCover = document.createElement("section");
favoriteCover.classList.add("favoriteCover");

let playButton = document.createElement("img");
playButton.classList.add("play-button");

favoriteCover.appendChild(playButton);

let songName = document.createElement("h3");
songName.classList.add("songName");

card.appendChild(songName);

let songArtist = document.createElement("h3");
songArtist.classList.add("songName");

card.appendChild(songArtist);

musicCard.appendChild(card);


