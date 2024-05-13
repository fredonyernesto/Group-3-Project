let darkMode = false;
const toggleButton = document.getElementById ('toggle')
const body=document.body;
toggleButton.addEventListener ('click' ,function(){
    if (darkMode){
        body.classList.remove('dark-mode');
        darkMode=false;
    }
    else{
        body.classList.add('dark-mode');
        darkMode=true;
    }
});

let city = document.querySelector('.search-bar');

//Function to fetch data from a given URL
function fetchData(url) {
    return fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation', error);
    });
}

//Function to append city data based on user input 
function appendCity(event){
    event.preventDefault();

    const city = document.querySelector('.search-bar').value;
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=c3023f6bd0f4493002d6feb29e0f0be6`

    fetchData(geoApiUrl)
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c3023f6bd0f4493002d6feb29e0f0be6`
            return fetchData(weatherApiUrl)
        })
        .then(weatherdata => {
            console.log('Weather Data received:', weatherdata);
        });
}

const foodUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'

//Function to append food data
function appendFood(){
    fetchData(foodUrl)
        .then(data => {
            console.log('Food Data received:', data);
        });
}

appendFood();
document.getElementById('submit').addEventListener('click', appendCity);