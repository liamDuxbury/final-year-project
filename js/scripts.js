"use strict";

// import unirest from "unirest";

// var req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information");

// function loadRecipes() {
  
//   req.headers({
//     "x-rapidapi-key": "2c04ac924amshfdf390faa05e15ap152f4cjsncd6af456e587",
//     "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     "useQueryString": true
//   });
  
  
//   req.end(function (res) {
//     if (res.error) throw new Error(res.error);
    
//     console.log(res.body);
//   });
// }

async function loadObject(id) {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
  const response = await fetch(url);
  return response.json();
}

async function loadSearch(myQuery) {
  let baseURL = `https://collectionapi.metmuseum.org/public/collection/v1/search`;
  const response = await fetch(`${baseURL}?hasImages=true&q=${myQuery}`);
  return response.json();
}

async function doSearch() {
  const result = await loadSearch(myQuery.value);
  result.objectIDs.forEach(insertTile);
}

myQuery.addEventListener('change', doSearch);

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
  fpTiles.appendChild(tile);
}

