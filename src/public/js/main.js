const socket = io();
var nomusuario = null;

$(function(){
    //conexión websocket
     // este es un objeto generado por la clase io de la libreria sockets.io.js

    //elementos del DOM
    const $contenedorPrincipal = $('#contenedorPrincipal');
    const $formRegistro = $('#form-registro');
    const $errorRegistro = $('#error-registro');
    const $nombreUsuario = $('#user_name');
              
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
                    $.post('/registro',{'cod_u': data.id}, function(data){
                        console.log(data);
                        $contenedorPrincipal.html(data);
                        chatjs();
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

function chatjs(){
    //ChatJS
    const $formMensaje = $('#form-mensaje');
    const $mensaje = $('#msj-chat');
    const $listaChat = $('#lista-chat');
    var msj;
           
    
    $('#msj-submit').onclick = function(){
        $formMensaje.submit();
    };

    //eventos

    
    $formMensaje.submit(function(e){
        e.preventDefault();
        msj=$mensaje.val();
        if(msj!=null && msj.trim()!='' /*&& nomusuario!=null*/){ //evita enviar mensajes vacios y de usuarios sin registro.
            socket.emit('envio_mensaje',{
                mensaje: msj,
                usuario: nomusuario
            });            
        }
        $mensaje.val('');       
    });

    var indice_msj=0;
    socket.on('nuevo_mensaje', data =>{
                
        var icono = document.createElement("i");
        icono.innerHTML="account_circle";
        icono.className="material-icons circle red";
        var nom_usuario = document.createElement("span");
        nom_usuario.innerHTML=data.nombreu+":";
        nom_usuario.className="title";
        var texto_mensaje=document.createElement("p");
        texto_mensaje.innerHTML=data.mensaje;
        var item_chat=document.createElement("li");
        item_chat.className="collection-item avatar";
        item_chat.id="im"+indice_msj++;
        item_chat.append(icono,nom_usuario,texto_mensaje);

        $listaChat.append(item_chat);

        //llevar el scroll del visor del chat hasta el ultimo mensaje.
        $('#chat-visor').scrollTop(item_chat.offsetTop);
               
        
    });
}