//This app is for the web page 

const express = require('express');
const bodyParser = require('body-parser');
//eequire('./spreadsheet'); //eliminar 

const app = express();

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//routes
app.use (require('./routes/google.routes'));
console.log("App activada con su paguina web");
module.exports = app;
