const express = require('express');
const cors = require('cors');

const app = express();

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

  console.log('Dados recebidos:', req.body);
  res.sendStatus(200);
});

app.get('/teste', (req, res) => {
    console.log("Ping!")
  res.sendStatus(200);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor rodando na porta 3000');
});
