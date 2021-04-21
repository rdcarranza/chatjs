const moongose = require('mongoose');
const {Schema} = moongose;

const mensajeEsquema = new Schema({
    mensaje_id: {type: Schema.Type.ObjectId, default: new mongoose.Types.ObjectId},
    usuario_id: {type: Schema.Type.ObjectId},
    mensaje: String,
    fecha: {type: Date, default: Date.now}
});

module.exports = moongose.model('Mensajes',mensajeEsquema);