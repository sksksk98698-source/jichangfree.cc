const fs = require("fs");

const sitemap = fs.readFileSync("dist/sitemap-0.xml", "utf-8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

console.log("Total URLs in sitemap:", sitemapUrls.length);

const testUrls = sitemapUrls.filter((u) => u.includes("/test") || u.includes("/test/"));
console.log("Test URLs in sitemap:", testUrls);

const page1Urls = sitemapUrls.filter((u) => u.includes("/page/1"));
console.log("Page/1 URLs in sitemap:", page1Urls);

const tagUrls = sitemapUrls.filter((u) => u.includes("/tags/"));
console.log("Tag URLs in sitemap:", tagUrls.length);
