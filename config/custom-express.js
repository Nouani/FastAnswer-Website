const express = require('express');
const app = express();

const bodyParser = require('body-parser');
//const expressLayouts = require('express-ejs-layouts');

const rotas = require('../app/rotas.js');


// informar o express que vamos usar o EJS como engine de visualização
//app.set('view engine', 'ejs');

// informar o express que vamos usar os módulos relacionados às variaveis abaixo
//app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '../views'));
app.use(express.static(__dirname + '../public'));
app.use(express.static('public')); 
app.use(express.static('views')); 
app.use(bodyParser.json());

//acrescentando informacoes de cabecalho para suportar o CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PATCH, DELETE");
    next();
  });

// passar como parâmetro para o módulo rotas.js
rotas(app);

module.exports = app;