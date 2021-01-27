//controlador

const usuario=require('../modelos/usuario');

const verificarNombreUsuario = async function(nom){
    try{
        if(await usuario.findOne({nombre: nom}).exec()!=null){
            console.log("nombre de usuario: "+nom+" INVALIDO!")
            return false;
        }else{
            console.log("nombre de usuario: "+nom+" VALIDO!")
            return true;
        }
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario.");
        return false;
    }

}

const guardarUsuario = async function(nom,c_id){
    try{
        return await new usuario({ //probar si devuelve el usuario incompleto antes de guardar o el usuario completo ya guardado.
            nombre: nom,
            conexion_id: c_id
        }).save();
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario.");
        return null;
    }
}

const buscarUsuario = async function(nom){
    try{
        return await usuario.findOne({nombre: nom}).exec();    
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario.");
        return null;
    }
}

module.exports = usuarioControlador = {verificarNombreUsuario,guardarUsuario,buscarUsuario};