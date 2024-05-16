
function displayLocalStorage() {
    const localStorageContentDiv = document.getElementById('localStorage');
    localStorageContentDiv.innerHTML = ''; 
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const keyValueParagraph = document.createElement('p');
        keyValueParagraph.textContent = `${key}: ${value}`;
        localStorageContentDiv.appendChild(keyValueParagraph);
    }
}

window.onload = function() {
    displayLocalStorage();
};