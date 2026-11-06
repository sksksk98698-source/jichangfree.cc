const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(
  "c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt",
  "utf8",
);

// 1. Table for affiliate links and coupons
const tableStart = content.indexOf("| # | 品牌 |");
const tableText = content.slice(tableStart, content.indexOf("## 合规提醒"));
const linkMap = {};
tableText.split("\n").forEach((l) => {
  if (l.startsWith("|") && !l.includes("品牌") && !l.includes("---")) {
    const parts = l.split("|").map((s) => s.trim().replace(/`/g, ""));
    if (parts[2]) {
      linkMap[parts[2]] = { num: parts[1], link: parts[3], coupon: parts[4], highlight: parts[5] };
    }
  }
});

console.log("Link map size:", Object.keys(linkMap).length);
console.log("Link map entries:", linkMap);
