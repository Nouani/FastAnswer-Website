var color = 'gray';
var objInputColors = document.getElementsByClassName("input-color");

var teste = '';

$('.btn-adicionar').click(function () {
    var objInputEvento = document.getElementById('input-evento');
    var objInputDataInicio = document.getElementById('input-data-inicio');
    var objInputDataFim = document.getElementById('input-data-fim');
    var objInputHorarioInicio = document.getElementById('input-horario-inicio');
    var objInputHorarioFim = document.getElementById('input-horario-fim');
    var objInputLink = document.getElementById('input-link');

    var evento = objInputEvento.value;

    var dataHorarioInicio = objInputDataInicio.value + ' ' + objInputHorarioInicio.value + ':00';
    var dataHorarioFim = objInputDataFim.value + ' ' + objInputHorarioFim.value + ':00';
    var link = objInputLink.value;

    if (evento) {
        indicarCampo(false, false);
        var validado = false;
        if (link) {
            validado = validarLink(link);
        }
        if (validado || !link) {
            if (!link) {
                link = 'N'
            } else {
                link = formatarLink(link);
            }
            console.log(color);
            $.getJSON('/cadastrar-evento/' + evento + '/' + link + '/' + dataHorarioInicio + '/' + dataHorarioFim + '/' + color, function (result) {
                if (result.mensagem == 'retorno') {
                    notification.show('Evento adicionado com sucesso!', 'success');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                }
            })
        }
    } else {
        indicarCampo(true, true);
    }
})

for (let i = 0; i < objInputColors.length; i++) {
    objInputColors[i].addEventListener("click", activeColor);
}

function activeColor() {
    color = "" + this.getAttribute("data-color");
}

function validarLink(link) {
    if (link.substring(0, 8) != 'https://') {
        notification.show(`Insira antes do link: "https://"`, 'danger');
        return false;
    }
    return true;
}

function formatarLink(link) {
    var ret = '';
    for (var i = 0; i < link.length; i++) {
        if (link.substring(i, i + 1) != '/') {
            ret += link.substring(i, i + 1);;
        } else {
            ret += '('
        }
    }
    return ret;
}

function indicarCampo(desejaIndicar, enviarMensagem) {
    var objIconRed = document.getElementById('question-red');
    var objIconNormal = document.getElementById('question-normal');

    if (!enviarMensagem) {
        ocularDesocultarCampos('none', '');
    } else {
        notification.show('Informe o evento a ser adicionado', 'danger');
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


document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    $.getJSON('/carregar-eventos', function (result) {
        var eventos = [];
        for (var i of result) {
            console.log(i);

            var dataInicio = "" + i.DataInicio;
            var dataFim = "" + i.DataTermino;
            evento = {
                title: i.Titulo,
                url: i.Link,
                start: dataInicio.substring(0, 19),
                end: dataFim.substring(0, 19),
                backgroundColor: i.CorFundo,
                borderColor: i.CorFundo,
                textColor: 'white'
            }

            eventos.push(evento);
        }
        console.log(eventos);

        var calendar = new FullCalendar.Calendar(calendarEl, {
            locale: 'pt-br',
            plugins: ['interaction', 'dayGrid'],
            height: 'parent',
            header: {
                left: 'title',
                right: 'today prev,next'
            },
            defaultView: 'dayGridMonth',
            //defaultDate: '2019-08-12',
            navLinks: true, // can click day/week names to navigate views
            editable: false,
            selectable: true,
            eventLimit: true, // allow "more" link when too many events
            events: eventos,
            eventClick: function (info) {
                info.jsEvent.preventDefault();
                $('#titulo-evento').text(info.event.title);
                $('#data-inicio').text(info.event.start.toLocaleString());
                $('#data-termino').text(info.event.end.toLocaleString());
                if (info.event.url) {
                    $('#link-evento').attr('href', info.event.url)
                    $('#link-evento').text(info.event.url);
                } else {
                    $('#link-evento').text('');
                }
                $('#modal-info').modal('show')
            },
            select: function (info) {
                console.log(info.startStr)
                document.getElementById('input-data-inicio').value = '' + info.startStr;
                document.getElementById('input-data-fim').value = '' + info.endStr;
                $('#modal-cadastro').modal('show');
            }
        });
        calendar.render();
    })
});

var notification = new Notif({
    topPos: 10,
    classNames: 'success danger',
    autoClose: true,
    autoCloseTimeout: 3500
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