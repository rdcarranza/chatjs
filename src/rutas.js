const express = require('express');
const enrutador = express.Router();
const path = require('path');

const registro=require('./controladores/registros.controlador')

//Direccionamiento

enrutador.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'public','index.html'));
});
  
enrutador.post('/registro', async function(req,res){
  console.log("registro req: "+req.body.nombre);
  let usuario=await registro.guardarNuevoUsuario(req.body.nombre,req.body.c_id,req.body.token);
    
  res.json({'msj': "registro del usuario en el servidor completa!", 'cod': usuario._id,'token':  usuario.token});
  
});

/*
enrutador.get('/chat', function(req,res){
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});
*/

enrutador.get('/chat/:t', function(req,res){
  console.log("chat: token->"+req.params.t)
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

module.exports = enrutador;