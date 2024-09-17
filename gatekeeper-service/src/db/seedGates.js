const Gate = require("../models/Gate");

async function seedDatabase() {
	const existingGates = await Gate.findAll();

	if (existingGates.length === 0) {
		await Gate.bulkCreate([
			{ name: 'Warszawa', state: true },
			{ name: 'Kraków', state: true },
			{ name: 'Gdańsk', state: true },
			{ name: 'Poznań', state: true },
			{ name: 'Wrocław', state: true },
		]);
		console.log("Seeding completed.");
	} else {
		console.log("Gates already exists.");
	}
}

module.exports = seedDatabase;