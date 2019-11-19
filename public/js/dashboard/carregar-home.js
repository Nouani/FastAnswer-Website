$(document).ready(function(){
    $.getJSON('/return-aluno', function(result){
        console.log(result);
        carregarNome(result.nome);
    });
});

function carregarNome(nome){
    var objProfile = document.getElementById('perfil');
    var objDiv = document.querySelector('.profile-account');

    if (nome.length > 10 && nome.length < 15){
        objProfile.style.width = '600px';
    }
    if (nome.length > 15){
        objProfile.style.width = '700px';
    }
    
    var objText = document.createElement('h4');
    objText.setAttribute('class','profile-username');
    objText.appendChild(document.createTextNode(nome));

    objDiv.appendChild(objText);
}