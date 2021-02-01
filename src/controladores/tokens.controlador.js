//controlador
const jwt=require('jsonwebtoken');

const generar=function(c_id,nom_u){
    return token=jwt.sign(c_id,nom_u);
};

const verificar=function(token,nom_u){
    return jwt.verify(token,nom_u);
}

module.exports=tokensControlador={generar, verificar};