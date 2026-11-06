const fs = require("fs");

let s = fs.readFileSync("src/pages/[lang]/index.astro", "utf-8");

// Replace RootLayout wrapper to use slot="content"
s = s.replace('<div class="space-y-12">', '<div slot="content" class="space-y-12">');

fs.writeFileSync("src/pages/[lang]/index.astro", s, "utf-8");
console.log('Added slot="content" to index.astro!');
