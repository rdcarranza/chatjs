const express = require('express');
const enrutador = express.Router();
const path = require('path');


//Direccionamiento

enrutador.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'public','index.html'));
});
  
enrutador.post('/registro', function(req,res){
  console.log("req: "+req.body.cod_u);
  res.json({'msj': "operación del servidor completa!", 'cod': req.body.cod_u});
  
});

enrutador.get('/chat', function(req,res){
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});


module.exports = enrutador;