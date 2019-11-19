var mssql = require('mssql');

const config = {
	user: 'BD19194',
	password: '%Alerta2009%',
	server: 'regulus.cotuca.unicamp.br',
	database: 'BD19194'
};


mssql.connect(config)
	.then(conexao => global.conexao = conexao)
	.catch(erro => console.log(erro));


module.exports = mssql;
