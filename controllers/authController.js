// controllers/authController.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function registerUser(username, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        return newUser;
    } catch (err) {
        throw new Error('Erro ao registrar usuário.');
    }
}

module.exports = { registerUser };
