const fs = require('fs');
const https = require('https');

const folderId = "1qFgRVdKxGDAeB9A3J3xh00e9acYgKetp";
const url = `https://drive.google.com/drive/folders/${folderId}`;

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log("HTML Data received for Biblioteca. Length:", data.length);
        fs.writeFileSync('biblioteca_folder.html', data, 'utf-8');
        
        // Find filename patterns in Drive HTML
        const regex = /\["([1a-zA-Z0-9_-]{25,35})",\["(.*?)"\]/g;
        let match;
        let count = 0;
        while ((match = regex.exec(data)) !== null && count < 50) {
            console.log(`ID: ${match[1]} => Title: ${match[2]}`);
            count++;
        }
    });
}).on('error', err => {
    console.error("Error:", err);
});
