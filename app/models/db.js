const mysql =require("mysql");
const dbconfig = require("../config/db.config.js");

const connection = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.pasword,
    database: dbconfig.db
});

connection.connect(error => {
    if (error) throw error;
    console.log("conexion exitosa a la base de datos");
});

module.exports = connection;