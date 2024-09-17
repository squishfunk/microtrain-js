const Queue = require('bull');
const loggingTrainSpeed = require('./services/loggingService');
const trainStationService = require('./services/trainStationService');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

const redisConfig = {
	redis: { host: redisHost, port: redisPort }
};


const speedQueue = new Queue('speed', redisConfig);
const stationQueue = new Queue('station', redisConfig);


speedQueue.process(function (job, done) {
	const {time, speed} = job.data;
	console.log('Train speed report received : ', speed);
	try {
		loggingTrainSpeed(speed);
	} catch (error) {
		console.error('Error in loggingTrainSpeed:', error);
	}

	done();
})

stationQueue.process(function (job, done) {
	const { station, time } = job.data;
	console.log('Station received form train: ', station);
	trainStationService(station);
	done();
})

console.log('Start central service.');