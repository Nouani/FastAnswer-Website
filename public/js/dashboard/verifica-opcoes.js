var objCheck1 = document.getElementById('chkOption1');
var objCheck2 = document.getElementById('chkOption2');
var objCheck3 = document.getElementById('chkOption3');

objCheck1.onclick = function(){
    var objDiv = document.getElementById('datepicker');
    var escolha = objCheck1.checked;
    if (escolha){
        objDiv.style.display = '';
    } else {
        objDiv.style.display = 'none';
    }
}

objCheck2.onclick = function(){
    var objDiv = document.getElementById('clockpicker');
    var escolha = objCheck2.checked;
    if (escolha){
        objDiv.style.display = '';
    } else {
        objDiv.style.display = 'none';
    }
}

objCheck3.onclick = function(){
    var objDiv = document.getElementById('localization');
    var escolha = objCheck3.checked;
    if (escolha){
        objDiv.style.display = '';
    } else {
        objDiv.style.display = 'none';
    }
}