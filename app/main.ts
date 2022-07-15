import { app, BrowserWindow, ipcMain, Menu, dialog, globalShortcut } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

const { PythonShell } = require('python-shell');

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createMenu() {
  const isMac = process.platform === 'darwin'

  const template: Electron.MenuItemConstructorOptions[] = [
    isMac? {
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    } : {
      label: app.name,
      submenu: [
        { role: 'quit' }
      ]
    }, // TODO: add smth here for windows
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        isMac ? { role: 'pasteAndMatchStyle' }: { },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'toggleDevTools' },
      ],
    },
    { role: 'window', submenu: [
      {
        label: 'New Instance',
        accelerator: 'Command+N',
        click: () => {
          createWindow();
        },
      }
    ] }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow(): BrowserWindow {
  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1300,
    height: 810,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false, // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadURL(
      url.format({
        pathname: path.join(__dirname, pathIndex),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
    win = null;
  });

  globalShortcut.register('Command+O', () => {
    dialog.showOpenDialog({
      defaultPath: app.getPath("documents"),
      properties: ['openDirectory'],
      buttonLabel: 'Select folder'
    }).then((result) => {
      console.log("result", result)
    });
  })
  
  // win.webContents.on("did-finish-load", () => { 
  // })

  return win;
}

// !get input data
ipcMain.on('getData', (event, args) => {
  let pathIndex = '../src/assets/scripts';
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: path.join(__dirname, pathIndex),
    args: args, //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run('inputData.py', options, (err, result) => {
    if (err) throw err;
    // result is an array consisting of messages collected during execution of script.
    console.log('BEFORE: ', result.toString());

    // Return Data To Angular
    event.reply('getDataResponse', result);
  });
});

// !send input path -> why is "test" being sent???
ipcMain.on('sendInputPath', (event, args) => {
  let pathIndex = '../src/assets/scripts';
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: path.join(__dirname, pathIndex),
    args: args, //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run('inputData.py', options, (err, result) => {
    if (err) throw err;
    // result is an array consisting of messages collected during execution of script.

    console.log("Input Path sent successfully!")

    // Return Data To Angular
    event.reply('sendDataResponse', result);
  });
});

// !send output data
ipcMain.on('sendData', (event, args) => {
  let pathIndex = '../src/assets/scripts';
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: path.join(__dirname, pathIndex),
    args: args, //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run('outputData.py', options, (err, result) => {
    if (err) throw err;
    // result is an array consisting of messages collected during execution of script.

    console.log("Values sent successfully!")

    // Return Data To Angular
    event.reply('sendDataResponse', result);
  });
});
// !Run Python scripts above


try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More details at https://github.com/electron/electron/issues/15947
  app.on('ready', () => {
    createMenu();
    setTimeout(createWindow, 400);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
