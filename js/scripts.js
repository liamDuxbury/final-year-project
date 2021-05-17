
class Recipe{
  constructor(){
      this.cheap = null; // false
      this.cookingMinutes = null; // 15
      this.creditsText = null; // "Food.com"
      this.cuisines = null; // (2) ["Japanese", "Asian"]
      this.diets = null; // ["dairy free"]
      this.dishTypes = null; // ["side dish"]
      this.extendedIngredients = null; // Array(10)
      this.glutenFree = null; // false
      this.id = null; // 147625
      this.image = null; // "https://spoonacular.com/recipeImages/147625-556x370.jpg"
      this.occasions = null; // []
      this.preparationMinutes = null; // 10
      this.pricePerServing = null; // 114.97
      this.readyInMinutes = null; // 25
      this.servings = null; // 6
      this.sourceUrl = null; // "http://www.food.com/recipe/tempura-bacon-237161"
      this.summary = null; // "Tempura Bacon might be just the hor d'oeuvre you are searching for. This recipe serves 6. One serving contains <b>451 calories</b>, <b>13g of protein</b>, and <b>32g of fat</b>. For <b>$1.14 per serving</b>, this recipe <b>covers 10%</b> of your daily requirements of vitamins and minerals. Head to the store and pick up salt, pepper, garlic powder, and a few other things to make it today. 1 person has made this recipe and would make it again. It is a good option if you're following a <b>dairy free</b> diet. This recipe is typical of Japanese cuisine. From preparation to the plate, this recipe takes approximately <b>25 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 32%</b>. This score is not so awesome. Try <a href=\"https://spoonacular.com/recipes/bacon-tempura-salad-with-yogurt-and-honey-dressing-520971\">Bacon tempura salad with yogurt and honey dressing</a>, <a href=\"https://spoonacular.com/recipes/tempura-donburi-tendon-tempura-rice-bowl-88414\">Tempura Donburi - Tendon - Tempura Rice Bowl</a>, and <a href=\"https://spoonacular.com/recipes/tempura-350428\">Tempura</a> for similar recipes."
      this.sustainable = null; // false
      this.title = null; // "Tempura Bacon"
      this.vegan = null; // false
      this.vegetarian = null; // false
  }
} 

let apiHeaders =  {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": "2c04ac924amshfdf390faa05e15ap152f4cjsncd6af456e587",
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
  }
}

const baseRecipeURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes`;

const disoverTopics = ["Vegetarian", "Japanese", "Noodles", "Indian", "BBQ"]; 
let tileIndex = 1;

function generateHeader() {
  const template = document.createElement('template');
  template.innerHTML = `
    <header>
      <link rel="stylesheet" href="../css/styles.css">
      <section class="topper">
          <h1>Cooking</h1>
          <div id="menuToggler">&#8801;</div> 
          <nav id="menu">
            <a href="home.html">Home</a>
            <a href="searchPage.html">Search</a>
            <a href="discover.html">Discover</a>
            <a href="recipePage.html">Recipes</a>
          </nav> 
          <section class="search">
            <input id="myQuery"  type="text" onfocus="this.value=''" placeholder="Search..." aria-label="search">
            <button class="searchButton" id="searchButton">&#128269;</button>
          </section>
      </section> 
    </header>
  `
  document.body.appendChild(template.content);
  let menuToggler = document.getElementById("menuToggler");
  let menu = document.getElementById("menu");
  let myQuery = document.getElementById("myQuery");
  menuToggler.addEventListener('click', () => {
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
  <footer>
    <nav>
        <a href="about.html" class="footerNav">About</a>
    </nav>
  </footer>
  `
  document.body.appendChild(template.content);
}

function generateHome() {
  const template = document.createElement('template');
  template.innerHTML = `
    <section class="hero">
      <img src="../pictures/hero_image.jpeg" alt="hero_image" class="heroImage">
      <p class="heroText">Cooking Made Simple</p>
    </section>
    <form class="signup">
      <label for="emailInput">Sign-up today!</label>
      <input type="text" name="email" id="emailInput">
      <input type="submit" value="Sign-up" id="emailSubmitButton">
    </form>
    <section class="suggestionTiles">
      <img src="../pictures/best-chopping-boards-lead.jpg" alt="chopping_board" class="boardImage">
      <p class="boardImageText">10 basic choppping techniques</p>
      <section class="suggestionLittleImg">
          <img src="../pictures/gnocchi-bake.jpg" alt="gnocci-bake_image" class="gnocci-bakeImage">
          <p class="gnocciImageText">Italian recipe inspirations</p>
          <img src="../pictures/meatballs.jpg" alt="meatballs" class="meatballsImage">
          <p class="meatballImageText">Secrets to the perfect meatball</p>
      </section>
    </section>
  `
  document.body.appendChild(template.content);
  let emailInput = document.getElementById("emailInput");
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

function generateSearchPage() {
  const template = document.createElement('template');
  template.innerHTML = `
    <section class="recipeSearch">
      <label for="searchRecipe">What recipe are you looking for?</label>
      <input id="searchRecipe"  type="text"  onfocus="this.value=''" placeholder="Search..." aria-label="search">
      <button class="searchButton">&#128269;</button>
    </section>
    <section class="searchTiles"></section>
  `
  document.body.appendChild(template.content);
  let searchRecipe = document.getElementById("searchRecipe");
  searchRecipe.addEventListener('change', () => {
    doSearch(() => {
      addTileEventListener("baconTiles");
    });
  });
}

function addTileEventListener(tileContainerName){
  let searchTiles = document.getElementById(tileContainerName);
  for(let article of searchTiles.children){
    article.addEventListener('click', () => {
      for(let child of article.children){
        if(child.nodeName == "H3"){
          storeRecipePageData(child.innerText);
          window.location.href = "recipePage.html";
        }
      }
    })
  }
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
  buildBanners(function(){
    if(window.screen.width < 500){
      displayInitalTiles;
    }else{
      return;
    }
  });
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


function generateRecipePage() {
  let recipePageDOM = generateRecipePageDOM();
  let recipePageJSON = localStorage.getItem("recipePageJSON");
  let recipePageData = JSON.parse(recipePageJSON);
  recipePageDOM.content.getElementById("recipeImage").src = recipePageData["recipe"]["recipeImage"];
  recipePageDOM.content.getElementById("recipeTitle").innerHTML = recipePageData["recipe"]["recipeTitle"];
  recipePageDOM.content.getElementById("cookingTime").innerHTML = recipePageData["recipe"]["cookingTime"];
  recipePageDOM.content.getElementById("preperationTime").innerHTML = recipePageData["recipe"]["preperationTime"];
  recipePageDOM.content.getElementById("servings").innerHTML = recipePageData["recipe"]["servings"];
  recipePageDOM.content.getElementById("recipeCuisines").innerHTML = recipePageData["recipe"]["recipeCuisines"];
  recipePageDOM.content.getElementById("dietaryRequirements").innerHTML = recipePageData["recipe"]["dietaryRequirements"];
  recipePageDOM.content.getElementById("recipeSummary").innerHTML = recipePageData["recipe"]["recipeSummary"];
  recipePageDOM.content.getElementById("urlToRecipe").innerHTML = `<p> ${recipePageData["recipe"]["urlToRecipe"]} </p>`;
  document.body.appendChild(recipePageDOM.content);
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

    case "searchPage":
      generateSearchPage()
      break; 

    case "discover":
      generateDiscover()
      break;  

    case "recipePage":
      generateRecipePage()
      break;
  
    default:
      generateDefault()
      break;
      
  }
}

function getPageName() {
  let path =  window.location.pathname;
  let page = path.split("/").pop();
  let pageName = page.split(".")[0]
  return pageName;
}

window.onload = function() {
  let pageName = getPageName();
  generateHeader();
  generateMain(pageName);
  generateFooter();
}

async function buildTileFromData(recipe) {
  const tile = document.createElement("article");
  const link = document.createElement("a");
  const img = document.createElement("img");
  const recipeInformation = await getRecipeInfo(recipe.id);
  buildRecipePageData(recipeInformation);
  // link.href = "recipePage.html";
  img.src = recipeInformation.image;
  img.alt = recipeInformation.title.substring(0, 20);
  link.appendChild(img);
  tile.appendChild(link);
  return tile;
}

function buildRecipePageData(recipeInformation){
  let newRecipe = new Recipe();
  for(let v in newRecipe) {
    newRecipe[v] = recipeInformation[v];
  }
  const recipeObj = JSON.stringify(newRecipe);
  localStorage.setItem(`${recipeInformation.title}`, recipeObj);
}

function buildTileData(tile) {
  const title = document.createElement("h3");
  title.innerHTML = `${tile.firstChild.firstChild.alt}`;
  tile.appendChild(title);
  return tile;
}

async function insertTile(recipe, recipeType) {
  const tileClass = document.getElementById(`${recipeType}Tiles`);
  const tileStructure = await buildTileFromData(recipe);
  const tile = buildTileData(tileStructure);
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

function buildBanners(callback) {
  disoverTopics.forEach(insertRecipeBanner)
  /* This is to ensure the tiles have fully loaded before creating the image sliders
  I tried using async to ensure the function was awaited before execution but struggled to implement it.
  The time waited could be less but the WiFi I am using is quite terrible meaning a longer wait is needed.
  */
  setTimeout(function () {
    callback();
  }, 4000);
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


async function doSearch(callback) {
  clearResults();
  let myQuery =  document.getElementById("myQuery");
  let searchRecipe = document.getElementById("searchRecipe");
  const recipeType =((myQuery.value == "") ? searchRecipe.value : myQuery.value);
  const limit = 12;
  const result = await loadSearch(recipeType, limit);
  const homeSection = document.getElementsByClassName("searchTiles");
  let tileContainerName = `${recipeType}Tiles`;
  homeSection[0].id = tileContainerName;
  result.results.forEach(recipe => insertTile(recipe, recipeType));
  setTimeout(function (tileContainerName) {
    callback();
  }, 2000);
}


function clearResults() {
  const searchTiles = document.getElementsByClassName("searchTiles")[0];
  while(searchTiles.firstChild) {
    searchTiles.firstChild.remove();
  }
}

function emailAlert() {
  let emailInput = document.getElementById("emailInput");
  alert(`Using email: ${emailInput.value} to signup \n Unfortunately, this feature is still under construction`);
}

function nextTile(n, bannerType) {  
    displayNextTile(tileIndex += n, bannerType); 
}  

function displayInitalTiles(){
  let i;  
  const bannerContainer = document.getElementById("bannerTiles");
  const children = bannerContainer.children;
  for(const banner of children){
    const bannerChildren = banner.children;
    for(const childElement of bannerChildren){
      if(childElement.id.includes("Tiles")){
        const tiles =  childElement.children;
        if(tiles.length == 0){
          continue
        }
        for (i = 0; i < tiles.length; i++) {tiles[i].style.display = "none"}
        tiles[0].style.display = "flex";  
      }
    }
  }
}

function displayNextTile(n, bannerType) {  
  let i;  
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
        if (n > tiles.length) {tileIndex = 1} 
        if (n < 1) {tileIndex = tiles.length}
        for (i = 0; i < tiles.length; i++) {tiles[i].style.display = "none"}
        /* I understand that we are not supposed to use "style" for our webpage styling but it isn't harcoded in html and the slider wouldn't work withou it.
        */
        tiles[tileIndex - 1].style.display = "flex"; 
      }
    }
  }
}

function generateRecipePageDOM(){
  const template = document.createElement('template');
  template.innerHTML = `
  <section id="recipePage">
    <section id="recipeTop">
        <img id="recipeImage" src="../pictures/meatballs.jpg" alt="recipe-image">
        <section id="quickSummary">
            <h2 id="recipeTitle">Placeholder</h2>
            <section id="recipeNumbers">
                <h3 id="cookingTime">Cook Time</h3>
                <h3 id="preperationTime">Prep Time</h3>
                <h3 id="servings">Servings</h3>
            </section>
            <h3>Cuisines</h3>
            <p id="recipeCuisines"></p>
            <h3>Dietary Req.</h3>
            <p id="dietaryRequirements"></p>
        </section>
    </section>
    <section id="recipeSummary"></section>
    <a id="urlToRecipe"></a>
  </section>
  `
  return template;
}

function storeRecipePageData(recipeName){
  let recipeJSON = localStorage.getItem(`${recipeName}`);
  let recipe = JSON.parse(recipeJSON);
  let recipePageJSONDOM = 
    { 
      "recipe":{
        "recipeImage" : recipe["image"],
        "recipeTitle" : recipe["title"],
        "cookingTime" : recipe["cookingMinutes"],
        "preperationTime" : recipe["preparationMinutes"],
        "servings" : recipe["servings"],
        "recipeCuisines" : recipe["cuisines"],
        "dietaryRequirements" : recipe["diets"],
        "recipeSummary" : recipe["summary"],
        "urlToRecipe" : recipe["url"],
      }
  }
  let recipePageJSON = JSON.stringify(recipePageJSONDOM);
  localStorage.setItem("recipePageJSON" ,recipePageJSON);
}
