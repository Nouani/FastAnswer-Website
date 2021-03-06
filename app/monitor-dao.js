class MonitorDao {

    // contrutor que vai receber uma instância da conexão do BD chamada db 
    constructor(db, ra) {
        this._db = new db.Request();
        this.ra = ra;
    }

    lista(callback) {
        this._db.query('Select * from Monitores',
            function (err, recordset) {
                callback(err, recordset);
            })
    }

    listaPeloRA(callback) {
        this._db.query('Select * from Monitores where RA ='+this.ra,
            function (err, recordset) {
                callback(err, recordset);
            })
    }

    registrar(monitor, callback) {
        console.log(evento);
        var codMonitor = monitor.codMonitor;
        var ra = monitor.ra;
        this._db.query(`INSERT INTO Monitoes values('${codMonitor}', '${ra}', 'offline')`,
            (err) => {
                console.log("Erro inserção de evento: " + err);
                callback(err);
            })
    }
}
module.exports = MonitorDao;