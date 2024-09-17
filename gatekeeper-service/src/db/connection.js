const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './sqlite_data/database.sqlite'
});

module.exports = sequelize;