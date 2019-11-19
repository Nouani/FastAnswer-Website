let trash = document.getElementsByClassName('trashes');
console.log(trash);
function activeColor() {
    let id = this.getAttribute("data-pk");
    console.log("asdsad");
}

for (let i = 0; i < trash.length; i++) {
    console.log("dsadas");
    trash[i].addEventListener("click", activeColor);
}

