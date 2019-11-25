var AlunoDao = require('../app/aluno-dao');
var LembreteDao = require('../app/lembrete-dao');
var EventoDao = require('../app/evento-dao');
var MonitorDao = require('../app/monitor-dao');
var MateriaDao = require('../app/materia-dao');
var MensagemAlunoDao = require('../app/mensagemAluno-dao');
var MensagemMonitorDao = require('../app/mensagemMonitor-dao');
var conexao = require('../config/custom-mssql');
var path = require('path');

module.exports = (app) => {
    var dadosAluno = {
        ra: '19190',
        nome: 'Matheus Seiji',
        senha: ''
    }
    var dadosChat = {
        raAluno: '19190',
        codMonitor: '69',
        nomeMonitor: 'Enzo Furegatti Spinella',
    }

    app.get('/', (req, res) => {
        alunoDao = new AlunoDao(conexao, null);
        res.sendFile('home.html', {
            root: path.join(__dirname, '../views')
        });
    });

    app.get('/login/:ra?/:senha?', (req, res) => {
        var alunos = [];
        var login = {
            ra: req.params.ra,
            senha: req.params.senha,
        }
        var encontrou = false;
        const alunoDao = new AlunoDao(conexao, null);
        alunoDao.lista(function (erro, resultados) {
            alunos = resultados["recordset"];
            for (var a of alunos) {
                if (a.RA == login.ra) {
                    encontrou = true;
                    if (a.Senha == login.senha) {
                        dadosAluno.ra = a.RA;
                        dadosAluno.nome = a.Nome;
                        dadosAluno.senha = a.Senha;
                        res.json({ mensagem: 'cadastrado' });
                    } else {
                        res.json({ mensagem: 'senha-errada' });
                    }
                }
            }
            if (encontrou == false) {
                res.json({ mensagem: 'não-cadastrado' });
            }
        })
    });

    app.get('/atualizar-atividade/:atividade?', (req, res) => {
        console.log("chegou");
        var atividadeAluno = {
            ra: dadosAluno.ra,
            atividade: req.params.atividade
        }

        const alunoDao = new AlunoDao(conexao, null);
        alunoDao.atualizarAtividade(atividadeAluno, function (erro) {
            if (erro) {
                console.log(erro);
            }
            else {
                res.json({ mensagem: 'retorno' });
            }
        });
    });

    app.get('/cadastrado/:ra?/:nome?/:senha?/:confirmSenha?', (req, res) => {
        var aluno = {
            ra: req.params.ra,
            nome: req.params.nome,
            senha: req.params.senha,
            confirmSenha: req.params.confirmSenha
        }

        const alunoDao = new AlunoDao(conexao, null);
        alunoDao.registrar(aluno, function (erro) {
            if (erro) {
                console.log(erro);
            }
            else {
                res.json({ mensagem: 'retorno' });
            }
        });
    });

    app.get('/atualizar-aluno/:nome?/:senhaNova?', (req, res) => {
        if (req.params.nome != 'N') {
            dadosAluno.nome = req.params.nome;
        }

        if (req.params.senhaNova != 'N') {
            dadosAluno.senha = req.params.senhaNova;
        }

        const alunoDao = new AlunoDao(conexao, null);
        alunoDao.atualizar(dadosAluno, function (erro) {
            if (erro) {
                console.log(erro);
            }
            else {
                res.json({ mensagem: 'retorno' });
            }
        });
    });

    app.get('/return-aluno', (req, res) => {
        res.json(dadosAluno);
    });

    app.get('/cadastrar-lembrete/:tarefa?/:data?/:horario?/:localizacao?', (req, res) => {
        var lembrete = {
            tarefa: req.params.tarefa,
            data: req.params.data,
            horario: req.params.horario,
            localizacao: req.params.localizacao
        }

        const lembreteDao = new LembreteDao(conexao, dadosAluno.ra);
        lembreteDao.registrar(lembrete, function (erro) {
            if (erro) {
                console.log(erro);
            }
            else {
                res.json({ mensagem: 'retorno' });
            }
        });
    });

    app.get('/carregar-lembretes', (req, res) => {

        const lembreteDao = new LembreteDao(conexao, dadosAluno.ra);
        lembreteDao.lista(function (erro, resultados) {
            lembretes = resultados["recordset"];
            res.json(lembretes);
        });
    });

    app.get('/excluir-lembrete/:chavePK?', (req, res) => {
        var chavePK = req.params.chavePK;
        
        const lembreteDao = new LembreteDao(conexao, dadosAluno.ra);
        lembreteDao.deletar(chavePK, function (erro) {
            if (erro) {
                console.log(erro);
            }
            else {
                res.json({ mensagem: 'retorno' });
            }
        });
    });

    app.get('/carregar-eventos', (req, res) => {
        const eventoDao = new EventoDao(conexao, dadosAluno.ra);
        eventoDao.lista(function (erro, resultados) {
            res.json(resultados["recordset"]);
        });
    });

    app.get('/cadastrar-evento/:titulo?/:link?/:dataHorarioInicio?/:dataHorarioFim?/:corFundo?', (req, res) => {
        var evento = {
            titulo: req.params.titulo,
            link: req.params.link,
            dataInicio: req.params.dataHorarioInicio,
            dataFim: req.params.dataHorarioFim,
            corFundo: req.params.corFundo
        }
        console.log(evento.corFundo);

        var ret = '';
        var link = evento.link;
        if (link == 'N') {
            evento.link = '';
        } else {
            for (var i = 0; i < link.length; i++) {
                if (link.substring(i, i + 1) != '(') {
                    ret += link.substring(i, i + 1);;
                } else {
                    ret += '/'
                }
            }
            evento.link = ret;
        }
        console.log(evento);

        const eventoDao = new EventoDao(conexao, dadosAluno.ra);
        eventoDao.registrar(evento, function (erro) {
            if (erro) {
                console.log(erro);
            }
            else {
                res.json({ mensagem: 'retorno' });
            }
        });
    });

    app.get('/carregar-monitores', (req, res) => {
        const monitorDao = new MonitorDao(conexao, null);
        monitorDao.lista(function (erro, resultados) {
            res.json(resultados["recordset"]);
        });
    });

    app.get('/carregar-materias', (req, res) => {
        const materiaDao = new MateriaDao(conexao, null);
        materiaDao.lista(function (erro, resultados) {
            res.json(resultados["recordset"]);
        });
    });

    app.get('/carregar-alunos', (req, res) => {
        const alunoDao = new AlunoDao(conexao, null);
        alunoDao.lista(function (erro, resultados) {
            res.json(resultados["recordset"]);
        });
    })

    app.get('/set-dados-chat/:raMonitor?', (req, res) => {
        const alunoDao = new AlunoDao(conexao, req.params.raMonitor);
        const monitorDao = new MonitorDao(conexao, req.params.raMonitor);
        
        monitorDao.listaPeloRA(function (erro, resultados) {
            for (var monitor of resultados["recordset"]){
                dadosChat.raAluno = dadosAluno.ra;
                dadosChat.codMonitor = monitor.CodMonitor;
            }
            alunoDao.listaPeloRA(function(err, result){
                for (var aluno of result["recordset"]){
                    dadosChat.nomeMonitor = aluno.Nome;
                }
                res.json(dadosChat);
            })
        });
    });

    app.get('/get-dados-chat', (req, res) => {
        res.json(dadosChat);
    });

    app.get('/carregar-mensagens-aluno', (req, res) => {
         const mensagemAlunoDao = new MensagemAlunoDao(conexao, dadosChat.raAluno, dadosChat.codMonitor);
         mensagemAlunoDao.listaPeloRA(function(erro, resultados){
             res.json(resultados["recordset"]);
         })
    });

    app.get('/carregar-mensagens-monitor', (req, res) => {
        const mensagemMonitorDao = new MensagemMonitorDao(conexao, dadosChat.raAluno, dadosChat.codMonitor);
        mensagemMonitorDao.listaPeloRA(function(erro, resultados){
            res.json(resultados["recordset"]);
        })
   });


    app.get('/area-aluno', (req, res) => {
        res.sendFile('dashboard.html', {
            root: path.join(__dirname, '../views')
        });
    });

    app.get('/area-aluno/perfil', (req, res) => {
        res.sendFile('opcoes/perfil.html', {
            root: path.join(__dirname, '../views')
        });
    });

    app.get('/area-aluno/calendario', (req, res) => {
        res.sendFile('opcoes/calendario.html', {
            root: path.join(__dirname, '../views')
        });
    });

    app.get('/area-aluno/lembretes', (req, res) => {
        res.sendFile('opcoes/lembretes.html', {
            root: path.join(__dirname, '../views')
        });
    });

    app.get('/area-aluno/listas-exercicios', (req, res) => {
        res.sendFile('opcoes/listas-exercicios.html', {
            root: path.join(__dirname, '../views')
        });
    });

    app.get('/area-aluno/monitoria', (req, res) => {
        res.sendFile('opcoes/monitoria.html', {
            root: path.join(__dirname, '../views')
        });
    });

    app.get('/area-aluno/monitoria/conversa', (req, res) => {
        res.sendFile('opcoes/chat-monitoria/chat.html', {
            root: path.join(__dirname, '../views')
        });
    });

    app.get('/area-aluno/lembretes/adicionar-lembretes', (req, res) => {
        res.sendFile('opcoes/opcoes-lembretes/Adicionar.html', {
            root: path.join(__dirname, '../views')
        });
    });

    app.get('/area-aluno/lembretes/meus-lembretes', (req, res) => {
        res.sendFile('opcoes/opcoes-lembretes/Seus.html', {
            root: path.join(__dirname, '../views')
        });
    });
}