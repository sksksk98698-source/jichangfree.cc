const fs = require("fs");
const dir = "src/content/blog/sample";
for (const f of fs.readdirSync(dir)) {
  const full = dir + "/" + f;
  const c = fs.readFileSync(full, "utf-8");
  const langMatch = c.match(/language:\s*"([^"]+)"/);
  const transMatch = c.match(/translationKey:\s*"([^"]+)"/);
  const titleMatch = c.match(/title:\s*"([^"]+)"/);
  console.log({
    file: f,
    lang: langMatch ? langMatch[1] : null,
    translationKey: transMatch ? transMatch[1] : null,
    title: titleMatch ? titleMatch[1] : null,
  });
}
