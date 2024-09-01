
//#######  Requires #######//
const { connection } = require("../bd_connection");


                //#######  Query Functions #######//

// listar medicos
getAll = (callback) => {
    query = "select * from medico";
    connection.query(query, (err, results) => {
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


//ver un medico por matricula
getByMatricula = (matricula, callback) => {
    query = "select * from medico where matricula = ?";
    connection.query(query, matricula, (err, results) => {
        if (err) {
            callback(err);
        }
        else {
            if (results.length == 0) {
                callback(undefined, {
                    message: "No se encontro un medico con la matricula " + matricula
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


//ver un medico por especialidad
getByEspecialidad = (especialidad, callback) => {
   query = "select * from medico where especialidad = ?";
    connection.query(query, especialidad, (err, results) => {
        if (err) {
            callback(err);
        }
        else {
            if (results.length == 0) {
                callback(undefined, {
                    message: "No se encontro un medico con la especialidad " + especialidad
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


// Crear un medico
createMedic = (medico, callback) => {
    medicoN = [
        parseInt(medico.matricula),
        medico.nombre,
        medico.apellido,
        medico.especialidad,
        medico.observaciones
    ];
    query = "insert into medico (matricula,nombre,apellido,especialidad,observaciones) values(?,?,?,?,?)";

    connection.query(query, medicoN, (err, rows) => {
        if (err) {
            callback({
                description: "Disculpe, Ocurrió un error",
                detail: err
            });
            return;
        }
        else {
            callback(undefined, {
                message: "El medico " + medico.nombre + " " + medico.apellido + " se registro correctamente",
                detail: rows
            });
        }
    });
};


// Actualizar un medico 
updateMedic = (medico, callback) => {
    medicoU = [
        medico.nombre,
        medico.apellido,
        medico.especialidad,
        medico.observaciones,
        parseInt(medico.matricula),
    ];

    query = "update medico set nombre=?, apellido=?, especialidad=?, observaciones=? where matricula =?";

    connection.query(query, medicoU, (err, rows) => {
        if (err) {
            callback({
                description: "Disculpe, Ocurrió un error",
                detail: err
            });
            return;
        }
        else {
            if (rows.affectedRows == 0) {
                callback(undefined, {
                    message: "No se encontro un medico con la matricula " + medico.matricula
                });
            } else {
                callback(undefined, {
                    message: "Los datos del medico, matricula: " + medico.matricula + " fueron modificados.",
                    detail: rows
                });
            }
        }
    });
};


// Borrar un medico 
deleteMedic = (matriculaD, callback) => {
    query = "delete from medico where matricula = ?";
    connection.query(query, matriculaD, (err, rows) => {
        if (err) {
            callback.json({
                description: "Disculpe, Ocurrió un error",
                detail: err
            });
            return;
        }
        if (rows.affectedRows == 0) {
            callback(undefined, "No se encontro un medico con la matricula " + matriculaD);
        } else {
            callback(undefined, "El medico, matricula " + matriculaD + " fue eliminado de la base de datos.");
        }
    });
};


//####### Fin Query Functions #######//



var medicoMetods = { getAll, getByMatricula, getByEspecialidad, createMedic, updateMedic, deleteMedic }
module.exports = { medicoMetods }