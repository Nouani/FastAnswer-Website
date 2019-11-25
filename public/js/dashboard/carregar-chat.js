var objChat = document.getElementById('chat');

$(document).ready(function () {
    $.getJSON('/get-dados-chat', function (dados) {
        console.log(dados);
        $('#nomeMonitor').text(dados.nomeMonitor);
        $.getJSON('/carregar-mensagens-aluno', function (mensagensAluno) {
            $.getJSON('/carregar-mensagens-monitor', function (mensagensMonitor) {
                var mensagens = agruparMensagens(mensagensAluno, mensagensMonitor);
                for (var mensagem of mensagens){
                    objChat.innerHTML += carregarComponentes(mensagem.lado, mensagem.mensagem);
                }
                console.log(mensagens);
            })
        })
    })
})

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

function carregarComponentes(lado, mensagem) {
    ret = '';
    ret += `<li class="${lado}">
                <div class="avatar">
                    <h4 class="text-avatar">EF</h4>
                </div>
                <div class="msg">
                    <p>${mensagem}</p>
                </div>
            </li>`
    return ret;
}