let darkMode = false;
const toggleButton = document.getElementById('toggle');
const body = document.body;
let wData; 
let cData; 
let wIcon;

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
            console.error('There was a problem with the fetch operation', error);
        });
}

// Function to append city data based on user input 
function appendCity(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get the city name from the input field
    const city = document.querySelector('.search-bar').value;

    // Construct the URL for the Geo API
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=c3023f6bd0f4493002d6feb29e0f0be6`;

    // Fetch data from the Geo API
    fetchData(geoApiUrl)
        .then(data => {
            // Extract latitude and longitude from the response data
            const lat = data[0].lat;
            const lon = data[0].lon;

            // Construct the URL for the Weather API using latitude and longitude
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c3023f6bd0f4493002d6feb29e0f0be6`;

            // Fetch weather data using the Weather API URL
            return fetchData(weatherApiUrl);
        })
        .then(weatherdata => {
            // Extract weather icon code from the response data
            const wIcon = weatherdata.list[0].weather[0].icon;
            console.log('Your icon code is:', wIcon);

            // Construct the URL for the weather icon image
            const weatherIconUrl = `https://openweathermap.org/img/wn/${wIcon}@2x.png`;

            // Set the src attribute of the weather icon image element
            document.getElementById('weather-png').src = weatherIconUrl;

            // Log the received weather data
            console.log('Weather Data received:', weatherdata);

            // Extract weather main data
            const wData = weatherdata.list[0].weather[0].main;

            // Process weather data
            linkWeatherFood(wData);

            // Return weather main data for further processing if needed
            return wData; 
        });
}

const categoryList = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

// Function to append category data 
function appendCategory(selectedCategory) {
    //let selectedCategory;
    console.log("selected category: " + selectedCategory);
    let categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

    

    fetchData(categoryUrl)
        .then(data => {
            console.log('Category Data received:', data);

            //choose random value in category
            let random = Math.floor(Math.random() * data.meals.length);
            let name = data.meals[random].strMeal;

            let recipe = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
            console.log("NAME OF THE RECIPE: ", name);
            
            //Selects random recipe from category
            fetchData(recipe)
            .then(data => { console.log("Data for recipe:" , data)})

        })
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
            console.log("Your cData:", cData);

            //Chooses corresponding categories and selects random recipe within that category
            appendCategory(cData);
            
    }
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