var objContent = document.querySelector("#conteudo");
let objTrashs = document.getElementsByClassName("trash");

$(document).ready(function () {
    $.getJSON('/carregar-lembretes', function (result) {
        atualizarLembretes(result);
    });
})

function excluirLembrete() {
    let chavePK = this.getAttribute("data-pk");
    $.getJSON('/excluir-lembrete/' + chavePK, function (resposta) {
        if (resposta.mensagem == 'retorno') {
            deletarComponentes();
            $.getJSON('/carregar-lembretes', function (result) {
                atualizarLembretes(result);
            })
        }
    })
}

function atualizarLembretes(result) {
    var nome;
    var cont = 1;

    $.getJSON('/return-aluno', function (aluno) {
        nome = aluno.nome;
        renderCabecalho(nome);
    });

    for (var lembrete of result) {
        if (lembrete.DataLembrete == 'N') {
            lembrete.DataLembrete = 'Não Especificado';
        }
        if (lembrete.HorarioLembrete == 'N') {
            lembrete.HorarioLembrete = 'Não Especificado';
        }
        if (lembrete.Localizacao == 'N') {
            lembrete.Localizacao = 'Não Especificado';
        }
        renderComponentes(cont, lembrete.CodLembrete, lembrete.LembreteAluno, lembrete.DataLembrete,
            lembrete.HorarioLembrete, lembrete.Localizacao);
        cont++;
    }
}

function deletarComponentes() {
    var apresentationAtual = document.getElementById('apresentation');
    var barraAtual = document.getElementById('barra');

    objContent.removeChild(apresentationAtual);
    objContent.removeChild(barraAtual);

    var borderCardAtual = document.getElementsByClassName('border-card');
    var qtasVezes = borderCardAtual.length;
    for (var i = 0; i < qtasVezes; i++) {
        objContent.removeChild(borderCardAtual[0]);
    }
}


function renderCabecalho(nome) {
    var objApresentation = document.createElement('h4');
    objApresentation.setAttribute('id', 'apresentation');
    objApresentation.appendChild(document.createTextNode('Aqui estão seus lembretes, ' + nome));

    var objBarra = document.createElement('hr');
    objBarra.setAttribute('id', 'barra');

    objContent.appendChild(objApresentation);
    objContent.appendChild(objBarra);
}

function renderComponentes(indice, chavePrimaria, tarefa, data, horario, localizacao) {
    /* div 1*/
    var objBorderCard = document.createElement('div');
    objBorderCard.setAttribute('class', 'border-card')
    /* div 1*/

    ////////////////////////////////////////////////

    /* div 2 */
    var objNum = document.createElement('div');
    objNum.setAttribute('class', 'card-type-icon with-border');

    var textNum = document.createTextNode('' + indice);
    objNum.appendChild(textNum);
    /* div 2 */

    ////////////////////////////////////////////////

    /* div 3 */
    var objContentCard = document.createElement('div');
    objContentCard.setAttribute('class', 'content-wrapper');
    /* div 3 */

    ////////////////////////////////////////////////

    /* div 4 */
    var objLabelGroup1 = document.createElement('div');
    objLabelGroup1.setAttribute('class', 'label-group fixed');

    var objTarefa = document.createElement('p');
    objTarefa.setAttribute('class', 'tarefa');
    objTarefa.appendChild(document.createTextNode(tarefa))

    objLabelGroup1.appendChild(objTarefa);
    /* div 4 */

    ////////////////////////////////////////////////

    /* div 5 */
    var objMinGap1 = document.createElement('div');
    objMinGap1.setAttribute('class', 'min-gap');
    /* div 5 */

    ////////////////////////////////////////////////

    /* div 6 */
    var objLabelGroup2 = document.createElement('div');
    objLabelGroup2.setAttribute('class', 'label-group');

    var objData = document.createElement('p');
    objData.setAttribute('class', 'title');
    objData.appendChild(document.createTextNode('Data'))

    var objDataInfo = document.createElement('p');
    objDataInfo.setAttribute('class', 'caption');
    objDataInfo.appendChild(document.createTextNode(data))

    objLabelGroup2.appendChild(objData);
    objLabelGroup2.appendChild(objDataInfo);
    /* div 6 */

    ////////////////////////////////////////////////

    /* div 7 */
    var objMinGap2 = document.createElement('div');
    objMinGap2.setAttribute('class', 'min-gap');
    /* div 7 */

    ////////////////////////////////////////////////

    /* div 8 */
    var objLabelGroup3 = document.createElement('div');
    objLabelGroup3.setAttribute('class', 'label-group');

    var objHorario = document.createElement('p');
    objHorario.setAttribute('class', 'title');
    objHorario.appendChild(document.createTextNode('Horario'))

    var objHorarioInfo = document.createElement('p');
    objHorarioInfo.setAttribute('class', 'caption');
    objHorarioInfo.appendChild(document.createTextNode(horario))

    objLabelGroup3.appendChild(objHorario);
    objLabelGroup3.appendChild(objHorarioInfo);
    /* div 8 */

    ////////////////////////////////////////////////

    /* div 9 */
    var objMinGap3 = document.createElement('div');
    objMinGap3.setAttribute('class', 'min-gap');
    /* div 9 */

    ////////////////////////////////////////////////

    /* div 10 */
    var objLabelGroup4 = document.createElement('div');
    objLabelGroup4.setAttribute('class', 'label-group');

    var objLocalizacao = document.createElement('p');
    objLocalizacao.setAttribute('class', 'title');
    objLocalizacao.appendChild(document.createTextNode('Localizacao'))

    var objLocalizacaoInfo = document.createElement('p');
    objLocalizacaoInfo.setAttribute('class', 'caption');
    objLocalizacaoInfo.appendChild(document.createTextNode(localizacao))

    objLabelGroup4.appendChild(objLocalizacao);
    objLabelGroup4.appendChild(objLocalizacaoInfo);
    /* div 10 */

    ////////////////////////////////////////////////

    /* ICON */
    var objDivIcon = document.createElement('div');
    objDivIcon.setAttribute('class', 'trashes');
    objDivIcon.setAttribute('id', 'trash' + chavePrimaria);
    objDivIcon.setAttribute('data-pk', chavePrimaria);

    var objIcon = document.createElement('i');
    objIcon.setAttribute('class', 'far fa-trash-alt');

    objDivIcon.appendChild(objIcon);
    /* ICON */

    ////////////////////////////////////////////////

    objContentCard.appendChild(objLabelGroup1);
    objContentCard.appendChild(objMinGap1);
    objContentCard.appendChild(objLabelGroup2);
    objContentCard.appendChild(objMinGap2);
    objContentCard.appendChild(objLabelGroup3);
    objContentCard.appendChild(objMinGap3);
    objContentCard.appendChild(objLabelGroup4);

    objBorderCard.appendChild(objNum);
    objBorderCard.appendChild(objContentCard);
    objBorderCard.appendChild(objDivIcon);

    objContent.appendChild(objBorderCard);

    /* ATRIBUINDO CLICK A CADA POSICAO */
    let trash = document.getElementsByClassName('trashes');

    for (let i = 0; i < trash.length; i++) {
        trash[i].addEventListener("click", excluirLembrete);
    }
}