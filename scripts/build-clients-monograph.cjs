const fs = require("fs");
const path = require("path");

const targetAstroFile = path.resolve(__dirname, "../src/pages/[lang]/clients/index.astro");

// Content of the monograph for clients page
// Must satisfy:
// - 10,000 to 15,000 pure Chinese characters
// - 0 colons (冒号) in text or headings
// - 0 em dashes (破折号)
// - 0 "不是...而是..."
// - Highly practical, comparative, step-by-step, authoritative
// - Schema.org JSON-LD (HowTo, SoftwareApplication, FAQPage, BreadcrumbList)
// - Mobile-responsive layout, sticky TOC, horizontal overflow protection

const clientGuideAstro = `---
import RootLayout from "@/layouts/RootLayout.astro";
import { AVAILABLE_LANG, useTranslations, type Lang } from "~/i18n";
import { CLIENTS } from "@/data/clients";
import SiteConfig from "~/site.config";

export async function getStaticPaths() {
  return AVAILABLE_LANG.map((lang) => ({
    params: { lang },
  }));
}

const { lang } = Astro.params;
const t = useTranslations("common");

const isZh = lang === "zh-Hans";

const title = isZh
  ? "2026 全平台机场代理客户端大全与深度配置指南 | 官方正版下载、TUN模式调优与软路由透明代理手册"
  : "2026 Proxy Clients Setup Guide";

const description = isZh
  ? "JichangFree Labs 权威整理 2026 年各主流平台代理客户端深度选型指南。涵盖 Windows、macOS、Android、iOS、Linux 与 OpenWrt 软路由环境，详尽剖析 Mihomo、Xray、Sing-box 内核差异与 TUN 虚拟网卡模式，提供正版官方下载源核验、手把手订阅配置图文、DNS 泄漏防范与六步断连排障实战手册。"
  : "Complete proxy clients download and setup guide for Windows, macOS, Android, iOS, Linux, and OpenWrt routers.";

const canonicalURL = new URL(\`\${SiteConfig.basePath}/\${lang}/clients\`, SiteConfig.siteUrl).href;
const alternates = new Map<Lang | "x-default", string>();
AVAILABLE_LANG.forEach((l) => {
  alternates.set(l, new URL(\`\${SiteConfig.basePath}/\${l}/clients\`, SiteConfig.siteUrl).href);
});
alternates.set("x-default", new URL(\`\${SiteConfig.basePath}/zh-Hans/clients\`, SiteConfig.siteUrl).href);

// Schema.org Structured Data
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "如何正确配置代理客户端并开启全平台规则分流与 TUN 模式",
    "description": "从获取机场订阅链接到客户端导入、节点测速、分流规则设置以及 TUN 虚拟网卡全局接管的完整标准操作流程。",
    "inLanguage": lang,
    "step": [
      {
        "@type": "HowToStep",
        "name": "获取合规机场订阅链接",
        "text": "在 42 家机场品牌库中挑选服务商，在用户中心复制 Clash 格式或通用订阅链接备用。"
      },
      {
        "@type": "HowToStep",
        "name": "下载并安装官方正版客户端",
        "text": "根据操作系统选择 Clash Verge Rev、v2rayN、Shadowrocket 等官方正版发布包，校验安全签名完成安装。"
      },
      {
        "@type": "HowToStep",
        "name": "导入订阅与配置自动化更新",
        "text": "在客户端配置或订阅菜单粘贴链接，设置二十四小时自动静默更新，完成节点同步。"
      },
      {
        "@type": "HowToStep",
        "name": "配置规则分流与开启 TUN 虚拟网卡模式",
        "text": "将代理模式设置为 Rule 规则分流，按需开启 TUN 虚拟网卡接管底层网络数据包，享受全自动加速。"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "为什么开启代理后部分软件无法联网而浏览器正常？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "传统系统代理仅对遵循系统 HTTP/HTTPS 代理设置的浏览器生效。终端命令行、部分游戏客户端以及特定办公软件会绕过系统代理。在客户端中安装服务模式并开启 TUN 虚拟网卡模式即可在网络三层实现全流量接管。"
        }
      },
      {
        "@type": "Question",
        "name": "Fake-IP 模式与传统 Redir-Host 模式有什么核心区别？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Redir-Host 模式在本地向远程发送真实域名解析，容易受到本地运营商 DNS 污染且存在握手延迟。Fake-IP 模式在本地直接给应用返回保留内网虚假 IP，真实的域名解析交由境外落地节点在远端完成，完全杜绝了 DNS 污染并消除了本地解析延迟。"
        }
      },
      {
        "@type": "Question",
        "name": "各大国产安卓手机如何防止代理客户端后台被系统杀掉？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "需要在手机系统设置中将客户端的电池管理策略调整为无限制，在多任务卡片界面为客户端加锁锁定常驻，并允许客户端开机自启动与后台自启动权限。"
        }
      },
      {
        "@type": "Question",
        "name": "电脑同时安装多个代理客户端会不会产生冲突？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "如果仅安装而不同时运行则完全不会冲突。但严禁同时开启两个客户端的系统代理或同时开启两个 TUN 虚拟网卡，否则会导致本地系统代理端口抢占死锁或路由表混乱。"
        }
      }
    ]
  }
];

const platforms = [
  { id: "windows", name: "Windows 电脑", desc: "推荐 Clash Verge Rev 或 v2rayN，支持 TUN 模式全接管与规则分流" },
  { id: "android", name: "Android 安卓", desc: "推荐 v2rayNG 或 Clash Meta for Android，支持应用单独分流" },
  { id: "ios", name: "iPhone / iPad", desc: "首选 Shadowrocket (小火箭) 或 Stash，需通过外区 App Store 下载" },
  { id: "macos", name: "macOS 苹果电脑", desc: "支持 Apple Silicon 与 Intel 芯片，Clash Verge Rev 或 Surge Mac" },
  { id: "linux", name: "Linux 桌面与服务器", desc: "桌面端使用 Clash Verge Rev，无头服务器与软网关使用 v2rayA" },
  { id: "router", name: "OpenWrt / 软路由", desc: "全屋局域网透明代理，首选 OpenClash 或 PassWall 2" }
];
---

<RootLayout
  lang={lang as Lang}
  title={title}
  description={description}
  canonicalURL={canonicalURL}
  alternates={alternates}
>
  <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} slot="header" />

  <div slot="header" class="clients-header">
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <a href={\`/\${lang}\`}>{t("home")}</a>
      <span class="sep">/</span>
      <span class="current">客户端教程</span>
    </nav>
    <h1 class="page-title">{title}</h1>
    <p class="page-intro">
      代理客户端是连接网络加速节点与用户设备的核心桥梁。很多人网络频繁断流或卡顿，往往源于客户端选型不当或网络接管模式配置错误。本专题梳理 2026 年各主流操作系统客户端的技术定位、官方安全获取渠道、底层内核差异，并提供详实的图文调优实操与排障手册。
    </p>

    <!-- Quick Navigation Anchor Pills -->
    <div class="quick-nav-pills">
      <span class="pills-label">快速跳转板块</span>
      <a href="#quick-selection" class="pill-btn">全平台首选清单</a>
      <a href="#core-comparison" class="pill-btn">全景参数对比表</a>
      <a href="#kernel-mechanics" class="pill-btn">内核与TUN原理解析</a>
      <a href="#windows-guide" class="pill-btn">Windows 实操手册</a>
      <a href="#macos-guide" class="pill-btn">macOS 配置方案</a>
      <a href="#mobile-guide" class="pill-btn">iOS / 安卓移动端</a>
      <a href="#router-guide" class="pill-btn">OpenWrt 软路由透明代理</a>
      <a href="#troubleshooting-sop" class="pill-btn">六步断连排障 SOP</a>
      <a href="#clients-faq" class="pill-btn">高频实务 FAQ</a>
    </div>

    <!-- Quick Tutorial Banner -->
    <div class="tutorial-banner border-shadow" id="quick-selection">
      <h3>🚀 三步极速配置流程（新手通用）</h3>
      <div class="steps-grid">
        <div class="step-card">
          <span class="step-num">01</span>
          <h4>获取机场专属订阅</h4>
          <p>前往 <a href={\`/\${lang}/airports\`}>42家机场品牌总库</a> 挑选合适的服务商，注册并在用户后台复制专属订阅链接。优先选择支持全平台自动适配的 Clash 订阅格式或通用订阅。</p>
        </div>
        <div class="step-card">
          <span class="step-num">02</span>
          <h4>导入客户端并配置自动更新</h4>
          <p>从官方正规 GitHub Releases 页面下载对应系统的客户端，在配置或订阅菜单中粘贴链接并点击更新，建议将自动更新周期设置为二十四小时。</p>
        </div>
        <div class="step-card">
          <span class="step-num">03</span>
          <h4>选择节点与开启规则分流</h4>
          <p>在代理节点面板点击测速，挑选往返延迟适中的香港或日本节点。代理模式选择规则分流 Rule 模式并开启系统代理，有全局接管需求的用户按需开启 TUN 模式。</p>
        </div>
      </div>
    </div>
  </div>

  <div slot="content" class="clients-body">
    <!-- Existing Catalog Cards Section (Preserved & Enhanced) -->
    <section class="cards-section">
      <h2 class="sub-heading">各操作系统主流客户端官方渠道速查</h2>
      <div class="platform-cards-stack">
        {platforms.map((platform) => {
          const platformClients = CLIENTS.filter((c) => c.os === platform.id);
          return (
            <div class="platform-section border-shadow" id={\`catalog-\${platform.id}\`}>
              <div class="section-head">
                <h3>{platform.name} 客户端清单</h3>
                <p>{platform.desc}</p>
              </div>

              <div class="clients-grid">
                {platformClients.map((client) => (
                  <div class={\`client-item-card \${client.recommended ? "is-rec" : ""}\`}>
                    <div class="client-top">
                      <h4 class="client-name">{client.name}</h4>
                      {client.recommended && <span class="rec-badge">首选推荐</span>}
                    </div>
                    <div class="core-tag">内核 {client.core}</div>
                    <p class="client-desc">{client.features}</p>
                    <div class="client-foot">
                      <a
                        href={client.downloadUrl}
                        target="_blank"
                        rel="nofollow noopener"
                        class="download-btn"
                      >
                        前往 {client.downloadType} 项目主页 &rarr;
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>

    <!-- Monograph Long-form Content Section -->
    <article class="monograph-article">
      <!-- Section 1 Core Comparison Table -->
      <section class="content-block" id="core-comparison">
        <h2>2026 全平台主流客户端全景参数横向对比大表</h2>
        <p>
          在选择客户端时，很多新手容易被界面外观吸引，却忽略了底层内核支持与系统资源开销。评测组综合内存基准占用、多协议兼容度、TUN 虚拟网卡集成度与上手难度，将各大主流客户端的关键指标整理为对比大表。
        </p>

        <div class="table-scroll-wrapper">
          <table class="monograph-table">
            <thead>
              <tr>
                <th>客户端名称</th>
                <th>主力适配操作系统</th>
                <th>底层驱动内核</th>
                <th>支持主流协议</th>
                <th>TUN 虚拟网卡</th>
                <th>平均待机内存</th>
                <th>规则分流能力</th>
                <th>推荐指数与适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Clash Verge Rev</strong></td>
                <td>Windows、macOS、Linux</td>
                <td>Mihomo 内核（原 Clash.Meta）</td>
                <td>SS、Vmess、Vless、Trojan、Hysteria 2、TUIC</td>
                <td>内置一键安装服务模式</td>
                <td>约 80MB 至 150MB</td>
                <td>极强，支持自定脚本与扩展规则集</td>
                <td>五星首推，桌面端综合体验标杆</td>
              </tr>
              <tr>
                <td><strong>v2rayN</strong></td>
                <td>Windows 单平台</td>
                <td>Xray-core 与 Sing-box 双内核</td>
                <td>全协议兼容，包含新版 Reality</td>
                <td>支持，需安装对应驱动</td>
                <td>约 60MB 至 110MB</td>
                <td>丰富，路由规则集导入灵活</td>
                <td>五星推荐，适合多节点管理与深度测速</td>
              </tr>
              <tr>
                <td><strong>FlClash</strong></td>
                <td>Windows、Android、Linux</td>
                <td>Mihomo 内核</td>
                <td>SS、Vmess、Trojan、Hysteria 2</td>
                <td>支持基础接管</td>
                <td>约 50MB 至 90MB</td>
                <td>中等，预置常见分流规则</td>
                <td>四星推荐，界面极简清新、配置直观</td>
              </tr>
              <tr>
                <td><strong>Hiddify</strong></td>
                <td>全平台（Win、Mac、安卓、iOS）</td>
                <td>Sing-box 核心</td>
                <td>全协议自动优选</td>
                <td>深度集成 TUN 模式</td>
                <td>约 70MB 至 120MB</td>
                <td>自动调度，免去复杂编写</td>
                <td>四星半，小白用户一键连接首选</td>
              </tr>
              <tr>
                <td><strong>Shadowrocket（小火箭）</strong></td>
                <td>iOS、iPadOS</td>
                <td>自研高性能移动内核</td>
                <td>全协议覆盖，插件体系完备</td>
                <td>天然基于 iOS Network Extension</td>
                <td>极低，低于 40MB</td>
                <td>极高，支持分流规则与模块重写</td>
                <td>五星首选，苹果移动端无可争议王者</td>
              </tr>
              <tr>
                <td><strong>v2rayNG</strong></td>
                <td>Android 安卓全机型</td>
                <td>Xray 官方核心</td>
                <td>V2Ray 生态全协议支持</td>
                <td>通过 Android VpnService 实现</td>
                <td>约 45MB 至 80MB</td>
                <td>良好，支持按应用分流</td>
                <td>五星推荐，安卓平台装机量最大神器</td>
              </tr>
              <tr>
                <td><strong>Clash Meta for Android</strong></td>
                <td>Android 安卓系统</td>
                <td>Mihomo 移动端内核</td>
                <td>完整继承 Clash Meta 生态</td>
                <td>系统级 VPN 全接管</td>
                <td>约 70MB 至 130MB</td>
                <td>极强，策略组可视化操作顺手</td>
                <td>五星推荐，习惯 Clash 配置规则者首选</td>
              </tr>
              <tr>
                <td><strong>Surge Mac</strong></td>
                <td>macOS 单平台</td>
                <td>Surge 专用专有引擎</td>
                <td>主流商用协议</td>
                <td>增强模式 Enhanced Mode 标杆</td>
                <td>约 60MB 至 100MB</td>
                <td>工业级，规则链与脚本编写最强</td>
                <td>五星专业款，价格昂贵但网络稳定性极致</td>
              </tr>
              <tr>
                <td><strong>OpenClash</strong></td>
                <td>OpenWrt 软路由固件</td>
                <td>Mihomo / Clash 内核</td>
                <td>全协议集群</td>
                <td>支持 Fake-IP 混合模式与 TProxy</td>
                <td>视路由器内存而定（推荐512MB以上）</td>
                <td>全屋局域网设备细粒度分流</td>
                <td>软路由首选，全屋透明加速核心底座</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 2 Kernel and TUN Mechanics -->
      <section class="content-block" id="kernel-mechanics">
        <h2>代理内核与网络拦截工作机制深度穿透</h2>
        <p>
          很多用户在使用客户端时经常产生误解，以为下载的软件本身负责加密传输。在现代网络架构中，客户端图形界面只是前台操作面板，真正负责握手、加解密、协议解析与数据分发的是底层内核 Core。搞清楚内核的演进差异，能让您在遇到未知故障时迅速抓住本质。
        </p>

        <h3>三大主流底层内核技术特性解剖</h3>
        <p>
          目前市场上活跃的客户端底层主要依托三大内核分支。
        </p>
        <p>
          第一大分支是 Mihomo 内核，其前身是开源社区广为人知的 Clash.Meta。在原版 Clash 内核停滞维护后，Mihomo 团队接过了重担。该内核以出色的工程化架构著称，不仅完美向下兼容所有经典的 Clash YAML 配置文件，而且在多协议支持方面极为激进，原生融入了 Hysteria 2、TUIC、VLESS-Reality 等新兴协议。Mihomo 的核心优势在于极其强大且灵活的策略组调度系统，能够根据目标网站的地理位置、响应延迟甚至是自定义脚本进行动态毫秒级分流。其内置的 TUN 驱动也是目前各平台中稳定性最成熟的方案之一。
        </p>
        <p>
          第二大分支是 Xray-core，它是 V2Ray 框架的集大成者。Xray 团队在传输安全、防重放攻击与流量伪装方面功底极深。最负盛名的 XTLS 与 Reality 技术就是由 Xray 团队首创。Reality 能够直接借用大型权威海外网站的证书与 TLS 指纹，完全免去了用户自行申请域名的繁琐步骤，在公网恶劣环境下具有令人惊叹的抗主动探测能力。Xray-core 主要作为 v2rayN、v2rayNG 等客户端的心脏。
        </p>
        <p>
          第三大分支是 Sing-box 核心。作为新生代通用代理平台，Sing-box 采用了全新的模块化抽象理念，对底层网络套接字进行了重构。它的内存占用非常轻盈，在低功耗软路由和老旧设备上表现尤为出色。同时 Sing-box 原生面向下一代 QUIC 协议设计，对基于 UDP 的协议具有原生的并发优化。但由于其配置文件采用了与传统 Clash 完全不同的 JSON 语法结构，在规则自定义迁移时存在一定的门槛。
        </p>

        <h3>系统代理与 TUN 虚拟网卡模式的本质区别</h3>
        <p>
          用户最常碰到的问题是明明开了代理，浏览器看网页飞快，但在 Windows 命令提示符里执行 Git 克隆代码、或者登录某些海外网络游戏时依然显示网络超时。这一现象的核心在于数据包拦截层级的不同。
        </p>
        <p>
          传统的系统代理模式工作在操作系统的应用层。当您在客户端中点击开启系统代理时，客户端仅仅是在 Windows 注册表或 macOS 系统设置中写入了本地 HTTP 和 SOCKS 代理端口。这种机制完全依靠各个应用程序自觉遵守。现代主流浏览器如 Chrome、Edge、Safari 会主动读取系统代理设置并把流量交给客户端。但大量专业软件、开发终端、网络游戏以及通过底层驱动发包的程序根本不遵循系统代理设置，依然直接通过默认物理网卡向外发送原始数据包，从而导致连接失败。
        </p>
        <p>
          TUN 虚拟网卡模式则完全颠覆了这一逻辑。开启 TUN 模式后，客户端会在操作系统内核中创建一张虚拟网卡，并通过修改系统底层路由表，将物理网卡的默认路由权重转移到虚拟网卡上。此时不论是什么软件发出的数据包，只要进入操作系统的网络层（IP 层），都会被无差别捕获并导入客户端内核。内核再根据内置规则决定直连还是代理。因此，对于经常进行命令行开发、运行跨国游戏或使用小众办公软件的用户，开启 TUN 模式是实现真正全局接管的必选方案。
        </p>

        <h3>Fake-IP 模式解析冲突与防 DNS 泄漏</h3>
        <p>
          DNS 域名解析是网络加速中的关键一环。传统 Redir-Host 模式在用户访问一个域名时，必须先在本地发起真实的 DNS 查询获得目标服务器 IP。在复杂的网络环境中，本地运营商的 DNS 往往会投毒篡改海外解析结果，或者因跨国通信导致解析耗时高达数百毫秒。
        </p>
        <p>
          现代客户端普遍默认采用 Fake-IP 模式。在该模式下，当本地浏览器请求一个海外域名时，内核根本不向外部发起实际解析，而是立即从保留的内网地址池（如 198.18.0.0/16 网段）中取出一个虚假 IP 直接返回给浏览器，整个过程耗时几乎为零。浏览器拿到该虚假 IP 后立刻发起 TCP 握手数据包。客户端内核拦截到包含该虚假 IP 的数据包后，根据内部映射表查出原本请求的真实域名，并将域名打包交给境外的代理节点在远端机房进行真实解析。这种机制彻底将本地 DNS 污染风险归零，消除了本地解析延迟。配置时只要确保客户端 DNS 监听端口未被其他杀毒软件占用，Fake-IP 就能提供丝滑的冲浪体验。
        </p>
      </section>

      <!-- Section 3 Windows Guide -->
      <section class="content-block" id="windows-guide">
        <h2>Windows 平台主流客户端安装调优实操手册</h2>
        <p>
          Windows 拥有最庞大的用户群体，各类网络环境与杀毒软件环境也最复杂。评测组以目前最成熟的 Clash Verge Rev 为主线，辅以经典 v2rayN，拆解完整的避坑安装步骤。
        </p>

        <h3>Clash Verge Rev 官方安装与服务模式避坑</h3>
        <p>
          第一步是获取官方安全发布包。请务必前往官方 GitHub 仓库的 Releases 页面下载。常规 64 位英特尔与 AMD 处理器电脑应下载包含 x64 后缀的安装包或者便携版压缩包。对于经常重装系统的用户，便携版免去写入安装目录，更加绿色安全。
        </p>
        <p>
          第二步是安装服务模式 Service Mode。这是开启 TUN 模式的前置关键操作。在 Clash Verge Rev 界面左侧点击设置 Settings 菜单，找到 Service Mode 选项，点击旁边的安装 Install 按钮。此时 Windows 用户账户控制会弹出提权窗口，点击允许。安装成功后，服务模式旁边会显示绿色运行图标。安装服务模式的目的是让客户端获得在系统内核层注入虚拟网卡驱动的高级特权。
        </p>
        <p>
          第三步是导入订阅链接。进入订阅 Profiles 界面，在上方输入框粘贴从 <a href={\`/\${lang}/airports\`}>42家机场品牌库</a> 获取的专属订阅链接，点击保存 Save 与导入 Import。订阅成功后，界面会显示节点更新时间与节点数量。右键点击该订阅卡片，可以设置自动更新周期，强烈建议勾选定时更新并设置为 1440 分钟（即二十四小时），保证节点信息与倍率规则自动同步。
        </p>
        <p>
          第四步是开启系统代理与规则分流。在左侧代理 Proxies 界面，顶部代理模式务必选择规则 Rule 模式。下方会有自动策略组，通常选择延迟较低的香港或日本节点。最后在左上角或系统托盘图标右键菜单中勾选系统代理 System Proxy。如需全流量无缝接管，再勾选 TUN 模式即可。
        </p>

        <h3>Clash Verge Rev 扩展脚本编写与自定义规则注入</h3>
        <p>
          很多高级用户希望在使用第三方机场订阅的同时，加入自己的私有规则，例如强制某个特定开发域名走代理，或者让本地私有网段绝对直连。如果直接修改订阅文件，下次订阅更新时所有改动都会被服务商的远程配置覆盖。
        </p>
        <p>
          优雅的解决方案是利用 Clash Verge Rev 的扩展配置脚本功能。在订阅界面中，选中目标订阅卡片，右键选择编辑扩展配置或使用全局扩展脚本。您可以在脚本中使用 JavaScript 或简单的 YAML 补丁语法，通过预处理函数在配置文件加载到内核前动态注入自定义规则链。比如将包含特定内部域名的规则插入到 rules 列表的最顶端，这样既能享受机场每天的节点更新，又能永久保留本地专属的分流策略。
        </p>

        <h3>v2rayN 深度调优与 Xray 核心参数配置</h3>
        <p>
          v2rayN 适合需要管理多个不同服务商、多协议混合使用的技术人员。首次安装 v2rayN 后，建议打开设置菜单中的核心组件管理，检查 Xray 与 Sing-box 核心是否为最新稳定版。
        </p>
        <p>
          导入订阅链接后，按 Ctrl + A 全选节点，点击上方测试服务器延迟，选择测试真连接延迟或多线程测速。真连接测速会向海外目标网站发起真实 HTTP 握手，能够精准剔除由于节点故障或被封锁导致的假绿标节点。在路由设置中，建议选择绕过大陆模式，并开启域名解析本地优先，保证国内访问毫无滞后感。
        </p>

        <h3>Windows 防火墙与第三方安全软件放行策略</h3>
        <p>
          很多用户在开启 TUN 模式瞬间电脑立刻断网，或者提示驱动加载失败。这往往是由于火绒安全、360 安全卫士或 Windows Defender 拦截了虚拟网卡虚拟适配器的创建。处理方法是打开 Windows 安全中心，进入防火墙和网络保护，选择允许应用通过防火墙，将 clash-verge.exe 与 mihomo-core.exe 添加为专用网络与公用网络完全放行。在第三方杀毒软件中，将客户端安装目录添加到防护信任白名单中，即可杜绝被误杀问题。
        </p>
      </section>

      <!-- Section 4 macOS Guide -->
      <section class="content-block" id="macos-guide">
        <h2>macOS 苹果生态客户端配置与权限调优指南</h2>
        <p>
          苹果电脑以安全沙盒机制严苛著称，新版 macOS 对底层虚拟网卡与网络扩展实施了严格的系统级授权机制。
        </p>

        <h3>Apple Silicon 原生芯片与安装包选择</h3>
        <p>
          苹果在近年的 Mac 电脑上全面普及了 M1、M2、M3、M4 系列自研芯片。在下载 Clash Verge Rev Mac 版时，一定要注意下载带有 aarch64 或 arm64 标识的文件，这样可以充分利用苹果处理器的能效，待机内存占用大幅降低。如果下载了 x64 版本，系统会通过 Rosetta 2 转译运行，不仅额外消耗电量，而且网络吞吐吞吐峰值可能会受到轻微损耗。
        </p>

        <h3>解决 macOS 权限拦截与网络扩展授权</h3>
        <p>
          下载 DMG 镜像并将图标拖入应用程序 Applications 文件夹后，首次双击打开可能会遇到苹果系统关于无法验证开发者的拦截提示。处理方式是打开 Mac 的系统设置，进入隐私与安全性，滑动到底部会看到该软件已被阻止的提示，点击仍要打开并输入开机密码即可。
        </p>
        <p>
          在 Clash Verge Rev 中开启 TUN 模式时，macOS 会弹窗提示需要安装辅助帮助程序。点击确认并输入密码。成功后，系统设置的网络面板中会多出一张名为 utun 的虚拟以太网接口。另外，针对部分苹果用户反映 Mac 盒盖睡眠唤醒后节点出现长达数十秒断连的问题，可以在客户端设置中勾选保持后台常驻与睡眠唤醒自动重连网络套接字，即可彻底解决此小概率毛病。
        </p>

        <h3>Surge Mac 工业级配置与增强模式深度应用</h3>
        <p>
          对于预算充裕且追求极致网络掌控力的 Mac 用户，Surge Mac 是专业领域的标杆级工具。Surge 的灵魂在于其经过数年打磨的增强模式 Enhanced Mode。增强模式直接接管操作系统的底层虚拟接口，并在应用层之下建立了一整套虚拟网关。
        </p>
        <p>
          在 Surge 中，您可以直观地通过抓包面板查看到每一个正在发起网络请求的进程名称、目标 IP 所属的自治域编号 ASN、TLS 证书握手版本以及实时往返时间。Surge 还支持强大的 MitM 解密功能与脚本重写功能。通过在本地安装自签名受信证书，您可以针对特定域名编写 JavaScript 脚本，实现 API 请求伪装、广告参数过滤与自定义重定向。虽然 Surge 授权价格相对较高，但对于全天候依赖跨国网络的高级开发者与外贸企业管理者来说，其极低的故障率完全物有所值。
        </p>

        <h3>Terminal 终端与 Git 命令行快速加速</h3>
        <p>
          对于经常在 Mac 终端中编译代码、拉取 GitHub 仓库的开发者，如果未开启全局 TUN 模式，可以直接在终端配置文件（~/.zshrc 或 ~/.bash_profile）末尾添加两行别名函数。设置 alias setproxy 为 export http_proxy 等本地端口，设置 alias unsetproxy 为清除环境变量。需要加速时在终端敲一下 setproxy，当前终端窗口内的所有网络操作便会立刻走代理网络，既灵活又轻快。
        </p>
      </section>

      <!-- Section 5 Mobile Guide iOS and Android -->
      <section class="content-block" id="mobile-guide">
        <h2>移动端（iOS 与 Android）配置与后台保活优化</h2>
        <p>
          移动设备时刻处于蜂窝基站与不同 Wi-Fi 信号的切换中，加上手机厂商为了省电制定的严苛后台清理策略，移动端客户端配置的核心在于稳定常驻与智能分流。
        </p>

        <h3>iOS 平台生态与 Shadowrocket（小火箭）实战</h3>
        <p>
          在 iOS 生态中，由于苹果中国区 App Store 政策，所有代理工具均已下架。用户必须准备一个非中国大陆地区的 Apple ID（例如美区、港区或日区账号）才能在海外应用商店购买下载。
        </p>
        <p>
          Shadowrocket 俗称小火箭，是 iOS 平台普及度最高的一款神器。获取后打开软件，点击右上角加号，类型选择 Subscribe 订阅，将机场复制的订阅 URL 粘贴到 URL 输入框中，备注填写机场名称后点击保存。回到首页，软件会自动拉取全部节点列表。全局路由选择配置 Config 模式，点击最上方的未连接开关。首次启动时，系统会弹出添加 VPN 配置的授权弹窗，点击允许并通过 Face ID 或锁屏密码确认即可。
        </p>
        <p>
          进阶用户还可以使用小火箭的按场景自动切换功能。在设置中进入场景配置，可以设定当手机连接到家里指定的 Wi-Fi 时自动保持直连免代理，而当离开家切换为移动蜂窝网络时自动启动加速节点，全程无需手动来回开关。
        </p>

        <h3>Quantumult X 与 Loon 高级分流生态</h3>
        <p>
          除了小火箭，iOS 平台上还有两款备受赞誉的高级工具。其一是 Quantumult X（圈 X），其界面极具现代设计美感，策略组层级分明，对分流规则的执行效率极高。其二是 Loon，近年来因其极佳的插件生态而迅速崛起。Loon 支持通过远程链接一键安装各类复杂的分流插件与广告过滤模块，且支持完整的 HTTP/3 嗅探。如果您对界面交互与规则定制有更高品味，这两款工具是优秀的进阶之选。
        </p>

        <h3>Android 平台后台电池优化防杀与应用分流</h3>
        <p>
          安卓阵营推荐使用开源的 v2rayNG 或者 Clash Meta for Android。安卓系统最大的痛点是国内定制系统（如小米澎湃 OS、华为鸿蒙、OPPO ColorOS、vivo OriginOS）具备激进的后台杀进程机制。用户熄屏十分钟后，后台的代理进程往往被系统静默杀死，导致微信和通知推送全部中断。
        </p>
        <p>
          解决此问题的标准配置分为三步。第一步打开手机系统设置，找到应用管理并定位到该客户端，将省电策略调整为无限制或不进行优化。第二步在自启动管理中，勾选允许后台自启动与允许关联启动。第三步在手机调出后台多任务卡片界面，长按客户端卡片点击小锁图标完成加锁锁定。完成这三步后，客户端就能在后台稳如磐石地持续运行。
        </p>
        <p>
          安卓客户端还普遍具备按应用分流（分应用代理）功能。如果您使用的是国内银行 App、企业微信或国内特定手游，可以在客户端分流设置中勾选绕过这些应用，让它们的流量完全不经过代理内核，避免触发银行账号的异地登录风险。
        </p>
      </section>

      <!-- Section 6 Linux and Router Guide -->
      <section class="content-block" id="router-guide">
        <h2>Linux 服务器与 OpenWrt 软路由全屋透明代理</h2>
        <p>
          对于拥有多台智能电视、游戏主机（PS5、Switch、Xbox）、扫地机器人与全屋智能家居的家庭，每个设备单独安装客户端不仅繁琐，而且很多电视盒子系统根本不支持安装第三方代理工具。软路由透明代理是实现全家无感加速的终极形态。
        </p>

        <h3>OpenWrt 配合 OpenClash 搭建全屋加速底座</h3>
        <p>
          OpenClash 是目前 OpenWrt 固件中最主流、功能最完备的代理插件。安装完 OpenClash 软件包后，首先进入全局设置中的版本更新面板，下载最新编译的 Mihomo Meta 内核。新内核对多核处理器的并发性能进行了充分优化。
        </p>
        <p>
          进入配置文件管理面板，点击创建配置，订阅类型选择 Clash，粘贴从服务商处复制的订阅链接并点击更新配置。更新成功后在配置列表选择应用该配置。
        </p>
        <p>
          关键步骤在于运行模式选择。建议初学者首选 Fake-IP 混合模式。该模式结合了 Dnsmasq 与内核自带的 DNS 服务，能最大程度降低路由器 CPU 的软中断开销，即使家庭千兆宽带全速跑满下载，路由器处理器占用依然十分平稳。同时一定要在规则设置中勾选仅代理局域网海外流量，确保国内流量直接从光猫出口直通。
        </p>

        <h3>主路由与旁路网关（旁路由）模式拓扑设计</h3>
        <p>
          在家庭网络拓扑设计上，很多用户喜欢采用旁路由架构。主路由器负责拨号上网与全屋 Wi-Fi 覆盖，软路由作为内网中的一台旁路网关设备接入主路由 LAN 口。
        </p>
        <p>
          在这种架构下，如果希望某台特定的电脑、电视盒子或者 PS5 游戏机走加速网络，只需在这些设备的手动网络设置中，将默认网关与首选 DNS 地址修改为软路由的局域网 IP 地址即可。不修改设置的其他家庭设备（如父母的手机与智能家电）依然通过主路由直连公网，两者互不影响，既保证了全家网络的稳定性，又赋予了极客设备极致的加速自由。
        </p>

        <h3>Linux 无头服务器与 v2rayA 后台守护部署</h3>
        <p>
          在 Ubuntu、Debian 或 CentOS 等无图形界面的云服务器或本地工作站上，推荐部署基于 Web 管理面板的 v2rayA 或直接运行 Sing-box 守护进程。v2rayA 自带轻量级的 Web UI 界面，用户通过局域网浏览器即可轻松管理节点与路由规则。通过 systemd 系统服务，可以保证服务器在意外重启后代理服务自动恢复，为 Docker 容器镜像拉取与 Python 依赖安装提供全天候加速底座。
        </p>
      </section>

      <!-- Section 7 Troubleshooting SOP -->
      <section class="content-block" id="troubleshooting-sop">
        <h2>常见报错与网络断连六步根因诊断 SOP</h2>
        <p>
          任何网络加速系统在长期运行中都可能因为系统更新、网络波动或端口冲突出现突发状况。评测组归纳出六步标准的故障诊断流程，帮助您在两分钟内快速定位问题根源。
        </p>

        <div class="sop-steps-stack">
          <div class="sop-box">
            <h4>第一步 订阅链接导入报错 403 或者是无法解析格式</h4>
            <p>
              这种情况通常有两个原因。其一是复制订阅链接时前后多带了空格或回车字符，导致客户端识别 URL 失败。其二是机场后台开启了防盗链机制，拒绝了未携带合法 User-Agent 的请求。解决办法是在客户端订阅设置中将请求头 User-Agent 修改为 clash-verge 或者是 Clash.Meta，再重新点击更新即可顺畅拉取。
            </p>
          </div>

          <div class="sop-box">
            <h4>第二步 节点连通性测试显示有效但浏览器打不开任何网页</h4>
            <p>
              这是最经典的假连接现象。首先按 F12 打开浏览器开发者工具，查看控制台报错是 DNS 解析失败还是连接被拒绝。如果报错是代理服务器拒绝连接，说明本地客户端的内核其实已经意外崩溃退出，但系统代理设置依然指向了本地旧端口。彻底退出客户端进程，检查任务管理器中是否残留僵尸进程，重新启动客户端即可恢复。
            </p>
          </div>

          <div class="sop-box">
            <h4>第三步 客户端控制台疯狂刷屏提示 TLS 握手证书验证失败</h4>
            <p>
              当您看到大量关于 certificate has expired 或 TLS handshake error 警告时，百分之九十以上的概率是本地电脑或手机的系统时间发生了偏差。现代 TLS 协议要求客户端与服务端的时钟误差通常不能超过两分钟。打开系统设置，关闭自动同步时间后再重新开启，强制让系统与国家授时中心进行时钟同步，问题即可瞬间化解。
            </p>
          </div>

          <div class="sop-box">
            <h4>第四步 开启 TUN 模式后电脑无法访问局域网内的打印机或群晖 NAS</h4>
            <p>
              这是由于 TUN 模式默认把所有内网保留 IP 也吸纳到了虚拟网卡内部。解决方法是进入客户端的 TUN 设置界面，在严禁代理的绕过地址列表（Bypass IP List）中，确保填入了 192.168.0.0/16、10.0.0.0/8 以及 172.16.0.0/12 等常见的内网私有网段，这样内网文件传输就会直接走物理网卡交换机，不再受代理内核干扰。
            </p>
          </div>

          <div class="sop-box">
            <h4>第五步 国内国外网站突然同时卡死且提示 DNS 循环解析死锁</h4>
            <p>
              这种情况通常发生在自定义修改了客户端高级 DNS 规则之后。如果将国内 DNS 解析服务器本身的上游也配置成了需要代理的海外服务器，就会陷入我解析不了上游因此连不上代理、连不上代理因此无法解析上游的无限循环死锁中。处理方式是重置 DNS 设置，确保 Nameserver 中第一项永远是 223.5.5.5 或 119.29.29.29 等国内纯物理公网 DNS。
            </p>
          </div>

          <div class="sop-box">
            <h4>第六步 软件更新后主界面突然白屏或闪退崩溃</h4>
            <p>
              这是因为新版软件在读取旧版遗留在磁盘中的缓存配置时字段解析冲突。处理方法是在资源管理器中打开用户配置目录（Windows 位于 %APPDATA% 目录下对应的软件文件夹，Mac 位于 ~/Library/Application Support 目录），备份好自己的订阅链接后，将临时缓存文件与 config.yaml 删除，再次打开客户端让其重新初始化即可恢复正常。
            </p>
          </div>
        </div>
      </section>

      <!-- Section 8 FAQ -->
      <section class="content-block" id="clients-faq">
        <h2>代理客户端实务深度高频问答 FAQ</h2>

        <div class="faq-list">
          <div class="faq-card">
            <h4>在第三方网站下载所谓的汉化优化版客户端安全吗？</h4>
            <p>
              极其不安全。历史上曾多次发生不良黑产通过购买搜索引擎竞价广告，制作与官方 GitHub Releases 极度相似的仿冒钓鱼网站，在安装包中捆绑后门病毒与数字货币挖矿木马的案例。广大读者获取客户端时，务必只认准官方开源代码托管平台 Releases 页面，或者各大操作系统的官方正规应用商店，切勿相信所谓的破解版与优化精简版。
            </p>
          </div>

          <div class="faq-card">
            <h4>电脑里同时安装了 Clash 和 v2rayN，平时可以换着用吗？</h4>
            <p>
              完全可以交替使用，但前提是同一时刻只能运行其中一款。如果同时启动两款软件并都勾选了开启系统代理，它们会反复争夺 Windows 注册表的代理端口，导致浏览器网络请求出现混乱报错。使用另一款软件前，务必先在托盘区彻底退出前一款软件。
            </p>
          </div>

          <div class="faq-card">
            <h4>为什么开启客户端后手机电量消耗比平时明显加快？</h4>
            <p>
              客户端为了维持长连接需要持续监听套接字心跳，且每一个进出的网络数据包都需要经过内核的加解密运算，这必然会带来额外的 CPU 计算开销。另外，如果选用了高并发频繁发包的 UDP 协议（如 Hysteria 2），基带与芯片负荷也会增加。日常待机建议优先选用轻量的 Shadowsocks 协议，并确认已在手机设置中开启了合理的网络休眠策略。
            </p>
          </div>

          <div class="faq-card">
            <h4>玩外服网络游戏时，使用代理客户端能代替专业游戏加速器吗？</h4>
            <p>
              可以部分替代，但取决于机场节点的线路品质。如果使用的是全内网 IPLC 或 IEPL 专线节点并开启了 TUN 模式，对于 Steam、Epic 等平台的联机游戏加速效果非常出众，延迟极度稳定且没有丢包。但如果使用的是普通公网中转或直连线路，面对复杂的外服防作弊系统与实时对战数据包，可能会出现跳 ping 现象。对电竞有严苛要求的玩家，专线节点是基本前提。
            </p>
          </div>

          <div class="faq-card">
            <h4>更新客户端软件版本会影响我原来导入的订阅节点吗？</h4>
            <p>
              正常覆盖安装官方更新包通常不会影响原有的订阅与配置，因为客户端的数据目录与程序运行目录是独立分离的。但为了防患于未然，在跨重大版本升级之前，建议在客户端配置界面点击备份配置，或者将机场后台复制的专属订阅链接妥善保存在密码管理器中，以便随时重新导入。
            </p>
          </div>

          <div class="faq-card">
            <h4>订阅更新失败提示证书过期，但网站并没有打不开是为什么？</h4>
            <p>
              这通常是因为机场的订阅下发域名与节点机房所使用的通信域名不是同一个系统。有时由于机场管理人员遗漏了订阅下发分发服务器的 SSL 证书续签，导致客户端向该订阅接口拉取节点清单时因证书过期而报错。遇到这种情况，可以联系机场在线客服提醒其刷新订阅域名的 SSL 证书，或者在客户端订阅设置中临时开启跳过证书验证作为权宜之计。
            </p>
          </div>

          <div class="faq-card">
            <h4>客户端节点列表里的延时数值到底是 Ping 延迟还是真连接延迟？</h4>
            <p>
              很多客户端默认执行的是对节点服务器 IP 的 ICMP Ping 测试，或者仅仅测到了国内中转入口机房的往返时间。这并不能代表真正打开海外网站的速度。在 v2rayN 或 Clash Verge 中，建议选择测试真连接延迟（Httping 或 UrlTest）。真连接测速会向谷歌或 Cloudflare 实际发起一次轻量数据握手，只有这个测试得出的数值才是您浏览海外网站的真实物理延迟。
            </p>
          </div>

          <div class="faq-card">
            <h4>为什么部分国外特定流媒体会提示您正在使用代理因此拒绝播放？</h4>
            <p>
              这是因为主流流媒体平台（如 Netflix、Disney+ 等）拥有庞大的机房 IP 数据库。当客户端将您的请求转发至境外的机房云服务器时，流媒体平台的风控网关识别出该连接来自于数据中心机房 IP 而非当地居民家庭宽带，便会立刻封锁。遇到此问题，需要在客户端策略组中切换至经过专门流媒体原生住宅 IP 解锁的专用节点，或者选择在落地机房部署了智能 DNS 解锁中继的高品质机场。
            </p>
          </div>

          <div class="faq-card">
            <h4>分流规则中的 Direct、Proxy 与 Reject 分别代表什么含义？</h4>
            <p>
              这是规则分流的核心三要素。Direct 代表直连，当匹配到国内主流网站（如百度、淘宝、哔哩哔哩）时，数据包不经过代理内核，直接从本地宽带发出。Proxy 代表代理，当匹配到海外受限网站时，数据包被加密打包交给境外节点转发。Reject 代表拦截拒绝，通常用于屏蔽各类烦人的广告追踪代码、弹窗统计脚本与恶意挖矿域名，帮您净化浏览环境并节约宝贵的节点流量。
            </p>
          </div>

          <div class="faq-card">
            <h4>如何彻底卸载代理客户端并清除残留的虚拟网卡驱动？</h4>
            <p>
              如果直接删除软件主程序，系统内部可能依然残留着已写入的本地代理注册表与 TUN 虚拟网卡驱动，导致重启后电脑无法正常上网。标准卸载流程是：先在客户端主界面中依次关闭 TUN 模式并关闭系统代理开关，在设置中卸载服务模式 Service Mode，最后彻底退出程序后再执行反安装程序。如果已经误删导致断网，可以打开 Windows 设置的网络和 Internet，进入高级网络设置点击网络重置，电脑重启后即可恢复出厂纯净网络状态。
            </p>
          </div>

          <div class="faq-card">
            <h4>为什么不同客户端导入同一个机场订阅后解析出的节点数量不一致？</h4>
            <p>
              这通常与客户端所搭载内核对特定协议的解析支持度有关。例如某些机场在订阅中混入了基于新版 Reality、Hysteria 2 或 TUIC 协议的高速节点，如果您使用的客户端内核版本较旧，或者该客户端本身不支持上述新协议语法，它就会在解析订阅配置时自动忽略这些未识别的节点段落，从而导致在老旧客户端中显示的节点总数少于新版客户端。解决此问题的方法是保持客户端更新至最新稳定版，或者向机场客服确认是否有专属当前客户端的特定格式订阅。
            </p>
          </div>

          <div class="faq-card">
            <h4>使用代理客户端进行在线学习和办公是否会泄露本地隐私数据？</h4>
            <p>
              正规开源代理客户端（如 Clash Verge Rev、v2rayN、Sing-box 等）其全部代码均在 GitHub 等公开平台上经过了全球安全研究人员的长期审计，客户端本身绝不收集或上传任何用户的私密访问日志。此外，在全网普及 HTTPS 加密传输的今天，您的访问正文在离开电脑前已被公钥高强度加密，代理服务器只能获悉目标 IP 与域名，无法窥探网页密码或聊天明文。只要您从官方源获取客户端并妥善管理自己的订阅链接，在日常办公与学术研究中使用是非常安全的。
            </p>
          </div>
        </div>
      </section>

      <!-- Section 9 Advanced Rules and Customization -->
      <section class="content-block" id="advanced-rules">
        <h2>高级分流规则集与本地黑白名单编排实务</h2>
        <p>
          很多追求极致体验的用户往往不满足于服务商提供的默认分流规则。深入理解规则集 Rule Provider 与策略组 Proxy Group 的协同运作，能让您在不同网络场景下游刃有余。
        </p>

        <h3>Rule Provider 远程规则集的自动订阅与版本锁定</h3>
        <p>
          在现代 Clash 与 Mihomo 配置体系中，规则集 Rule Provider 允许将庞大的域名与 IP 规则剥离为独立文件进行定期拉取。常见的开源规则库如 Loyalsoldier 或 ACL4SSR 提供了针对流媒体、社交网络、广告拦截与大陆直连的细分规则集。
        </p>
        <p>
          在配置 Rule Provider 时，建议为每个规则集设定独立的更新周期，通常设为八万六千四百秒（即一天）。关键技巧在于合理安排规则匹配顺序。根据防火墙规则从上到下逐条匹配的通用法则，应该将自定义的私有直连或强制代理域名置于最顶部，接着是广告拦截 Reject 规则，再次是各大海外流媒体与 AI 服务的专用规则，最后才是广泛的 GeoIP 与 MATCH 兜底规则。层级分明可以极大减少内核在数据包转发时的匹配损耗。
        </p>

        <h3>规避特定软件代理探测与局域网穿透协同</h3>
        <p>
          某些专业设计软件、远程控制工具（如向日葵、ToDesk、TeamViewer）或企业私有 VPN 客户端内部集成了本地环境探测机制。如果检测到本地存在代理端口或虚拟网卡接管，可能会触发异常退出或降速。
        </p>
        <p>
          针对此类特殊场景，在客户端分流配置中不仅要将这些软件的通信域名加入直连 Direct，还应当在 Process Name 进程名匹配规则中将这些主执行程序（如 todesk.exe）直接声明为直连绕过。如果您在内网运行了 NAS 私有网盘或者局域网代码仓库，请务必在 IP-CIDR 规则中将 10.0.0.0/8、172.16.0.0/12 以及 192.168.0.0/16 显式指定为 Direct，避免局域网内大量大文件传输被不必要地导入代理内核二次转发，造成宝贵 CPU 资源的无谓开销。
        </p>
      </section>

      <!-- Section 10 Conversion and Resources Card -->
      <section class="conversion-card border-shadow">
        <h3>🔗 搭建高速网络配套资源中心</h3>
        <p>
          优质客户端只是高性能网络的一半，另一半取决于底层节点链路的稳定可靠。如果您尚未拥有高质量的专线节点，可以访问评测组长期维护的客观数据榜单。
        </p>
        <div class="conversion-actions">
          <a href={\`/\${lang}/airports\`} class="action-btn primary-btn">
            浏览 42 家机场品牌横向横评库 &rarr;
          </a>
          <a href={\`/\${lang}/about\`} class="action-btn secondary-btn">
            查阅 JichangFree 实验室评测标准与方法论 &rarr;
          </a>
        </div>
        <p class="disclosure-note">
          * 推广透明度说明：本站部分链接带有返利标识，收益用于支持探针服务器运营与持续实测，评测结论保持独立中立。
        </p>
      </section>
    </article>
  </div>
</RootLayout>

<style>
  .clients-header {
    margin-bottom: var(--space-8);
  }

  .breadcrumb-nav {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--font-size-xs);
    color: var(--muted-foreground);
    margin-bottom: var(--space-3);
  }

  .breadcrumb-nav a {
    color: var(--muted-foreground);
    text-decoration: none;
  }

  .breadcrumb-nav a:hover {
    color: var(--primary);
  }

  .sep {
    opacity: 0.5;
  }

  .current {
    color: var(--foreground);
    font-weight: var(--font-weight-medium);
  }

  .page-title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--foreground);
    margin: 0 0 var(--space-3) 0;
    line-height: 1.3;
  }

  .page-intro {
    color: var(--muted-foreground);
    font-size: var(--font-size-base);
    line-height: 1.6;
    margin: 0 0 var(--space-6) 0;
  }

  .quick-nav-pills {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-6);
    padding: var(--space-3) var(--space-4);
    background-color: var(--accent);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }

  .pills-label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    color: var(--foreground);
    margin-right: var(--space-2);
  }

  .pill-btn {
    font-size: var(--font-size-xs);
    color: var(--primary);
    background-color: var(--background);
    border: 1px solid var(--border);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: background-color var(--duration) ease;
  }

  .pill-btn:hover {
    background-color: var(--primary);
    color: var(--background);
  }

  .tutorial-banner {
    background-color: var(--accent);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
  }

  .tutorial-banner h3 {
    margin: 0 0 var(--space-4) 0;
    color: var(--primary);
    font-size: var(--font-size-lg);
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-4);
  }

  .step-card {
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    position: relative;
  }

  .step-num {
    position: absolute;
    top: var(--space-2);
    right: var(--space-3);
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--muted-foreground);
    opacity: 0.2;
    font-family: monospace;
  }

  .step-card h4 {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--font-size-base);
  }

  .step-card p {
    margin: 0;
    font-size: var(--font-size-xs);
    color: var(--muted-foreground);
    line-height: 1.6;
  }

  .step-card a {
    color: var(--primary);
  }

  .clients-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
  }

  .sub-heading {
    font-size: var(--font-size-xl);
    color: var(--foreground);
    margin: 0 0 var(--space-4) 0;
  }

  .platform-cards-stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .platform-section {
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
  }

  .section-head h3 {
    font-size: var(--font-size-lg);
    margin: 0 0 var(--space-1) 0;
    color: var(--foreground);
  }

  .section-head p {
    font-size: var(--font-size-xs);
    color: var(--muted-foreground);
    margin: 0 0 var(--space-4) 0;
  }

  .clients-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: var(--space-4);
  }

  .client-item-card {
    background-color: var(--accent);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .client-item-card.is-rec {
    border-color: var(--primary);
    box-shadow: 0 0 0 1px var(--primary);
  }

  .client-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-1);
  }

  .client-name {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    margin: 0;
  }

  .rec-badge {
    background-color: var(--primary);
    color: var(--background);
    font-size: 0.7rem;
    font-weight: var(--font-weight-bold);
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
  }

  .core-tag {
    font-size: var(--font-size-xs);
    color: var(--muted-foreground);
    margin-bottom: var(--space-2);
  }

  .client-desc {
    font-size: var(--font-size-xs);
    color: var(--foreground);
    line-height: 1.5;
    margin: 0 0 var(--space-4) 0;
  }

  .download-btn {
    display: inline-block;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semi-bold);
    color: var(--primary);
    text-decoration: none;
  }

  .download-btn:hover {
    text-decoration: underline;
  }

  /* Monograph Article Typography */
  .monograph-article {
    display: flex;
    flex-direction: column;
    gap: var(--space-10);
    line-height: 1.8;
    color: var(--foreground);
  }

  .content-block {
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-6) var(--space-8);
  }

  .content-block h2 {
    font-size: var(--font-size-xl);
    margin: 0 0 var(--space-4) 0;
    color: var(--foreground);
    border-bottom: 2px solid var(--border);
    padding-bottom: var(--space-2);
  }

  .content-block h3 {
    font-size: var(--font-size-lg);
    margin: var(--space-6) 0 var(--space-3) 0;
    color: var(--primary);
  }

  .content-block p {
    font-size: var(--font-size-sm);
    color: var(--muted-foreground);
    margin: 0 0 var(--space-4) 0;
    line-height: 1.8;
  }

  .content-block a {
    color: var(--primary);
    text-decoration: underline;
  }

  /* Table Horizontal Scrolling Safe Wrapper */
  .table-scroll-wrapper {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-block: var(--space-4);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }

  .monograph-table {
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    font-size: var(--font-size-xs);
    text-align: left;
  }

  .monograph-table th {
    background-color: var(--accent);
    color: var(--foreground);
    font-weight: var(--font-weight-semi-bold);
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }

  .monograph-table td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--border);
    color: var(--muted-foreground);
    vertical-align: middle;
  }

  .monograph-table tbody tr:hover {
    background-color: var(--accent);
  }

  /* SOP Steps Box */
  .sop-steps-stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-top: var(--space-4);
  }

  .sop-box {
    background-color: var(--accent);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-6);
  }

  .sop-box h4 {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--font-size-base);
    color: var(--foreground);
  }

  .sop-box p {
    margin: 0;
    font-size: var(--font-size-xs);
    line-height: 1.7;
    color: var(--muted-foreground);
  }

  /* FAQ Section */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-top: var(--space-4);
  }

  .faq-card {
    background-color: var(--accent);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-6);
  }

  .faq-card h4 {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--font-size-base);
    color: var(--foreground);
  }

  .faq-card p {
    margin: 0;
    font-size: var(--font-size-xs);
    line-height: 1.7;
    color: var(--muted-foreground);
  }

  /* Conversion Card */
  .conversion-card {
    background: linear-gradient(135deg, var(--accent) 0%, var(--background) 100%);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-6) var(--space-8);
    text-align: center;
  }

  .conversion-card h3 {
    margin: 0 0 var(--space-2) 0;
    font-size: var(--font-size-xl);
    color: var(--foreground);
  }

  .conversion-card p {
    font-size: var(--font-size-sm);
    color: var(--muted-foreground);
    max-width: 60ch;
    margin: 0 auto var(--space-6) auto;
  }

  .conversion-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .action-btn {
    display: inline-block;
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semi-bold);
    text-decoration: none;
    transition: transform var(--duration) ease;
  }

  .action-btn:hover {
    transform: translateY(-2px);
  }

  .primary-btn {
    background-color: var(--primary);
    color: var(--background);
  }

  .secondary-btn {
    background-color: var(--background);
    color: var(--foreground);
    border: 1px solid var(--border);
  }

  .disclosure-note {
    font-size: 0.75rem !important;
    color: var(--muted-foreground);
    opacity: 0.8;
    margin: 0 !important;
  }

  @media screen and (max-width: 768px) {
    .content-block {
      padding: var(--space-4);
    }

    .conversion-card {
      padding: var(--space-4);
    }
  }
</style>
`;

fs.writeFileSync(targetAstroFile, clientGuideAstro, "utf8");

console.log("Successfully wrote client guide page!");

// Measure pure Chinese characters in the file
const pureChinese = clientGuideAstro.replace(/[^\u4e00-\u9fa5]/g, "").length;
console.log("Pure Chinese character count in clients page:", pureChinese);
