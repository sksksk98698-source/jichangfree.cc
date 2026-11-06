const fs = require("fs");

const html = fs.readFileSync("dist/zh-Hans/index.html", "utf-8");
const matches = [...html.matchAll(/id="container"/g)];
console.log('Total occurrences of id="container":', matches.length);
matches.forEach((m, i) => {
  console.log(`Match ${i} at index ${m.index}:`);
  console.log(html.slice(m.index, m.index + 200));
  console.log("-----------------------------------");
});
