const fs = require("fs");

let s = fs.readFileSync("src/pages/[lang]/index.astro", "utf-8");

// 1. Convert Tailwind class names to native scoped CSS semantic classes in HTML
s = s.replace(
  '<div slot="content" class="space-y-12">',
  '<div slot="content" class="home-main-wrapper">',
);

s = s.replace(
  '<div class="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-4 md:p-6 backdrop-blur">',
  '<div class="quick-nav-pills-box">',
);
s = s.replace('<div class="flex items-center gap-2 mb-3">', '<div class="pills-header">');
s = s.replace(
  '<span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>',
  '<span class="pulse-dot"></span>',
);
s = s.replace(
  '<span class="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">专著级深度指南导览导航</span>',
  '<span class="pills-title">专著级深度指南导览导航</span>',
);
s = s.replace('<div class="flex flex-wrap gap-2 text-xs md:text-sm">', '<div class="pills-row">');
s = s.replaceAll(
  'class="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors font-medium"',
  'class="pill-tag"',
);

// 2. Featured section
s = s.replace(
  '<section id="section-top-airports" class="scroll-mt-24 space-y-4">',
  '<section id="section-top-airports" class="featured-top-section">',
);
s = s.replace(
  '<div class="flex items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-800">',
  '<div class="section-heading-row">',
);
s = s.replace(
  '<h2 class="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">',
  '<h2 class="section-title">',
);
s = s.replace(
  '<p class="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1">',
  '<p class="section-subtitle">',
);
s = s.replace(
  '<a href="#section-all-table" class="text-xs md:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">',
  '<a href="#section-all-table" class="view-all-table-btn">',
);

s = s.replace(
  '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">',
  '<div class="featured-cards-grid">',
);

// Featured card inside map
const oldCard = `<div class="flex flex-col justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-md">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2">
                  <span class="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-600 text-[11px] font-bold text-white">
                    #{item.id}
                  </span>
                  <span class="font-bold text-base text-neutral-900 dark:text-neutral-100">{item.name}</span>
                </div>
                <span class="rounded bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                  {item.type}
                </span>
              </div>
              <div class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                起步 {item.price}
              </div>
              <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                {item.tagline}
              </p>
            </div>
            <div class="flex items-center gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href={item.detailSlug}
                class="flex-1 rounded-lg border border-neutral-200 dark:border-neutral-700 py-1.5 text-center text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                深度测评
              </a>
              <a
                href={item.affUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 rounded-lg bg-emerald-600 py-1.5 text-center text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                官网直达 &rarr;
              </a>
            </div>
          </div>`;

const newCard = `<div class="airport-card-item">
            <div>
              <div class="card-header-line">
                <div class="brand-title-wrap">
                  <span class="card-rank-badge">#{item.id}</span>
                  <span class="brand-name-text">{item.name}</span>
                </div>
                <span class="type-pill-badge">{item.type}</span>
              </div>
              <div class="price-highlight-text">起步 {item.price}</div>
              <p class="tagline-desc-text">{item.tagline}</p>
            </div>
            <div class="card-action-btns">
              <a href={item.detailSlug} class="btn-review-outline">深度测评</a>
              <a href={item.affUrl} target="_blank" rel="noopener noreferrer" class="btn-direct-primary">官网直达 &rarr;</a>
            </div>
          </div>`;

s = s.replace(oldCard, newCard);

// 3. Article container
s = s.replace(
  '<article class="space-y-16 text-neutral-800 dark:text-neutral-200 leading-relaxed">',
  '<article class="monograph-article">',
);

// 4. Section headings
s = s.replaceAll(
  '<h2 class="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2 border-b pb-3 border-neutral-200 dark:border-neutral-800">',
  '<h2 class="block-h2">',
);
s = s.replaceAll(
  '<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white text-sm font-semibold">',
  '<span class="num-icon">',
);
s = s.replaceAll(
  '<div class="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm md:text-base">',
  '<div class="block-content">',
);

// 5. Scenarios grid
s = s.replace(
  '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">',
  '<div class="scenarios-grid">',
);

// 6. Table styling
s = s.replace(
  '<div class="flex flex-col md:flex-row md:items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-800 gap-2">',
  '<div class="table-header-row">',
);
s = s.replace(
  '<div class="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">',
  '<div class="table-scroll-container">',
);
s = s.replace(
  '<table class="w-full min-w-[760px] text-left text-xs md:text-sm border-collapse">',
  '<table class="styled-data-table">',
);
s = s.replace(
  '<thead class="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-300 font-semibold border-b border-neutral-200 dark:border-neutral-800">',
  "<thead>",
);
s = s.replace(
  '<tbody class="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">',
  "<tbody>",
);

// 7. Lab benchmark 3 cards
s = s.replace(
  '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">',
  '<div class="lab-three-grid">',
);

// 8. Tiers 4 items
s = s.replace('<div class="space-y-4 my-4">', '<div class="tiers-stack">');

// 9. Backbone 4 cards
s = s.replace(
  '<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">',
  '<div class="two-col-grid">',
);

// 10. Rules 3 layers
s = s.replace('<div class="space-y-3 my-4">', '<div class="steps-stack">');

// 11. Decision tree 5 steps
s = s.replace('<div class="space-y-3 my-4">', '<div class="steps-stack">');

// 12. Antifraud 6 cards
s = s.replace(
  '<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">',
  '<div class="two-col-grid">',
);

// 13. Client tuning 4 cards
s = s.replace('<div class="space-y-3 my-4">', '<div class="steps-stack">');

// 14. Details FAQ
s = s.replace('<div class="space-y-3">', '<div class="faq-accordion-list">');
s = s.replaceAll(
  '<details class="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 open:shadow-sm">',
  '<details class="faq-item">',
);
s = s.replaceAll(
  '<summary class="flex cursor-pointer items-center justify-between font-bold text-neutral-900 dark:text-neutral-100 text-sm md:text-base">',
  '<summary class="faq-summary">',
);
s = s.replaceAll(
  '<div class="pt-3 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t mt-3 border-neutral-100 dark:border-neutral-800">',
  '<div class="faq-answer">',
);

// Append comprehensive CSS styling
const customStyles = `
<style>
  .home-main-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  /* Quick Nav Anchor Pills */
  .quick-nav-pills-box {
    background-color: var(--accent);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-4) var(--space-6);
    margin-bottom: var(--space-4);
  }

  .pills-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-3);
  }

  .pulse-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--primary);
  }

  .pills-title {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    color: var(--muted-foreground);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .pills-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .pill-tag {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    padding: 0.35rem 0.75rem;
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--foreground);
    text-decoration: none;
    transition: all var(--duration) ease;
  }

  .pill-tag:hover {
    border-color: var(--primary);
    color: var(--primary);
    background-color: var(--accent);
  }

  /* Section Heading Row */
  .section-heading-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid var(--border);
    padding-bottom: var(--space-3);
    margin-bottom: var(--space-6);
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .section-title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--foreground);
    margin: 0 0 var(--space-1) 0;
  }

  .section-subtitle {
    font-size: var(--font-size-xs);
    color: var(--muted-foreground);
    margin: 0;
  }

  .view-all-table-btn {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semi-bold);
    color: var(--primary);
    text-decoration: none;
  }

  .view-all-table-btn:hover {
    text-decoration: underline;
  }

  /* Featured Top 6 Cards Grid */
  .featured-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .airport-card-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-5);
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: all var(--duration) ease;
  }

  .airport-card-item:hover {
    border-color: var(--primary);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }

  .card-header-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-2);
  }

  .brand-title-wrap {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .card-rank-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem 0.4rem;
    font-size: 0.7rem;
    font-weight: var(--font-weight-bold);
    background-color: var(--primary);
    color: var(--background);
    border-radius: 4px;
  }

  .brand-name-text {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    color: var(--foreground);
  }

  .type-pill-badge {
    font-size: 0.7rem;
    font-weight: var(--font-weight-medium);
    padding: 0.15rem 0.5rem;
    background-color: var(--accent);
    color: var(--muted-foreground);
    border: 1px solid var(--border);
    border-radius: 4px;
  }

  .price-highlight-text {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    color: #eab308;
    margin-bottom: var(--space-2);
  }

  .tagline-desc-text {
    font-size: var(--font-size-xs);
    color: var(--muted-foreground);
    line-height: 1.6;
    margin: 0 0 var(--space-4) 0;
  }

  .card-action-btns {
    display: flex;
    gap: var(--space-2);
    padding-top: var(--space-3);
    border-top: 1px solid var(--border);
  }

  .btn-review-outline {
    flex: 1;
    text-align: center;
    padding: var(--space-2);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--foreground);
    background-color: var(--accent);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: background-color var(--duration) ease;
  }

  .btn-review-outline:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .btn-direct-primary {
    flex: 1;
    text-align: center;
    padding: var(--space-2);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    color: var(--background) !important;
    background-color: var(--primary);
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: opacity var(--duration) ease;
  }

  .btn-direct-primary:hover {
    opacity: 0.9;
  }

  /* Monograph Article & Typography */
  .monograph-article {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
  }

  .block-h2 {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--foreground);
    border-bottom: 2px solid var(--border);
    padding-bottom: var(--space-3);
    margin: 0 0 var(--space-4) 0;
  }

  .num-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-md);
    background-color: var(--primary);
    color: var(--background);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    flex-shrink: 0;
  }

  .block-content {
    font-size: var(--font-size-sm);
    line-height: 1.8;
    color: var(--foreground);
  }

  .block-content p {
    margin-bottom: var(--space-4);
  }

  /* Grids & Cards */
  .scenarios-grid,
  .lab-three-grid,
  .two-col-grid {
    display: grid;
    gap: var(--space-4);
    margin: var(--space-4) 0;
  }

  .scenarios-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .lab-three-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .two-col-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .scenarios-grid > div,
  .lab-three-grid > div,
  .two-col-grid > div,
  .tiers-stack > div,
  .steps-stack > div {
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-5);
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .tiers-stack,
  .steps-stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin: var(--space-4) 0;
  }

  /* Table styling */
  .table-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--border);
    padding-bottom: var(--space-3);
    margin-bottom: var(--space-4);
  }

  .table-scroll-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    background-color: var(--background);
    margin: var(--space-4) 0;
  }

  .styled-data-table {
    width: 100%;
    min-width: 780px;
    border-collapse: collapse;
    font-size: var(--font-size-xs);
    text-align: left;
  }

  .styled-data-table th {
    background-color: var(--accent);
    color: var(--foreground);
    font-weight: var(--font-weight-bold);
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--border);
  }

  .styled-data-table td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--border);
    color: var(--muted-foreground);
    vertical-align: middle;
  }

  .styled-data-table tbody tr:hover {
    background-color: var(--accent);
  }

  /* FAQ Accordion List */
  .faq-accordion-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-top: var(--space-4);
  }

  .faq-item {
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    transition: background-color var(--duration) ease;
  }

  .faq-item[open] {
    background-color: var(--accent);
  }

  .faq-summary {
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    color: var(--foreground);
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .faq-summary::-webkit-details-marker {
    display: none;
  }

  .faq-answer {
    padding-top: var(--space-3);
    margin-top: var(--space-3);
    border-top: 1px solid var(--border);
    font-size: var(--font-size-xs);
    line-height: 1.8;
    color: var(--muted-foreground);
  }
</style>
`;

s += customStyles;
fs.writeFileSync("src/pages/[lang]/index.astro", s, "utf-8");
console.log("Successfully styled homepage with native CSS!");
