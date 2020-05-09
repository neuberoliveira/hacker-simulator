const { sendTrickln } = require('../windows/terminalWindow')

module.exports = () => {
	sendTrickln('simple output')
}