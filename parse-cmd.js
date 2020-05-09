const parse = (cmdStr) => {
	const cmdParts = cmdStr.split(' ')
	const result = {
		args: []
	}

	if (cmdParts.length > 0) {
		result.program = cmdParts[0]
		cmdParts.splice(0, 1)
	}
	result.args = cmdParts.filter((arg) => arg[0] !== '-')

	return result
}

module.exports = parse