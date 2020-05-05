const { ipcRenderer } = require('electron')
let trickOutput

const defaultOutput = (out) => {
	trickOutput.innerHTML += out
	window.scrollTo(0, document.body.scrollHeight);
}

const loaderOutput = (out, id) => {
	let loaderEl = document.getElementById(id)
	if (!loaderEl) {
		loaderEl = document.createElement('span')
		loaderEl.setAttribute('id', id)
		trickOutput.appendChild(loaderEl)
	}

	loaderEl.innerHTML = out
	window.scrollTo(0, document.body.scrollHeight);
}

window.addEventListener("load", (event) => {
	const cmdInput = document.getElementById('terminal-input')
	trickOutput = document.getElementById('trick-output')
	cmdInput.addEventListener('keyup', (event) => {
		if (event.keyCode === 13) {
			cmdInput.setAttribute('disabled', true)
			ipcRenderer.send('first-cmd', event.target.value)
		}
	})

	ipcRenderer.on('trick-output', (e, data) => {
		if (data.type == 'default') {
			defaultOutput(data.output)
		} else if (data.type == 'loader') {
			loaderOutput(data.output, data.id)
		}
	})
})