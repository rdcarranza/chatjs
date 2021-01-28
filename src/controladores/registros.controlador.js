const usuarios = require('./usuarios.controlador');

const guardarNuevoUsuario = async function(nom,c_id,t){
    try{
        return await usuarios.guardar(nom,c_id,t);
    }catch(e){
        console.log("error -: "+e+" - controlador: registros.");
        return null;
    }    
}

module.exports=registrosControlador={guardarNuevoUsuario};