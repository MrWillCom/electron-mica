const fs = require('fs');
const https = require('https');

const url = `https://github.com/sindresorhus/win-wallpaper/releases/latest/download/wallpaper.exe`;

https.get(url, (res) => {
    const file = fs.createWriteStream(`src/wallpaper.exe`);
    res.pipe(file);

    file.on('finish', () => {
        file.close();
        console.log(`"wallpaper.exe" downloaded successfully.`);
    });

}).on("error", (err) => {
    console.error(err);
});
