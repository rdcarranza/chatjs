$(function(){
    //conexión websocket
    const socket = io();

    //elementos del DOM
    const $formMensaje = $('#form-mensaje');
    const $mensaje = $('#msj-chat');
    const $listaChat = $('#lista-chat');

    
    if(screen.width < 600){
        $('#text-submit').remove();      
    }
    

    $('#msj-submit').onclick = function(){
        $formMensaje.submit();
    };

    //eventos
    $formMensaje.submit(function(e){
        e.preventDefault();
        //console.log($mensaje.val());
        socket.emit('envio_mensaje',$mensaje.val());
        $mensaje.val('');
    });

    var indice_msj=0;
    socket.on('nuevo_mensaje',function(data){
                
        var icono = document.createElement("i");
        icono.innerHTML="account_circle";
        icono.className="material-icons circle red";
        var nom_usuario = document.createElement("span");
        nom_usuario.innerHTML="Prueba"+":";
        nom_usuario.className="title";
        var texto_mensaje=document.createElement("p");
        texto_mensaje.innerHTML=data;
        var item_chat=document.createElement("li");
        item_chat.className="collection-item avatar";
        item_chat.id="im"+indice_msj++;
        item_chat.append(icono,nom_usuario,texto_mensaje);

        $listaChat.append(item_chat);

        //llevar el scroll del visor del chat hasta el ultimo mensaje.
        $('#chat-visor').scrollTop(item_chat.offsetTop);
               
        
    });


});