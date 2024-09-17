const Queue = require('bull');
const stations = require('../data/stations.json');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

const redisConfig = {
	redis: { host: redisHost, port: redisPort }
};

const speedQueue = new Queue('speed', redisConfig);
const stationQueue = new Queue('station', redisConfig);


setInterval(() => {
	const speed = (Math.random() * 180).toFixed(2);
	console.log('Speed sent: ', speed);

	const message = {
		speed: speed,
		time: new Date().toISOString()
	};
	speedQueue.add(message);
}, 10000);

setInterval(() => {
	const station = stations[Math.floor(Math.random() * stations.length)];
	console.log('Station sent: ', station);

	const message = {
		station: station,
		time: new Date().toISOString()
	};
	stationQueue.add(message);
}, 180000);

console.log('Train service is running, publishing speed and station data...');
