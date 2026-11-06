const fs = require("fs");

const airportsHtml = fs.readFileSync("dist/zh-Hans/airports/guangsuyun/index.html", "utf-8");
console.log("Includes 4.9?", airportsHtml.includes("4.9"));
console.log("Includes 评分?", airportsHtml.includes("评分"));
console.log("Includes 星级?", airportsHtml.includes("星级"));
