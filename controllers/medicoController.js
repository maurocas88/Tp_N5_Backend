const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//#######  Model import #######//
const medicoModelBD = require ("./../models/medicoModel.js");


                //#######  RUtas (Endpoints) #######//

// listar medicos
app.get('/', (req, res) => {
    medicoModelBD.medicoMetods.getAll((err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(rows);
        }
    });
});

//ver un medico
app.get('/:matricula', (req, res) => {
    matricula = req.params.matricula;
    medicoModelBD.medicoMetods.getByMatricula(matricula, (err, ok) => {
        if (err) {
            res.send(err);
        } else {
            res.json(ok);
        }
    });
});


// Filtrar por Especialidad
app.get('/byespecialidad/:especialidad', (req, res) => {
    especialidad = req.params.especialidad;
    medicoModelBD.medicoMetods.getByEspecialidad(especialidad, (err, ok) => {
        if (err) {
            res.send(err);
        } else {
            res.json(ok);
        }
    });
});


// crear un medico
app.post('/create', (req, res) => {

    medicoModelBD.medicoMetods.createMedic(req.body, (err, ok) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(ok);
        }
    });
});


//actualizar un medico
app.put('/update/', (req, res) => {

    medicoModelBD.medicoMetods.updateMedic(req.body, (err, ok) => {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(ok);
        }
    });
});


//eliminar un medico
app.delete('/delete/:matricula', (req, res) => {
    matriculaD = parseInt(req.params.matricula);
    medicoModelBD.medicoMetods.deleteMedic(matriculaD, (err, ok) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).send(ok);
        }
    });
});


module.exports = app;