var monitoresANotificar = []
const excecoes = ['de', 'da', 'do', 'e '];

var objTable = document.getElementById('corpo-table');
var objDropdowns = document.getElementsByClassName('notification');
var objDropdownsDesativar = document.getElementsByClassName('desativa');

$(document).ready(function () {
    atualizarMonitores();
    setInterval(atualizarMonitores, 30000);
})

function atualizarMonitores() {
    console.log("atualizou");
    console.log(monitoresANotificar);
    var objMonitores = []
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
        console.log(objMonitores);
        $.getJSON('/carregar-monitores', function (monitores) {
            for (var i = 0; i < objMonitores.length; i++) {
                for (monitor of monitores) {
                    if (objMonitores[i].codMonitor == monitor.CodMonitor) {
                        objMonitores[i].ra = monitor.RA;
                        objMonitores[i].atividade = monitor.Atividade;
                    }
                }
            }
            console.log(objMonitores);
            $.getJSON('/carregar-alunos', function (alunos) {
                for (var i = 0; i < objMonitores.length; i++) {
                    for (aluno of alunos) {
                        if (objMonitores[i].ra == aluno.RA) {
                            objMonitores[i].nome = aluno.Nome;
                        }
                    }
                }
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
    ret += `<tr>
                <td>
                    <a href="#">
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
                            <div class="notification dropdown-item" data-ra="${ra}" data-id="desativa${contador}">
                                <i class="far fa-bell"></i> Avisar quando estiver disponível
                            </div>
                            <div id="desativa${contador}" class="desativa dropdown-item" style="display: none;">
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

function atribuirClick(){
    for (var i = 0; i < objDropdowns.length; i++){
        objDropdowns[i].addEventListener('click', active);
    }
    for (var i = 0; i < objDropdownsDesativar.length; i++){
        objDropdownsDesativar[i].addEventListener('click', desactive);
    }
}

function active(){
    let ra = this.getAttribute("data-ra");
    let idDiv = this.getAttribute("data-id");

    if (objDropdowns.length != monitoresANotificar.length){
        var divDesativar = document.getElementById(idDiv);

        this.style.display = 'none';
        divDesativar.style.display = '';

        monitoresANotificar.push(ra);
    } else {
        //n.show('Você já será notificado deste monitor', 'danger');
    }
    console.log(monitoresANotificar);
}

function desactive(){
    console.log("das");
}



// TOAST NOTIFICATION

var n = new Notif({
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