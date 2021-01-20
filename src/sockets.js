//webSocket
var usuarios = [];

module.exports = function(io){

    
    io.on('connection', socket => {
        console.log("Se inició una Nueva Conexión.");

        socket.on('nuevo_usuario', (data, cb) => {
            console.log("socket->data: "+data);
            if(usuarios.indexOf(data) >= 0){
                cb(false);
                console.log("usuario duplicado - indice: "+usuarios.indexOf(data));
            }else{
                cb(true);
                socket.nombreUsuario = data;
                usuarios.push(socket.nombreUsuario);

            }
            console.log(usuarios);
        });

        socket.on('envio_mensaje', data => {
            io.sockets.emit('nuevo_mensaje',{
                mensaje: data.mensaje,
                nombreu: data.usuario,
            });
        });

        socket.on('disconnect', data => {
            if(!socket.nombreUsuario) return;
            usuarios.splice(usuarios.indexOf(socket.nombreUsuario),1);

        });

    });

}