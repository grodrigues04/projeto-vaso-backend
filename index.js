const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db.js');

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  console.log(req.body);
  next();
});

app.post('/umidade', (req, res) => {
  if (!req.body || typeof req.body.umidade !== 'number') {
    return res.status(400).send('invalid body');
  }
  db.salvar_umidade(req.body.umidade);
  console.log('Dados recebidos:', req.body);
  res.sendStatus(200);
});

app.get('/teste', (req, res) => {
    console.log("Ping!")
  res.sendStatus(200);
});

app.get('/dados_atuais', async (req, res) => {
    try {
        const dados_atuais = await db.dados_atuais();
        const dados = res.json(dados_atuais);
        res.status(200).send({dados});
    } catch (e) {
        console.log('Erro ao listar histórico', e);
        res.status(500).send('Erro ao listar histórico');
    }
})

app.get('/historico', async (req, res) => {
    try {
        const historico = await db.listar_historico();
        console.log("Histórico:", historico);
        res.status(200).send({historico});
    } catch (e) {
        console.log('Erro ao listar histórico', e);
        res.status(500).send('Erro ao listar histórico');
    }
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});
