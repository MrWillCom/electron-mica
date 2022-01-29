const wallpaper = require('./wallpaper.js')

var img = new Image()
img.src = wallpaper

document.body.appendChild(img)

var mask = document.createElement('div')
mask.classList.add('mask')
document.body.appendChild(mask)

const remote = require('@electron/remote')

document.body.style.setProperty('--screen-width', remote.screen.getPrimaryDisplay().workAreaSize.width)
document.body.style.setProperty('--screen-height', remote.screen.getPrimaryDisplay().workAreaSize.height)

var win = remote.getCurrentWindow()

const getWindowBounds = () => {
    const bounds = win.getBounds()
    document.body.style.setProperty('--x', bounds.x)
    document.body.style.setProperty('--y', bounds.y)
    document.body.style.setProperty('--width', bounds.width)
    document.body.style.setProperty('--height', bounds.height)
}

getWindowBounds()

win.on('resize', getWindowBounds)
win.on('move', getWindowBounds)
