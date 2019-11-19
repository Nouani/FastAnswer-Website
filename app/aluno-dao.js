class AlunoDao {

    // contrutor que vai receber uma instância da conexão do BD chamada db 
    constructor(db, raAluno) {
        this._db = new db.Request();
        this.raAluno = raAluno;
    }

    lista(callback) {
        this._db.query('select * from Alunos',
            function (err, recordset) {
                callback(err, recordset);
            })
    }

    listaPeloRA(callback) {
        this._db.query('select * from Alunos where RA = '+this.raAluno,
            function (err, recordset) {
                callback(err, recordset);
            })
    }

    registrar(aluno, callback) {
        var ra = aluno.ra;
        var nome = aluno.nome;
        var senha = aluno.senha;
        this._db.query(`INSERT INTO Alunos values('${ra}', '${nome}', '${senha}','offline')`,
            (err) => {
                console.log("Erro inserção de aluno: " + err);
                callback(err);
            })
    }

    atualizar(aluno, callback) {
        var ra = aluno.ra;
        var nome = aluno.nome;
        var senha = aluno.senha;
        console.log(nome);
        this._db.query(`UPDATE Alunos set Nome = '${nome}', Senha = '${senha}' where RA = '${ra}'`,
            (err) => {
                console.log("Erro inserção de aluno: " + err);
                callback(err);
            })
    }

    atualizarAtividade(aluno, callback) {
        var ra = aluno.ra;
        var atividade = aluno.atividade;
        this._db.query(`UPDATE Alunos set Atividade = '${atividade}' where RA = '${ra}'`,
            (err) => {
                console.log("Erro inserção de aluno: " + err);
                callback(err);
            })
    }
}
module.exports = AlunoDao;