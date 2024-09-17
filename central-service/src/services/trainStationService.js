const axios = require('axios');

const gatekeeperUrl = 'http://gatekeeper:3002/';


async function trainStationService(station) {
	try {
		const response = await axios.get(gatekeeperUrl + 'gate', { params: { name: station } });
		const status = response.data.state;

		if (status) {
			await axios.post(gatekeeperUrl + 'gate', {state: false}, { params: { name: station } }); /* zamykanie */
			console.log(`${new Date().toISOString()} - Gate closed at station: ${station}`);

			setTimeout(async () => {
				try {
					await axios.post(gatekeeperUrl + 'gate', {state: true}, {params: {name: station}}); /* otwarcie */
				}catch (error){
					console.error('Error communicating with gatekeeper:', error.message);
				}
				console.log(`${new Date().toISOString()} - Gate opened at station: ${station}`);
			}, 10000);
		} else {
			console.error('Anomaly: Gate already closed!');
		}
	} catch (error) {
		console.error('Error communicating with gatekeeper:', error.message);
	}
}

module.exports = trainStationService;