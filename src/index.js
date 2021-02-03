const http = require('http');
const path = require('path');

const express = require('express'); //carga de la libreria del servidor web.
const socketio = require('socket.io'); //carga de la librería.

//const sesion = require('express-session'); //debe cambiarse por otro middleware de sesiones.

const flash = require('connect-flash');
const helmet = require('helmet') //librería para la seguridad en la comunicación http.

const app = express();
const server = http.createServer(app);

require('./database'); // conexión con MongoDB.

//websocket
const s_io = socketio.listen(server); //El websocket escucha desde el servidor web (express)
require('./sockets')(s_io); //carga del módulo sockets.js (función), un websocket adaptado a nuestra necesidad. Y se pasa como parametro la conexion websocket.

//Static
app.use(express.static(path.join(__dirname,'public')));

//middlewares

app.use(express.urlencoded({extended: false}));


app.use(flash());
//app.use(helmet()); //activar cuando ya tenga configurada la conexion segura.

//Direccionamientos

var enrutador = require('./rutas');

app.use('/',enrutador);

//Manejo de errores

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Algo no esta funcionando bien!');
  });

//Limpiar BD
//const usuarios=require('./controladores/usuarios.controlador');
//usuarios.limpiar();

//Iniciando el servidor web.

app.set('port',process.env.PORT || 7000);


server.listen(app.get('port'), () => {
    console.log("Express escuchando en el puerto: ",app.get('port'));
});