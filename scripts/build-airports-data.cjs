const fs = require("fs");
const path = require("path");

const content = fs.readFileSync(
  "c:/Users/Pro User/Desktop/机场品牌信息/42家机场品牌清单.txt",
  "utf8",
);

// The 42 brand slugs & names
const brandDefinitions = [
  { name: "光速云", slug: "guangsuyun", enName: "Guangsu Cloud", rank: 1, featured: true },
  { name: "暮光加速", slug: "muguang", enName: "Twilight Accelerate", rank: 2, featured: true },
  { name: "飞猫云", slug: "feimao", enName: "FlyCat Cloud", rank: 3, featured: true },
  { name: "微风网络", slug: "weifeng", enName: "Breeze Net", rank: 4, featured: true },
  { name: "大佬云", slug: "dalaoyun", enName: "Dalao Cloud", rank: 5, featured: true },
  { name: "星岛梦", slug: "xingdaomeng", enName: "Star Island Dream", rank: 6, featured: true },
  { name: "二猫云", slug: "ermao", enName: "TwoCat Cloud", rank: 7, featured: true },
  { name: "无忧链接", slug: "wuyou", enName: "WorryFree Link", rank: 8, featured: true },
  { name: "唯兔云", slug: "weitu", enName: "V2Rabbit Cloud", rank: 9, featured: true },
  { name: "Firefly", slug: "firefly", enName: "Firefly Proxy", rank: 10, featured: true },
  { name: "宇宙云", slug: "yuzhou", enName: "Cosmos Cloud", rank: 11, featured: false },
  { name: "U1S1", slug: "u1s1", enName: "U1S1 Cloud", rank: 12, featured: false },
  { name: "灵猫网络", slug: "lingmao", enName: "Civet Net", rank: 13, featured: false },
  { name: "极连云", slug: "jilian", enName: "JiLian Cloud", rank: 14, featured: false },
  { name: "光年梯", slug: "guangnian", enName: "LightYear Ladder", rank: 15, featured: false },
  { name: "一翻云", slug: "yifan", enName: "YiFan Cloud", rank: 16, featured: false },
  { name: "SOGO 云", slug: "sogo", enName: "SOGO Cloud", rank: 17, featured: false },
  { name: "可信云", slug: "kexin", enName: "KeXin Cloud", rank: 18, featured: false },
  { name: "速界", slug: "sujie", enName: "SpeedWorld", rank: 19, featured: false },
  { name: "闪跃", slug: "shanyue", enName: "FlashLeap", rank: 20, featured: false },
  { name: "全球云", slug: "quanqiu", enName: "Global Cloud", rank: 21, featured: false },
  { name: "闪电鼠", slug: "shandianshu", enName: "Lightning Rat", rank: 22, featured: false },
  { name: "云界线", slug: "yunjiexian", enName: "Cloud Border", rank: 23, featured: false },
  { name: "榴莲云", slug: "liulianyun", enName: "Durian Cloud", rank: 24, featured: false },
  { name: "神行加速", slug: "shenxing", enName: "ShenXing Accel", rank: 25, featured: false },
  { name: "环球梯", slug: "huanqiuti", enName: "Universal Ladder", rank: 26, featured: false },
  { name: "隐形人", slug: "yinxingren", enName: "Invisible Man", rank: 27, featured: false },
  { name: "梯子云", slug: "tiziyun", enName: "Ladder Cloud", rank: 28, featured: false },
  { name: "WgetCloud", slug: "wgetcloud", enName: "WgetCloud", rank: 29, featured: false },
  { name: "白月光", slug: "baiyueguang", enName: "White Moonlight", rank: 30, featured: false },
  { name: "FlyingBird", slug: "flyingbird", enName: "FlyingBird", rank: 31, featured: false },
  { name: "CyberGuard", slug: "cyberguard", enName: "CyberGuard", rank: 32, featured: false },
  { name: "龙猫云", slug: "longmaoyun", enName: "Totoro Cloud", rank: 33, featured: false },
  { name: "FATCAT", slug: "fatcat", enName: "FATCAT Cloud", rank: 34, featured: false },
  { name: "TNTCloud", slug: "tntcloud", enName: "TNTCloud", rank: 35, featured: false },
  { name: "青云梯", slug: "qingyunti", enName: "QingYun Ladder", rank: 36, featured: false },
  { name: "山水云", slug: "shanshuiyun", enName: "Landscape Cloud", rank: 37, featured: false },
  { name: "灵动云", slug: "lingdongyun", enName: "Smart Cloud", rank: 38, featured: false },
  { name: "浪网", slug: "langwang", enName: "WaveNet", rank: 39, featured: false },
  { name: "EdgeNova", slug: "edgenova", enName: "EdgeNova", rank: 40, featured: false },
  { name: "萤火虫", slug: "yinghuochong", enName: "Firefly Net", rank: 41, featured: false },
  { name: "sslar", slug: "sslar", enName: "sslar Proxy", rank: 42, featured: false },
];

console.log("Defined 42 brands successfully.");
