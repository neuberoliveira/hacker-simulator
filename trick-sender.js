const store = require('./store')

const sendTrick = (output) => {
	store.mainWindow.webContents.send('trick-output', {
		output,
		type: 'default',
		id: undefined,
	})
}

const sendTrickln = (output) => {
	sendTrick(`${output}<br />`)
}

const sendLoader = (id, tickInterval, loaderContentCreator) => {
	return new Promise((resolve, reject) => {
		let tickCount = 0;
		const stop = () => {
			clearInterval(intervalId)
			resolve()
		}

		const intervalId = setInterval(() => {
			tickCount++
			store.mainWindow.webContents.send('trick-output', {
				output: loaderContentCreator(tickCount, stop) + '<br />',
				type: 'loader',
				id,
			})
		}, tickInterval)
	})
}

module.exports = {
	sendTrick,
	sendTrickln,
	sendLoader,
}