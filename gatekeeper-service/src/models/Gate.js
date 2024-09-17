const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Gate = sequelize.define('Gate', {
	name: DataTypes.STRING,
	state: DataTypes.BOOLEAN,
});

module.exports = Gate;
