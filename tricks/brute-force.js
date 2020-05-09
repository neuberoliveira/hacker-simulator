const { sendTrickln, sendLoader } = require('../trick-sender')
const randomNum = require('../random-num')

const randomAscString = (length) => Array(length).fill('').reduce((prev, cur) => prev += String.fromCharCode(randomNum(33, 126)), '')

module.exports = () => {
	return new Promise((resolve) => {
		const max = 100
		let pass = ''
		sendLoader('brute-force', 25, (tickCount, stop) => {
			if (tickCount == max) {
				sendTrickln('access granted')
				stop()
				resolve()
			}

			return randomAscString(randomNum(10, 40))
		})
	})
}