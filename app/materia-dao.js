class EventoDao {

    // contrutor que vai receber uma instância da conexão do BD chamada db 
    constructor(db, codMonitor) {
        this._db = new db.Request();
        this.codMonitor = codMonitor;
    }

    lista(callback) {
        this._db.query('select * from Materias',
            function (err, recordset) {
                callback(err, recordset);
            })
    }
}
module.exports = EventoDao;