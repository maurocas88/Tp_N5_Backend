const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//#######  Model imports #######//
const pacienteModelBD = require("./../models/pacienteModel.js");


                //#######  RUtas (Endpoints) #######//

// listar pacientes
app.get('/', (req, res) => {
    pacienteModelBD.pacienteMetods.getAll((err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(rows);
        }
    });
});


//ver un paciente
app.get('/:nroHistClin', (req, res) => {
    nroHistClin = req.params.nroHistClin;
    pacienteModelBD.pacienteMetods.getByNroHistClin(nroHistClin, (err, ok) => {
        if (err) {
            res.send(err);
        } else {
            res.json(ok);
        }
    });
});


// Filtrar por Nss
app.get('/bynss/:nss', (req, res) => {
    nss = req.params.nss;
    pacienteModelBD.pacienteMetods.getByNss(nss, (err, ok) => {
        if (err) {
            res.send(err);
        } else {
            res.json(ok);
        }
    });
});


// crear un paciente
app.post('/create', (req, res) => {
    pacienteModelBD.pacienteMetods.createPaciente(req.body, (err, ok) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(ok);
        }
    });
});


//actualizar un paciente
app.put('/update/', (req, res) => {
    pacienteModelBD.pacienteMetods.updatePaciente(req.body, (err, ok) => {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(ok);
        }
    });
});


//eliminar un paciente
app.delete('/delete/:nroHistClin', (req, res) => {
    nroHistClin = parseInt(req.params.nroHistClin);
    pacienteModelBD.pacienteMetods.deletePaciente(nroHistClin, (err, ok) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).send(ok);
        }
    });
});



module.exports = app;