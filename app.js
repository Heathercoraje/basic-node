const express = require('express');
const mysql = require('mysql');
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '111111',
	database: 'o2'
});
conn.connect();
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/topic/add', (req, res) => {
	let sql = 'SELECT id, title FROM topic';
	conn.query(sql, (err, topics, fields) => {
		res.render('add', { topics: topics });
	});
});

app.get(['/', '/topic', '/topic/:id'], (req, res) => {
	let sql = 'SELECT id, title FROM topic';
	conn.query(sql, (err, topics, fields) => {
		let id = req.params.id;
		if (id) {
			// view with detail
			let sql = 'SELECT * FROM topic WHERE id=?';
			conn.query(sql, [id], (err, topic, fields) => {
				if (err) {
					console.log(err);
					res.status(500).send('Internal Server Error');
				} else {
					res.render('view', { topics: topics, topic: topic[0] });
				}
			});
		} else {
			res.render('view', { topics: topics });
		}
	});
});

app.post('/topic', (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	fs.writeFile(`data/${title}`, description, err => {
		if (err) {
			console.log('Error message: ', err);
			res.status(500).send('Internal Server Error');
		}
		res.redirect(`/topic/${title}`);
	});
});

app.listen(3000, () => {
	console.log('Connected, 3000 port');
});
