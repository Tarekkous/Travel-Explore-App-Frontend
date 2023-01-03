// const {app, BrowserWindow} = require('electron');
// const url = require('url');
// const path = require('path');

// function onReady () {
// 	win = new BrowserWindow({width: 900, height: 6700})
// 	win.loadURL(url.format({
// 		pathname: path.join(
// 			__dirname,
// 			'dist/front-voyage/index.html'),
// 		protocol: 'file:',
// 		slashes: true
// 	}))
// }

// app.on('ready', onReady);
const { app, BrowserWindow } = require('electron')

function createWindow() {

    const win = new BrowserWindow({

        width: 800,

        height: 600,

        webPreferences: {

            nodeIntegration: true
        }
    })

    win.loadURL('http://localhost:4200')

    win.webContents.openDevTools()

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {

        app.quit()
    }
})

app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) {

        createWindow()
    }
})
