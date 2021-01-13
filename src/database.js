const mongoose=require('mongoose');
const uri='mongodb://localhost:27017/chatjs';

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('MongoDB está conectado'))
    .catch(err => console.error("Error en la conexión con la BD."));