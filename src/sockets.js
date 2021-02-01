//webSocket

var conexion_id=0;

const usuarios=require('./controladores/usuarios.controlador');
const token=require('./controladores/tokens.controlador');

module.exports = ws_io => {
        
    ws_io.on('connection', socket => {
        //conexion_id++;
        socket.c_id=++conexion_id;

        console.log("Se inició una Nueva Conexión: id -> "+socket.c_id);

        if(socket.token){

        }

        socket.on('nuevo_usuario', async (data, cb) => {
            
            console.log("Conexión: id -> "+socket.c_id);
            
                                 
            if(data==null || data.trim()=='' || !(await usuarios.verificarNombre(data))){
                console.log("usuario invalido: "+data);
                cb({cb: false, cid: 0, t: null});
            }else{
                socket.nombreUsuario = data;
                socket.token = token.generar(socket.c_id,socket.nombreUsuario);

                cb({cb: true, cid: socket.c_id ,t: socket.token});               
            }
            
        });

        socket.on('envio_mensaje', data => {
            ws_io.sockets.emit('nuevo_mensaje',{
                mensaje: data.mensaje,
                nombreu: data.usuario,
            });
        });

        socket.on('disconnect', data => {
            console.log("Conexión perdida: id -> "+socket.c_id);
            if(socket.nombreUsuario) {
                usuarios.desconectar(socket.token);
            }
        });

        socket.on('reconectar', async (data,cb) => {
            if(data!=null){
                socket.nombreUsuario=usuarios.verificarToken(data);
                if(socket.nombreUsuario!=null && tokens.verificar(socket.nombreUsuario)){
                    socket.token=data;
                    cb({cb: true,cid: socket.c_id, t: socket.token, n: socket.nombreUsuario});
                    console.log("Conexión restablecida: id -> "+socket.c_id+" Usuario: "+socket.nombreUsuario);
                }else{
                    cb({cb: false,cid: socket.c_id, t: null, n: null});
                    console.log("Conexión reusada: id -> "+socket.c_id);
                }
                
            }           
            
        });

    });

}