'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

var crypto = require('crypto')

var multer = require('multer');

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, './uploads');

    },

    filename(req, file = {}, cb) {

        const { originalname } = file;



        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];

        // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);

        crypto.pseudoRandomBytes(16, function (err, raw) {

            cb(null, raw.toString('hex') + Date.now() + fileExtension);

        });

    },

});

var mul_upload = multer({ dest: './uploads', storage });
//Para obtener información
router.get('/home', ProjectController.home);

//Para crear un registro
router.post('/test', ProjectController.test);

//Para crear un registro
router.post('/save-project', ProjectController.saveProject);

//Para obtene un registro: parametro oblifafo, id? parametro opcional
router.get('/project/:id?', ProjectController.getProject);
//Para todos los eleemtos
router.get('/projects', ProjectController.getProjects);
//Para actualizar
router.put('/projectUpdate/:id', ProjectController.updateProject);
//Para eliminar
router.delete('/delete/:id', ProjectController.deleteProject);

//Para subir imagen

router.post('/upload/:id', [mul_upload.single('image')], ProjectController.upload);

router.get('/get-image/:image', ProjectController.getImageFile);



module.exports = router;