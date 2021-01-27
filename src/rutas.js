const express = require('express');
const enrutador = express.Router();
const path = require('path');

const autenticacion = require('./controladores/autenticacion');

//Direccionamiento

enrutador.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'public','index.html'));
});
  
enrutador.post('/registro', autenticacion, function(req,res){
  res.redirect('/chat2');
});

enrutador.get('/chat', function(req,res){
  console.log("enviando pagina chat.")
  res.sendFile(path.join(__dirname,'public','chat.html'));
});

enrutador.get('/chat2', function(req,res){
  console.log("enviando pagina chat2.")
  res.sendFile(path.join(__dirname,'public','chat2.html'));
});

module.exports = enrutador;