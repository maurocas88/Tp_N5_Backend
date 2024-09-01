
//#######  Requires #######//
const { connection } = require("../bd_connection");


                //#######  Query Functions #######//

// Ver todos los pacientes
getAll = (callback) => {
    consulta = "select * from paciente";
    connection.query(consulta, (err, results, fields) => {
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


// Filtrar por Nro Historia Clinica
getByNroHistClin = (nro_historial_clinico, callback) => {
    query = "select * from paciente where nro_historial_clinico = ?";
    connection.query(query, nro_historial_clinico, (err, results, fields) => {
        if (err) {
            callback(err);
        }
        else {
            if (results.length == 0) {
                callback(undefined, {
                    message: "No se encontro un paciente con el nro de historial clinico: " + nro_historial_clinico
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


// Filtrar por NSS
getByNss = (nss, callback) => {
    query = "select * from paciente where nss = ?";
    connection.query(query, nss, (err, results) => {
        if (err) {
            callback(err);
        }
        else {
            if (results.length == 0) {
                callback(undefined, {
                    message: "No se encontro un paciente con el Nro de seguro social: " + nss
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


// Crear un paciente
createPaciente = (paciente, callback) => {
    pacienteN = [
        parseInt(paciente.nro_historial_clinico),
        parseInt(paciente.nss),
        paciente.nombre,
        paciente.apellido,
        paciente.domicilio,
        parseInt(paciente.codigo_postal),
        paciente.telefono,
        paciente.observaciones
    ];
    query = "insert into paciente (nro_historial_clinico,nss,nombre,apellido,domicilio,codigo_postal,telefono,observaciones) values(?,?,?,?,?,?,?,?)";

    connection.query(query, pacienteN, (err, rows) => {
        if (err) {
            callback({
                message: "Disculpe, Ocurrió un error",
                detail: err
            });
            return;
        }
        else {
            callback(undefined, {
                message: "El paciente " + paciente.nombre + " " + paciente.apellido + " se registro correctamente",
                detail: rows
            });
        }
    });
};



// Actualizar un paciente
updatePaciente = (paciente, callback) => {
    pacienteU = [
        parseInt(paciente.nss),
        paciente.nombre,
        paciente.apellido,
        paciente.domicilio,
        parseInt(paciente.codigo_postal),
        paciente.telefono,
        paciente.observaciones,
        parseInt(paciente.nro_historial_clinico),
    ];

    query = "update paciente set nss=?, nombre=?, apellido=?, domicilio=?, codigo_postal=?, telefono=?, observaciones=? where nro_historial_clinico =?";
        connection.query(query, pacienteU, (err, rows) => {
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
                    message: "No se encontro un paciente con el nro de historial clinico: " + nro_historial_clinico
                    });
                } else {
                    callback(undefined, {
                    message: "Los datos del paciente "+ paciente.apellido + " " + paciente.nombre + " fueron modificados.",
                    detail: rows
                    });
                }
            }
        });
    };


// Borrar un paciente
deletePaciente = (nro_historial_clinico,callback) => {
    query = "delete from paciente where nro_historial_clinico = ?";
    connection.query(query, nro_historial_clinico, (err, rows, fields) => {
        if (err) {
            callback.json({
                message: "Disculpe, Ocurrió un error",
                detail: err
            });
            return;
        }
        else{
            if (rows.affectedRows == 0) {
                callback(undefined, "No se encontro un paciente con el nro de historial clinico: " + nro_historial_clinico);
            } else {
                callback(undefined, "El paciente con nro historial clinico: " + nro_historial_clinico + " fue eliminado de la base de datos.");
            }
        }
    });
};


//#######  FIN Query Functions #######//

var pacienteMetods = { getAll, getByNroHistClin,getByNss, createPaciente, updatePaciente, deletePaciente }
module.exports = { pacienteMetods }