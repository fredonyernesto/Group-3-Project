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

if (typeof(Storage) !== "undefined") {
    document.getElementById("search").addEventListener("click", function() {
        var recipeName = document.getElementById("recipeName").value;
        localStorage.setItem("searchedRecipe", recipeName);
    });
    window.addEventListener("load", function() {
        var lastRecipe = localStorage.getItem("searchedRecipe");
        if (lastRecipe !== null) {
            document.getElementById("recipeName").value = lastRecipe;
        }
    });
} else {
    errorMessage.textContent = "Sorry, we couldn't find that recipe.";
}