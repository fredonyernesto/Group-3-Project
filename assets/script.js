let darkMode = false;
const toggleButton = document.getElementById('toggle');
const body = document.body;
let wData; 
let cData; 

//Function to enable dark mode
toggleButton.addEventListener('click', function () {
    if (darkMode) {
        body.classList.remove('dark-mode');
        darkMode = false;
    } else {
        body.classList.add('dark-mode');
        darkMode = true;
    }
});
// trying to make the logo function as a home button
document.addEventListener("DOMContentLoaded", function() {
    const logo = document.getElementById("logo");

    logo.addEventListener("click", function() {
        history.back();
    });
});

let city = document.querySelector('.search-bar');

// Function to fetch data from a given URL
function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function appendCity(event) {
    event.preventDefault();
    const city = document.querySelector('.search-bar').value;
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=c3023f6bd0f4493002d6feb29e0f0be6`;

    fetchData(geoApiUrl)
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c3023f6bd0f4493002d6feb29e0f0be6`;
            return fetchData(weatherApiUrl);
        })
        .then(weatherdata => {
            const wIcon = weatherdata.list[0].weather[0].icon;
            const weatherIconUrl = `https://openweathermap.org/img/wn/${wIcon}@2x.png`;
            document.getElementById('weather-png').src = weatherIconUrl;

            const weatherDescriptionElement = document.getElementById('weather-info');
            const description = weatherdata.list[0].weather[0].description;
            weatherDescriptionElement.textContent = description.toUpperCase();


            console.log('Weather Data received:', weatherdata);
            const wData = weatherdata.list[0].weather[0].main;
            linkWeatherFood(wData);
            return wData; 
        });
}

// Function to append category data 
function appendCategory(selectedCategory) {
    let categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

    fetchData(categoryUrl)
        .then(data => {
            let random = Math.floor(Math.random() * data.meals.length);
            let randomMeal = data.meals[random];
            let randomInstructions = data.meals[random].strInstructions;

            let name = randomMeal.strMeal;
            let recipePNG = randomMeal.strMealThumb;
        
            document.getElementById('recipe-name').textContent = name;
            document.getElementById('recipe-image').src = recipePNG;
            document.getElementById('recipe-instructions').textContent = randomInstructions;


            let recipeUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
            console.log('Recipe Name:', name);
            
            
            fetchData(recipeUrl)
                .then(data => {
                   console.log('Data for recipe:', data)
                   recipeParts(data, name);
                });
        });
}


function appendButton(){
    let button = document.getElementById('taste-switch');
    button.addEventListener('click', appendCategory);
}




const typeWeather = ["Thunderstorm", "Drizzle", "Rain", "Snow", "Clouds", "Clear"];
const categories = ["Lamb", 'Pasta', 'Pork', 'Seafood', 'Side', 'Side', 'Vegetarian'];

function linkWeatherFood(wData){

    for (let i = 0; i < typeWeather.length; i++){
        if(typeWeather[i] == wData){
            cData = categories[i];
            console.log("Your category:", cData);

            //Chooses corresponding categories and selects random recipe within that category
            console.log("this is returned" + appendCategory(cData));
            
    } 
    }
}


function recipeParts(rdata, name){
    console.log("Data for recipe:" , rdata);
    let recipe = rdata.meals[0];

    let category = recipe.strCategory;
    let instructions = recipe.strInstructions;
    let imageUrl = recipe.strMealThumb;
    
    let ingredientsList = [];  
    //I need help converting string to variable
  
    for(let i = 0; i < 20; i++){
        let ingredient = recipe["strIngredient" + i];
        if (ingredient != "" && ingredient != undefined){
            let ingredient = recipe["strIngredient" + i];
        console.log("Ingedient", ingredient);
        ingredientsList.push(ingredient);
        }
        
    } console.log("List", ingredientsList);


   console.log("Name: ", name);
   console.log("Category", category);
   console.log("Instructions", instructions);
   console.log("url", imageUrl);

   //document.getElementById(recipe-name).innerHTML = name;

   //apend these variables to html elements
   
   document.getElementById("recipe-name").innerHTML = name;
   document.getElementById("recipe-instructions").innerHTML = instructions;
   for (let i = 0; i < ingredientsList.length; i++){
        let oneIngredient = document.getElementById("recipe-ingredientlist")
        let twoIngredient = document.createElement('li');
        twoIngredient.innerHTML = ingredientsList[i];
        console.log("two Ingredient", twoIngredient);
        
        oneIngredient.appendChild(twoIngredient);
   }

    
}


appendButton();
document.getElementById('submit').addEventListener('click', appendCity);

// link about us page to about us button on front page
document.addEventListener("DOMContentLoaded", function() {
    const aboutUsButton = document.getElementById("about-us");
  
    aboutUsButton.addEventListener("click", function() {
      window.location.href = "about.html";
    });
  });