let city = document.querySelector('.search-bar');

//appends desired city from search bar into api url
function appendCity(event){
    city = document.querySelector('.search-bar').value;
    console.log("City" + city)
    apiUrl = ("https://wttr.in/" +  city + "?format=j1");
    console.log("THis is the new city" + apiUrl);

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

document.getElementById('submit').addEventListener('click', appendCity);
