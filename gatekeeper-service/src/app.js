const express = require('express')
const sequelize = require('./db/connection');
const bodyParser = require('body-parser');
const Gate = require('./models/Gate');
const seedDatabase = require('./db/seedGates');

const app = express()

app.use(bodyParser.json());

const port = 3002

app.get('/gate', async (req, res) => {
	try {
		const gate = await Gate.findOne({where: {name: req.query.name}});
		if (gate) {
			res.json(gate);
		} else {
			res.status(404).json({ error: 'Gate not found.' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Database query error.' });
	}
})

app.post('/gate', async (req, res) => {
	try {
		const gate = await Gate.findOne({where: {name: req.query.name}});
		if (gate) {
			gate.state = req.body.state;
			gate.save();
			let message;
			if(gate.state){
				message = 'Gate opened successfully';
			}else{
				message = 'Gate closed successfully';
			}
			res.status(200).json({message: message});
		} else {
			res.status(404).json({ error: 'Gate not found.' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Database query error.' });
	}
})

sequelize.sync().then(() => {
	console.log('Connected to the database');
	seedDatabase();
	app.listen(port, () => {
		console.log(`Gatekeeper service starting up... ${port}`)
	})
}).catch((err) => {
	console.error('Database connection error:', err);
});