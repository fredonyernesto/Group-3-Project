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