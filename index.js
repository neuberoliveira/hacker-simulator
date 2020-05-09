const { app, screen, ipcMain } = require('electron')
const store = require('./store')
const parse = require('./parse-cmd')
const terminalWindow = require('./windows/terminalWindow')
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
	const mainWindowBounds = store.mainWindow.getBounds()


	ipcMain.on('first-cmd', async (evt, cmd) => {
		const cmdParsed = parse(cmd)
		if (cmdParsed.args.length >= 2) {
			store.hackTarget = cmdParsed.args[0]
			store.hackProfile = cmdParsed.args[1]
		}

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

		await preparingTrick()
		await bruteForceTrick()

		playVideo('../assets/video/p1KWW6hHQeg.mp4', {
			width: 320,
			height: 180,
			x: store.screen.width - 260,
			y: 160,
			onEnd: (win) => {
				win.close()
				win.destroy()

				const imagePositionFactor = 60
				const firstWinX = (store.screen.width - 600) - (imagePositionFactor * 2)
				openImage('./assets/image/usa-presidential-seal.png', { x: firstWinX, y: 100, width: 600, height: 600, delay: 0, autoCloseDelay: 2000 })
				openImage('./assets/image/usa-presidential-seal.png', { x: firstWinX + (imagePositionFactor), y: 100 + (imagePositionFactor), width: 600, height: 600, delay: 200, autoCloseDelay: 2000 })
				openImage('./assets/image/top-secret.jpg', { x: firstWinX + (imagePositionFactor * 2), y: 100 + (imagePositionFactor * 2), width: 464, height: 600, delay: 400, autoCloseDelay: 2000 })
			}
		})
	})
})
