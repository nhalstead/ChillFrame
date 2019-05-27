'use strict';
const electron = require('electron')
const {app, BrowserWindow, Menu, ipcMain} = electron;
const path = require('path');
const url = require('url');
let win;

ipcMain.on('setSource', function(event, args){
    // Set the page Source to a Set URL.

});

// Disable all of the Default Menus
app.on('browser-window-created',function(e,window) {
    window.setMenu(null);
});

function createWindow () {
    // Create the browser window.
    let params = {
        width: 400,
        height: 260,
        backgroundColor: '#000000',
        resizable: true,
        movable: true,
        minimizable: true,
        maximizable: true,
        closable: true,
        alwaysOnTop: true
    };

    // Spawn Window @ the set location, Bottom Right of the Screen.
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
    params.x = width - 450;
    params.y = height - 350;

    win = new BrowserWindow(params);
    win.setTitle("");
    win.setIcon(path.join(__dirname, 'icons8-windchill-48.png'));

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        //  in an array if your app supports multi windows, this is the time
        //  when you should delete the corresponding element.
        win = null
    });

    //win.webContents.openDevTools();
}

// This method will be called when Electron has finished
//  initialization and is ready to create browser windows.
app.on('ready', function(){
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
