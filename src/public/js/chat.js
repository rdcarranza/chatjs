$(function(){
    //conexión websocket
    const socket = io();

    //elementos del DOM
    const $formRegistro = $('#form-registro');
    const $errorRegistro = $('#error-registro');
    const $nombreUsuario = $('#user_name');
    var nomusuario = null;

    const $formMensaje = $('#form-mensaje');
    const $mensaje = $('#msj-chat');
    const $listaChat = $('#lista-chat');
    var msj;
           
    if(screen.width < 600){
        $('#text-submit').remove();      
    }    

    $('#regUsuario-submit').onclick = function(){
        $formRegistro.submit();
    };

    $('#msj-submit').onclick = function(){
        $formMensaje.submit();
    };

    //eventos

    $formRegistro.submit(function(e){
        e.preventDefault();
        nomusuario=$nombreUsuario.val();
        if(nomusuario!=null && nomusuario.trim()!=''){ //evita el registro de nombres nulos o vacios.
            socket.emit('nuevo_usuario',nomusuario, function(data){
                if(data){
                    $('#freg').hide();
                    $('#fchat').show();                
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

    $formMensaje.submit(function(e){
        e.preventDefault();
        msj=$mensaje.val();
        if(msj!=null && msj.trim()!='' && nomusuario!=null){ //evita enviar mensajes vacios y de usuarios sin registro.
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


});