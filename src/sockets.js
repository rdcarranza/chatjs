//webSocket

var conexion_id=0;

const usuarios=require('./controladores/usuarios.controlador');

module.exports = ws_io => {
        
    ws_io.on('connection', socket => {
        conexion_id++;
        socket.c_id=conexion_id;

        console.log("Se inició una Nueva Conexión: id -> "+socket.c_id);

        socket.on('nuevo_usuario', async (data, cb) => {
            
            console.log("Conexión: id -> "+socket.c_id);
            console.log("socket->data: "+data);
                     
            if(data==null || data.trim()=='' || await !usuarios.verificarNombre(data)){
                console.log("usuario invalido: "+data);
                cb({cb: false, cid: 0, t: null});
            }else{
                socket.nombreUsuario = data;
                             
                cb({cb: true, cid: socket.c_id ,t: '0'});               
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
            if(!socket.nombreUsuario) return;
            
            
        });

    });

}