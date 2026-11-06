const fs = require("fs");

const airportsHtml = fs.readFileSync("dist/zh-Hans/airports/guangsuyun/index.html", "utf-8");
const jsonLdMatches = [
  ...airportsHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi),
];

console.log("JSON-LD count in airport detail:", jsonLdMatches.length);
jsonLdMatches.forEach((m, idx) => {
  try {
    const parsed = JSON.parse(m[1]);
    console.log(`Schema ${idx}:`, parsed["@type"] || (parsed["@graph"] ? "Graph" : "Unknown"));
    if (parsed["@type"] === "Product") {
      console.log("Product Name:", parsed.name);
      console.log("Offer Price:", parsed.offers && parsed.offers.price);
      console.log("Review Rating:", parsed.review && parsed.review.reviewRating);
    }
  } catch (e) {
    console.log(`Schema ${idx} parse error:`, e.message);
  }
});
