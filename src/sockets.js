//webSocket
module.exports = function(io){

    let usuarios = [];


    io.on('connection', socket => {
        console.log("Un nuevo USUARIO conectado.");

        socket.on('nuevo_usuario', (data, cb) => {
            if(usuarios.indexOf(data) > 0){
                cb(false);
                console.log(usuarios.indexOf(data));
            }else{
                cb(true);
                socket.nombreUsuario = data;
                usuarios.push(socket.nombreUsuario);

            }
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