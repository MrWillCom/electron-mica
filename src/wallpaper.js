// This script is based on https://github.com/sindresorhus/win-wallpaper, and only supports Windows.

const child_process = require("child_process")

const output = child_process.execFileSync('src/wallpaper.exe', [], {})

module.exports = output.toString()
