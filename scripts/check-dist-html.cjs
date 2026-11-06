const fs = require("fs");

const html = fs.readFileSync("dist/zh-Hans/index.html", "utf-8");
const idx = html.indexOf('id="container"');
console.log('Index of id="container":', idx);
console.log("Snippet inside container:");
console.log(html.slice(idx, idx + 400));
