"use strict";

let apiHeaders =  {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "2c04ac924amshfdf390faa05e15ap152f4cjsncd6af456e587",
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
  }
}

const baseRecipeURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes`;

const disoverTopics = ["Vegetarian", "Japanese", "Noodles", "Indian", "BBQ"]; 
var tileIndex = 1;

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
            <input id="myQuery"  type="text" onfocus="this.value=''" placeholder="Search..." aria-label="search">
            <button class="searchButton" id="searchButton">&#128269;</button>
          </section>
      </section> 
    </header>
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

function generateFooter() {
  const template = document.createElement('template');
  template.innerHTML = `
    <footer></footer>
  `
  document.body.appendChild(template.content);
}

function generateHome() {
  const template = document.createElement('template');
  template.innerHTML = `
    <section class="hero">
      <img src="pictures/hero_image.jpeg" alt="hero_image" class="heroImage">
      <p class="heroText">Cooking Made Simple</p>
    </section>
    <form class="signup">
      <label for="emailInput">Sign-up today!</label>
      <input type="text" name="email" id="emailInput">
      <input type="submit" value="Sign-up" id="emailSubmitButton">
    </form>
    <section class="suggestionTiles">
      <img src="pictures/best-chopping-boards-lead.jpg" alt="chopping_board" class="boardImage">
      <p class="boardImageText">10 basic choppping techniques</p>
      <section class="suggestionLittleImg">
          <img src="pictures/gnocchi-bake.jpg" alt="gnocci-bake_image" class="gnocci-bakeImage">
          <p class="gnocciImageText">Italian recipe inspirations</p>
          <img src="pictures/meatballs.jpg" alt="meatballs" class="meatballsImage">
          <p class="meatballImageText">Secrets to the perfect meatball</p>
      </section>
    </section>
  `
  document.body.appendChild(template.content);
  emailInput.addEventListener('change', emailAlert);
}

function generateAbout() {
  const template = document.createElement('template');
  template.innerHTML = `
  <section class="about">
    <h2>About</h2>
    <p>
        Everyone needs to cook, or at the very least, everyone needs to eat. However through my experience,
        not many are confident or even willing to cook for themselves.As a student, the temptation to order 
        food or buy ready meals can be overwelhming. My goal is to change that. I want to create a 
        platform where cooking skills can be aquired and inspiration cultivated.
    </p>
    <p>
        I was very fortunate to be taught to cook at home by my parents which opened the door to home-cooking 
        for me. I started to research recipes for meals I wanted to try but would never dream of making it
        myself. I hope to emulate the oppurtunites that I had for others who may have not been able to before.
    </p>
  </section>
  `
  document.body.appendChild(template.content);
}

function generateRecipes() {
  const template = document.createElement('template');
  template.innerHTML = `
    <section class="recipeSearch">
      <label for="searchRecipe">What recipe are you looking for?</label>
      <input id="searchRecipe"  type="text"  onfocus="this.value=''" placeholder="Search..." aria-label="search">
      <button class="searchButton">&#128269;</button>
    </section>
    <section class="recipeTiles"></section>
  `
  document.body.appendChild(template.content);
  searchRecipe.addEventListener('change', doSearch);
}

function generateDiscover() {
  const template = document.createElement('template');
  // Dynamically creating the sections would be preferable
  template.innerHTML = `
    <section class="discoverTiles" id="bannerTiles">
      <section id="VegetarianBanner"></section>
      <section id="JapaneseBanner"></section>
      <section id="NoodlesBanner"></section>
      <section id="IndianBanner"></section>
      <section id="BBQBanner"></section>
    </section>
  `
  document.body.appendChild(template.content);
  buildBanners();
  
  /* In order for the image slider to work, each button needs to mutate the images within its container only.
  * I am iterating over the children of each banner to 1. To access the button of each banner and 2. To pass
  * the banner name to the nextTile() function making sure the buttons only effect tiles in their parent container.
  */
  const bannerContainer = document.getElementById("bannerTiles");
  const children = bannerContainer.children;
  for(const banner of children){
    const bannerChildren = banner.children;
    for(const childElement of bannerChildren){
      const bannerType = banner.id.split("Banner")[0];
      if(childElement.classList[0] != "navButton"){
        continue;
      }
      if(childElement.id == `${bannerType}RightButton`) {
        childElement.addEventListener('click', () => {
          nextTile(1, bannerType);
        });
      }else if(childElement.id == `${bannerType}LeftButton`){
        childElement.addEventListener('click', () => {
          nextTile(-1, bannerType);
        });
      }
    }
  }
}

function generateDefault() {
  const template = document.createElement('template');
  template.innerHTML = `
    <h1>OOOOooOOOoOOPPPPssss!!!</h>
    <h2>You are in the wrong neighborhood</h2>
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
  generateHeader();
  generateMain(pageName);
  generateFooter();
}

async function buildTileFromData(recipe) {
  const tile = document.createElement("article");
  const tileContainer = document.createElement("section")
  const img = document.createElement("img");
  const recipeInformation = await getRecipeInfo(recipe.id);
  img.src = recipeInformation.image;
  img.alt = recipeInformation.title.substring(0, 20);
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

async function insertTile(recipe, recipeType) {
  const tileClass = document.getElementById(`${recipeType}Tiles`);
  const tile = await buildTileFromData(recipe);
  const tileData = buildTileData(tile);
  tile.appendChild(tileData);
  tileClass.appendChild(tile);
}

async function buildBannerFromRecipeType(recipeType) {
  const bannerContainer = document.getElementById(`${recipeType}Banner`);
  const recipeContainer = document.createElement("section");
  const bannerTitle = document.createElement("h2");
  const left = document.createElement("button");
  const right = document.createElement("button");
  bannerContainer.id = `${recipeType}Banner`;
  recipeContainer.id = `${recipeType}Tiles`;
  bannerTitle.innerHTML = recipeType;
  left.innerHTML = "<";
  right.innerHTML = ">";
  left.id = `${recipeType}LeftButton`;
  right.id = `${recipeType}RightButton`;
  left.classList.add("navButton");
  right.classList.add("navButton");
  bannerContainer.appendChild(bannerTitle);
  bannerContainer.appendChild(recipeContainer);
  bannerContainer.appendChild(left);
  bannerContainer.appendChild(right);
  return bannerContainer;
}

async function insertRecipeBanner(recipeType) {
  const banner = await buildBannerFromRecipeType(recipeType);
  const bannerTiles = document.getElementById("bannerTiles");
  bannerTiles.appendChild(banner);
  const limit = 6;
  const result = await loadSearch(recipeType, limit);
  result.results.forEach(recipe => insertTile(recipe, recipeType));
}

function buildBanners() {
  disoverTopics.forEach(insertRecipeBanner);
  displayInitalTiles(tileIndex);
}

async function callAPI(url) {
  const response = await fetch(url, apiHeaders);
  if (response instanceof Error){
    console.err(response);
    return {};
  }
  return response;
}

async function loadSearch(myQuery, limit) {
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
  const recipeType =((myQuery.value == "") ? searchRecipe.value : myQuery.value);
  const limit = 12;
  const result = await loadSearch(recipeType, limit);
  const homeSection = document.getElementsByClassName("recipeTiles");
  homeSection[0].id = `${recipeType}Tiles`;
  result.results.forEach(recipe => insertTile(recipe, recipeType));
}


function clearResults() {
  const recipeTiles = document.getElementsByClassName("recipeTiles")[0];
  while(recipeTiles.firstChild) {
    recipeTiles.firstChild.remove();
  }
}

function handle(e){
  if(e.key === "Enter"){
  }
}

function emailAlert() {
  alert(`Using email: ${emailInput.value} to signup \n Unfortunately, this feature is still under construction`);
}

function nextTile(n, bannerType) {  
    displayNextTile(tileIndex += n, bannerType); 
}  

function displayInitalTiles(){
  var i;  
  const bannerContainer = document.getElementById("bannerTiles");
  const children = bannerContainer.children;
  for(const banner of children){
    const bannerChildren = banner.children;
    for(const childElement of bannerChildren){
      if(childElement.id == "?Tiles"){
        debugger;
        const tiles =  childElement.children;
        for (i = 0; i < tiles.length; i++) {tiles[i].style.display = "none"};
        tiles[0].style.display = "flex";  
      }
    }
  }
}

function displayNextTile(n, bannerType) {  
  var i;  
  const bannerContainer = document.getElementById("bannerTiles");
  const children = bannerContainer.children;
  for(const banner of children){
    const bannerChildren = banner.children;
    for(const childElement of bannerChildren){
      if(childElement.id == `${bannerType}Tiles`){
        const tiles =  childElement.children;
        /*When intialised, there are not tiles in the banners as the API hasn't been called yet.
        * This if statement catches this and continues the loop, it will continue for all banners initially.
        */
        if(tiles.length == 0){
          continue;
        }
        if (n > tiles.length) {tileIndex = 1}; 
        if (n < 1) {tileIndex = tiles.length};
        for (i = 0; i < tiles.length; i++) {tiles[i].style.display = "none"};
        tiles[tileIndex - 1].style.display = "flex"; 
      }
    }
  }
}
