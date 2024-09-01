const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//#######  Model import #######//
const ingresoModelBD = require("./../models/ingresoModel.js");


                //#######  RUtas (Endpoints) #######//

// listar ingresos
app.get('/', (req, res) => {
    ingresoModelBD.ingresoMetods.getAll((err, rows) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(rows);
        }
    });
});


// Consulta ingresos "para front"
app.get('/report', (req, res) => {
    ingresoModelBD.ingresoMetods.ingresoF((err, ok) => {
        if (err) {
            res.send(err);
        } else {
            res.json(ok);
        }
    });
});


//ver un ingreso
app.get('/:id_ingreso', (req, res) => {
    id_ingreso = req.params.id_ingreso;
    ingresoModelBD.ingresoMetods.getById_ingreso(id_ingreso, (err, ok) => {
        if (err) {
            res.send(err);
        } else {
            res.json(ok);
        }
    });
});


// crear un ingreso
app.post('/create', (req, res) => {
    ingresoModelBD.ingresoMetods.createIngreso(req.body, (err, ok) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(ok);
        }
    });
});


//actualizar un ingreso
app.put('/update/', (req, res) => {

    ingresoModelBD.ingresoMetods.updateIngreso(req.body, (err, ok) => {
        if (err){
            res.status(500).json(err);
        }
        else{
            res.status(200).json(ok);
        }
    })
})


//eliminar un ingreso
app.delete('/delete/:id_ingreso', (req, res) => {
    id_ingresoD = parseInt(req.params.id_ingreso);
    ingresoModelBD.ingresoMetods.deleteIngreso(id_ingresoD, (err, ok) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).send(ok);
        }
    });
});


module.exports = app;