$(document).ready(function () {
    $("#sair").click(function () {
        $.getJSON('/atualizar-atividade/offline', function (result) {
            if (result.mensagem == 'retorno') {
                window.location.href = '/';
            }
        })
    });
});