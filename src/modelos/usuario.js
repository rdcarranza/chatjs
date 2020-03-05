const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioEsquema = new Schema({
    nombre: String
});

module.exports = mongoose.model('usuarios', usuarioEsquema);