const express = require('express');
const enrutador = express.Router();
const path = require('path');

const registro=require('./controladores/registros.controlador')

//Direccionamiento

enrutador.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'public','index.html'));
});
  
enrutador.post('/registro', async function(req,res){
  console.log("registro req: "+req.body.token);
  let usuario=await registro.guardarNuevoUsuario(req.body.nom,req.body.cid,req.body.token);
    
  res.json({'msj': "operación del servidor completa!", 'cod': usuario._id});
  
});

enrutador.get('/chat', function(req,res){
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});


module.exports = enrutador;