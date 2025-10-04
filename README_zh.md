# 韩国电视直播

> **在线观看韩国电视直播的终极资源，配备现代化、高性能的 HTML5 播放器。**

---

## **✨ 功能特点**

- 🎬 **70+ 直播频道** - 涵盖韩国主流广播公司和有线电视网络
- 📺 **实时 EPG 系统** - 电子节目指南，显示当前和即将播出的节目
  - 100+ 韩国频道的 XMLTV 节目数据
  - 智能缓存，24小时自动刷新
  - 北京时区显示，适合中国用户
  - 悬停提示显示当前和下一个节目
- 🎨 **现代化 UI 设计** - 纯 CSS 渐变按钮，无需外部图片依赖
- 🔍 **智能搜索** - 按频道名称即时筛选
- 📱 **完全响应式** - 针对桌面、平板和移动设备优化
- 🏷️ **分类筛选** - 按类型浏览频道（主流、新闻、体育、娱乐、儿童）
- ⚡ **性能优化** - 使用 DocumentFragment 和高效 DOM 操作实现快速渲染
- 🎯 **HLS 流媒体** - 由 HLS.js 驱动，Safari/iOS 支持原生回退
- 🔄 **错误处理** - 优雅的错误提示和加载指示器
- ⌨️ **键盘快捷键** - 按 `/` 或 `Ctrl+F` 快速访问搜索
- 🌐 **双语界面** - 支持英文和中文
- 🧪 **自动化测试** - 内置 EPG 逻辑测试，确保可靠性

---

## **📺 支持的频道**

本仓库包含以下频道的流媒体访问：

### 主流广播公司
1. **KBS** - KBS1、KBS2、KBSNSPORTS、KBS Drama、KBS kids
2. **MBC** - MBC、MBC SPORTS、MBC every1、MBC On
3. **SBS** - SBS、SBS SPORTS、SBS GOLF、SBS Plus
4. **EBS** - EBS1、EBS2

### 有线电视网络
5. **tvN** - tvN、tvN Sports、tvN Show、tvN STORY、tvN DRAMA
6. **JTBC** - JTBC、JTBC GOLF、JTBC GOLF & SPORTS、JTBC3
7. **OCN** - OCN、OCN movies、OCN movies2
8. **ENA、Channel E**

### 新闻频道
9. **YTN、newsY（뉴스Y）**
10. **国际频道** - CNN、BBC、NHK World
11. **韩国新闻** - TV조선、채널A、MBN、한국경제

### 体育频道
12. **SKY SPORTS** - SKY SPORTS、SKY SPORTS F1
13. **SPOTV** - SPOTV、SPOTV2、SPOTV Prime、SPOTV On
14. **高尔夫** - PGA Tour、스크린골프（屏幕高尔夫）
15. **专业体育** - BilliardsTV（台球电视）、IB SPORTS、OGN starleague

### 娱乐与音乐
16. **MNet**
17. **코메디TV**（喜剧电视）
18. **CJ ENM Movie、PLAYY**

### 儿童与教育
19. **卡通动画** - Tooniverse、Cartoon Network、어린이TV、ANIPLUS
20. **教育频道** - 중화TV、바둑TV、브레인TV、JEI 재능TV、육아방송、뽀요 TV
21. **探索频道** - 네셔날지오그래피（国家地理）、디스커버리（探索）、Nat Geo Wild、History
22. **FTV、iNET**

### 购物
23. **현대홈쇼핑**（现代家庭购物）

---

## **🚀 快速开始**

### 方法一：直接打开（最简单）
1. **克隆或下载**此仓库
2. **打开** `player.html` 文件在您的浏览器中
3. **点击**任意频道按钮开始播放
4. **使用**搜索栏查找频道
5. **按分类筛选**以便更轻松地导航

无需安装或构建过程！

### 方法二：本地服务器（推荐）
为了获得更好的性能并避免潜在的 CORS 问题，请使用内置的启动脚本：

#### 🐧 Linux / 🍎 Mac
```bash
./start.sh
```
或
```bash
python3 start.py
```

#### 🪟 Windows
双击 `start.bat` 文件或在命令提示符中运行：
```cmd
start.bat
```
或
```cmd
python start.py
```

#### 🎯 启动脚本的特性
- ✅ 自动查找可用端口（默认：8000）
- ✅ 自动在默认浏览器中打开（WSL/Linux 环境下输出更清晰）
- ✅ 支持 Python 3、Python 2、PHP 或 Node.js
- ✅ 显示本地和网络 URL 以便访问
- ✅ 跨平台支持（Windows、Linux、Mac）

#### 📝 自定义端口
使用自定义端口：
```bash
python start.py 8080
```

---

## **💻 技术栈**

- **HTML5** - 语义化标记与视频元素
- **CSS3** - 现代样式，包括 Grid、Flexbox 和渐变
- **原生 JavaScript** - 零框架依赖
- **HLS.js** - 来自 CDN 的 HTTP 实时流媒体库
- **纯 CSS 按钮** - 无外部图片依赖，加载更快

---

## **🎯 性能优化**

播放器已针对最佳性能进行优化：

- ✅ **DocumentFragment** - 批量 DOM 插入以实现更快渲染
- ✅ **纯 CSS 按钮** - 消除外部图片请求
- ✅ **高效筛选** - 快速搜索和分类筛选
- ✅ **延迟评估** - 优化的事件监听器
- ✅ **硬件加速** - CSS 变换实现流畅动画
- ✅ **HLS.js 配置** - 优化的缓冲和低延迟模式

---

## **📱 浏览器支持**

| 浏览器 | 支持 | 说明 |
|---------|---------|-------|
| Chrome | ✅ 完全支持 | 使用 HLS.js |
| Firefox | ✅ 完全支持 | 使用 HLS.js |
| Edge | ✅ 完全支持 | 使用 HLS.js |
| Safari | ✅ 完全支持 | 原生 HLS 支持 |
| iOS Safari | ✅ 完全支持 | 原生 HLS 支持 |
| Android Chrome | ✅ 完全支持 | 使用 HLS.js |

---

## **⌨️ 键盘快捷键**

- **`/`** 或 **`Ctrl + F`** - 聚焦搜索栏
- **`Esc`** - 清除搜索（当搜索栏聚焦时）

---

## **🔧 使用说明**

### 流媒体 URL 限制
- M3U8 流媒体 URL 可能包含有时限的令牌
- 某些 URL 可能会过期，需要定期更新
- 外部 API 依赖（warlock0.synology.me、jmp2.uk 等）可能存在可用性问题

### CORS 要求
- 流媒体必须启用 CORS 以实现跨域访问
- 某些流媒体可能受地区限制

---

## **📝 版本历史**

### 版本 2.2.5（最新 - 2025-10-04）
- 📺 **EPG 阶段 2.5：实时 XMLTV 集成**
  - 来自 EPGSHARE01 的实时 EPG 数据（100+ 韩国频道）
  - 使用 pako.js 进行客户端 gzip 解压缩
  - 智能缓存，92% 数据缩减（24小时时间窗口）
  - 北京时区显示，适合中国用户
  - 准确的 NOW/NEXT 节目匹配
- 🧪 **添加自动化测试**
  - EPG 逻辑测试 (`test_epg_simple.js`)
  - E2E 浏览器测试 (`test_epg.js`)
- 🎯 **用户体验改进**
  - 仅显示精确时间匹配的节目为 NOW
  - 无精确匹配时显示"当前节目信息暂无"
  - 始终显示即将播出的 NEXT 节目
- 📚 **文档**
  - 全面的 EPG 数据源研究报告
  - 增强的 CLAUDE.md 开发指南

### 版本 2.2（2025-10-04）
- 📺 **EPG 阶段 2：XMLTV 解析器和时间匹配**
  - XMLTVParser、EPGDataManager、EPGTimeMatcher 类
  - LocalStorage 缓存，24小时过期
  - 实时 NOW/NEXT 节目检测
  - 9个主要频道的扩展静态 EPG 数据

### 版本 2.1（2025-10-04）
- 📺 **EPG 阶段 1：静态数据实现**
  - 悬停提示显示 NOW/NEXT 节目
  - 带模糊效果的精美渐变提示框设计
  - 双语支持（韩语/中文）

### 版本 2.0.1（2025-10-03）
- 🐛 修复启动脚本在 WSL/Linux 环境下的浏览器启动错误
- 🎨 添加网站图标以消除浏览器 404 错误
- 🧹 更清晰的服务器日志，无不必要的警告信息

### 版本 2.0（2025-10-03）
- ✨ 具有渐变设计的现代化 UI
- 🔍 添加搜索功能
- 🏷️ 分类筛选系统
- ⚡ 性能优化
- 🎨 纯 CSS 按钮（无外部图片）
- 📱 改进的移动端响应式设计
- 🔄 更好的错误处理
- 💬 全面的代码注释

### 版本 1.0
- 使用外部占位图片的基本频道播放器
- 简单的频道网格布局

---

## **🤝 贡献**

欢迎贡献！如果您想：
- 添加新频道
- 改进 UI/UX
- 修复错误或优化性能
- 添加新功能

请随时提交拉取请求或开启 issue。

---

## **📄 许可证**

本项目采用 MIT 许可证。详情请查看 [LICENSE](./LICENSE) 文件。

---

## **👤 联系方式**

由 **[Vincent Mugendi](https://www.linkedin.com/in/vincentmugendi/)** 用 ❤️ 创建

- **个人网站**: [vincentmugendi.com](https://vincentmugendi.com) *（即将推出）*
- **GitHub**: [github.com/vincentmugendi](https://github.com/vincent-mugendi)
- **邮箱**: [vincentmugendi17@gmail.com](mailto:vincentmugendi17@gmail.com)

---

## **⚠️ 免责声明**

本项目仅供教育和个人使用。用户有责任确保其使用符合当地法律法规。流媒体 URL 按原样提供，可能会随时间变化或变得不可用。

---

<p align="center">为全球韩国电视粉丝用 ❤️ 制作</p>
