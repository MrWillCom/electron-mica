const electron = require('electron')
const Store = require('electron-store')

class Background {
  constructor() {
    this.window = null;
    this.store = new Store({
      window: {
        width: { type: 'number', default: 800 },
        height: { type: 'number', default: 600 },
        x: { type: 'number' },
        y: { type: 'number' },
        maximized: { type: 'boolean', default: false },
      },
    });

    this.init();
  }

  init() {
    this.handleAppEvents()
  }

  createWindow() {
    const win = new electron.BrowserWindow({
      width: this.store.get('window.width') || 800,
      height: this.store.get('window.height') || 600,
      x: this.store.get('window.x') || null,
      y: this.store.get('window.y') || null,
      minWidth: 360,
      minHeight: 400,
      title: 'Electron Mica',
      frame: false,
      show: false,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      },
    })

    win.loadFile('src/index.html')

    win.webContents.openDevTools()

    this.window = win

    this.handleWindowEvents();
  }

  handleAppEvents() {
    electron.app.setName('Electron Mica')

    electron.app.whenReady().then(() => {
      this.createWindow();

      electron.app.on('activate', () => {
        if (electron.BrowserWindow.getAllWindows().length === 0) {
          this.createWindow();
        }
      })
    })

    electron.app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        electron.app.quit()
      }
    })
  }

  handleWindowEvents() {
    this.window.once('ready-to-show', () => {
      if (this.store.get('window.maximized') === true) {
        this.window.maximize()
      }

      this.window.show();
    });

    this.window.on('resize', () => {
      if (!this.window.isMaximized()) {
        this.store.set('window.width', this.window.getSize()[0])
        this.store.set('window.height', this.window.getSize()[1])
        this.store.set('window.x', this.window.getPosition()[0])
        this.store.set('window.y', this.window.getPosition()[1])
      }
    })

    this.window.on('moved', () => {
      if (!this.window.isMaximized()) {
        this.store.set('window.x', this.window.getPosition()[0])
        this.store.set('window.y', this.window.getPosition()[1])
      }
    })

    this.window.on('maximize', () => {
      this.store.set('window.maximized', true)
    })

    this.window.on('unmaximize', () => {
      this.store.set('window.maximized', false)
    })
  }
}

new Background()
