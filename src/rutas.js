const express = require('express');
const enrutador = express.Router();
const path = require('path');


//Direccionamiento

enrutador.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'public','index.html'));
});
  
enrutador.post('/registro', function(req,res,next){
  console.log("req: "+req.params);
  
  next();
});

enrutador.get('/chat', function(req,res){
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});


module.exports = enrutador;