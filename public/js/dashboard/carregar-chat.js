var objChat = document.getElementById('chat');

const excecoes = ['de', 'da', 'do', 'e '];

$(document).ready(function () {
    atualizarTela();
    $("#btn-enviar").click(function () {
        var objInputMsg = document.getElementById('mensagem-digitada');
        var objsClass = document.getElementsByClassName('msg');

        var mensagemDigitada = objInputMsg.value;
        var ordemMensagemNova = objsClass.length + 1;
        if (mensagemDigitada) {
            $.getJSON('/get-dados-chat', function (dados) {
                objMensagem = {
                    ra: dados.raAluno,
                    mensagem: mensagemDigitada,
                    codMonitor: dados.codMonitor,
                    ordemMensagem: ordemMensagemNova,
                    recebimento: 'N'
                }
                console.log(objMensagem);
                $.getJSON('/enviar-mensagem/' + objMensagem.ra + '/' + objMensagem.mensagem + '/' + objMensagem.codMonitor + '/' + objMensagem.ordemMensagem, function (result) {
                    if (result.mensagem == 'retorno') {
                        atualizarTela();
                    }
                })
            })
        } else {
            // toast 
        }
    });
    $('#btn-voltar').click(function(){
        window.location.href = '/area-aluno/monitoria';
    })
})

function atualizarTela() {
    $.getJSON('/get-dados-chat', function (dados) {
        console.log(dados);
        $('#nomeMonitor').text(dados.nomeMonitor);
        $.getJSON('/carregar-mensagens-aluno', function (mensagensAluno) {
            $.getJSON('/carregar-mensagens-monitor', function (mensagensMonitor) {
                var mensagens = agruparMensagens(mensagensAluno, mensagensMonitor);
                var iniciais = {
                    nomeAluno: dados.nomeAluno,
                    nomeMonitor: dados.nomeMonitor,
                    iniciaisAluno: getIniciais(dados.nomeAluno),
                    iniciaisMonitor: getIniciais(dados.nomeMonitor)
                }

                objChat.innerHTML = '';
                for (var mensagem of mensagens) {
                    objChat.innerHTML += carregarComponentes(mensagem.lado, mensagem.mensagem, iniciais);
                }
                console.log(mensagens);
            })
        })
    })
}

setInterval(function(){
    atualizarTela();
}, 2000);

function agruparMensagens(mensagensAluno, mensagensMonitor) {
    var mensagens = [];

    var contMsgAluno = 0;
    var contMsgMonitor = 0;

    while ((contMsgAluno != mensagensAluno.length) && (contMsgMonitor != mensagensMonitor.length)) {
        var ordemMensagemAluno = mensagensAluno[contMsgAluno].OrdemMensagem;
        var ordemMensagemMonitor = mensagensMonitor[contMsgMonitor].OrdemMensagem;

        if (ordemMensagemAluno < ordemMensagemMonitor) {
            var obj = {
                lado: 'self',
                mensagem: mensagensAluno[contMsgAluno].MensagemAluno
            }
            mensagens.push(obj);
            contMsgAluno++;
        }
        if (ordemMensagemAluno > ordemMensagemMonitor) {
            var obj = {
                lado: 'other',
                mensagem: mensagensMonitor[contMsgMonitor].MensagemMonitor
            }
            mensagens.push(obj);
            contMsgMonitor++;
        }
    }

    while (contMsgAluno != mensagensAluno.length) {
        var obj = {
            lado: 'self',
            mensagem: mensagensAluno[contMsgAluno].MensagemAluno
        }
        mensagens.push(obj);
        contMsgAluno++;

    }
    while (contMsgMonitor != mensagensMonitor.length) {
        var obj = {
            lado: 'other',
            mensagem: mensagensMonitor[contMsgMonitor].MensagemMonitor
        }
        mensagens.push(obj);
        contMsgMonitor++;
    }
    return mensagens;
}

function carregarComponentes(lado, mensagem, objNomesIniciais) {
    var iniciais = '';
    var nome = '';
    if (lado == 'other') {
        nome = objNomesIniciais.nomeMonitor;
        iniciais = objNomesIniciais.iniciaisMonitor;
    } else {
        nome = objNomesIniciais.nomeAluno;
        iniciais = objNomesIniciais.iniciaisAluno;
    }
    ret = '';
    ret += `<li class="${lado}">
                <div class="avatar">
                    <h4 class="text-avatar">${iniciais}</h4>
                </div>
                <div class="msg">
                    <h6 class="nome">${nome}</h6>
                    <p>${mensagem}</p>
                </div>
            </li>`
    return ret;
}

function getIniciais(nome) {
    var ret = nome.substring(0, 1);
    for (var i = 0; i < nome.length; i++) {
        if (nome.substring(i, i + 1) == ' ') {
            var encontrou = false
            for (var k = 0; k < excecoes.length; k++) {
                if (nome.substring(i + 1, i + 3) == excecoes[k]) {
                    encontrou = true;
                }
            }
            if (!encontrou) {
                ret += nome.substring(i + 1, i + 2);
                break;
            }
        }
    }
    return ret;
}