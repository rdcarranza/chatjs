//webSocket

var conexion_id=0;

const usuarios=require('./controladores/usuarios.controlador');
const tokens=require('./controladores/tokens.controlador');

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
                socket.token = tokens.generar(socket.c_id,socket.nombreUsuario);

                cb({cb: true, cid: socket.c_id ,t: socket.token});               
            }
            
        });

        socket.on('envio_mensaje', data => {
            ws_io.sockets.emit('nuevo_mensaje',{
                mensaje: data.mensaje,
                nombreu: data.usuario,
            });
        });

        socket.on('disconnect', async data => {
            console.log("Conexión perdida: id -> "+socket.c_id);
            if(socket.nombreUsuario) {
                await usuarios.desconectar(socket.token);
            }
        });

        socket.on('reconectar', async (data,cb) => {
            if(data!=null){
                let u = await usuarios.verificarToken(data);
                if(u!=null && await tokens.verificar(data,u.nombre)){
                    socket.nombreUsuario=u.nombre;
                    socket.token=data;
                    if(await usuarios.reconectar(socket.token)){
                        cb({cb: true,cid: socket.c_id, t: socket.token, n: socket.nombreUsuario});
                        console.log("Conexión restablecida: id -> "+socket.c_id+" Usuario: "+socket.nombreUsuario);
                        return;
                    }                    
                }                
            }
            cb({cb: false,cid: null, t: null, n: null});
            console.log("Conexión reusada: id -> "+socket.c_id);         
            
        });

    });

}