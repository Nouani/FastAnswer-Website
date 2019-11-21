var objTable = document.getElementById('corpo-table');

$(document).ready(function(){
    
    var objMonitores = []
    $.getJSON('/carregar-materias', function(materias){
        for (var materia of materias){
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
        $.getJSON('/carregar-monitores', function(monitores){
            for (var i = 0; i < objMonitores.length; i++){
                for (monitor of monitores){
                    if (objMonitores[i].codMonitor == monitor.CodMonitor){
                        objMonitores[i].ra = monitor.RA;
                        objMonitores[i].atividade = monitor.Atividade;
                    }
                }
            }
            console.log(objMonitores);
            $.getJSON('/carregar-alunos', function(alunos){
                for (var i = 0; i < objMonitores.length; i++){
                    for (aluno of alunos){
                        if (objMonitores[i].ra == aluno.RA){
                            objMonitores[i].nome = aluno.Nome;
                        }
                    }
                }
                for (var i = 0; i < objMonitores.length; i++){
                    objTable.innerHTML += carregarComponentes(objMonitores[i].nome, objMonitores[i].ra, objMonitores[i].materia, objMonitores[i].atividade);
                }
            })
        });
    });
    /*$.getJSON('/carregar-monitores', function(monitores){
        for (var monitor of monitores){
            console.log(monitor.RA);
            $.getJSON('/carregar-aluno-monitor/'+monitor.RA, function(alunos){
                for (var aluno of alunos){
                    console.log(aluno);
                    console.log(monitor.CodMonitor);
                    $.getJSON('/carregar-materias/'+monitor.CodMonitor, function(materias){
                        console.log(materias);
                        console.log(aluno.Nome +''+ monitor.RA +''+ materias[0].Nome +''+ monitor.Atividade);
                        objTable.innerHTML += carregarComponentes(aluno.Nome, monitor.RA, materias[0].Nome, monitor.Atividade);
                    })   
                }
            })
        }
    })*/
})

function carregarComponentes(nome, ra, disciplina, status){
    var ret = '';
    ret += `<tr>
                <td>
                    <a href="#">
                        <div class="d-flex align-items-center">
                            <div class="avatar avatar-blue mr-3">EB</div>

                            <div class="">
                                <p class="font-weight-bold mb-0">${nome}</p>
                            </div>
                        </div>
                    </a>
                </td>
                <td>${ra}</td>
                <td>${disciplina}</td>
                <td>
                    <div class="badge badge-danger badge-danger-alt">${status}</div>
                </td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-icon" type="button" id="dropdownMenuButton2"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="bx bx-dots-horizontal-rounded" data-toggle="tooltip"
                                title="Actions"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                            <a class="dropdown-item" href="#"><i class="bx bxs-pencil mr-2"></i>
                                Edit Profile</a>
                            <a class="dropdown-item text-danger" href="#"><i
                                    class="bx bxs-trash mr-2"></i> Remove</a>
                        </div>
                    </div>
                </td>
            </tr>`
    return ret;
}