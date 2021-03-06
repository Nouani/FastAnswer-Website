var monitoresANotificar = []
const excecoes = ['de', 'da', 'do', 'e '];

var objTable = document.getElementById('corpo-table');
var objDropdowns = document.getElementsByClassName('notification');
var objDropdownsDesativar = document.getElementsByClassName('desativa');
var linkNames = document.getElementsByClassName('link-chat');

var tempoToast = 2000;

$(document).ready(function () {
    atualizarMonitores();
    setInterval(atualizarMonitores, 30000);
})

function atualizarMonitores() {
    console.log(monitoresANotificar);
    var objMonitores = [];
    var nomeMonitores = [];
    objTable.innerHTML = '';
    $.getJSON('/carregar-materias', function (materias) {
        for (var materia of materias) {
            var objMonitor = {
                codMonitor: materia.CodMonitor,
                ra: '',
                nome: '',
                materia: materia.Nome,
                atividade: '',
            }
            objMonitores.push(objMonitor);
        }
        $.getJSON('/carregar-monitores', function (monitores) {
            for (var i = 0; i < objMonitores.length; i++) {
                for (monitor of monitores) {
                    if (objMonitores[i].codMonitor == monitor.CodMonitor) {
                        objMonitores[i].ra = monitor.RA;
                        objMonitores[i].atividade = monitor.Atividade;
                    }
                }
            }
            $.getJSON('/carregar-alunos', function (alunos) {
                for (var i = 0; i < objMonitores.length; i++) {
                    for (aluno of alunos) {
                        if (objMonitores[i].ra == aluno.RA) {
                            objMonitores[i].nome = aluno.Nome;
                        }
                    }
                }
                for (var i = 0; i < objMonitores.length; i++) {
                    for (var k = 0; k < monitoresANotificar.length; k++) {
                        if (monitoresANotificar[k] == objMonitores[i].ra) {
                            if (objMonitores[i].atividade == 'online'){
                                var obj = {
                                    ra: objMonitores[i].ra,
                                    nome: objMonitores[i].nome
                                }
                                nomeMonitores.push(obj);
                            }
                        }
                    }
                }

                console.log(nomeMonitores);
                ret = '';
                if (nomeMonitores.length > 0) {
                    for (var i = 0; i < nomeMonitores.length; i++) {
                        //monitoresANotificar.splice(i, 1);
                        for (var k = 0; k < monitoresANotificar.length; k++) {
                            if (monitoresANotificar[k] == nomeMonitores[i].ra) {
                                monitoresANotificar.splice(k, 1);
                            }
                        }
                        ret += nomeMonitores[i].nome + ', ';
                    }
                    if (nomeMonitores.length > 1){
                        tempoToast = 15000;
                        n.show(`Os monitores ${ret} estão online`, 'success');
                    } else {
                        tempoToast = 3000;
                        n.show(`O monitor ${nomeMonitores[0].nome} está online`, 'success');
                    }
                }
                console.log(monitoresANotificar);

                for (var i = 0; i < objMonitores.length; i++) {
                    objTable.innerHTML += carregarComponentes(objMonitores[i].nome, objMonitores[i].ra, objMonitores[i].materia, objMonitores[i].atividade, i);
                }

                atribuirClick();
            })
        });
    });
}

function carregarComponentes(nome, ra, disciplina, status, contador) {
    var iniciais = getIniciais(nome);
    var ret = '';
    var opcao = '';
    if (status == 'online') {
        opcao = 'success';
    } else {
        opcao = 'danger';
    }

    var displayAtivar = '';
    var displayDesativar = 'none';

    for (var i = 0; i < monitoresANotificar.length; i++) {
        if (monitoresANotificar[i] == ra) {
            displayAtivar = 'none';
            displayDesativar = '';
        }
    }

    ret += `<tr>
                <td>
                    <a id="chat${contador}" href="#" class="link-chat" data-id="chat${contador}" data-ra="${ra}">
                        <div class="d-flex align-items-center">
                            <div class="avatar avatar-blue mr-3">${iniciais}</div>

                            <div class="">
                                <p class="font-weight-bold mb-0">${nome}</p>
                            </div>
                        </div>
                    </a>
                </td>
                <td>${ra}</td>
                <td>${disciplina}</td>
                <td>
                    <div class="badge badge-`+ opcao + ` badge-` + opcao + `-alt">${status}</div>
                </td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-icon" type="button" id="dropdownMenuButton2"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip"
                                title="Actions"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <div id="ativa${contador}" class="notification dropdown-item" style="display: ${displayAtivar};" data-ra="${ra}" data-id="desativa${contador}" data-status="${status}">
                                <i class="far fa-bell"></i> Avisar quando estiver disponível
                            </div>
                            <div id="desativa${contador}" class="desativa dropdown-item" style="display: ${displayDesativar};" data-ra="${ra}" data-id="ativa${contador}">
                                <i class="fas fa-minus-circle" style="color:  rgb(202, 29, 29);"></i> Desativar
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`
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
            }
        }
    }
    return ret;
}

function atribuirClick() {
    for (var i = 0; i < objDropdowns.length; i++) {
        objDropdowns[i].addEventListener('click', active);
    }
    for (var i = 0; i < objDropdownsDesativar.length; i++) {
        objDropdownsDesativar[i].addEventListener('click', disable);
    }
    for (var i = 0; i < linkNames.length; i++) {
        linkNames[i].addEventListener('click', iniciarChat);
    }
}

function active() {
    let ra = this.getAttribute("data-ra");
    let status = this.getAttribute("data-status");
    let idDiv = this.getAttribute("data-id");

    if (objDropdowns.length != monitoresANotificar.length) {
        if (status != "online") {
            var divDesativar = document.getElementById(idDiv);

            this.style.display = 'none';
            divDesativar.style.display = '';

            // testar

            monitoresANotificar.push(ra);

            n.show(`Você será notificado quando o monitor estiver online`, 'success');
        } else {
            n.show(`Este monitor já está online!`, 'danger');
        }
    } else {
        //n.show('Você já será notificado deste monitor', 'danger');
    }
    console.log(monitoresANotificar);
}

function disable() {
    let ra = this.getAttribute("data-ra");
    let idDiv = this.getAttribute("data-id");

    console.log(monitoresANotificar);
    for (var i = 0; i < monitoresANotificar.length; i++) {
        if (monitoresANotificar[i] == ra) {
            var divAtivar = document.getElementById(idDiv);
            monitoresANotificar.splice(i, 1);

            divAtivar.style.display = '';
            this.style.display = 'none';
        }
    }
    console.log(monitoresANotificar);
}

function iniciarChat(){
    let id = this.getAttribute("data-id");
    let ra = this.getAttribute("data-ra");
    $.getJSON('/set-dados-chat/'+ra, function(result){
        //console.log(result);
    })
    $('#'+id).attr('href','/area-aluno/monitoria/conversa');
}

// TOAST NOTIFICATION

var n = new Notif({
    topPos: 10,
    classNames: 'success danger',
    autoClose: true,
    autoCloseTimeout: 4000
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