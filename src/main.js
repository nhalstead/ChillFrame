'use strict';
const electron = require('electron'),
    {app, Menu, Tray, nativeImage} = electron;
let {win, showingWindow, createWindow, setWindowState} = require('./window');
let tray;

function createTrayIcon() {
    const trayIcon = nativeImage.createFromPath('src/assets/icons8-windchill-48.ico');
    tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                win.show();
                setWindowState(true);
            }
        },
        {
            label: 'Quit', click: function () {
                win = null;
                app.isQuiting = true;
                app.quit();
            }
        },
        {type: "separator"},
        {
            label: 'Reload Page', click: function () {
                win.reload();
            }
        },
        {
            label: 'Open Dev Tools', click: function () {
                win.webContents.openDevTools({detach: true});
            }
        }

    ]);
    tray.setToolTip('ChillFrame');
    tray.setContextMenu(contextMenu);
    tray.on("double-click", function() {
        if(showingWindow === false){
            win.show();
            setWindowState(true);
        }
        else {
            win.hide();
            setWindowState(false);
        }
    });
}

// This method will be called when Electron has finished
//  initialization and is ready to create browser windows.
app.on('ready', function(){
    createTrayIcon();
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
