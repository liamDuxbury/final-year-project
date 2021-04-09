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

function generateHeader() {
  const template = document.createElement('template');
  template.innerHTML = `
    <header>
      <link rel="stylesheet" href="css/styles.css">
      <section class="topper">
          <h1>Cooking</h1>
          <div id="menuToggler">&#8801;</div> 
          <nav id="menu">
            <a href="home.html">Home</a>
            <a href="recipes.html">Recipes</a>
            <a href="discover.html">Discover</a>
            <a href="about.html">About</a>
          </nav> 
          <section class="search">
            <input id="myQuery"  type="text" placeholder="Search..." aria-label="search">
            <button id="searchButton">&#128269;</button>
          </section>
      </section> 
    <header>
  `
  document.body.appendChild(template.content);
  menuToggler.addEventListener('click', ev => {
    menu.classList.toggle('open');
  });
  myQuery.addEventListener('change', doSearch);
  window.onscroll = function() {
    if(menuToggler.classList != 'contrast'){
      menuToggler.classList.toggle('contrast');
    }
    if(window.scrollY == 0){
      menuToggler.classList.toggle('contrast');
    }
  }

}


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

async function doSearch(ev) {
  clearResults();
  const result = await loadSearch(myQuery.value);
  result.objectIDs.forEach(insertTile);
}

// TODO: Create generic fucntion and use plain text to build DOM || Make the html generated?

function generateHome() {
  const template = document.createElement('template');
  template.innerHTML = `
      <section class="hero">
        <img src="pictures/hero_image.jpeg" alt="hero_image" class="heroImage">
        <p class="heroText">Cooking Made Simple</p>
      </section>
      <section id="fpTiles"></section>
  `
  document.body.appendChild(template.content);
}

function generateAbout() {
  const template = document.createElement('template');
  template.innerHTML = `
    <p>This is the about page </p>
  `
  document.body.appendChild(template.content);
}

function generateRecipes() {
  const template = document.createElement('template');
  template.innerHTML = `
    <p>This is the recipes page </p>
  `
  document.body.appendChild(template.content);
}

function generateDiscover() {
  const template = document.createElement('template');
  template.innerHTML = `
    <p>This is the discover page </p>
  `
  document.body.appendChild(template.content);
}

function generateDefault() {
  const template = document.createElement('template');
  template.innerHTML = `
    <h1>OOOOooOOOoOOPPPPssss!!!</h>
    <h2>You are in the wrong neighborhood</h2>
    <p>This is the discover page </p>
  `
  document.body.appendChild(template.content);
}


function generateMain(pageName) {
  switch (pageName) {
    case "home":
      generateHome()
      break;
    
    case "about":
      generateAbout()
      break;

    case "recipes":
      generateRecipes()
      break; 

    case "discover":
      generateDiscover()
      break;  
  
    default:
      generateDefault()
      break;
  }
}

window.onload = function() {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  var pageName = page.split(".")[0]
  console.log(pageName)
  generateHeader();
  generateMain(pageName)
}

function clearResults() {
  while(fpTiles.firstChild) {
    fpTiles.firstChild.remove();
  }
}

function handle(e){
  if(e.key === "Enter"){
  }
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
  fpTiles.appendChild(tile);
}
