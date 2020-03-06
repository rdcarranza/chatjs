const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const passport = require('passport');
const sesion = require('express-session');
const flash = require('connect-flash');

const app = express();
const server = http.createServer(app);

require('./database');
require('./registroUsuario');

//websocket
const io = socketio.listen(server);
require('./sockets')(io);

//Static
app.use(express.static(path.join(__dirname,'public')));

//middlewares

app.use(express.urlencoded({extended: false}));
app.use(sesion({
  secret:'cadenasecretadechatjs',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Direccionamientos

var enrutador = require('./rutas');

app.use('/',enrutador);

//Manejo de errores

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Algo no esta funcionando bien!');
  });

//Iniciado el servidor web.

app.set('port',process.env.PORT || 7000);


server.listen(app.get('port'), () => {
    console.log("Express escuchando en el puerto: ",app.get('port'));
});