const { sendTrickln } = require('../windows/terminalWindow')

module.exports = () => new Promise(resolve => {
	sendTrickln('simple output')
	resolve()
})