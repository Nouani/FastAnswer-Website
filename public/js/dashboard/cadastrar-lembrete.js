$(document).ready(function () {
    $('#btnAdicionar').click(function () {
        $('#form-cadastro-lembrete').attr('onsubmit', 'return false;');

        var objTarefa = document.getElementById("input-tarefa");
        var objData = document.getElementById("input-data");
        var objHorario = document.getElementById("input-horario");
        var objLocalizacao = document.getElementById("input-localizacao");

        var tarefa = objTarefa.value;
        var data = objData.value;
        var horario = objHorario.value;
        var localizacao = objLocalizacao.value;

        data = formatarData('/', '-', data);

        if (data) {
            data = formatarData('/', '-', data);
        } else {
            data = 'N';
        }
        if (!horario) {
            horario = 'N'
        }
        if (!localizacao) {
            localizacao = 'N'
        }

        if (tarefa) {
            indicarCampo(false, false);
            $.getJSON('/cadastrar-lembrete/' + tarefa + '/' + data + '/' + horario + '/' + localizacao, function (result) {
                if (result.mensagem == 'retorno') {
                    notification.show('Lembrete adicionado!', 'success');
                    objTarefa.value = '';
                    objData.value = '';
                    objHorario.value = '';
                    objLocalizacao.value = '';
                }
            });
        } else {
            indicarCampo(true, true);
        }
    });
})

function indicarCampo(desejaIndicar, enviarMensagem) {
    var objIconRed = document.getElementById('question-red');
    var objIconNormal = document.getElementById('question-normal');

    if (!enviarMensagem) {
        ocularDesocultarCampos('none', '');
    } else {
        notification.show('Informe qual a tarefa a ser adicionada', 'danger');
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

function formatarData(atual, nova, data) {
    var ret = '';
    for (var i = 0; i < data.length; i++) {
        if (data.substring(i, i + 1) == atual) {
            ret += nova;
        } else {
            ret += data.substring(i, i + 1);
        }
    }
    return ret;
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