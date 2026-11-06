# 🚀 机场免费 (JichangFree)

<p align="center">
  <img src="public/favicon.svg" width="96" height="96" alt="JichangFree Logo" />
</p>

<p align="center">
  <strong>2026 最新好用的 42 家高速稳定机场推荐 · IEPL/IPLC 专线节点实测与全平台订阅配置指南</strong>
</p>

<p align="center">
  <a href="https://jichangfree.cc"><img src="https://img.shields.io/badge/Official%20Site-jichangfree.cc-0284c7?style=flat-square&logo=googlechrome&logoColor=white" alt="Official Website" /></a>
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Built%20with-Astro%20v7-ff5d01?style=flat-square&logo=astro&logoColor=white" alt="Astro" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://pagefind.app"><img src="https://img.shields.io/badge/Search-Pagefind-10b981?style=flat-square" alt="Pagefind" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" /></a>
</p>

---

## 📖 项目简介 (Overview)

**机场免费 ([jichangfree.cc](https://jichangfree.cc))** 是一个基于 **Astro 7 现代全静态架构 (SSG)** 构建的高性能网络加速节点评测与订阅指南门户。

基于评测实验室**连续 90 天晚高峰千兆真实压测数据**，深度横评 42 家主流机场品牌，穿透 IEPL/IPLC 内网专线、公网 BGP 中转与主流协议特性，为用户提供专业客观的选型决策树、防跑路避坑指南及全平台客户端调优手册。

---

## ✨ 核心特性 (Key Features)

- ⚡ **极致性能与纯静态架构**：基于 Astro 纯静态生成（SSG），100% 预渲染，Pagefind 本地静态全文检索，无需后端数据库，页面秒开。
- 📊 **42 家机场品牌横向横评库**：多维记录起步价格、专线拓扑、节点规模、流媒体与 AI 解锁状态，支持手机与桌面端防溢出滑动对照。
- 🛠️ **全平台客户端教程中心**：涵盖 Windows、macOS、Android、iOS 及软路由，详尽指导 Mihomo/Xray 内核、TUN 虚拟网卡全接管与 Fake-IP 模式调优。
- 🔍 **专著级深度技术内容**：首页、客户端页及关于页均为 10,000+ 纯汉字专著级硬核评测，严格遵循活人感中文写作规范。
- 🌐 **完备的技术 SEO & GEO 优化**：
  - 规范化 Canonical 矩阵与 XML Sitemap 自动生成。
  - 严谨的 Schema.org 结构化数据 (`WebSite`, `Organization`, `Product`, `ItemList`, `FAQPage`, `HowTo`)。
  - 出站引流外链全量附带 `rel="nofollow sponsored noopener"`，有效预防算法风险。
  - 预留 Google Search Console、Bing Webmaster、百度、神马站长平台所有权验证接口。
- 🌍 **原生国际化 (i18n)**：支持 `zh-Hans`（简体中文）、`en-US`（英文）、`ja-JP`（日文）三语切换与 SEO hreflang 多语言映射。

---

## 🗂️ 目录结构 (Repository Structure)

```bash
jichangfree.cc/
├── public/                 # 静态资源 (Favicon, robots.txt, headers)
├── src/
│   ├── assets/             # 图片与本地素材
│   ├── components/         # Astro 可复用 UI 组件 (Header, Footer, 卡片等)
│   ├── content/            # MDX 内容合集 (博文白皮书、团队介绍、英雄区)
│   ├── data/               # 42 家机场与客户端结构化数据库
│   ├── layouts/            # 页面母版布局 (RootLayout, PostLayout, AuthorLayout)
│   └── pages/              # 路由页面 ([lang]/index, airports, clients, about 等)
├── astro.config.mjs        # Astro 配置文件 (Sitemap, ExpressiveCode, MDX)
├── site.config.ts          # 站点核心配置 (SEO、多语言、验证码等)
└── package.json            # 项目依赖与运行脚本
```

---

## 🛠️ 本地开发与构建 (Getting Started)

### 前置环境

- [Node.js](https://nodejs.org/) `>= 18.14.1` (推荐 Node.js 20+)
- [pnpm](https://pnpm.io/) `>= 9.0.0`

### 1. 克隆仓库

```bash
git clone https://github.com/sksksk98698-source/jichangfree.cc.git
cd jichangfree.cc
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动本地开发服务

```bash
pnpm run dev
```

本地服务默认启动在：`http://localhost:4321/`

### 4. 生产环境构建

```bash
pnpm run build
```

构建完成后，编译产物输出至 `dist/` 目录，并自动生成离线全文索引及站点地图。

### 5. 本地预览生产构建产物

```bash
pnpm run preview
```

---

## ⚙️ 环境变量配置 (Environment Variables)

复制 `.env.example` 为 `.env` 进行自定义配置：

```env
# 网站正式部署域名 (末尾不要带斜杠)
SITE_URL=https://jichangfree.cc

# 搜索引擎所有权验证 (可选)
GOOGLE_SITE_VERIFICATION=your_google_code
BING_SITE_VERIFICATION=your_bing_code
BAIDU_SITE_VERIFICATION=your_baidu_code
SHENMA_SITE_VERIFICATION=your_shenma_code
```

---

## 🤝 贡献与声明 (Disclaimer & License)

- 本项目评测数据由评测实验室自费采集，保持客观独立中立立场。
- 节点配置与加速方案仅供网络技术学习、学术科研与跨境商业出海参考，请严格遵守当地法律法规。
- 本项目开源遵循 [MIT License](LICENSE)。
