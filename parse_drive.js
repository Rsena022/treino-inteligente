const fs = require('fs');

const html = fs.readFileSync('drive_folder.html', 'utf-8');

// Match any filename ending with .mp4, .mov, or exercise text strings
const mp4Matches = html.match(/[a-zA-Z0-9_\-\sà-úÀ-Ú]{3,80}\.(mp4|mov|avi|MP4|MOV)/g);

console.log("MP4 Matches count:", mp4Matches ? mp4Matches.length : 0);
if (mp4Matches) {
    console.log("Sample MP4 titles found:", mp4Matches.slice(0, 30));
}

// Search for any quoted strings containing words like Abdominal, Agachamento, Flexao, Burpee, etc.
const exerciseMatches = html.match(/"([^"]*?(?:Agachamento|Abdominal|Flexao|Flexão|Polichinelo|Prancha|Avanço|Afundo|Triceps|Tricéps|Biceps|Bíceps|Ombro|Peito|Costas|Glúteo|Gluteo|Burpee|HIIT|Perna|Panturrilha|Stiff)[^"]*?)"/gi);

console.log("\nExercise text matches count:", exerciseMatches ? exerciseMatches.length : 0);
if (exerciseMatches) {
    console.log("Sample exercise titles found:", exerciseMatches.slice(0, 30));
}
