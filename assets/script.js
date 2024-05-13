let darkMode = false;
const toggleButton = document.getElementById('toggle');
const body = document.body;

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

let city = document.querySelector('.search-bar');
let categoryArr = [];


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
    event.preventDefault();

    const city = document.querySelector('.search-bar').value;
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=c3023f6bd0f4493002d6feb29e0f0be6`;

    fetchData(geoApiUrl)
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c3023f6bd0f4493002d6feb29e0f0be6`;
            return fetchData(weatherApiUrl);
        })
        .then(weatherdata => {
            console.log('Weather Data received:', weatherdata);
        });
}

const categoryList = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

// Function to append food data
// function appendCategoryList() {
//     fetchData(categoryList)
//         .then(data => {
//             categoryArr = data.meals.map(item => Object.values(item));
//             return categoryArr;
//         })
//         .then(() =>{
//             console.log(categoryArr)
//         })
// }

// Function to append category data 
function appendCategory(event) {
    let selectedCategory = event.target.value;
    let categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
    fetchData(categoryUrl)
        .then(data => {
            console.log('Category Data received:', data);
        })
}

function appendButton(){
    let button = document.getElementById('taste-switch');
    button.addEventListener('click', appendCategory);
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
  