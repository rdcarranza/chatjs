const usuarios = require('./usuarios.controlador');

const guardarNuevoUsuario = async function(nom,c_id,t){
    try{
        return await usuarios.guardar(nom,c_id,t,true);
    }catch(e){
        console.log("error -: "+e+" - controlador: registros.");
        return null;
    }    
}

module.exports=registrosControlador={guardarNuevoUsuario};