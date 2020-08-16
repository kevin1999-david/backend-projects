'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar archivos de rutas
var project_routes = require('./routes/project');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
//Cualquier tipo de petición a json
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//CORS
app.use('/api', project_routes);

//Rutas


// app.get('/', (req, res) => {
//     res.status(200).send(
//         '<h1> Pagina de Inicio</h1>'
//     );
// });



// app.get('/test/:id', (req, res) => {
//     console.log(req.body.nombre);
//     console.log(req.query.web);
//     console.log(req.params.id);
//     res.status(200).send(
//         { message: "Hola mundo desde mi Api de NodeJS" }
//     );
// });




//Exportar
module.exports = app;



