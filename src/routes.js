const express = require('express');
const routes = express.Router();
const multer = require('multer');
const configMulter = require('../config/multer');

const BoxController = require('../controllers/BoxController');
const FileController = require('../controllers/FileController');


routes.get('/teste', (req, res) => {
    return res.send('Hello world!');
})

routes.post('/boxes', BoxController.store);
routes.post('/boxes/:id/files', multer(configMulter).single('file'), FileController.store);
routes.get('/boxes/:id/files', FileController.show);

module.exports = routes;