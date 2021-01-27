// middleware
const usuario=require('../modelos/usuario');

const autenticacion = async function(req, res, next){
    console.log('ejecutando middleware de autenticacion.');
    console.log('req: '+req);
    if(await usuario.findById(req.body.cod_u).exec()){
        return next();
    }else{
        return null;
    }
};

module.exports = autenticacion;