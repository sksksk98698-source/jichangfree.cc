const fs = require("fs");

const testPages = [
  "dist/zh-Hans/index.html",
  "dist/zh-Hans/airports/index.html",
  "dist/zh-Hans/airports/guangsuyun/index.html",
  "dist/zh-Hans/clients/index.html",
  "dist/zh-Hans/about/index.html",
  "dist/zh-Hans/blog/sample/selection-whitepaper/index.html",
];

testPages.forEach((p) => {
  const html = fs.readFileSync(p, "utf-8");
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const canMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const schemas = [
    ...html.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi),
  ].length;
  console.log("--- " + p + " ---");
  console.log("Title:", titleMatch ? titleMatch[1] : "MISSING");
  console.log("Desc:", descMatch ? descMatch[1].slice(0, 70) + "..." : "MISSING");
  console.log("Canonical:", canMatch ? canMatch[1] : "MISSING");
  console.log("H1:", h1Match ? h1Match[0].replace(/<[^>]+>/g, "").trim() : "MISSING");
  console.log("Schemas count:", schemas);
});
