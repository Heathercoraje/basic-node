const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/topic', (req, res) => {
	fs.readdir('data', (err, files) => {
		if (err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.render('view', { topics: files });
	});
});

app.get('/topic/new', (req, res) => {
	res.render('new');
});

app.get('/topic/:id', (req, res) => {
	const id = req.params.id;
	fs.readdir('data', (err, files) => {
		if (err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		fs.readFile(`data/${id}`, (err, data) => {
			if (err) {
				console.log(err);
				res.status(500).send('Internal Server Error');
			}
			res.render('view', { topics: files, title: id, line: data });
		});
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
		res.send('Success!');
	});
});

app.listen(3000, () => {
	console.log('Connected, 3000 port');
});
