//controlador
const jwt=require('jsonwebtoken');

const generar=function(c_id,nom_u){
    return token=jwt.sign(c_id,nom_u);
};