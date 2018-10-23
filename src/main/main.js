// @flow
// const path = require('path')
const { app, BrowserWindow } = require('electron')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  // win.loadFile(path.join(__dirname, '../renderer/index.html'))
  win.loadURL('http://localhost:8080')
}

app.on('ready', createWindow)

app.on('windows-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if(win === null) createWindow()
})
