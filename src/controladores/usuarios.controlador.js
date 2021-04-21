//controlador

const usuario=require('../modelos/usuario');

const verificarNombre = async function(nom){
    try{
        await this.limpiarVencidos();
        if(await usuario.findOne({nombre: nom}).exec()==null){
            console.log("nombre de usuario: "+nom+" VALIDO!")
            return true;            
        }else{
            console.log("nombre de usuario: "+nom+" INVALIDO!")
            return false;
        }
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario - método: verificarNombre.");
        return false;
    }

}

const limpiarVencidos = async function(){ //Limpia los usuarios que estan desconectados y su período de actualización (1 minuto) ya fue superado.
    let fa=new Date();
    let fx=new Date();
    fa.set
    if(fa.getUTCMinutes()!=0){
        fa.setUTCMinutes(fa.getUTCMinutes()-1);  
    }else{
        if(fa.getUTCHours()!=0){
            fa.setUTCHours(fa.getUTCHours()-1);
            fa.setUTCMinutes(59);
        }
    }
    
    if(fx.getUTCMinutes()!=fa.getUTCMinutes()){
        await usuario.deleteMany({conectado: false, fecha_actualizacion: {$lte: fa}});
    }
}

const guardar = async function(nom,c_id,t,b){
    try{
        return await new usuario({ //probar si devuelve el usuario incompleto antes de guardar o el usuario completo ya guardado.
            nombre: nom,
            conexion_id: c_id,
            token: t,
            conectado: b
        }).save();
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario - método: guardar.");
        return null;
    }
}

const buscar = async function(nom){
    try{
        return await usuario.findOne({nombre: nom}).exec();    
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario. - método: buscar.");
        return null;
    }
}

const desconectar = async function(t){
    try{
        return await usuario.updateOne({token: t},{conectado: false,fecha_actualizacion: Date.now()});
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario. - metodo: desconectar.");
        return null;
    }
}

const reconectar = async function(t){
    try{
        return await usuario.updateOne({token: t},{conectado: true,fecha_actualizacion: Date.now()});
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario. - metodo: reconectar.");
        return false;
    }
}

const verificarToken=async function(t){
    try{
        let u = await usuario.findOne({token: t}).exec();
        if(u!=null && u.conectado==false){
            return u;
        }else{
            return null;
        }
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario. - metodo: verificarToken.");
        return null;
    }
}

const validarToken=async function(t){
    try{
        return u = await usuario.findOne({token: t}).exec();       
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario. - metodo: verificarToken.");
        return null;
    }
}

const limpiar=async function(){
    await usuario.deleteMany({_id: {$ne: null}});    
}

module.exports = usuariosControlador = {verificarNombre,guardar,buscar,desconectar,verificarToken,validarToken,reconectar,limpiarVencidos,limpiar};