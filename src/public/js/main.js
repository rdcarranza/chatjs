$(function(){
    //conexión websocket
    const socket = io(); // este es un objeto generado por la clase io de la libreria sockets.io.js

    //elementos del DOM
    const $formRegistro = $('#form-registro');
    const $errorRegistro = $('#error-registro');
    const $nombreUsuario = $('#user_name');
    var nomusuario = null;

               
    if(screen.width < 600){
        $('#icono-regUsuario').remove();      
    }    

    $('#regUsuario-submit').onclick = function(){
        $formRegistro.submit();
    };


    //eventos

    $formRegistro.submit(function(e){
        e.preventDefault();
        nomusuario=$nombreUsuario.val();
        if(nomusuario!=null && nomusuario.trim()!=''){ //evita el registro de nombres nulos o vacios.
            socket.emit('nuevo_usuario',nomusuario, function(data){
                
                if(data.cb){
                    //enviar nomusuario y redireccionar a la pagina de chat.
                    $.post('/registro',{'cod_u': data.id},function(data_u){
                        console.log("datos de usuario recibidos: "+data_u.cod);
                    });

                    $.get('/chat');
                                                        
                }else{
                    $errorRegistro.html(`
                        <div>
                            El Nombre de Usuario ingresado NO es correcto Ó ya se encuentra en uso, vuelva a intentarlo!
                        </div>
                    `);
                }
            });
        }else{
            console.log("Error: Nombre de usuario nulo o vacío.");
            $errorRegistro.html(`
            <div>
                Nombre de Usuario nulo o vacío.
            </div>
        `);
        }        
        $nombreUsuario.val('');
    });   


});