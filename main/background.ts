import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { OpenNewFile } from './open-new-file'
import { WritePowerPoint } from './slider-maker/writePowerPoint'

const isProd = process.env.NODE_ENV === 'production'

app.setPath("userData", "C:/Users/Public/text2slide-data");

let loadURL: (win: Electron.BrowserWindow) => Promise<void>

if (isProd) {
  loadURL = serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await loadURL(mainWindow)
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}`)
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.handle("open-new-file", OpenNewFile)
ipcMain.handle("write-pptx", WritePowerPoint)
