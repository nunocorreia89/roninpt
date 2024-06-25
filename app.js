// app.js

const express = require('express');
const { connect } = require('./db'); // Importa a função de conexão com o MongoDB
const app = express();
const port = 3000;

// Conecta ao MongoDB e inicia o servidor Express
connect().then(db => {
    // Rota para renderizar jogadores
    app.get('/jogadores', async (req, res) => {
        try {
            const collection = db.collection('jogadores'); // Obtém uma coleção de jogadores

            const jogadores = await collection.find({}).toArray(); // Busca todos os jogadores

            // Renderiza a página HTML com os dados dos jogadores
            res.send(`
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Jogadores</title>
                </head>
                <body>
                    <h1>Listagem de Jogadores</h1>
                    <ul>
                        ${jogadores.map(jogador => `<li>${jogador.nome}</li>`).join('')}
                    </ul>
                </body>
                </html>
            `);
        } catch (err) {
            console.error('Erro ao buscar jogadores', err);
            res.status(500).send('Erro interno do servidor');
        }
    });

    // Inicia o servidor
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
});
