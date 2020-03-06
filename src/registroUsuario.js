const passport = require('passport');
const estrategia = require('passport-local').Strategy;

const Usuario = require('./modelos/usuario');

passport.serializeUser((usuario, done) => {
    done(null,usuario.id);
});

passport.deserializeUser(async(id, done) => {
    const usuario = await Usuario.findById(id);
    done(null, usuario);
});

passport.use('registro',new estrategia({
    usernameField:'nombre_usuario',
    passReqToCallback:true
}, async (req,nombre_usuario, done) => {
    const usuario = new Usuario();
    usuario.nombre=nombre_usuario;
    await usuario.save();
    done(null, usuario);
}));