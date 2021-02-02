// middleware

const usuarios=require('./usuarios.controlador');
const tokens=require('./tokens.controlador');

const autenticacion = async function(req, res, next){
    
    let token=req.params.t;
    let usuario=req.params.u;
    
    if(await tokens.verificar(token,usuario)){
        console.log('ejecutando middleware de autenticacion.-> aprobado!');
        return next();
    }else{
        console.log('ejecutando middleware de autenticacion.-> desaprobado!');
        return res.redirect('/');
    }
};

const validarToken = async function(req, res, next){
    let token=req.params.t;
    let usuario=await usuarios.validarToken(token);
    if(usuario!=null){
        console.log('ejecutando middleware de validacion de token.-> aprobado!');
        return next();
    }else{
        console.log('ejecutando middleware de validacion de token.-> desaprobado!');
        return res.redirect('/');
    }


}

module.exports = {autenticacion,validarToken};