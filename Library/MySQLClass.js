var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Adlib1849',
  database : 'db_MasterSC'
});
 
connection.connect();
 
/*
// CODIGO PARA PROBAR LA CONEXION AL SERVICIO
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
}); */

// INSTRUCCIÓN PARA EXPORTAR EL OBJETO connection YA INSTANCIADO
module.exports = connection;
 
// connection.end();