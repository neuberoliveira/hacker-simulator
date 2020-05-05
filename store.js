const { app, screen } = require('electron')
const store = {}

app.whenReady().then(() => {
	store.screenWidth = screen.getPrimaryDisplay().workAreaSize.width
	store.screenHeight = screen.getPrimaryDisplay().workAreaSize.height
})

module.exports = store