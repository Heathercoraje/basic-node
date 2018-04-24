const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));

app.get(['/', '/topic', '/topic/new', '/topic/:id'], (req, res) => {
	const id = req.params.id;
	const url = req.url;
	fs.readdir('data', (err, files) => {
		if (err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		if (url === '/topic/new') {
			res.render('new', { topics: files });
		} else if (id) {
			fs.readFile(`data/${id}`, (err, data) => {
				if (err) {
					console.log(err);
					res.status(500).send('Internal Server Error');
				}
				res.render('view', { topics: files, title: id, line: data });
			});
		} else {
			res.render('view', {
				topics: files,
				title: 'Welcome',
				line: 'Start saving quotes!'
			});
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
