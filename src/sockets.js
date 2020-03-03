//webSocket
module.exports = function(io){
    io.on('connection', socket => {
        console.log("Un nuevo USUARIO conectado.");

        socket.on('envio_mensaje',function(data){
            io.sockets.emit('nuevo_mensaje',data);
        });

    });

}



