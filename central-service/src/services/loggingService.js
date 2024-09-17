const fs = require('fs');

function loggingTrainSpeed(speed) {
	const logData = `${new Date().toISOString()} - Speed: ${speed}\n`;

	if (speed < 40) {
		fs.appendFileSync('./logs/slow.log', logData);
	} else if (speed < 140) {
		fs.appendFileSync('./logs/normal.log', logData);
	} else {
		fs.appendFileSync('./logs/fast.log', logData);
	}
}

module.exports = loggingTrainSpeed;