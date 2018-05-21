var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'corp'
});

connection.connect(function(err) {
	if (!err) {
		console.log('Database is connected ...');
	} else {
		console.log('Error connecting database ...');
	}
});

exports.register = function(req, res) {
	console.log('req', req.body);
	var today = new Date();
	var users = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		created: today,
		modified: today
	};
	connection.query('INSERT INTO users SET ?', users, function(error, results, fields) {
		if (error) {
			console.log('error ocurred', error);
			res.send({
				code: 400,
				failed: 'error ocurred'
			});
		} else {
			console.log('The solution is: ', results);
			res.send({
				code: 200,
				success: 'user registered sucessfully'
			});
		}
	});
};

exports.login = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	connection.query('SELECT * FROM users WHERE email = ', [email], function(error, results, fields) {
		if (error) {
			console.log('error ocurred', error);
			res.status(400).send({ message: 'Error occured' });
			res.send({
				code: 400,
				failed: 'error ocurred'
			});
		} else {
			if (results.length > 0) {
				if (results[0].password == password) {
					res.status(200).send({
						result: results[0],
						success: 'Login sucessfull'
					});
				} else {
					res.status(204).send({
						success: 'Email and password does not match'
					});
				}
			} else {
				res.status(204).send({
					success: 'Email does not exits'
				});
			}
		}
	});
};
