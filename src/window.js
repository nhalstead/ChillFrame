const electron = require('electron'),
			{ BrowserWindow, MenuItem, Menu} = electron,
			url = require('url');
let showingWindow = false;
let win = undefined;

/**
 * moveWindowTo moves the window to a select monitor index.
 *
 * @param {number} monitorNumber Monitor Index to Bind to.
 */
const moveWindowTo = (win, monitorNumber) => {
	let displays = electron.screen.getAllDisplays();

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

const createWindow = () => {
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
		show: false,
		icon: 'src/assets/icons8-windchill-48.png',
		webPreferences: {
			nodeIntegration: true,
			backgroundThrottling: false
		}
	};

	// Spawn Window @ the set location, Bottom Right of the Screen.
	const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
	params.x = width - 450;
	params.y = height - 350;

	win = new BrowserWindow(params);

	win.webContents.openDevTools()
	win.setTitle("");
	win.setSkipTaskbar(true);

	// and load the index.html of the app.
	win.loadURL(`file://${__dirname}/index.html`);

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		//  in an array if your app supports multi windows, this is the time
		//  when you should delete the corresponding element.
		win = null
	});

	let menu = new Menu();
	let monitorLen = electron.screen.getAllDisplays().length;
	for(let i = 0; i < monitorLen; i++){
		menu.append(new MenuItem({
			label: 'Move to '+i+' Monitor',
			accelerator: 'CmdOrCtrl+'+i,
			click: () => { moveWindowTo(win, i); }
		}));
	}
	menu.append(new MenuItem({
		label: 'Reload Page',
		accelerator: 'f5',
		click: () => { win.reload(); }
	}));
	win.setMenu(menu);
	win.setMenuBarVisibility(false);

	win.on('ready-to-show', function() {
		win.show();
		showingWindow = true;
		win.focus();
		moveWindowTo(0);
	});

	win.on('close', function (event) {
		if(app.isQuiting === true) return;
		event.preventDefault();
		win.hide();
		showingWindow = false;
	});

	win.on('minimize', function (event) {
		event.preventDefault();
		win.hide();
		showingWindow = false;
	});

};

const setWindowState = (isShowingWindow = false) => {
	showingWindow = isShowingWindow;
	return isShowingWindow;
}


module.exports = {
	createWindow,
	moveWindowTo,
	setWindowState,
	showingWindow,
	win
};