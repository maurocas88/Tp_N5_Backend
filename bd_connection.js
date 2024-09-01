
//#######  Requires #######//
const mySql = require('mysql');


//#######  Credenciales BD #######//
const connection = mySql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'admin',
    database: 'clinica'
});

connection.connect((err) => {
    if (err) {
        console.log(err.code);
    } else {
        console.log("Data Base connected.");
    }
})

module.exports = { connection }