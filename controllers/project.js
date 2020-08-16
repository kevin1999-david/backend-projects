'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');


var controller = {

    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la Home'
        });
    },

    test: function (req, res) {

        return res.status(200).send({
            message: 'Soy el metodo o accion test del controlador de project'
        });
    },

    saveProject: function (req, res) {
        var project = new Project();
        var params = req.body;
        // console.log(req);
        // console.log(req.body);
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.languages = params.languages;
        project.image = null;



        project.save((err, projectStored) => {
            if (err) {
                return res.status(500).send({ message: 'Error al guardar el documento' });
            }
            if (!projectStored) {
                return res.status(404).send({ message: 'No se ha podido guardar el proyecto' });
            }
            return res.status(200).send({ project: projectStored });
        });
    },

    getProject: function (req, res) {

        var projectId = req.params.id; //recoje la url
        // console.log("Id: " + req.params.id);
        //Buscar un objeto por el id que se le pasa
        //Req: La solicitud
        //Res: respoesya

        Project.findById(projectId, (err, project) => {
            if (err) {
                return res.status(500).send({ message: 'Error al devolver los datos.' });
            }
            if (!project) {
                return res.status(404).send({
                    message: '1. El proyecto no existe' + project,
                    project: project
                });
            }
            if (projectId == null) {
                return res.status(404).send({ message: '2. El proyecto no existe' });
            }

            return res.status(200).send({ project });
        });
    },

    getProjects: function (req, res) {
        //Sacar todos los documentos
        Project.find({/*Aqui van las condiciones*/ }).sort('year').exec((err, projects) => {
            if (err) {
                return res.status(500).send({ message: 'Error al devolver los datos' });
            }
            if (!projects) {
                return res.status(400).send({ message: 'No hay proyecto para mostrar' });
            }
            return res.status(200).send({ projects });
        });
    },

    updateProject: function (req, res) {
        //Pasar url
        //Captura el id por la url
        var projectId = req.params.id;

        //Captura el nuevo registro
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            //Si entramos aqui es por que se ejecuto el metodo: findByIdAndUpdate..
            if (err) {
                return res.status(500).send({ message: 'Error al actualizar' });
            }

            if (!projectUpdated) {
                return res.status(404).send({ message: 'No se ha podido actualizar, no existe el proyecto' });
            }
            return res.status(200).send({
                project: projectUpdated
            });
        });
    },
    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemove) => {
            if (err) {
                return res.status(500).send({ message: 'Error al eliminar' });
            }

            if (!projectRemove) {
                return res.status(404).send({ message: 'No se ha podido eliminar, no existe el proyecto' });
            }
            return res.status(200).send({ ProjetcDelete: projectRemove });
        });
    },

    upload: function (req, res) {
        var projectId = req.params.id;
        if (req.file) {

            

            var file_path = req.file.path;

            var file_split = file_path.split('\\');

            var file_name = file_split[1];

            var ext_split = req.file.originalname.split('\.');

            var file_ext = ext_split[1];

            file_ext = file_ext.toLowerCase();

            if (file_ext == 'png' || file_ext == 'gif' || file_ext == 'jpg') {

                Project.findByIdAndUpdate(projectId, { image: file_name }, (err, projectUpdated) => {

                    if (!projectUpdated) {

                        return res.status(404).send({ message: 'No se ha podido actualizar el album' });

                    } else {
                        console.log('Project Updated');
                        console.log(projectUpdated);
                        return res.status(200).send({ Project: projectUpdated });

                    }

                })

            } else {

                return res.status(200).send({ message: 'Extension del archivo no valida' });

            }


        } else {

            return res.status(200).send({ message: 'No has subido ninguna imagen..' });

        }

    },
    getImageFile: function (req, res) {
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: "No existe la imagen.... "
                });
            }
        });

    }

};


//Req: resibe paramétros
//Res: para hacer la respuesta
module.exports = controller;
