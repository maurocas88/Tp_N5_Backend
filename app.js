
//#######  Const #######//
const port = 5000;

//#######  Requires #######//
var express = require('express');
var app = express();
const morgan = require ('morgan');

//#######  Controller imports #######//
const medicoController = require("./controllers/medicoController.js");
const pacienteController = require("./controllers/pacienteController.js");
const ingresoController = require("./controllers/ingresoController.js");

//#######  Middlewares (USE) #######//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(":method :url :status :res[content-length] - :response-time ms");

app.use("/api/medico",medicoController);
app.use("/api/paciente",pacienteController);
app.use("/api/ingreso",ingresoController);



app.listen(port, (err, res) => {
    if (err) {
        console.log("Sorry, we have a problem whit the connection");
        return;
    } else {
        console.log("Server runing in port: " + port);
    }
});
