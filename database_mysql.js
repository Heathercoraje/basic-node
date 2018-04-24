var mysql = require('mysql');
var conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '111111',
	database: 'o2'
});

conn.connect();

// example1 read
// rows is array of data (each data is called RowDataPacket)
// fields is also array (fields = columns) (each data is called FieldPacket)
const sql = 'SELECT * FROM topic';
conn.query(sql, (err, rows, fields) => {
	if (err) {
		console.log(err);
	} else {
		console.log('rows : ', rows);
		console.log('fields : ', fields);
	}
});

// example2 insert with params
const sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?,?)';
const params = [
	'mysql',
	'one of biggest open source relational DB',
	'heathercoraje'
];
conn.query(sql, params, (err, results, fields) => {
	if (err) {
		console.log(err);
	} else {
		console.log('heather I am here!', results.insertId);
	}
});

// example 3 update
const sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
const params = ['npm', 'nichee', 2];
conn.query(sql, params, (err, results, fields) => {
	if (err) {
		console.log(err);
	} else {
		console.log('heather I am here!', results);
	}
});

// example 4 delete
const sql = 'DELETE FROM topic WHERE id=?';
const params = [1];
conn.query(sql, params, (err, results, fields) => {
	if (err) {
		console.log(err);
	} else {
		console.log('heather I am here!', results);
	}
});

// bye db see you later
conn.end();
