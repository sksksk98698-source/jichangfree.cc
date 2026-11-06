const fs = require("fs");
const path = require("path");

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles("dist");
console.log("Total HTML files in dist:", htmlFiles.length);

let canonicalIssues = [];
let nofollowIssues = [];
let placeholderIssues = [];
let trackingCodes = [];
let emptyLinks = [];
let testAuthorIssues = [];
let thinContentPages = [];
let affiliateLinksChecked = 0;
let affiliateLinksMissingNofollow = 0;

for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf-8");
  const relPath = path.relative("dist", f).replace(/\\/g, "/");

  // 1. Canonical check
  const canMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!canMatch) {
    canonicalIssues.push({ file: relPath, issue: "Missing canonical" });
  } else {
    const hrefMatch = canMatch[0].match(/href=["']([^"']+)["']/i);
    if (!hrefMatch || !hrefMatch[1].startsWith("https://jichangfree.cc")) {
      canonicalIssues.push({
        file: relPath,
        issue: "Invalid canonical: " + (hrefMatch ? hrefMatch[1] : "null"),
      });
    }
  }

  // 2. Tracking codes check
  const gaMatch = html.match(/(G-[A-Z0-9]{6,12}|UA-[0-9-]+|hm\.baidu\.com\/hm\.js|clarity\.ms)/i);
  if (gaMatch) {
    trackingCodes.push({ file: relPath, tracker: gaMatch[0] });
  }

  // 3. Test / Placeholder check
  if (relPath.includes("test/index.html")) {
    testAuthorIssues.push(relPath);
  }
  const placeMatch = html.match(/(lorem ipsum|占位符|这是测试|测试文章)/i);
  if (placeMatch) {
    placeholderIssues.push({ file: relPath, text: placeMatch[0] });
  }

  // 4. Outbound / Affiliate links check: rel="nofollow sponsored noopener"
  const aTags = [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["'][^>]*>/gi)];
  for (const a of aTags) {
    const fullTag = a[0];
    const href = a[1];
    // Check if it is an outbound link to commercial partner / airport affiliate
    if (
      href.startsWith("http") &&
      !href.startsWith("https://jichangfree.cc") &&
      !href.startsWith("http://localhost") &&
      !href.startsWith("https://github.com") &&
      !href.startsWith("https://schema.org")
    ) {
      affiliateLinksChecked++;
      const relMatch = fullTag.match(/rel=["']([^"']+)["']/i);
      const relVal = relMatch ? relMatch[1].toLowerCase() : "";
      if (!relVal.includes("nofollow")) {
        affiliateLinksMissingNofollow++;
        nofollowIssues.push({ file: relPath, href, fullTag });
      }
    }
  }

  // 5. Thin content check (body text without tags)
  const bodyMatch = html.match(/<body[\s\S]*?<\/body>/i);
  if (bodyMatch) {
    const textOnly = bodyMatch[0]
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const zhCount = (textOnly.match(/[\u4e00-\u9fa5]/g) || []).length;
    const wordCount = textOnly.split(" ").length;
    if (relPath.startsWith("zh-Hans/") && zhCount < 300 && !relPath.includes("404.html")) {
      thinContentPages.push({ file: relPath, zhCount });
    }
  }
}

console.log("=== AUDIT SUMMARY ===");
console.log("Total Canonical Issues:", canonicalIssues.length);
if (canonicalIssues.length > 0) console.log(canonicalIssues.slice(0, 5));

console.log("Tracking Codes Found:", trackingCodes.length);
console.log("Test/Demo Pages Indexable:", testAuthorIssues.length, testAuthorIssues);
console.log("Placeholder Texts Found:", placeholderIssues.length, placeholderIssues);
console.log("Affiliate Links Checked:", affiliateLinksChecked);
console.log("Affiliate Links Missing nofollow:", affiliateLinksMissingNofollow);
if (nofollowIssues.length > 0) console.log("Sample missing nofollow:", nofollowIssues.slice(0, 5));
console.log("Thin Content Pages (zh-Hans < 300 chars):", thinContentPages.length, thinContentPages);
