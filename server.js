// server.js

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dbConnection = require('./db'); // importa a função connect do db.js
const authRoutes = require('./routes/authRoutes');
const { registerUser } = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração da sessão
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/nome-do-seu-banco-de-dados', // URI do seu banco de dados
    collection: 'sessions'
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'sua-chave-secreta-aqui',
    resave: false,
    saveUninitialized: false,
    store: store
}));

// Conexão com o MongoDB
dbConnection.connect()
    .then(() => {
        console.log('Conectado ao MongoDB.');
    })
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas de autenticação
app.use('/', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
