var express = require('express');
var enrutador = express.Router();

var path = require('path');

//Direccionamiento

enrutador.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'public','index.html'));
});
  
enrutador.post('/registro', function(req,res){
  console.log(req.body);
  res.send('REGISTRO de usuario');
});

enrutador.get('/chat', function(req,res){
  res.sendFile(path.join(__dirname,'public','chat.html'));
});


module.exports = enrutador;