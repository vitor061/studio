const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir receber dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota POST
app.post('/agendar', (req, res) => {
    const { nome, telefone, data, time, servico } = req.body;

    console.log("Novo agendamento:");
    console.log(nome, telefone, data, time, servico);

    res.send("Agendamento recebido com sucesso!");
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});