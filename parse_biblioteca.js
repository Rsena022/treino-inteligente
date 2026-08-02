const fs = require('fs');

const html = fs.readFileSync('biblioteca_folder.html', 'utf-8');

// Drive embedding format contains JSON array structures like:
// ["ID",["FILENAME", ...]]
// Or ["FILENAME","MIME_TYPE"]

// Let's find all pairs of Drive IDs and Filenames
const idToTitle = {};

// Match pattern 1
const regex1 = /\["(1[a-zA-Z0-9_-]{25,35})",\["([^"]+)"/g;
let m;
while ((m = regex1.exec(html)) !== null) {
    if (!m[2].includes('http') && !m[2].includes('application/') && !m[2].includes('video/')) {
        idToTitle[m[1]] = m[2];
    }
}

// Match pattern 2: filenames with extensions
const regex2 = /"([1a-zA-Z0-9_-]{28,35})".*?"([^"]+\.(?:mp4|mov|avi|MP4|MOV))"/g;
while ((m = regex2.exec(html)) !== null) {
    idToTitle[m[1]] = m[2];
}

console.log("Total unique IDs mapped:", Object.keys(idToTitle).length);
console.log("Sample mapped titles:");
const entries = Object.entries(idToTitle).slice(0, 40);
entries.forEach(([id, title]) => {
    console.log(`${id} => ${title}`);
});

fs.writeFileSync('extracted_mapped_titles.json', JSON.stringify(idToTitle, null, 2), 'utf-8');
