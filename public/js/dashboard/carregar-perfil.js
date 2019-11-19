var objInputRA = document.getElementById('input-ra');
var objInputNome = document.getElementById('input-nome');
var objInputSenha = document.getElementById('input-senha');
var objInputNovaSenha = document.getElementById('input-senha-nova');

$(document).ready(function () {
    atualizarCampos();

    $('#botao-editar').click(function () {
        alterarModo(false);
        trocarBotoes('', 'none');
    });

    $('#botao-cancelar').click(function () {
        alterarModo(true);
        trocarBotoes('none', '');
        limparDiv();
        atualizarCampos();
    });

    $('#botao-salvar').click(function () {
        var nome = objInputNome.value;
        var senha = objInputSenha.value;
        var senhaNova = objInputNovaSenha.value;

        if (senha) {
            $.getJSON('/return-aluno', function (alunoAtual) {
                if (senha == alunoAtual.senha) {
                    if (!nome) {
                        nome = 'N';
                    }
                    if (!senhaNova) {
                        senhaNova = 'N';
                    }

                    $.getJSON('/atualizar-aluno/' + nome + '/' + senhaNova, function (result) {
                        if (result.mensagem == 'retorno') {
                            notification.show('Suas informações foram atualizadas!', 'success');
                            limparDiv();
                            atualizarCampos();
                            alterarModo(true);
                            trocarBotoes('none','');
                        }
                    })
                } else {
                    notification.show('Senha Incorreta', 'danger');
                }
            });
        } else {
            indicarCampo(true, true);
        }
    });
});

function atualizarCampos() {
    $.getJSON('/return-aluno', function (result) {
        carregaNome(result.nome);
        carregarCampos(result.ra, result.nome);
    });
}

function carregaNome(nome) {
    var objUser = document.getElementById('username');
    var objName = document.createElement('h4');
    objName.setAttribute('id','nome-usuario');
    objName.appendChild(document.createTextNode(nome));
    objUser.appendChild(objName);
}

function limparDiv(){
    var objUser = document.getElementById('username');
    var objUserName = document.getElementById('nome-usuario');
    objUser.removeChild(objUserName);
}

function carregarCampos(ra, nome) {
    objInputRA.value = ra;
    objInputNome.value = nome;
    objInputSenha.value = '';
    objInputNovaSenha.value = '';
}

function alterarModo(opcao) {
    // true para editar & false para voltar a apenas exibição
    objInputNome.disabled = opcao;
    objInputSenha.disabled = opcao;
    objInputNovaSenha.disabled = opcao;
}

function trocarBotoes(displayBtnsEdicao, displayBtnEditar) {
    var objDivBotoesEdicao = document.getElementById('input-botoes-edicao');
    var objDivBotaoEditar = document.getElementById('input-botao-editar');

    objDivBotoesEdicao.style.display = displayBtnsEdicao;
    objDivBotaoEditar.style.display = displayBtnEditar;
}

function indicarCampo(desejaIndicar, enviarMensagem) {
    var objIconRed = document.getElementById('question-red');
    var objIconNormal = document.getElementById('question-normal');

    if (!enviarMensagem) {
        ocularDesocultarCampos('none', '');
    } else {
        notification.show('Digite sua senha para salvar as alterações', 'danger');
        if (desejaIndicar) {
            ocularDesocultarCampos('', 'none');
            setTimeout(function () {
                ocularDesocultarCampos('none', '');
            }, 4500);
        }
    }
}

function ocularDesocultarCampos(displayQuestionRed, displayQuestionNormal) {
    var objIconRed = document.getElementById('question-red');
    var objIconNormal = document.getElementById('question-normal');

    objIconRed.style.display = displayQuestionRed;
    objIconNormal.style.display = displayQuestionNormal;
}

var notification = new Notif({
    topPos: 10,
    classNames: 'success danger',
    autoClose: true,
    autoCloseTimeout: 2000
});

function Notif(option) {
    var el = this;

    el.self = $('.toast-message');
    el.close = this.self.find('.close-message');
    el.message = el.self.find('.message');
    el.top = option.topPos;
    el.classNames = option.classNames;
    el.autoClose = (typeof option.autoClose === "boolean") ? option.autoClose : false;
    el.autoCloseTimeout = (option.autoClose && typeof option.autoCloseTimeout === "number") ? option.autoCloseTimeout : 3000;


    // Methods
    el.reset = function () {
        el.message.empty();
        el.self.removeClass(el.classNames);
    }
    el.show = function (msg, type) {

        el.reset();
        el.self.css('top', el.top);
        el.message.text(msg);
        el.self.addClass(type);

        if (el.autoClose) {
            setTimeout(function () {
                el.hide();
            }, el.autoCloseTimeout);
        }
    }
    el.hide = function () {
        el.self.css('top', '-100%');
        el.reset();
    };

    el.close.on('click', this.hide);
}