const { app, BrowserWindow } = require('electron');
const path = require('path');

//일렉트론이 백엔드 역할을 한다.

/**
 * 일렉트론 리로드
 * electron-reload 라이브러리가 electron이 자리 잡고 있는 저 경로를 바라보고 변경이 일어날 때마다 앱을 껐다가 다시 켜준다.
 */
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
})

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true
  })

  //프론트 핫 리로드
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadFile('./dist/index.html');
  } else {
    /**
     * 개발환경에서는 Electron이 빌드되어 있는 파일을 바라보는게 아니라
     * vite가 실행되고 있는 URL을 바라보게 해서 수정될 때 적용되게 만든다.
     */
    mainWindow.loadURL('http://localhost:3000');
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
})