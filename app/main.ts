import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';

const { PythonShell } = require('python-shell');
// const { dialog } = require('electron')
// console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))


let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createMenu() {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'View',
      submenu: [
        { role: 'toggleDevTools' },
      ],
    },
    { role: 'window', submenu: [
      {
        label: 'New Instance',
        accelerator: 'Shift+Command+N',
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
  // const electronScreen = screen;
  // const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1300,
    height: 680,
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

  return win;
}


// !Run Python scripts below
let pyshell = new PythonShell('src/assets/scripts/script1.py');

pyshell.send(JSON.stringify([10]))
// let options = {
//   mode: 'text',
//   pythonPath: 'Your python path',
//   pythonOptions: ['-u'],
//   scriptPath: 'Your script path',
//   args: [10]
// };

pyshell.on('message', function(message) {
  console.log(message);
})

pyshell.end(function (err) {
  if (err){
    throw err;
  };
  console.log('finished');
});

// ipcMain.on('getData', (event, args) => {
//   let pathIndex = '../src/assets/scripts';
//   let options = {
//     mode: 'text',
//     pythonOptions: ['-u'], // get print results in real-time
//     scriptPath: path.join(__dirname, pathIndex),
//     args: args, //An argument which can be accessed in the script using sys.argv[1]
//   };

//   // !Method 1 (Run Python Scripts)
//   PythonShell.run('script1.py', options, (err, result) => {
//     if (err) throw err;
//     // result is an array consisting of messages collected during execution of script.
//     console.log('RESULT: ', result.toString());

//     // Return Data To Angular
//     event.reply('getDataResponse', result);
//   });
// });

/*********************************************************************
try {
  // Method 2 (Run Python Scripts)
  let pathIndex = '../src/assets/scripts/script1.py';

  const python = spawn('python', [path.join(__dirname, pathIndex), 'node.js', 'python']);

  python.stdout.on('data', (data) => {
    console.log('Pipe data from python script ...', data);
    largeDataSet.push(data);
  });
} catch (e) {
  throw e;
}
*********************************************************************/
// !Run Python scripts above


try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More details at https://github.com/electron/electron/issues/15947
  app.on('ready', () => {
    // createMenu();
    setTimeout(createWindow, 400)
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
