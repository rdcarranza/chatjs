$(function(){
    //conexión websocket
    const socket = io();

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
                if(data){
                    //enviar nomusuario y redireccionar a la pagina de chat.
                    $.post('/registro',{nom_u: nomusuario},function(datosu){
                        console.log(datosu)
                    });
                                                        
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