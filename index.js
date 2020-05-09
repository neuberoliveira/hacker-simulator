const { app, screen, ipcMain } = require('electron')
const store = require('./store')
const terminalWindow = require('./windows/terminalWindow')
const { sendLoader } = require('./trick-sender')
const codeOutTrick = require('./tricks/code-out')
const preparingTrick = require('./tricks/preparing')
const bruteForceTrick = require('./tricks/brute-force')
const openImage = require('./tricks/open-image')
const playVideo = require('./tricks/play-video')

app.whenReady().then(() => {
	store.screen = {
		width: screen.getPrimaryDisplay().workAreaSize.width,
		height: screen.getPrimaryDisplay().workAreaSize.height
	}

	store.mainWindow = terminalWindow()
	ipcMain.on('first-cmd', async (evt, cmd) => {
		await preparingTrick()
		await bruteForceTrick()

		const mainWindowBounds = store.mainWindow.getBounds()
		playVideo('../assets/video/MI66opu41Ck.mp4', {
			width: 356,
			height: 200,
			x: 0,
			y: mainWindowBounds.y + mainWindowBounds.height + 15,
			onEnd: (win) => {
				win.close()
				win.destroy()
			}
		})

		const imagePositionFactor = 60
		const firstWinX = (store.screen.width - 600) - (imagePositionFactor * 2)
		openImage('./assets/image/usa-presidential-seal.png', { x: firstWinX, y: 100, width: 600, height: 600, delay: 0, autoCloseDelay: 2000 })
		openImage('./assets/image/usa-presidential-seal.png', { x: firstWinX + (imagePositionFactor), y: 100 + (imagePositionFactor), width: 600, height: 600, delay: 200, autoCloseDelay: 2000 })
		openImage('./assets/image/top-secret.jpg', { x: firstWinX + (imagePositionFactor * 2), y: 100 + (imagePositionFactor * 2), width: 464, height: 600, delay: 400, autoCloseDelay: 2000 })


	})
})
