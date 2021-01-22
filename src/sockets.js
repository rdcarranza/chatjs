//webSocket
var usuarios = [];
var conexion_id=0;

const usuario=require('./modelos/usuario');

module.exports = ws_io => {
        
    ws_io.on('connection', socket => {
        conexion_id++;
        socket.c_id=conexion_id;

        console.log("Se inició una Nueva Conexión: id -> "+socket.c_id);

        socket.on('nuevo_usuario', async (data, cb) => {
            console.log("Conexión: id -> "+socket.c_id);
            console.log("socket->data: "+data);
            if(usuarios.indexOf(data) >= 0){
                console.log("usuario duplicado - indice: "+usuarios.indexOf(data));
                cb(false);
            }else{
                socket.nombreUsuario = data;
                usuarios.push(socket.nombreUsuario);
                let nuevo_usuario=new usuario({
                    nombre: socket.nombreUsuario,
                    conexion_id: socket.c_id
                });
                await nuevo_usuario.save();
                cb(true);
            }
            console.log(usuarios);
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
            usuarios.splice(usuarios.indexOf(socket.nombreUsuario),1);
            
        });

    });

}