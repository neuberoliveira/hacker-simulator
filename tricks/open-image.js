const { BrowserWindow } = require('electron')

const createWin = (imagepath, position, size, winOptions = {}) => {
	win = new BrowserWindow({
		width: size.width,
		height: size.height,
		// useContentSize: true,
		resizable: false,
		minimizable: false,
		// closable: false,
		frame: false,
		x: position.x,
		y: position.y,

		...winOptions
	})
	win.loadFile(imagepath)
	return win
}

module.exports = (imagepath, position, size, options = {}) => {
	if (!options) {
		options = {}
	}

	if (!options.delay) {
		options.delay = 0
	}

	setTimeout(() => {
		const win = createWin(imagepath, position, size, options.windowOptions)
		if (options.autoCloseDelay) {
			setTimeout(() => {
				win.close()
				win.destroy()
			}, options.autoCloseDelay)
		}
	}, options.delay)
}