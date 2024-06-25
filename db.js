// db.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // URI de conexão com o MongoDB
const dbName = 'nome-do-seu-banco-de-dados'; // Nome do seu banco de dados MongoDB

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Conectado ao MongoDB');
        return client.db(dbName);
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB', err);
    }
}

module.exports = { connect };
