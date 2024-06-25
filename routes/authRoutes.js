// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Rota para exibir o formulário de login
router.get('/login', (req, res) => {
    res.render('login'); // renderiza a view login.ejs
});

// Rota para processar o formulário de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Credenciais inválidas.');
        }

        req.session.user = user; // armazena o usuário na sessão
        res.redirect('/dashboard'); // redireciona para a página do dashboard
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao tentar fazer login.');
    }
});

// Rota para efetuar logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
