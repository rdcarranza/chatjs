//conexión websocket
const socket = io();

//token
var token=null;

var nomusuario = null;
var conexion_id = null;


$(function(){
    
    cargarToken();

    //elementos del DOM    

    const $formMensaje = $('#form-mensaje');
    const $mensaje = $('#msj-chat');
    const $listaChat = $('#lista-chat');
    var msj;
           
    if(screen.width < 600){
        //$('#text-submit').remove();      
    }    

    var b = reconectarSocket();

    if(b){
        $('#msj-submit').onclick = function(){
            $formMensaje.submit();
        };
    }else{
        location.href="/";        
    }

    //eventos

    
    $formMensaje.submit(function(e){
        e.preventDefault();
        msj=$mensaje.val();
        if(nomusuario!=null && b){
            if(msj!=null && msj.trim()!=''){ //evita enviar mensajes vacios y de usuarios sin registro.
                socket.emit('envio_mensaje',{
                    mensaje: msj,
                    usuario: nomusuario
                });            
            }
        }
        else{
            location.href="/";
        }
        $mensaje.val('');       
    });

    var indice_msj=0;
    socket.on('nuevo_mensaje', data =>{
        
        if(b){
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
        }else{
            location.href="/";
        }       
        
    });

    

});

function cargarToken(){
    let t=location.href.split("/");
    token=t[t.length-1];
}

async function reconectarSocket(){
    if(token!=null){
        await socket.emit('reconectar',token,data =>{
            if(data.cb){
                nomusuario=data.n;
                conexion_id=data.c_id;                
                $('#barraSup-nomUsuario').html(nomusuario);
                return true;
            }else{
                return false;
            }
        }); 
    }else{
        return false;
    }
}