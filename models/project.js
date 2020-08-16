'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Modelo
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    languages: String,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);
//Project == projects
//MVC: Modelo Vista Controlador: Separar la lógica del negocio.
//El modelo es la lógica del negocio o la parte que se conecta directamente con la 
//base de datos.
