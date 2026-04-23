const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db.js');
app.use(cors()); // libera qualquer origem
app.use(express.json());

app.get('/umidade', (req, res) => {
  console.log('Dados recebidos:', req.body);
  res.sendStatus(200);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});
