const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB 🚀"))
  .catch(err => console.log("Erro ao conectar:", err));
// Permitir receber dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

const Agendamento = mongoose.model('Agendamento', {
  nome: String,
  telefone: String,
  data: String,
  time: String,
  servico: String,
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

// Rota POST
app.post('/agendar', async (req, res) => {
  try {
    const { nome, telefone, data, time, servico } = req.body;

    const novoAgendamento = new Agendamento({
      nome,
      telefone,
      data,
      time,
      servico
    });

    await novoAgendamento.save();

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.send("Erro ao salvar agendamento.");
  }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);

});
