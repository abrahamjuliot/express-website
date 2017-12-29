// npm init, npm install express--save, pug--save, nodemon--save-dev
// manually add .gitignore, "NODE_ENV=production npm install" to install
// https://www.openshift.com/devpreview/ or https://www.heroku.com/
const express = require('express'),
	server = express(),
	logger = require('./logger'),
	err404 = (req, res) => {
		res.status(404).render('notfound', { url: req.url })
	},
	main = {
		food: 'food',
		cats: 'cats'
	},
	food = {
		apple: 'apple',
		banana: 'banana',
		cream: 'cream'
	}

server
	.use(logger)
	.param('name', (req, res, next) => {
		req.sourceName = req.params.name.toLowerCase()
		next()
	})
	.use('/', express.static(__dirname + '/public')) // 1[M]. use static files
	.set('views', __dirname + '/views') // 2. set views
	.set('view engine', 'pug') // 3. set view engine
	.get('/', (req, res) => {
		// 4a. get '/'
		res.render('index')
	})
	.get('/:name', (req, res) => {
		// 4b. get '/:name'
		var source = main[req.sourceName]
		if (source) {
			res.render(source)
		} else {
			err404(req, res)
		}
	})
	.get('/food/:name', (req, res) => {
		// 4b. get 'bikes/:name'
		var source = food[req.sourceName]
		if (source) {
			res.render(source)
		} else {
			err404(req, res)
		}
	})
	.get('*', function(req, res) {
		err404(req, res)
	})
	.listen(process.env.PORT, () => {
		// 5. listen on port
		console.log('Listening on port ' + process.env.PORT)
	})

// to run: node server.js or nodemon server.js (not c9.io run)
// ctrl+c to stop process
