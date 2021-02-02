//controlador
const jwt=require('jsonwebtoken');

const generar=function(c_id,nom_u){
    try{
        return token=jwt.sign(c_id,nom_u);
    }catch(e){
        console.log("error -: "+e+" - controlador: tokens - metodo: generar.");
        return null;
    }
};

const verificar=function(token,nom_u){
    try{
        return jwt.verify(token,nom_u);
    }catch(e){
        console.log("error -: "+e+" - controlador: tokens - metodo: verificar.");
        return false;
    }
}

module.exports=tokensControlador={generar, verificar};