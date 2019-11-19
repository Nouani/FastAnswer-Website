let baseColors = document.getElementsByClassName("input-color");
let objBtnAnterior = document.getElementById('botao-orange');

function activeColor() {
    let idBtn = this.getAttribute("data-id");
    let objBtn = document.getElementById(idBtn);

    objBtnAnterior.style.transform = 'scale(1.00)';
    objBtnAnterior.style.transition = 'transform .2s';
    objBtn.style.transform = 'scale(1.20)';
    objBtn.style.transition = 'transform .2s';
    
    objBtnAnterior = objBtn;
}

for (let i = 0; i < baseColors.length; i++) {
    console.log("dsadas");
    baseColors[i].addEventListener("click", activeColor);
}
