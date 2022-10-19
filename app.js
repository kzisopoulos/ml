import data from "./data.js";
const GOOGLE_URI = "https://www.google.com/search?q=";

const form = document.getElementById("search-form");
const searchText = document.querySelector(".search__bar");
const cardsGrid = document.querySelector(".cards__grid");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  window.open(GOOGLE_URI + searchText.value);
  searchText.value = "";
});

data.forEach((item) => {
  const itemDiv = document.createElement("div");
  itemDiv.className = "card__wrapper";
  itemDiv.innerHTML = `
    <h4>${item.title}</h4>
    <a href=${item.linkTo} target="_blank" class="card">
        <img
            src=${item.imageSource}
            alt="This is an image"
            class="card__image"
        />
    </a>
  `;
  cardsGrid.appendChild(itemDiv);
});
