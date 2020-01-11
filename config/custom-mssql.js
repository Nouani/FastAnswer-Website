var mssql = require('mssql');

const config = {
	user: 'user',
	password: 'senha',
	server: 'servidor',
	database: 'db'
};


mssql.connect(config)
	.then(conexao => global.conexao = conexao)
	.catch(erro => console.log(erro));


module.exports = mssql;
