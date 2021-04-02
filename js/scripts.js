"use strict";

async function loadObject(id) {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
  const response = await fetch(url);
  return response.json();
}

function loadRecipes() {
  const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?url=http%3A%2F%2Fwww.melskitchencafe.com%2Fthe-best-fudgy-brownies%2F"
  const response = fetch(url, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "2c04ac924amshfdf390faa05e15ap152f4cjsncd6af456e587",
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
  return response
}

function buildTileFromData(obj) {
  const tile = document.createElement("article");
  const img = document.createElement("img");
  img.src = obj.primaryImageSmall;
  img.alt = obj.title;
  tile.appendChild(img);
  return tile;
}

async function insertTile(id) {
  const obj = await loadObject(id);
  const tile = buildTileFromData(obj);
  results.appendChild(tile);
}

