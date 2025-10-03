# Korea TV Live

> **Your ultimate resource for watching Korea Live TV online with a modern, high-performance HTML5 player.**

---

## **✨ Features**

- 🎬 **70+ Live Channels** - Access to major Korean broadcasters and cable networks
- 🎨 **Modern UI Design** - Beautiful gradient buttons with pure CSS (no external image dependencies)
- 🔍 **Smart Search** - Instantly filter channels by name
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🏷️ **Category Filters** - Browse channels by type (Major, News, Sports, Entertainment, Kids)
- ⚡ **Optimized Performance** - Fast rendering with DocumentFragment and efficient DOM manipulation
- 🎯 **HLS Streaming** - Powered by HLS.js with native fallback for Safari/iOS
- 🔄 **Error Handling** - Graceful error messages and loading indicators
- ⌨️ **Keyboard Shortcuts** - Press `/` or `Ctrl+F` to quickly access search
- 🌐 **Bilingual Interface** - English and Chinese (中文) support

---

## **📺 Supported Channels**

This repository includes streaming access to:

### Major Broadcasters
1. **KBS** - KBS1, KBS2, KBSNSPORTS, KBS Drama, KBS kids
2. **MBC** - MBC, MBC SPORTS, MBC every1, MBC On
3. **SBS** - SBS, SBS SPORTS, SBS GOLF, SBS Plus
4. **EBS** - EBS1, EBS2

### Cable Networks
5. **tvN** - tvN, tvN Sports, tvN Show, tvN STORY, tvN DRAMA
6. **JTBC** - JTBC, JTBC GOLF, JTBC GOLF & SPORTS, JTBC3
7. **OCN** - OCN, OCN movies, OCN movies2
8. **ENA, Channel E**

### News Channels
9. **YTN, newsY**
10. **International** - CNN, BBC, NHK World
11. **Korean News** - TV조선, 채널A, MBN, 한국경제

### Sports Channels
12. **SKY SPORTS** - SKY SPORTS, SKY SPORTS F1
13. **SPOTV** - SPOTV, SPOTV2, SPOTV Prime, SPOTV On
14. **Golf** - PGA Tour, 스크린골프 (Screen Golf)
15. **Specialized** - BilliardsTV, IB SPORTS, OGN starleague

### Entertainment & Music
16. **MNet**
17. **코메디TV** (Comedy TV)
18. **CJ ENM Movie, PLAYY**

### Kids & Educational
19. **Cartoons** - Tooniverse, Cartoon Network, 어린이TV, ANIPLUS
20. **Educational** - 중화TV, 바둑TV, 브레인TV, JEI 재능TV, 육아방송, 뽀요 TV
21. **Discovery** - 네셔날지오그래피, 디스커버리, Nat Geo Wild, History
22. **FTV, iNET**

### Shopping
23. **현대홈쇼핑** (Hyundai Home Shopping)

---

## **🚀 Quick Start**

### Method 1: Direct Open (Simplest)
1. **Clone or download** this repository
2. **Open** `player.html` in your web browser
3. **Click** any channel button to start streaming
4. **Search** for channels using the search bar
5. **Filter** by category for easier navigation

No installation or build process required!

### Method 2: Local Server (Recommended)
For better performance and to avoid potential CORS issues, use the included startup scripts:

#### 🐧 Linux / 🍎 Mac
```bash
./start.sh
```
or
```bash
python3 start.py
```

#### 🪟 Windows
Double-click `start.bat` or run in Command Prompt:
```cmd
start.bat
```
or
```cmd
python start.py
```

#### 🎯 Features of Startup Scripts
- ✅ Automatically finds an available port (default: 8000)
- ✅ Opens your default browser automatically (with clean output on WSL/Linux)
- ✅ Works with Python 3, Python 2, PHP, or Node.js
- ✅ Shows both local and network URLs for easy access
- ✅ Cross-platform support (Windows, Linux, Mac)

#### 📝 Custom Port
To use a custom port:
```bash
python start.py 8080
```

---

## **💻 Technology Stack**

- **HTML5** - Semantic markup with video element
- **CSS3** - Modern styling with Grid, Flexbox, and gradients
- **Vanilla JavaScript** - Zero framework dependencies
- **HLS.js** - HTTP Live Streaming library from CDN
- **Pure CSS Buttons** - No external image dependencies for faster loading

---

## **🎯 Performance Optimizations**

The player has been optimized for maximum performance:

- ✅ **DocumentFragment** - Batch DOM insertions for faster rendering
- ✅ **CSS-only buttons** - Eliminated external image requests
- ✅ **Efficient filtering** - Fast search and category filtering
- ✅ **Lazy evaluation** - Optimized event listeners
- ✅ **Hardware acceleration** - CSS transforms for smooth animations
- ✅ **HLS.js configuration** - Optimized buffering and low latency mode

---

## **📱 Browser Support**

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Uses HLS.js |
| Firefox | ✅ Full | Uses HLS.js |
| Edge | ✅ Full | Uses HLS.js |
| Safari | ✅ Full | Native HLS support |
| iOS Safari | ✅ Full | Native HLS support |
| Android Chrome | ✅ Full | Uses HLS.js |

---

## **⌨️ Keyboard Shortcuts**

- **`/`** or **`Ctrl + F`** - Focus search bar
- **`Esc`** - Clear search (when search is focused)

---

## **🔧 Usage Notes**

### Stream URL Limitations
- M3U8 stream URLs may contain time-limited tokens
- Some URLs may expire and require periodic updates
- External API dependencies (warlock0.synology.me, jmp2.uk, etc.) may have availability issues

### CORS Requirements
- Streams must have CORS enabled for cross-origin access
- Some streams may be region-restricted

---

## **📝 Version History**

### Version 2.0.1 (Latest - 2025-10-03)
- 🐛 Fixed WSL/Linux browser launch errors in startup script
- 🎨 Added favicon to eliminate browser 404 errors
- 🧹 Cleaner server logs without unnecessary warnings

### Version 2.0 (2025-10-03)
- ✨ Modern UI with gradient design
- 🔍 Added search functionality
- 🏷️ Category filtering system
- ⚡ Performance optimizations
- 🎨 Pure CSS buttons (no external images)
- 📱 Improved mobile responsiveness
- 🔄 Better error handling
- 💬 Comprehensive code comments

### Version 1.0
- Basic channel player with external placeholder images
- Simple channel grid layout

---

## **🤝 Contributing**

Contributions are welcome! If you'd like to:
- Add new channels
- Improve the UI/UX
- Fix bugs or optimize performance
- Add new features

Please feel free to submit a pull request or open an issue.

---

## **📄 License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

---

## **👤 Contact Information**

Created with ❤️ by **[Vincent Mugendi](https://www.linkedin.com/in/vincentmugendi/)**

- **Portfolio**: [vincentmugendi.com](https://vincentmugendi.com) *(coming soon)*
- **GitHub**: [github.com/vincentmugendi](https://github.com/vincent-mugendi)
- **Email**: [vincentmugendi17@gmail.com](mailto:vincentmugendi17@gmail.com)

---

## **⚠️ Disclaimer**

This project is for educational and personal use only. Users are responsible for ensuring their use complies with local laws and regulations. The stream URLs are provided as-is and may change or become unavailable over time.

---

<p align="center">Made with ❤️ for Korean TV fans worldwide</p>
