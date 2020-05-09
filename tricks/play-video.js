const { BrowserWindow, ipcMain } = require('electron')

module.exports = (videopath, options) => {
	const { width, height, x, y, onEnd } = options
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
		webPreferences: {
			nodeIntegration: true
		}
	})
	// win.webContents.openDevTools()
	win.loadFile('templates/video.html')
	win.once('ready-to-show', () => {
		win.webContents.send('init-payload', {
			file: videopath,
		})
	})

	ipcMain.once('video-canplay', () => {
		win.show()
	})

	ipcMain.once('video-end', () => {
		if (typeof onEnd == 'function') {
			onEnd(win)
		}
	})


	return win
}