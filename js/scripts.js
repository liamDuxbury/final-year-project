"use strict";

let apiHeaders =  {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "2c04ac924amshfdf390faa05e15ap152f4cjsncd6af456e587",
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
  }
}

const baseRecipeURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes`;

const disoverTopics = ["Vegetarian", "Japanese", "Noodles", "Burger", "BBQ"];

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

function generateHome() {
  const template = document.createElement('template');
  template.innerHTML = `
      <section class="hero">
        <img src="pictures/hero_image.jpeg" alt="hero_image" class="heroImage">
        <p class="heroText">Cooking Made Simple</p>
      </section>
      <section id="homeTiles"></section>
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
    <section class="discoverTiles" id="bannerTiles"></section>
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

function getPageName() {
  var path = window.location.pathname;
  var page = path.split("/").pop();
  var pageName = page.split(".")[0]
  return pageName;
}

window.onload = function() {
  var pageName = getPageName();
  console.log(pageName)
  generateHeader();
  generateMain(pageName)
}

async function callAPI(url) {
  const response = await fetch(url, apiHeaders);
  if (response instanceof Error){
    console.err(response);
    return {}
  }
  return response;
}

async function loadSearch(myQuery) {
  const limit = 10;
  // optional query params = diet=vegetarian&excludeIngredients=coconut&intolerances=egg%2C%20gluten&number=10&offset=0&type=main%20course
  let searchURL = `${baseRecipeURL}/search?query=${myQuery}&number=${limit}`;
  const response = await callAPI(searchURL);
  return response.json();
}

async function getRecipeInfo(id){
  let getRecipeURL = `${baseRecipeURL}/${id}/information`;
  const response = await callAPI(getRecipeURL);
  return response.json();
}


async function doSearch(ev) {
  clearResults();
  const result = await loadSearch(myQuery.value);
  result.results.forEach(insertTile);
}


function clearResults() {
  while(homeTiles.firstChild) {
    homeTiles.firstChild.remove();
  }
}

function handle(e){
  if(e.key === "Enter"){
  }
}

async function buildTileFromData(recipe) {
  const tile = document.createElement("article");
  const tileContainer = document.createElement("section")
  const img = document.createElement("img");
  const recipeInformation = await getRecipeInfo(recipe.id);
  img.src = recipeInformation.image;
  img.alt = recipeInformation.title.substring(0, 25);
  tileContainer.appendChild(img);
  tile.appendChild(tileContainer);
  return tile;
}

function buildTileData(tile) {
  const tileContainer = tile.firstChild;
  const title = document.createElement("h3");
  title.innerHTML = `${tile.firstChild.firstChild.alt}`;
  tileContainer.classList.add("tileTitle")
  tileContainer.appendChild(title);
  return tileContainer;
}

async function insertTile(recipe) {
  const pageName = getPageName();
  const tileClass = document.getElementById(`${pageName}Tiles`);
  const tile = await buildTileFromData(recipe);
  const tileData = buildTileData(tile);
  tile.appendChild(tileData);
  tileClass.appendChild(tile);
}

async function buildBannerFromRecipes(recipe) {

}

async function insertRecipeBanner(recipe) {
  const banner = await buildBannerFromRecipes(recipe);
  const bannerDate = buildBannerData(banner)
  bannerTiles.appendChild(banner);
}
