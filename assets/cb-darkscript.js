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

if (typeof(Storage) !== "undefined"){
    document.getElementById("search") .addEventListener("click", function()){
        var recipeName = document.getElementById("recipeName").value;
        localStorage.setItem("sreachedRecipe", recipeName);}
    }
window.addEventListener ("load",function(){
    var sreachedRecipe = localStorage.getItem("sreachedRecipe");
    if (sreachedRecipe ==! null) {
        document.getElementById("sreachedRecipe").value = sreachedRecipe;
    }

});
else {
    console.log("sorry we can not find that recipe");
}