let city = document.querySelector('.search-bar');


function appendCity(event){
    event.preventDefault(); // Prevent default form submission behavior

    const city = document.querySelector('.search-bar').value;
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=c3023f6bd0f4493002d6feb29e0f0be6`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c3023f6bd0f4493002d6feb29e0f0be6`;
            return fetch(weatherApiUrl)
        })
        .then(weatherResponse => {
            if (!weatherResponse.ok) {
                throw new Error('Weather API response was not ok');
            }
            return weatherResponse.json();
        })
        .then(weatherData => {
            console.log('Weather Data received:', weatherData);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.getElementById('submit').addEventListener('click', appendCity);

