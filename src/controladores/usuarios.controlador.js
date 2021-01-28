//controlador

const usuario=require('../modelos/usuario');

const verificarNombre = async function(nom){
    try{
        if(await usuario.findOne({nombre: nom}).exec()==null){
            console.log("nombre de usuario: "+nom+" VALIDO!")
            return true;            
        }else{
            console.log("nombre de usuario: "+nom+" INVALIDO!")
            return false;
        }
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario.");
        return false;
    }

}

const guardar = async function(nom,c_id,t){
    try{
        return await new usuario({ //probar si devuelve el usuario incompleto antes de guardar o el usuario completo ya guardado.
            nombre: nom,
            conexion_id: c_id,
            token: t
        }).save();
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario.");
        return null;
    }
}

const buscar = async function(nom){
    try{
        return await usuario.findOne({nombre: nom}).exec();    
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario.");
        return null;
    }
}

module.exports = usuariosControlador = {verificarNombre,guardar,buscar};