var mysql = require('mysql');
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '111111',
	database: 'o2'
});

conn.connect();

const sql = 'SELECT * FROM topic';
