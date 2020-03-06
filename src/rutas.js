const express = require('express');
const enrutador = express.Router();
const path = require('path');
const passport = require('passport');

//Direccionamiento

enrutador.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'public','index.html'));
});
  
enrutador.post('/registro', passport.authenticate('registro',{
  successRedirect: '/chat',
  failureRedirect: '/',
  passReqToCallback: true
}));

enrutador.get('/chat', function(req,res){
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});


module.exports = enrutador;