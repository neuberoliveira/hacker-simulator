const { sendTrickln, sendLoader } = require('../trick-sender')
const randomNum = require('../random-num')

module.exports = () => {
	return new Promise((resolve) => {
		sendLoader('scan-prof-loader', 200, (tickCount, stop) => {
			if (tickCount == 10) {
				stop()
			}
			return 'scanning profile: ' + Array(tickCount).fill('').reduce((prev, cur) => prev += '.', '')
		}).then(() => {
			sendLoader('search-vul-loader', 10, (tickCount, stop) => {
				if (tickCount == 150) {
					stop()
				}
				return 'searching vulnerabilities: ' + Array(tickCount).fill('').reduce((prev, cur) => prev += '.', '')
			}).then(() => {
				sendTrickln(`found ${randomNum(10, 999)} vulnerabilites`)

				resolve()
			})
		})
	})
}