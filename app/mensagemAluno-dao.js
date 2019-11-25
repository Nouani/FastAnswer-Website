class MensagemAlunoDao {

    // contrutor que vai receber uma instância da conexão do BD chamada db 
    constructor(db, raAluno, codMonitor) {
        this._db = new db.Request();
        this.raAluno = raAluno;
        this.codMonitor = codMonitor;
    }

    lista(callback) {
        this._db.query('select * from Alunos',
            function (err, recordset) {
                callback(err, recordset);
            })
    }

    listaPeloRA(callback) {
        this._db.query(`select * from MensagensAlunos where RA = '${this.raAluno}' and CodMonitor = ${this.codMonitor} order by OrdemMensagem`,
            function (err, recordset) {
                callback(err, recordset);
            })
    }

    registrar(aluno, callback) {
        /*var ra = aluno.ra;
        var nome = aluno.nome;
        var senha = aluno.senha;
        this._db.query(`INSERT INTO Alunos values('${ra}', '${nome}', '${senha}','offline')`,
            (err) => {
                console.log("Erro inserção de aluno: " + err);
                callback(err);
            })*/
    }
}
module.exports = MensagemAlunoDao;