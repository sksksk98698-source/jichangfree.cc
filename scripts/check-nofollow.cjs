const fs = require("fs");

let checked = 0;
let missingNofollow = [];
const files = fs
  .readdirSync("dist/zh-Hans/airports")
  .map((f) => "dist/zh-Hans/airports/" + f + "/index.html");
files.push("dist/zh-Hans/index.html");
files.push("dist/zh-Hans/airports/index.html");

for (const f of files) {
  if (fs.existsSync(f)) {
    const html = fs.readFileSync(f, "utf-8");
    const aTags = [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["'][^>]*>/gi)];
    for (const a of aTags) {
      const full = a[0];
      const href = a[1];
      if (href.includes("aff") || href.includes("code=")) {
        checked++;
        if (!full.includes("nofollow")) {
          missingNofollow.push({ file: f, href, full });
        }
      }
    }
  }
}

console.log("Affiliate links checked:", checked);
console.log("Missing nofollow count:", missingNofollow.length);
if (missingNofollow.length > 0) {
  console.log("Sample violations:");
  missingNofollow.slice(0, 5).forEach((v) => console.log(v.file, "->", v.full));
}
