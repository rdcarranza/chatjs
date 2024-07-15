const { configDotenv } = require('dotenv');
const mongoose=require('mongoose');

/*
import dotenv from 'dotenv'
dotenv.config()
*/

const env=require('dotenv').config('/')

const host=process.env.host_mongodb
const port=process.env.port_mongodb
const db=process.env.db_mongodb
const pw=process.env.pw_mongodb
const user=process.env.user_mongodb

const uri='mongodb://'+user+':'+pw+'@'+host+':'+port+'/'+db;

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('MongoDB está conectado'))
    .catch(err => console.error("Error en la conexión con la BD."));

const con=mongoose.connection;
con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', function(){
    console.log("contectados a la BD chatjs");
});