//webSocket

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
                     
            if(data==null || data.trim()=='' || await usuario.findOne({nombre: data}).exec()!=null){
                console.log("usuario invalido: "+data);
                cb({cb: false, id: null});
            }else{
                socket.nombreUsuario = data;
                
                let nuevo_usuario=new usuario({
                    nombre: socket.nombreUsuario,
                    conexion_id: socket.c_id
                });
                await nuevo_usuario.save();
                let usuario_almacenado = await usuario.findOne({nombre: data}).exec();
                cb({cb: true,id: usuario_almacenado._id});
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