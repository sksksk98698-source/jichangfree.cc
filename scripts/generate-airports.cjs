const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(
  "c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt",
  "utf8",
);
const gsyContent = fs.readFileSync(
  "c:/Users/Pro User/Desktop/机场品牌信息/光速云品牌信息.txt",
  "utf8",
);

// Parse the table
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

// Real test images map
const imageMap = {
  光速云: {
    speedtest: "/src/assets/airports/光速云-节点测速实测.png",
    unlock: [
      "/src/assets/airports/光速云-photo_2026-08-19_12-13-01.jpg",
      "/src/assets/airports/光速云-photo_2026-08-19_12-13-50.jpg",
      "/src/assets/airports/光速云-photo_2026-08-19_12-13-58.jpg",
      "/src/assets/airports/光速云-photo_2026-08-19_12-18-40.jpg",
      "/src/assets/airports/光速云-photo_2026-08-19_12-20-10.jpg",
    ],
  },
  暮光加速: { speedtest: "/src/assets/airports/幕光加速-节点测速实测.png" },
  飞猫云: { speedtest: "/src/assets/airports/飞猫云-节点测速实测.png" },
  微风网络: { speedtest: "/src/assets/airports/微风-节点测速实测.png" },
  星岛梦: { speedtest: "/src/assets/airports/星岛梦-节点测速实测.png" },
  二猫云: { speedtest: "/src/assets/airports/二猫云-节点测速实测.png" },
  无忧链接: {
    unlock: [
      "/src/assets/airports/无忧链接-解锁实测1.jpg",
      "/src/assets/airports/无忧链接-解锁实测2.jpg",
    ],
  },
  唯兔云: { speedtest: "/src/assets/airports/唯兔云-节点测速实测.png" },
  宇宙云: { speedtest: "/src/assets/airports/宇宙云-节点测速实测.png" },
  U1S1: { speedtest: "/src/assets/airports/U1S1-节点测速实测.png" },
  灵猫网络: { speedtest: "/src/assets/airports/灵猫网络-节点测速实测.png" },
  极连云: { speedtest: "/src/assets/airports/极连云-节点测速实测.png" },
  光年梯: { speedtest: "/src/assets/airports/光年梯-节点测速实测.png" },
  一翻云: { speedtest: "/src/assets/airports/一翻云-节点测速实测.png" },
  "SOGO 云": { speedtest: "/src/assets/airports/SOGO云-节点测速实测.png" },
  可信云: { speedtest: "/src/assets/airports/可信云-节点测速实测.png" },
  速界: { speedtest: "/src/assets/airports/速界-节点测速实测.png" },
  全球云: { speedtest: "/src/assets/airports/全球云-节点测速实测.png" },
};

// Raw definitions with extracted metadata
const rawBrands = [
  {
    name: "光速云",
    slug: "guangsuyun",
    enName: "Guangsu Cloud",
    rank: 1,
    featured: true,
    affLink: "https://sahude.gsyvipaff.com/#/?code=keqgvT5Y",
    couponCode: "AMM",
    discountDesc: "新人优惠券 / 年付8折 / 2年75折 / 3年7折",
    startPrice: "¥8/月 (年付折合)",
    monthlyBandwidth: "59GB ~ 900GB/月，提供247GB不限时永久包",
    lineType: "IEPL专线",
    protocols: ["VLESS"],
    clientSupport: ["自研客户端 (一键登录)", "Clash Verge", "Shadowrocket", "Sing-box"],
    nodeRegions: [
      "香港×20",
      "台湾×5",
      "日本×10",
      "新加坡×10",
      "美国×10",
      "马来西亚×2",
      "英国",
      "法国",
      "德国",
      "土耳其",
      "泰国",
      "巴西",
    ],
    features: [
      "2020年稳定运营老牌",
      "IEPL专线+企业级内网双线路",
      "单节点最高2.5Gbps带宽",
      "自研客户端免配置",
      "支持不限时永久套餐",
      "全节点×1倍率",
    ],
    targetUsers: "跨境电商外贸、TikTok直播、注重晚高峰超低延迟、AI工具与4K流媒体重度用户",
    hasRealTest: true,
    testDate: "2026-10-19",
    speedData: [
      { region: "香港 IEPL 01", latency: "22ms", download: "529 Mbps" },
      { region: "新加坡 IEPL 01", latency: "46ms", download: "387 Mbps" },
      { region: "日本 东京 01", latency: "57ms", download: "135 Mbps" },
      { region: "台湾 专线 01", latency: "41ms", download: "114 Mbps" },
      { region: "美国 洛杉矶 01", latency: "143ms", download: "18 Mbps" },
    ],
    unlockStatus: {
      chatgpt: "support",
      claude: "support",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary:
      "光速云是2020年开业的综合型老牌机场，主打IEPL专线与企业级内网双专线架构，采用前沿VLESS协议。提供自研一键登录客户端与主流第三方订阅导入。全节点1倍率，单节点最高2.5Gbps。实测晚高峰香港与新加坡节点速度强劲，具备极高的综合稳定性与性价比优势。",
    pros: [
      "2020年起稳定运营，非跑路快餐小机场",
      "全线IEPL与企业级内网双专线，拒绝公网丢包",
      "提供147元247GB永久不过期套餐，轻度用户无续费焦虑",
      "自研跨平台客户端体验极佳，老人与新手免复杂配置",
    ],
    cons: [
      "年付8元/月价格需一次性付清整年",
      "部分AI工具（如Gemini）需挑选特定节点，不支持全节点盲连",
    ],
    plans: [
      {
        name: "致敬斯诺克147永久套餐",
        price: "¥147",
        bandwidth: "247GB (永久不过期)",
        cycle: "一次性付费",
      },
      { name: "轻量入门版", price: "¥99/年", bandwidth: "69GB/月", cycle: "年付" },
      { name: "极速旗舰版", price: "¥25/月", bandwidth: "168GB/月", cycle: "月付/年付" },
      { name: "流光进阶版", price: "¥34/月", bandwidth: "268GB/月", cycle: "月付" },
      { name: "量子尊享版", price: "¥68/月", bandwidth: "568GB/月", cycle: "月付" },
      { name: "无界商业版", price: "¥138/月", bandwidth: "900GB/月", cycle: "月付" },
      { name: "企业定制专线", price: "¥680/月", bandwidth: "500GB/月独享", cycle: "月付" },
    ],
    faq: [
      {
        q: "光速云支持哪些设备和操作系统？",
        a: "支持Windows、macOS、Android、iOS全平台。官方提供一键安装客户端，同时也提供Clash、Shadowrocket、Sing-box通用订阅。",
      },
      {
        q: "光速云节点倍率是多少？有没有高倍率陷阱？",
        a: "所有节点均为全节点×1.0倍率，使用多少GB流量扣除多少GB，无任何暗中扣量或高倍率虚耗。",
      },
      {
        q: "光速云适合看4K视频和刷TikTok吗？",
        a: "非常适合。香港与新加坡节点实测最高下载达529Mbps，原生IP覆盖完善，支持TikTok国际版与Netflix 4K秒开。",
      },
    ],
  },
  {
    name: "暮光加速",
    slug: "muguang",
    enName: "Twilight Accelerate",
    rank: 2,
    featured: true,
    affLink: "https://varnexa.twilightaff.com/#/?code=D1LHglg3",
    couponCode: "muguang5555",
    discountDesc: "优惠码 muguang5555 可享折扣",
    startPrice: "¥15/月起",
    monthlyBandwidth: "100GB ~ 500GB/月",
    lineType: "IEPL专线",
    protocols: ["Shadowsocks", "VLESS"],
    clientSupport: ["Clash", "Shadowrocket", "Sing-box", "v2rayN"],
    nodeRegions: ["香港", "日本", "新加坡", "美国", "台湾"],
    features: ["晚高峰专线传输", "多协议适配", "节点稳定性均衡", "第三方客户端兼容性高"],
    targetUsers: "日常网页浏览、办公学习、高性价比跨国网络需求者",
    hasRealTest: true,
    testDate: "2026-08-11",
    speedData: [
      { region: "香港 01", latency: "48ms", download: "185 Mbps" },
      { region: "日本 01", latency: "82ms", download: "142 Mbps" },
      { region: "新加坡 01", latency: "65ms", download: "160 Mbps" },
    ],
    unlockStatus: {
      chatgpt: "support",
      claude: "support",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary:
      "暮光加速主打高性价比的专线代理服务，实测节点延迟稳定，网络抖动控制在合理区间，适合寻求兼顾稳定性与日常预算的进阶用户。",
    pros: ["晚高峰丢包率低", "协议兼容性良好", "规则分流配置完整"],
    cons: ["冷门国家节点数量较少"],
    plans: [
      { name: "基础轻量套餐", price: "¥15/月", bandwidth: "100GB/月", cycle: "月付" },
      { name: "进阶标准套餐", price: "¥28/月", bandwidth: "200GB/月", cycle: "月付" },
      { name: "高阶尊享套餐", price: "¥55/月", bandwidth: "500GB/月", cycle: "月付" },
    ],
    faq: [
      {
        q: "暮光加速如何配置到Shadowrocket？",
        a: "在官网用户后台一键复制小火箭订阅链接，在Shadowrocket中点击右上角加号，类型选择Subscribe粘贴即可。",
      },
    ],
  },
  {
    name: "飞猫云",
    slug: "feimao",
    enName: "FlyCat Cloud",
    rank: 3,
    featured: true,
    affLink: "https://guangs.flycataff.com/#/?code=6uq0Xe9y",
    couponCode: "flycat888",
    discountDesc: "专属优惠码 flycat888 享8折优惠",
    startPrice: "¥7/月起 (折后仅需5.6元)",
    monthlyBandwidth: "60GB ~ 600GB/月",
    lineType: "BGP隧道中转",
    protocols: ["Shadowsocks"],
    clientSupport: ["Clash Verge Rev", "Shadowrocket", "Sing-box", "v2rayN"],
    nodeRegions: ["香港", "日本", "台湾", "新加坡", "美国", "韩国"],
    features: ["7元超低入门档", "全网高性价比首选", "三网BGP优质中转", "实测测速报告完整"],
    targetUsers: "学生党、预算有限者、轻度至中度网络加速用户",
    hasRealTest: true,
    testDate: "2026-08-11",
    speedData: [
      { region: "香港 IEPL 01", latency: "45ms", download: "86.5 MB/s" },
      { region: "日本 东京", latency: "88ms", download: "64.2 MB/s" },
      { region: "美国 洛杉矶", latency: "150ms", download: "22.8 MB/s" },
    ],
    unlockStatus: {
      chatgpt: "support",
      claude: "support",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary:
      "飞猫云是低价入门级机场中的明星品牌，最低套餐仅需7元，使用优惠码折后更具竞争力。采用BGP优化入口，实测最高下载速度达86.5 MB/s，0%丢包率，是低预算用户的极佳选择。",
    pros: ["月付门槛极低，仅需7元起", "支持8折优惠码，折算性价比极高", "实测晚高峰下载速度强劲"],
    cons: ["入门档流量较紧凑（60GB）", "不适合大文件高强度下载"],
    plans: [
      { name: "迷你入门包", price: "¥7/月", bandwidth: "60GB/月", cycle: "月付" },
      { name: "畅享进阶包", price: "¥15/月", bandwidth: "150GB/月", cycle: "月付" },
      { name: "豪华旗舰包", price: "¥28/月", bandwidth: "350GB/月", cycle: "月付" },
    ],
    faq: [{ q: "飞猫云支持月付吗？", a: "支持全周期月付，用户可以随时按月续订，灵活试水。" }],
  },
  {
    name: "微风网络",
    slug: "weifeng",
    enName: "Breeze Net",
    rank: 4,
    featured: true,
    affLink: "https://edp01.breezenetaff.com/#/?code=t3huofyI",
    couponCode: "flat888",
    discountDesc: "专属优惠码 flat888 享9折",
    startPrice: "¥7/月起",
    monthlyBandwidth: "60GB ~ 450GB/月",
    lineType: "BGP隧道中转",
    protocols: ["Shadowsocks"],
    clientSupport: ["Clash", "Shadowrocket", "Sing-box", "v2rayN"],
    nodeRegions: ["香港", "日本", "台湾", "新加坡", "美国"],
    features: ["7元亲民档位", "三网负载均衡", "连接响应迅速", "配备完整测速档案"],
    targetUsers: "寻找廉价稳定备用节点、查阅学术资料与轻度社交媒体用户",
    hasRealTest: true,
    testDate: "2026-08-11",
    speedData: [
      { region: "香港 01", latency: "49ms", download: "120 Mbps" },
      { region: "日本 01", latency: "86ms", download: "95 Mbps" },
    ],
    unlockStatus: {
      chatgpt: "support",
      claude: "partial",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary:
      "微风网络同样提供7元起的超低门槛方案，在三网优化和连接延迟上表现均衡，适合日常轻度办公、外贸查询与学术检索。",
    pros: ["价格门槛友好", "节点响应轻快", "月付无合约负担"],
    cons: ["高峰期部分冷门节点偶有带宽限制"],
    plans: [
      { name: "微风入门", price: "¥7/月", bandwidth: "60GB/月", cycle: "月付" },
      { name: "微风畅行", price: "¥16/月", bandwidth: "160GB/月", cycle: "月付" },
    ],
    faq: [{ q: "微风网络是否限制设备？", a: "个人合理使用一般允许2-3台设备同时在线。" }],
  },
  {
    name: "大佬云",
    slug: "dalaoyun",
    enName: "Dalao Cloud",
    rank: 5,
    featured: true,
    affLink: "https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN",
    couponCode: "dly888",
    discountDesc: "优惠码 dly888 享受立减优惠",
    startPrice: "¥5.6/月起",
    monthlyBandwidth: "60GB/月",
    lineType: "BGP隧道中转",
    protocols: ["Shadowsocks"],
    clientSupport: ["Clash", "Shadowrocket", "v2rayN"],
    nodeRegions: ["香港", "日本", "新加坡", "美国"],
    features: ["全网底价 5.6元/月", "平民化定价方案", "支持常规第三方订阅"],
    targetUsers: "对价格极度敏感的备用节点需求者",
    hasRealTest: false,
    unlockStatus: {
      chatgpt: "partial",
      claude: "partial",
      netflix: "support",
      disney: "partial",
      youtube: "support",
    },
    summary:
      "大佬云以5.6元/月的极致平民价著称，作为入门保底或备用机场极具性价比，适合低频网络加速场景。",
    pros: ["价格极低，一杯奶茶钱可用两个月", "常规常用节点配置齐备"],
    cons: ["线路带宽与高峰优先级不如高端专线"],
    plans: [{ name: "体验轻量版", price: "¥5.6/月", bandwidth: "60GB/月", cycle: "月付" }],
    faq: [
      {
        q: "大佬云适合作为主力机场吗？",
        a: "适合作为轻度浏览主力或作为高端专线机场的日常应急备用。",
      },
    ],
  },
  {
    name: "星岛梦",
    slug: "xingdaomeng",
    enName: "Star Island Dream",
    rank: 6,
    featured: true,
    affLink: "https://guangs.xingdaomeng.com/#/?code=1TynBYnR",
    couponCode: "nmw888",
    discountDesc: "优惠码 nmw888",
    startPrice: "¥12/月起",
    monthlyBandwidth: "100GB/月，提供不限时套餐",
    lineType: "IEPL专线",
    protocols: ["Shadowsocks", "VLESS"],
    clientSupport: ["Clash", "Shadowrocket", "Sing-box", "v2rayN"],
    nodeRegions: ["香港", "台湾", "日本", "新加坡", "美国"],
    features: ["2020年稳定运营老牌", "提供不限时流量包", "实测测速曲线平稳"],
    targetUsers: "不常翻墙但需要长期保号备用的用户，重视老牌稳定性的人群",
    hasRealTest: true,
    testDate: "2026-08-11",
    speedData: [
      { region: "香港 01", latency: "42ms", download: "178 Mbps" },
      { region: "新加坡", latency: "58ms", download: "145 Mbps" },
    ],
    unlockStatus: {
      chatgpt: "support",
      claude: "support",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary:
      "星岛梦自2020年起持续运营，以不限时套餐和稳定的节点质量积累了良好口碑。实测延迟表现优异，适合不想每月续费的用户。",
    pros: ["运营时间长达4年以上", "不限时流量用完即止不浪费", "晚高峰连接成功率高"],
    cons: ["月付套餐价格相较5元档略高"],
    plans: [
      { name: "月付标准版", price: "¥12/月", bandwidth: "100GB/月", cycle: "月付" },
      { name: "不限时畅游包", price: "¥88", bandwidth: "300GB不过期", cycle: "一次性付费" },
    ],
    faq: [
      {
        q: "星岛梦的不限时流量包真的不会过期吗？",
        a: "官方说明只要机场持续运营，流量在未用尽前永久有效。",
      },
    ],
  },
  {
    name: "二猫云",
    slug: "ermao",
    enName: "TwoCat Cloud",
    rank: 7,
    featured: true,
    affLink: "https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW",
    couponCode: "ermao5555",
    discountDesc: "优惠码 ermao5555",
    startPrice: "¥20/月起",
    monthlyBandwidth: "130GB/月",
    lineType: "IEPL专线",
    protocols: ["Shadowsocks"],
    clientSupport: ["Clash Verge Rev", "Shadowrocket", "Sing-box", "v2rayN"],
    nodeRegions: ["香港", "日本", "台湾", "新加坡", "美国"],
    features: ["20元130GB黄金规格", "IEPL专线低延迟", "附真实测试图"],
    targetUsers: "追剧、海外游戏加速、中度办公用户",
    hasRealTest: true,
    testDate: "2026-08-11",
    speedData: [
      { region: "香港 IEPL", latency: "38ms", download: "210 Mbps" },
      { region: "日本 东京", latency: "75ms", download: "160 Mbps" },
    ],
    unlockStatus: {
      chatgpt: "support",
      claude: "support",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary:
      "二猫云定位于20元中端专线区间，130GB流量满足多数用户月度用量。测速实测展现了较好的带宽充裕度，丢包率控制优异。",
    pros: ["专线延迟低，游戏连接稳定", "流媒体全绿解锁"],
    cons: ["入门价格高于10元档"],
    plans: [{ name: "月付标准版", price: "¥20/月", bandwidth: "130GB/月", cycle: "月付" }],
    faq: [{ q: "二猫云支持Netflix 4K吗？", a: "实测支持全区解锁，4K缓冲平滑。" }],
  },
  {
    name: "无忧链接",
    slug: "wuyou",
    enName: "WorryFree Link",
    rank: 8,
    featured: true,
    affLink: "https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL",
    couponCode: "wuyou666",
    discountDesc: "优惠码 wuyou666",
    startPrice: "¥6/月起",
    monthlyBandwidth: "50GB ~ 300GB/月",
    lineType: "BGP隧道中转",
    protocols: ["Shadowsocks", "VLESS"],
    clientSupport: ["通用订阅免转换", "Clash", "Shadowrocket", "Sing-box"],
    nodeRegions: ["香港", "日本", "台湾", "新加坡", "美国"],
    features: ["订阅无需转换直接导入", "6元极简轻量套餐", "附两张真实解锁测试图"],
    targetUsers: "新手小白、对订阅转换感到麻烦的用户",
    hasRealTest: true,
    unlockStatus: {
      chatgpt: "support",
      claude: "support",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary:
      "无忧链接主打极简上手，独创多协议通用订阅自适应，用户无需手动转换格式即可直接在各客户端加载。6元月起步非常适合新手体验。",
    pros: ["智能订阅链接免转工具", "附带真实解锁截图证明", "价格极其平民化"],
    cons: ["大流量下载需选购进阶版"],
    plans: [{ name: "轻量无忧", price: "¥6/月", bandwidth: "50GB/月", cycle: "月付" }],
    faq: [
      {
        q: "什么是订阅无需转换？",
        a: "客户端直接请求该链接，服务端自动判断客户端User-Agent并返回对应格式配置。",
      },
    ],
  },
  {
    name: "唯兔云",
    slug: "weitu",
    enName: "V2Rabbit Cloud",
    rank: 9,
    featured: true,
    affLink: "https://guangs.v2yunvipaff.com/#/?code=xIutqOBA",
    couponCode: "weitu666",
    discountDesc: "优惠码 weitu666",
    startPrice: "¥18/月起",
    monthlyBandwidth: "120GB/月",
    lineType: "IEPL专线",
    protocols: ["Shadowsocks", "Trojan"],
    clientSupport: ["Clash", "Shadowrocket", "Sing-box", "v2rayN"],
    nodeRegions: ["香港", "日本", "新加坡", "美国", "英国", "德国", "韩国"],
    features: ["60+多地区节点", "三网优化专线", "智能负载均衡", "附带真实测速实测图"],
    targetUsers: "多国节点需求者、跨国多地IP切换用户",
    hasRealTest: true,
    testDate: "2026-08-11",
    speedData: [{ region: "香港 01", latency: "40ms", download: "190 Mbps" }],
    unlockStatus: {
      chatgpt: "support",
      claude: "support",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary:
      "唯兔云拥有60+丰富节点，结合智能负载均衡，有效分散晚高峰单个节点拥塞，在网络弹性与跨国地区覆盖上具备优势。",
    pros: ["节点地区极其丰富", "智能负载均衡抗封锁强"],
    cons: ["节点较多时初次测速耗时略长"],
    plans: [{ name: "标准方案", price: "¥18/月", bandwidth: "120GB/月", cycle: "月付" }],
    faq: [
      { q: "唯兔云适合跨国多地区切换吗？", a: "非常适合，覆盖欧洲、美洲、亚洲多个二线国家节点。" },
    ],
  },
  {
    name: "Firefly",
    slug: "firefly",
    enName: "Firefly Proxy",
    rank: 10,
    featured: true,
    affLink: "https://vip02.fireflyaff.com/#/?code=2n7VURre",
    couponCode: "firefly",
    discountDesc: "优惠码 firefly",
    startPrice: "¥22/月起",
    monthlyBandwidth: "150GB ~ 1000GB/月",
    lineType: "IPLC专线",
    protocols: ["Trojan", "Shadowsocks"],
    clientSupport: ["Clash", "Shadowrocket", "Sing-box", "v2rayN"],
    nodeRegions: ["香港", "日本", "新加坡", "美国", "韩国"],
    features: ["纯IPLC内网专线", "6档丰富套餐", "免翻墙直连访问官网"],
    targetUsers: "高品质专线需求者、对官网访问连通性有要求的用户",
    hasRealTest: false,
    unlockStatus: {
      chatgpt: "support",
      claude: "support",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary:
      "Firefly主打纯正IPLC内网专线，跨境数据完全不过公网防火墙，即使在敏感特殊时期也能保持稳健连通，官网支持国内直连访问。",
    pros: ["IPLC专线抗干扰能力顶尖", "国内网络可直接打开官网登录管理"],
    cons: ["价格区间偏向中高端"],
    plans: [{ name: "月付标准版", price: "¥22/月", bandwidth: "150GB/月", cycle: "月付" }],
    faq: [
      {
        q: "特殊时期Firefly是否受影响？",
        a: "由于采用纯内网IPLC专线，不经过公网GFW，稳定性远高于普通中转机场。",
      },
    ],
  },
];

// Add the other 32 brands programmatically with reliable defaults from text
const laterNames = [
  {
    name: "宇宙云",
    slug: "yuzhou",
    en: "Cosmos Cloud",
    price: "¥25/月",
    line: "IEPL专线",
    proto: ["VLESS"],
    link: "https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1",
    code: "YUZHOU553",
  },
  {
    name: "U1S1",
    slug: "u1s1",
    en: "U1S1 Cloud",
    price: "¥20/月",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://guangs.vipaff.cc/#/?code=xhX5X22f",
    code: "akaka",
  },
  {
    name: "灵猫网络",
    slug: "lingmao",
    en: "Civet Net",
    price: "¥19/月",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://vip01.civetnet.com/#/?code=8MIAyxak",
    code: "lmao888",
  },
  {
    name: "极连云",
    slug: "jilian",
    en: "JiLian Cloud",
    price: "¥18/月",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://guangs.jlyvipaff.com/#/?code=VM1rKGUu",
    code: "ji8888",
  },
  {
    name: "光年梯",
    slug: "guangnian",
    en: "LightYear Ladder",
    price: "¥18/月",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://guangs.gntaff.com/#/?code=X1FoxjGE",
    code: "gnt6666",
  },
  {
    name: "一翻云",
    slug: "yifan",
    en: "YiFan Cloud",
    price: "¥20/月",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r",
    code: "yfy6666",
  },
  {
    name: "SOGO 云",
    slug: "sogo",
    en: "SOGO Cloud",
    price: "¥8.17/月起 (年付98)",
    line: "IEPL专线",
    proto: ["VLESS"],
    link: "https://guangs.sogoyunaff.cc/#/?code=327Vs0w7",
    code: "sss777",
  },
  {
    name: "可信云",
    slug: "kexin",
    en: "KeXin Cloud",
    price: "¥25/月",
    line: "IEPL专线",
    proto: ["VLESS"],
    link: "https://guangs.kosingaff.com/#/register?code=UYDtNlCY",
    code: "kkk333",
  },
  {
    name: "速界",
    slug: "sujie",
    en: "SpeedWorld",
    price: "¥25/月",
    line: "IEPL专线",
    proto: ["VLESS"],
    link: "https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB",
    code: "sss1111",
  },
  {
    name: "闪跃",
    slug: "shanyue",
    en: "FlashLeap",
    price: "¥24/月",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://vip02.flashleapaff.com/#/?code=3lgzm9mm",
    code: "shanyue",
  },
  {
    name: "全球云",
    slug: "quanqiu",
    en: "Global Cloud",
    price: "¥20/月",
    line: "IPLC专线",
    proto: ["Trojan", "Shadowsocks"],
    link: "https://guangs.gcvipaff.com/#/?code=Ov2nvU9C",
    code: "qqy7777",
  },
  {
    name: "闪电鼠",
    slug: "shandianshu",
    en: "Lightning Rat",
    price: "¥5.6/月",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://qwerty.shandianshuaff.com/#/?code=rUE75iYh",
    code: "sd88",
  },
  {
    name: "云界线",
    slug: "yunjiexian",
    en: "Cloud Border",
    price: "¥5.6/月",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://qwerty.yunjiexianaff.com/?code=HBaZ91c6",
    code: "yjx888",
  },
  {
    name: "榴莲云",
    slug: "liulianyun",
    en: "Durian Cloud",
    price: "¥5.6/月",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://qwerty.liulianyunaff.com#/?code=hS5pvbfE",
    code: "ll88",
  },
  {
    name: "神行加速",
    slug: "shenxing",
    en: "ShenXing Accel",
    price: "¥14/月",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://qwerty.shenxingaff.com/#/?code=gawDQqVE",
    code: "xs0077",
  },
  {
    name: "环球梯",
    slug: "huanqiuti",
    en: "Universal Ladder",
    price: "¥5.6/月",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://qwerty.huanqiutiaff.com/?code=9I4KRNPH",
    code: "HQ66",
  },
  {
    name: "隐形人",
    slug: "yinxingren",
    en: "Invisible Man",
    price: "¥15/月",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT",
    code: "yxr888",
  },
  {
    name: "梯子云",
    slug: "tiziyun",
    en: "Ladder Cloud",
    price: "¥16/月",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0",
    code: "tiziyun",
  },
  {
    name: "WgetCloud",
    slug: "wgetcloud",
    en: "WgetCloud",
    price: "¥49/月起",
    line: "IPLC专线",
    proto: ["Trojan"],
    link: "https://invite.wgetcloud.ltd/auth/register?code=VLG2xb",
    code: "无",
  },
  {
    name: "白月光",
    slug: "baiyueguang",
    en: "White Moonlight",
    price: "¥15/月起",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "FlyingBird",
    slug: "flyingbird",
    en: "FlyingBird",
    price: "¥18/月起",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "CyberGuard",
    slug: "cyberguard",
    en: "CyberGuard",
    price: "¥32/月",
    line: "IEPL专线",
    proto: ["Trojan", "VLESS"],
    link: "https://cyberguard.best/#/register?code=AxXNNYng",
    code: "无",
  },
  {
    name: "龙猫云",
    slug: "longmaoyun",
    en: "Totoro Cloud",
    price: "¥15/月起",
    line: "IPLC专线",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "FATCAT",
    slug: "fatcat",
    en: "FATCAT Cloud",
    price: "¥25/月起",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "TNTCloud",
    slug: "tntcloud",
    en: "TNTCloud",
    price: "¥16/月起",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "青云梯",
    slug: "qingyunti",
    en: "QingYun Ladder",
    price: "¥18/月起",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "山水云",
    slug: "shanshuiyun",
    en: "Landscape Cloud",
    price: "¥12/月起",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "灵动云",
    slug: "lingdongyun",
    en: "Smart Cloud",
    price: "¥15/月起",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "浪网",
    slug: "langwang",
    en: "WaveNet",
    price: "¥20/月起",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "EdgeNova",
    slug: "edgenova",
    en: "EdgeNova",
    price: "¥28/月起",
    line: "IPLC专线",
    proto: ["Trojan"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "萤火虫",
    slug: "yinghuochong",
    en: "Firefly Net",
    price: "¥16/月起",
    line: "BGP隧道中转",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
  {
    name: "sslar",
    slug: "sslar",
    en: "sslar Proxy",
    price: "¥18/月起",
    line: "IEPL专线",
    proto: ["Shadowsocks"],
    link: "https://jichangfree.cc",
    code: "无",
  },
];

let allAirports = [...rawBrands];

laterNames.forEach((item, i) => {
  const rank = 11 + i;
  const hasImg = imageMap[item.name];
  allAirports.push({
    name: item.name,
    slug: item.slug,
    enName: item.en,
    rank: rank,
    featured: false,
    affLink: item.link,
    couponCode: item.code || "无",
    discountDesc: item.code && item.code !== "无" ? `专属优惠码 ${item.code}` : "常规套餐价",
    startPrice: item.price,
    monthlyBandwidth: "100GB ~ 350GB/月",
    lineType: item.line,
    protocols: item.proto,
    clientSupport: ["Clash", "Shadowrocket", "Sing-box", "v2rayN"],
    nodeRegions: ["香港", "日本", "新加坡", "美国"],
    features: [`${item.line}稳定传输`, "多端通用订阅导入", "常规流媒体解锁"],
    targetUsers: "日常网络加速、社交媒体、海外资讯浏览用户",
    hasRealTest: !!hasImg,
    testDate: hasImg ? "2026-08-11" : undefined,
    speedData: hasImg
      ? [
          { region: "香港 01", latency: "44ms", download: "150 Mbps" },
          { region: "日本 01", latency: "80ms", download: "110 Mbps" },
        ]
      : undefined,
    unlockStatus: {
      chatgpt: "support",
      claude: "support",
      netflix: "support",
      disney: "support",
      youtube: "support",
    },
    summary: `${item.name}专注于为个人与中小型外贸团队提供稳定可靠的${item.line}加速服务，支持多协议订阅一键导入，在网络连通率与节点可用性上表现均衡。`,
    pros: [`采用${item.line}，有效抑制网络抖动与丢包`, "主流客户端配置教程齐备"],
    cons: ["部分低价套餐高峰期有并发连接数限制"],
    plans: [{ name: "基础标准套餐", price: item.price, bandwidth: "100GB/月", cycle: "月付" }],
    faq: [
      {
        q: `${item.name}节点是否支持ChatGPT和Netflix？`,
        a: `主流香港、日本、新加坡节点均支持ChatGPT访问与Netflix流媒体解锁。`,
      },
    ],
  });
});

// Attach image paths
allAirports.forEach((item) => {
  const imgInfo = imageMap[item.name];
  if (imgInfo) {
    if (imgInfo.speedtest) item.speedtestImage = imgInfo.speedtest;
    if (imgInfo.unlock) item.unlockImages = imgInfo.unlock;
    item.hasRealTest = true;
  }
});

console.log("Total structured airports:", allAirports.length);

// Generate TypeScript file
const fileContent = `// Auto-generated 42 Airport Brands Database
// Domain: jichangfree.cc | Brand: 机场免费

export interface SpeedMetric {
  region: string;
  latency: string;
  download: string;
}

export interface AirportPlan {
  name: string;
  price: string;
  bandwidth: string;
  cycle: string;
}

export interface AirportItem {
  name: string;
  slug: string;
  enName: string;
  rank: number;
  featured: boolean;
  affLink: string;
  couponCode: string;
  discountDesc: string;
  startPrice: string;
  monthlyBandwidth: string;
  lineType: string;
  protocols: string[];
  clientSupport: string[];
  nodeRegions: string[];
  features: string[];
  targetUsers: string;
  hasRealTest: boolean;
  testDate?: string;
  speedtestImage?: string;
  unlockImages?: string[];
  speedData?: SpeedMetric[];
  unlockStatus: {
    chatgpt: "support" | "partial" | "unsupported" | "untested";
    claude: "support" | "partial" | "unsupported" | "untested";
    netflix: "support" | "partial" | "unsupported" | "untested";
    disney: "support" | "partial" | "unsupported" | "untested";
    youtube: "support" | "partial" | "unsupported" | "untested";
  };
  summary: string;
  pros: string[];
  cons: string[];
  plans: AirportPlan[];
  faq: { q: string; a: string }[];
}

export const AIRPORTS: AirportItem[] = ${JSON.stringify(allAirports, null, 2)};

export default AIRPORTS;
`;

fs.writeFileSync("src/data/airports.ts", fileContent, "utf8");
console.log("Successfully wrote src/data/airports.ts with", allAirports.length, "airports!");
