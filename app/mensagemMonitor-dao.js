class MensagemMonitorDao {

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
        this._db.query(`select * from MensagensMonitores where CodMonitor = ${this.codMonitor} and RA = '${this.raAluno}' order by OrdemMensagem`,
            function (err, recordset) {
                callback(err, recordset);
            })
    }
}
module.exports = MensagemMonitorDao;