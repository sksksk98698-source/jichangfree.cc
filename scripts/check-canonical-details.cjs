const fs = require("fs");

const missingCanonical = [];
const sitemap = fs.readFileSync("dist/sitemap-0.xml", "utf-8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = dir + "/" + f;
    if (fs.statSync(full).isDirectory()) {
      checkDir(full);
    } else if (f.endsWith(".html")) {
      const html = fs.readFileSync(full, "utf-8");
      const can = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
      if (!can) {
        missingCanonical.push(full);
      }
    }
  }
}

checkDir("dist");
console.log("Total missing canonical files:", missingCanonical.length);
console.log("Files missing canonical:");
missingCanonical.forEach((f) => console.log(" - " + f));
