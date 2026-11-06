const fs = require("fs");

let s = fs.readFileSync("src/pages/[lang]/index.astro", "utf-8");

// Replace the CSS styles inside <style>
const oldStyleIdx = s.indexOf("<style>");
if (oldStyleIdx !== -1) {
  s = s.slice(0, oldStyleIdx);
}

const refinedStyles = `
<style>
  .home-main-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  /* Quick Nav Anchor Pills */
  .quick-nav-pills-box {
    background: linear-gradient(135deg, var(--accent) 0%, var(--background) 100%);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-4) var(--space-6);
    margin-bottom: var(--space-4);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
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
    color: var(--foreground);
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
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
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
    box-shadow: 0 2px 5px rgba(0,0,0,0.04);
    transition: all var(--duration) ease;
  }

  .airport-card-item:hover {
    border-color: var(--primary);
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
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
    padding: 0.15rem 0.45rem;
    font-size: 0.72rem;
    font-weight: var(--font-weight-bold);
    background-color: var(--primary);
    color: #ffffff !important;
    border-radius: 4px;
    line-height: 1;
  }

  .brand-name-text {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    color: var(--foreground);
  }

  .type-pill-badge {
    font-size: 0.72rem;
    font-weight: var(--font-weight-medium);
    padding: 0.2rem 0.55rem;
    background-color: var(--accent);
    color: var(--foreground);
    border: 1px solid var(--border);
    border-radius: 4px;
    white-space: nowrap;
  }

  .price-highlight-text {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    color: #d97706;
    margin-bottom: var(--space-2);
  }

  .tagline-desc-text {
    font-size: var(--font-size-xs);
    color: var(--muted-foreground);
    line-height: 1.6;
    margin: 0 0 var(--space-4) 0;
    min-height: 2.4em;
  }

  .card-action-btns {
    display: flex;
    gap: var(--space-3);
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
    transition: all var(--duration) ease;
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
    color: #ffffff !important;
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
    color: #ffffff !important;
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
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
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
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }

  .styled-data-table {
    width: 100%;
    min-width: 820px;
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
    white-space: nowrap;
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

s += refinedStyles;
fs.writeFileSync("src/pages/[lang]/index.astro", s, "utf-8");
console.log("Successfully polished styles and template bindings in index.astro");
