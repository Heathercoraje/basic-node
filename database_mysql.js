const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	port: '3306',
	password: 'whattheactualf18',
	database: 'o2'
});

connection.connect();
