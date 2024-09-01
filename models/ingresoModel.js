
//#######  Requires #######//
const { connection } = require("../bd_connection");


//#######  Query Functions #######//

// listar ingresos
getAll = (callback) => {
    consulta = "select * from ingreso";
    connection.query(consulta, (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        else {
            callback(undefined, {
                message: "Resultados de la consulta",
                detail: results
            });
        }
    });
};


//ver un ingreso
getById_ingreso = (id_ingreso, callback) => {
    query = "select * from ingreso where id_ingreso = ?";
    connection.query(query, id_ingreso, (err, results) => {
        if (err) {
            callback(err);
        }
        else {
            if (results.length == 0) {
                callback(undefined, {
                    message: "No se encontro un ingreso con el id_ingreso " + id_ingreso
                });
            } else {
                callback(undefined, {
                    message: "Resultados de la consulta",
                    detail: results
                });
            }
        }
    });
};


// Consulta ingresos "Report"
ingresoF = (callback) => {

    query = `SELECT 
            id_ingreso as "Nro",
            fecha_ingreso as "Ingreso",
            numero_habitacion as "Habitación",
            numero_cama as "Cama",
            nro_historial_paciente as "Nro Hist.",
            concat(paciente.apellido,", ",paciente.nombre) as "Paciente",
            concat(medico.apellido,", ",medico.nombre) as "Medico",
            especialidad as "Especialidad",
            ingreso.observaciones 
            FROM clinica.ingreso 
            inner join paciente on (nro_historial_paciente=nro_historial_clinico) 
            inner join medico on (matricula_medico=medico.matricula)`;

    connection.query(query, (err, results) => {
        if (err) {
            callback(err);
        }
        else {
            callback(undefined, {
                message: "Resultados de la consulta",
                detail: results
            });
        }
    });
};


// crear un ingreso
createIngreso = (ingreso, callback) => {
    ingresoN = [
        parseInt(ingreso.id_ingreso),
        ingreso.fecha_ingreso,
        parseInt(ingreso.numero_habitacion),
        parseInt(ingreso.numero_cama),
        ingreso.observaciones,
        parseInt(ingreso.nro_historial_paciente),
        ingreso.matricula_medico,
    ];

    query = "insert into ingreso (id_ingreso,fecha_ingreso,numero_habitacion,numero_cama,observaciones,nro_historial_paciente,matricula_medico) values(?,?,?,?,?,?,?)";

    connection.query(query, ingresoN, (err, rows) => {
        if (err) {
            if (err.code = "ER_DUP_ENTRY") {
                callback({
                    description: "Entrada de datos duplicados, por favor modifique el id_ingreso ",
                    error_: err
                });
            } else {
                callback.json({
                    description: "Disculpe, Ocurrió un error",
                    error_: err
                });
            }
        }
        else {
            callback(undefined, {
                message: "El ingreso N° " + ingreso.id_ingreso + " se registro correctamente",
                detail: rows
            });
        }
    });
};


// actualizar un ingreso
updateIngreso = (ingreso, callback) => {
    ingresoU = [
        ingreso.fecha_ingreso,
        parseInt(ingreso.numero_habitacion),
        parseInt(ingreso.numero_cama),
        ingreso.observaciones,
        parseInt(ingreso.nro_historial_paciente),
        ingreso.matricula_medico,
        parseInt(ingreso.id_ingreso),
    ];

    query = "update ingreso set fecha_ingreso=?, numero_habitacion=?, numero_cama=?, observaciones=?, nro_historial_paciente=?, matricula_medico=? where id_ingreso =?";

    connection.query(query, ingresoU, (err, rows) => {
        if (err) {
            callback({
                message: "Disculpe, Ocurrió un error",
                detail: err
            });
            return;
        }
        else {
            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message: "No se encontro un ingreso con el id_ingreso " + ingreso.id_ingreso
                });
            } else {
                callback(undefined, {
                    message: "Los datos del ingreso, id_ingreso: " + ingreso.id_ingreso + " fueron modificados.",
                    detail: rows
                });
            }
        }
    });
};


//eliminar un ingreso
deleteIngreso = (id_ingresoD, callback) => {
    query = "delete from ingreso where id_ingreso = ?";
    connection.query(query, id_ingresoD, (err, rows) => {
        if (err) {
            callback.json({
                message: "Disculpe, Ocurrió un error",
                detail: err
            });
        }

        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un ingreso con el id_ingreso " + id_ingresoD);
        } else {
            callback(undefined, "El ingreso " + id_ingresoD + ", fue eliminado de la base de datos.");
        }
    });
};

//#######  Fin Query Functions #######//


var ingresoMetods = { getAll, getById_ingreso, ingresoF, createIngreso, updateIngreso, deleteIngreso }
module.exports = { ingresoMetods }