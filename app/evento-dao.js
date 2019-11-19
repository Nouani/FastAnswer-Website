class EventoDao {

    // contrutor que vai receber uma instância da conexão do BD chamada db 
    constructor(db, raAluno) {
        this._db = new db.Request();
        this.raAluno = raAluno;
    }

    lista(callback) {
        this._db.query('select * from Eventos where RA ='+this.raAluno,
            function (err, recordset) {
                callback(err, recordset);
            })
    }

    registrar(evento, callback) {
        console.log(evento);
        var titulo = evento.titulo;
        var link = evento.link;
        var dataInicio = evento.dataInicio;
        var dataTermino = evento.dataFim;
        var corFundo = evento.corFundo;
        console.log(dataInicio);
        console.log(dataTermino);
        console.log(corFundo);
        this._db.query(`INSERT INTO Eventos values('${this.raAluno}', '${titulo}', '${link}', '${dataInicio}', '${dataTermino}', '${corFundo}')`,
            (err) => {
                console.log("Erro inserção de evento: " + err);
                callback(err);
            })
    }
}
module.exports = EventoDao;