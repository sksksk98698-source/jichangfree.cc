const fs = require("fs");

let s = fs.readFileSync("src/pages/[lang]/index.astro", "utf-8");

s = s.replace(
  'rel="noopener noreferrer" class="btn-direct-primary"',
  'rel="nofollow sponsored noopener" class="btn-direct-primary"',
);

s = s.replace(
  'rel="noopener noreferrer"\n                        class="px-2.5 py-1 rounded bg-emerald-600',
  'rel="nofollow sponsored noopener"\n                        class="px-2.5 py-1 rounded bg-emerald-600',
);

fs.writeFileSync("src/pages/[lang]/index.astro", s, "utf-8");
console.log('Homepage affiliate links patched with rel="nofollow sponsored noopener"!');
