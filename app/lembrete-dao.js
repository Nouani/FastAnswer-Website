class LembreteDao {

    // contrutor que vai receber uma instância da conexão do BD chamada db 
    constructor(db, raAluno) {
        this._db = new db.Request();
        this.raAluno = raAluno;
    }

    lista(callback) {
        this._db.query('select * from Lembretes where RA ='+this.raAluno,
            function (err, recordset) {
                callback(err, recordset);
            })
    }

    registrar(lembrete, callback) {
        console.log(lembrete);
        var tarefa = lembrete.tarefa;
        var data = lembrete.data;
        var horario = lembrete.horario;
        var localizacao = lembrete.localizacao;
        this._db.query(`INSERT INTO Lembretes values('${this.raAluno}', '${tarefa}', '${data}', '${horario}', '${localizacao}')`,
            (err) => {
                console.log("Erro inserção de lembrete: " + err);
                callback(err);
            })
    }
    deletar(chave, callback) {
        console.log(chave);
        this._db.query(`DELETE FROM Lembretes where CodLembrete = ${chave}`,
            (err) => {
                console.log("Erro inserção de lembrete: " + err);
                callback(err);
            })
    }
}
module.exports = LembreteDao;