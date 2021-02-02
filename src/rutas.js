const express = require('express');
const enrutador = express.Router();
const path = require('path');

const registro=require('./controladores/registros.controlador')
const aut=require('./controladores/autenticacion');

//Direccionamiento

enrutador.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'public','index.html'));
});
  
enrutador.post('/registro', async function(req,res){
  
  let usuario=await registro.guardarNuevoUsuario(req.body.nombre,req.body.c_id,req.body.token);
    
  res.json({'msj': "registro del usuario en el servidor completa!", 'cod': usuario._id,'token':  usuario.token});
  
});

/*
enrutador.get('/chat', function(req,res){
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});
*/

enrutador.get('/chat/:t',aut.validarToken,function(req,res){
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

enrutador.get('/chat/:t/:u',aut.autenticacion,function(req,res){
  res.redirect('/chat/'+req.params.t);
})

module.exports = enrutador;