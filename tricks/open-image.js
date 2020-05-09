const { BrowserWindow } = require('electron')
const position = require('../position')
const store = require('../store')

const createWin = (imagepath, options, winOptions = {}) => {
	const { width, height, x, y, windowOptions } = options
	const win = new BrowserWindow({
		width,
		height,
		x,
		y,
		resizable: false,
		minimizable: false,
		closable: false,
		frame: false,
		show: false,
		...winOptions
	})
	win.loadFile(imagepath)
	win.once('ready-to-show', () => {
		win.show()
	})
	return win
}

const mapPositionToCoordinate = (strPosition, win) => {
	let callFun
	switch (strPosition) {
		case 'top_left':
			callFun = 'topLeft'
			break;
		case 'top_right':
			callFun = 'topRight'
			break;
		case 'bottom_left':
			callFun = 'bottomLeft'
			break;
		case 'bottom_right':
			callFun = 'bottomRight'
			break;
		case 'center_left':
			callFun = 'centerLeft'
			break;
		case 'center_right':
			callFun = 'centerRight'
			break;
		case 'center':
			callFun = 'center'
			break;
	}

	if (position[callFun]) {
		return position[callFun](win, store.screen)
	}

	return { x: undefined, y: undefined }
}

module.exports = (imagepath, options = {}) => new Promise(resolve => {
	if (!options) {
		options = {}
	}

	if (!options.windowOptions) {
		options.windowOptions = {}
	}

	if (!options.delay) {
		options.delay = 0
	}

	setTimeout(() => {
		const win = createWin(imagepath, options, options.windowOptions)
		if (options.positionAbs) {
			const coord = mapPositionToCoordinate(options.positionAbs, win)
			console.log(options.positionAbs, coord)
			win.setBounds(coord)
		}

		if (options.autoCloseDelay) {
			setTimeout(() => {
				win.close()
				win.destroy()
			}, options.autoCloseDelay)
		}
	}, options.delay)

	resolve(win)
})