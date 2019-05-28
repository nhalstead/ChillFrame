'use strict';
const electron = require('electron')
const {app, BrowserWindow, Menu, MenuItem , ipcMain} = electron;
const path = require('path');
const url = require('url');
let win;

/**
 * moveWindowTo moves the window to a select monitor index.
 *
 * @param {number} monitorNumber Monitor Index to Bind to.
 */
function moveWindowTo(monitorNumber){
    let displays = electron.screen.getAllDisplays();
    console.log("Moving window to monitor " + monitorNumber);

    if (typeof displays[monitorNumber] !== 'undefined') {
        const monitor = displays[monitorNumber].bounds,
            width = monitor.x + monitor.width,
            height = monitor.y + monitor.height;
        win.setFullScreen(false);
        win.unmaximize();
        win.setPosition((width - 450), (height - 350));
        win.setSize(400, 260);
    }
}

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
        alwaysOnTop: true,
        title: "Loading ChillFrame...",
        show: false
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


    let menu = new Menu();
    let monitorLen = electron.screen.getAllDisplays().length
    for(let i = 0; i < monitorLen; i++){
        menu.append(new MenuItem({
            label: 'Move to '+i+' Monitor',
            accelerator: 'CmdOrCtrl+'+i,
            click: () => { moveWindowTo(i); }
        }));
    }
    win.setMenu(menu);
    win.setMenuBarVisibility(false);

    win.on('ready-to-show', function() {
        win.show();
        win.focus();
        moveWindowTo(0);
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
