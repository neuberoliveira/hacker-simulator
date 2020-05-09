const createPos = (x, y) => ({ x: Math.round(x), y: Math.round(y) })

const positionFuncs = {
	topLeft: (win, screenSize) => createPos(0, 0),
	topRight: (win, screenSize) => {
		const { width } = win.getBounds()
		return createPos(screenSize.width - width, 0)
	},
	bottomLeft: (win, screenSize) => {
		const { height } = win.getBounds()
		return createPos(0, screenSize.height - height)
	},
	bottomRight: (win, screenSize) => {
		const { width, height } = win.getBounds()
		return createPos(screenSize.width - width, screenSize.height - height)
	},
	centerLeft: (win, screenSize) => {
		const { height } = win.getBounds()
		return createPos(0, ((screenSize.height - height) / 2))
	},
	centerRight: (win, screenSize) => {
		const { width, height } = win.getBounds()
		return createPos(screenSize.width - width, ((screenSize.height - height) / 2))
	},
	center: (win, screenSize) => {
		const { width, height } = win.getBounds()
		return createPos((screenSize.width - width) / 2, ((screenSize.height - height) / 2))
	}
}
module.exports = positionFuncs