const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioEsquema = new Schema({
    usuario_id: {type: mongoose.ObjectId, default: new mongoose.Types.ObjectId(), unique: true},
    nombre: String,
    conexion_id: Number,
    fecha_creado:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Usuarios', usuarioEsquema);