const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioEsquema = new Schema({
    //usuario_id: {type: mongoose.ObjectId, default: new mongoose.Types.ObjectId(), unique: true},
    //usuario_id:{type: Number},
    nombre: String,
    conexion_id: Number,
    token: {type: String, default: null},
    fecha_creado:{type: Date, default: Date.now}
});

module.exports = mongoose.model('usuarios', usuarioEsquema);