var objTable = document.getElementById('corpo-table');

$(document).ready(function(){
    $.getJSON('/carregar-monitores', function(monitores){
        for (var monitor of monitores){
            console.log("teste1");
            $.getJSON('/carregar-aluno-monitor/'+monitor.RA, function(alunos){
                for (var aluno of alunos){
                    console.log(alunos);
                    console.log("teste2");
                    $.getJSON('/carregar-materias/'+monitor.CodMonitor, function(materias){
                        console.log(materias);
                        objTable.innerHTML += carregarComponentes(aluno.Nome, monitor.RA, materias[0].Nome, monitor.Atividade);
                    })   
                }
            })
        }
    })
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