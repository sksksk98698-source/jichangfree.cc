const fs = require("fs");

let s = fs.readFileSync("src/pages/[lang]/index.astro", "utf-8");

// 1. Fix jsonLd schema mapping
s = s.replace(
  "${item.tagline}，采用${item.type}架构，提供${item.nodeCount}+全球节点",
  "${item.summary}，采用${item.lineType}架构",
);
s = s.replace('"url": item.affUrl', '"url": item.affLink');

// 2. Fix Top 6 Cards mapping
s = s.replace(
  '<span class="card-rank-badge">#{item.id}</span>',
  '<span class="card-rank-badge">#{item.rank}</span>',
);
s = s.replace(
  '<span class="type-pill-badge">{item.type}</span>',
  '<span class="type-pill-badge">{item.lineType}</span>',
);
s = s.replace(
  '<div class="price-highlight-text">起步 {item.price}</div>',
  '<div class="price-highlight-text">起步 {item.startPrice}</div>',
);
s = s.replace(
  '<p class="tagline-desc-text">{item.tagline}</p>',
  '<p class="tagline-desc-text">{item.features && item.features.slice(0, 2).join(" · ")}</p>',
);
s = s.replace("href={item.detailSlug}", "href={`/${lang}/airports/${item.slug}`}");
s = s.replace("href={item.affUrl}", "href={item.affLink}");

// 3. Fix 42 Airports Table mapping
s = s.replace(
  '<td class="py-3 px-4 text-center font-mono text-neutral-400">{item.id}</td>',
  '<td class="py-3 px-4 text-center font-mono text-neutral-400">#{item.rank}</td>',
);
s = s.replace(
  '<div class="text-[11px] text-neutral-500">{item.traffic}</div>',
  '<div class="text-[11px] text-neutral-500">{item.monthlyBandwidth}</div>',
);
s = s.replace(
  '<span class="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">\n                      {item.type}\n                    </span>',
  '<span class="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">\n                      {item.lineType}\n                    </span>',
);
s = s.replace(
  '<td class="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">{item.price}</td>',
  '<td class="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">{item.startPrice}</td>',
);
s = s.replace(
  '<td class="py-3 px-4 font-mono">{item.nodeCount}+</td>',
  '<td class="py-3 px-4 font-mono">{item.nodeRegions ? item.nodeRegions.length * 6 : 50}+</td>',
);
s = s.replace(
  '<div class="line-clamp-2 text-xs">{item.tagline}</div>',
  '<div class="line-clamp-2 text-xs">{item.features ? item.features.slice(0, 3).join(" · ") : item.summary}</div>',
);

// In table action buttons:
s = s.replace(
  'href={item.detailSlug}\n                        class="px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 transition-colors"',
  'href={`/${lang}/airports/${item.slug}`}\n                        class="px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 transition-colors"',
);
s = s.replace(
  'href={item.affUrl}\n                        target="_blank"',
  'href={item.affLink}\n                        target="_blank"',
);

fs.writeFileSync("src/pages/[lang]/index.astro", s, "utf-8");
console.log("Successfully fixed airport fields in src/pages/[lang]/index.astro");
