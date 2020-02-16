/* eslint-disable global-require,import/newline-after-import,function-paren-newline,no-multiple-empty-lines,max-len */
const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')
const pkgJson = require('../package.json')
const flow = require('lodash/fp/flow')
const getNormal = require('lodash/get')
const get = require('lodash/fp/get')
const tail = require('lodash/fp/tail')
const join = require('lodash/fp/join')
const split = require('lodash/fp/split')
const replace = require('lodash/fp/replace')
const isEmpty = require('lodash/isEmpty')
const isObject = require('lodash/isObject')
const trim = require('lodash/fp/trim')
const map = require('lodash/fp/map')
const log = require('electron-log')
const moment = require('moment/moment')
const cmd = require('node-cmd')
// const os = require('os')
const fs = require('fs')
const base64 = require('base-64')
const utf8 = require('utf8')
const bytes = require('bytes')
const httpServer = require('node-http-server')
const kill = require('kill-port')

// fix win7 proxy server (optimize requests)
app.commandLine.appendSwitch('no-proxy-server')

// all windows of application
let windows = {}

// Setup Logger
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

let appIsRunning = true
let firstTime = true

const serverOpts = {
  domain: 'localhost',
  port: 3011,
  root: `${ __dirname }/build`,
  verbose: true
}

const isDev = process.env.ELECTRON_ENV === 'development'
log.info('dev mode:', isDev)

function sendStatusToUpdateWindow(text) {
  log.info(`SCREEN> ${ text }`)
  windows.update.webContents.send('message', text)
}

// function that get mac address from machine
// const getMacAddress = () => new Promise((resolve) => {
//   const {
//     Ethernet: winEthernet,
//     'Wi-Fi': winWifi,
//     en4: macEthernet,
//     en0: macWifi,
//   } = os.networkInterfaces()
//   let adapterStr = ''
//
//   let adapter = null
//   if (winEthernet) {
//     adapter = winEthernet
//     adapterStr = 'Windows Ethernet'
//   } else if (winWifi) {
//     adapter = winWifi
//     adapterStr = 'Windows Wi-Fi'
//   } else if (macEthernet) {
//     adapter = macEthernet
//     adapterStr = 'Mac Ethernet'
//   } else if (macWifi) {
//     adapter = macWifi
//     adapterStr = 'Mac Wi-Fi'
//   }
//
//   if (isArray(adapter)) {
//     const macAddress = flow(
//       first,
//       get('mac')
//     )(adapter)
//     log.info(`Client "${ adapterStr }" MAC-Address: ${ macAddress }`)
//     resolve(macAddress)
//   } else {
//     // any adapter are not connected
//     log.error('[EXCEPTION] Without enabled mac address')
//     resolve(null)
//   }
// })

// function that get hd serial number from machine
const getHDSerialNumber = () => new Promise((resolve, reject) => {
  // si.diskLayout((hdInfo) => {
  //   log.warn('diskLayout', hdInfo[0])
  //   resolve(flow(
  //     first,
  //     get('serialNum')
  //   )(hdInfo))
  // })

  cmd.get('wmic path win32_physicalmedia get SerialNumber', (err, data) => {
    if (err) {
      if (!isDev) {
        reject(err)
      } else {
        resolve(null)
      }
    } else {
      resolve(flow(
        split(' '),
        tail,
        map(item => (!isEmpty(item) && item !== '\n' ? item : null)),
        join(''),
        replace(/[\n\r]/g, ''),
        trim
      )(data))
    }
  })
})

// function that get config file with host and syndata
const getConfigFile = () => new Promise((resolve, reject) => {
  const configFile = `${ app.getPath('appData') }/@syntesis/self-service/.configHost`
  log.info('getting .configHost file')

  fs.readFile(configFile, 'utf8', (err, data) => {
    if (err) {
      const e = err
      log.error(`[EXCEPTION] Cannot open ".configHost": ${ e }`)
      reject(e)
    } else {
      // data is the contents of the text file we just read
      try {
        const blob = base64.decode(data)
        const keys = JSON.parse(utf8.decode(blob))
        resolve(keys)
      } catch (e) {
        log.error(`[EXCEPTION] Cannot read ".configHost": ${ e }`)
        reject(e)
      }
    }
  })
})

const initServer = () => new Promise((resolve) => {
  httpServer.deploy(serverOpts, (server) => {
    log.info(`web server on port ${ server.config.port } is now up`)
    resolve()
  })
})


const autoUpdateProvider = get('build.publish.provider')(pkgJson)
const autoUpdateUrl = get('build.publish.url')(pkgJson)
const autoUpdatePath = `${ autoUpdateUrl }/${ process.env.UPDATE_SERVER_PATH }`

/*
* AUTO UPDATE SETUP
* */
autoUpdater.setFeedURL({
  provider: autoUpdateProvider,
  url: autoUpdatePath
})

const initialVersion = get('version')(pkgJson)
log.info('version', initialVersion)
autoUpdater.on('checking-for-update', () => {
  if (firstTime) {
    sendStatusToUpdateWindow('Buscando atualizações...')
  }
})

autoUpdater.on('update-available', (info) => {
  sendStatusToUpdateWindow('Atualização disponível!')
  sendStatusToUpdateWindow(`Nova versão: ${ info.version }`)
  sendStatusToUpdateWindow(`Data de lançamento: ${ moment(info.releaseDate).locale('pt-br').format('L LTS') }.`)
  sendStatusToUpdateWindow('Baixando atualização...')
})

autoUpdater.on('update-not-available', () => {
  sendStatusToUpdateWindow('Nenhuma atualização disponível.')
  sendStatusToUpdateWindow('Iniciando aplicação...')

  // START MAIN APPLICATION!
  // close update window just after of the main window is opened,
  // because of the 'window-all-closed' app life-cycle
  createMainWindow().then(() => {
    windows.update.destroy()
    windows.update = null
  })
})

autoUpdater.on('download-progress', (progress) => {
  sendStatusToUpdateWindow(
    `
      Baixando... ${ progress.percent.toFixed(0) }% ${ bytes(progress.bytesPerSecond) }/s
      <br/>
      ${ bytes(progress.transferred) } / ${ bytes(progress.total) }
    `
  )
})

autoUpdater.on('update-downloaded', (info) => {
  sendStatusToUpdateWindow('Download concluído!')
  log.info(info)
  sendStatusToUpdateWindow('Reinstalando aplicação...')
  const timeout = setTimeout(() => {
    if (appIsRunning) {
      clearTimeout(timeout)

      // autoUpdater.quitAndInstall(isSilent?, isForceRunAfter?)
      // isSilent => reinstall the application without user interaction
      // isForceRunAfter => force that application open again after the reinstall process
      autoUpdater.quitAndInstall(true, true)
    }
  }, 1000)
})

autoUpdater.on('error', (e) => {
  // if it haven't internet
  if (e.toString() === 'Error: net::ERR_INTERNET_DISCONNECTED') {
    sendStatusToUpdateWindow('Sem conexão com a internet! Tentando novamente em 5s....')
    // try start application again in 5s
    const timeout = setTimeout(() => {
      if (appIsRunning) {
        firstTime = false
        runApp()
      }
      clearTimeout(timeout)
    }, 5000)
  } else {
    sendStatusToUpdateWindow('Ocorreu um erro na atualização automática. Por favor contate a administradora do totem.')
    log.error(`[EXCEPTION] Auto update doesn't start: ${ e.toString() }`)
  }
})



/*
* START APPLICATION
* */
function runApp() {
  if (firstTime) {
    sendStatusToUpdateWindow(`Versão atual: ${ initialVersion }`)
  }
  try {
    autoUpdater.checkForUpdates()
  } catch (e) {
    sendStatusToUpdateWindow('Ocorreu um erro ao iniciar a aplicação. Por favor contate a administradora do totem.')
    log.error(`[EXCEPTION] Auto update doesn't run: ${ e.toString() }`)
  }
}

function createMainWindow() {
  return new Promise((resolve) => {
    log.info('getting machine info and starting local web server..')

    Promise.all([
      getHDSerialNumber(),
      getConfigFile(),
      initServer()
    ])
      .catch(() => {
        if (windows.update) {
          sendStatusToUpdateWindow('Falha no arquivo de configuração')
        } else {
          // entry here if only is dev mode
          createUpdateWindow().then(() => {
            sendStatusToUpdateWindow('Falha no arquivo de configuração')
          })
        }
      })
      .then(([hdSerialNumber, configFile]) => {

        log.info(`HD Serial Number: ${ hdSerialNumber }`)

        // const appTemplatePath = `file://${ __dirname }/build/index.html`
        const appTemplatePath = `http://${ serverOpts.domain }:${ serverOpts.port }`

        log.info('creating main window...')
        let mainWindow
        if (isDev) {
          mainWindow = new BrowserWindow({
            width: 1920,
            height: 1080,
            show: false
          })
        } else {
          mainWindow = new BrowserWindow({
            fullscreen: true,
            alwaysOnTop: true,
            show: false
          })
        }

        mainWindow.loadURL(appTemplatePath)

        mainWindow.once('ready-to-show', () => {
          log.info('Application is opened and working.')
          mainWindow.show()
        })

        mainWindow.webContents.once('did-finish-load', () => {
          log.info('sending configs to react renderer process')
          mainWindow.webContents.send('react', {
            ...configFile,
            hdSerialNumber,
            version: initialVersion
          })
          resolve()
        })

        // if the render process crashes, reload the window
        mainWindow.webContents.on('crashed', (e) => {
          if (isObject(e)) {
            try {
              e = JSON.stringify(e)
            } catch (err) {
              log.error(`error when stringify the json application error ${ e }`)
            }
          }
          log.error(`Application was crashed: ${ e.toString() }`)
          runApp()
          mainWindow.destroy()
        })

        // Emitted when the window is closed.
        mainWindow.on('closed', () => {
          // Dereference the window object, usually you would store windows
          // in an array if your app supports multi windows, this is the time
          // when you should delete the corresponding element.
          mainWindow = null
        })

        if (process.env.DEV_TOOLS === true.toString()) {
          mainWindow.openDevTools()
        }

        windows = {
          ...windows,
          mainWindow
        }
      })
  })
}

function createUpdateWindow() {
  return new Promise((resolve) => {
    log.info('creating update window...')

    const appTemplatePath = `file://${ __dirname }/build/update.html`

    let window
    window = new BrowserWindow({ width: 400, height: 250, show: false })

    window.loadURL(appTemplatePath)

    window.once('ready-to-show', () => {
      windows = {
        ...windows,
        update: window
      }
      log.info('ready to show update window')
      window.show()
      // window.openDevTools()
      resolve()
    })

    window.webContents.on('crashed', (e) => {
      if (isObject(e)) {
        try {
          e = JSON.stringify(e)
        } catch (err) {
          log.error('error when stringify the json update error')
        }
      }
      log.error(`Update window was crashed: ${ e.toString() }`)
      window.destroy()
    })

    // Emitted when the window is closed.
    window.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      window = null
    })
  })
}

function createPrintReceiptWindow(str) {
  return new Promise((resolve) => {
    log.info('creating print receipt window...')

    const appTemplatePath = `file://${ __dirname }/build/print.html`

    let window
    window = new BrowserWindow({ width: 300, height: 250, show: false })

    window.loadURL(appTemplatePath)

    window.once('ready-to-show', () => {
      windows = {
        ...windows,
        print: window
      }
      log.info('ready to show print receipt window')
      // window.show()
      resolve()
    })

    window.webContents.on('did-finish-load', () => {
      window.webContents.send('html-print-receipt', str)
      window.webContents.print({ silent: true })
      // window = null // close window after print order.
      resolve()
    })

    window.webContents.on('crashed', (e) => {
      if (isObject(e)) {
        try {
          e = JSON.stringify(e)
        } catch (err) {
          log.error('error when stringify the json print error')
        }
      }
      log.error(`Print receipt window was crashed: ${ e.toString() }`)
      window.destroy()
    })

    // Emitted when the window is closed.
    window.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      window = null
    })
  })
}


app.on('ready', () => {
  if (isDev) {
    createMainWindow()
  } else {
    createUpdateWindow().then(runApp)
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-quit', () => {
  appIsRunning = false
  log.info('disconnecting web server...')
  try {
    kill(serverOpts.port)
    log.info('web server disconnected')
  } catch (e) {
    log.error(`could not shut down web server: ${ e.toString() }`)
  }
  log.info('Application was closed!')
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!windows.mainWindow) {
    runApp()
  }
})

ipcMain.on('print-customer-receipt', (event, str) => {
  log.info('printer customer receipt')
  log.info(str)
  try {
    createPrintReceiptWindow(str)
  } catch (e) {
    log.error(e.toString())
  }
})

ipcMain.on('log-internal', (event, { type, str }) => {
  const logType = getNormal(log, type, log.info)
  logType(str)
})
