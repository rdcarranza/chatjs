//controlador

const usuario=require('../modelos/usuario');

const verificarNombre = async function(nom){
    try{
        this.limpiarVencidos();
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

const limpiarVencidos = async function(){
    let fa=Date.now();
    console.log("usuariosControlador -> limpiarVencidos -> fecha actual: "+fa);
    //await usuario.deleteMany({conectado: false, fecha_actualizacion: {$lte: (Date.now}});
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
        return null;
    }
}

const verificarToken=async function(t){
    try{
        let u = await usuario.findOne({token: t}).exec();
        if(u!=null && u.conectado==false){
            return u.nombre;
        }else{
            return null;
        }
    }catch(e){
        console.log("error -: "+e+" - controlador: usuario. - metodo: verificarToken.");
        return null;
    }
}


module.exports = usuariosControlador = {verificarNombre,guardar,buscar,desconectar,verificarToken,reconectar,limpiarVencidos};