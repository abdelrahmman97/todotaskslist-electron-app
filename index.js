const {
	app,
	BrowserWindow,
	globalShortcut
} = require("electron");
const url = require('url');
const path = require('path');

let win = null

function boot() {

	win = new BrowserWindow({
		width: 800,
		height: 650,
		minWidth: 800,
		minHeight: 650,
		maxWidth: 800,
		maxHeight: 650,
		icon: './assests/images/icon.ico',
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
			preload: path.join(__dirname, 'preload.js')
		}
	});

	win.loadFile('index.html')

	win.on('closed', ()=> {
		win = null
	})

	globalShortcut.register('CommandOrControl+1', () => {
		win.isMaximized() ? win.unmaximize() : win.maximize()
	})

}

app.whenReady().then(() => {
	boot();
});

app.on("closed", function () {
	win = null
	app.quit();
});



// app.on('ready', boot);

// app.on("window-all-closed", function () {
// 	if (process.platform !== "darwin") app.quit();
// });