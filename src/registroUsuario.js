const passport = require('passport');
const estrategia = require('passport-local').Strategy;

const Usuario = require('./modelos/usuario');

passport.use('registro',new estrategia({
    usernameField:'nombre_usuario',
    passReqToCallback:true
},(nombre_usuario,done) => {
    const usuario = new Usuario();
}));