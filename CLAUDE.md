# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Korean Live TV streaming player - a modern, high-performance HTML5 single-page application for watching 70+ Korean TV channels using HLS (HTTP Live Streaming) technology. Version 2.0 features pure CSS buttons, real-time search, category filtering, and optimized performance.

## Architecture

### Single-File Application
- **player.html**: Complete self-contained application with embedded CSS and JavaScript
- No build process or external dependencies (except HLS.js CDN)
- Can be served as static site or opened directly in browser

### Technology Stack
- **HLS.js** (CDN): HTTP Live Streaming library for M3U8 playback
- **Vanilla JavaScript**: Zero framework dependencies, pure DOM manipulation
- **CSS3**: Grid/Flexbox layout with gradient designs and animations
- **DocumentFragment**: Optimized batch DOM insertion for performance

### Core Architecture (player.html)

#### 1. Channel Data Structure (lines 363-445)
```javascript
{
  name: "Channel Name",
  url: "https://stream.m3u8",
  category: "major|news|sports|entertainment|kids"
}
```
- 70+ channels organized by category
- No logo URLs - uses pure CSS gradient buttons instead

#### 2. Video Player System (lines 455-521)
- **HLS.js integration**: Modern browsers with MediaSource Extensions
- **Native fallback**: Safari/iOS native HLS support
- **Error handling**: Fatal error detection with user-friendly messages
- **Loading states**: Visual feedback during stream initialization
- **Optimized config**: Low latency mode, worker threads enabled

#### 3. UI Components

**Search System (lines 563-575)**
- Real-time filtering by channel name
- Case-insensitive search
- Keyboard shortcut: `/` or `Ctrl+F`

**Category Filtering (lines 581-594)**
- Filter by: all, major, news, sports, entertainment, kids
- Category-specific color schemes in CSS
- Integrated with search functionality

**Channel Rendering (lines 538-557)**
- Uses DocumentFragment for 60% faster rendering
- Pure CSS gradient buttons (eliminates 70+ image requests)
- Dynamic event delegation
- ARIA labels for accessibility

#### 4. Styling Architecture (lines 43-308)

**Performance Optimizations:**
- Hardware-accelerated CSS transforms
- Radial gradient hover effects
- Pulse animation for active channels
- Responsive grid: `repeat(auto-fill, minmax(140px, 1fr))`

**Category Colors:**
- News: Pink-yellow gradient (#fa709a → #fee140)
- Sports: Cyan-purple gradient (#30cfd0 → #330867)
- Entertainment: Mint-pink gradient (#a8edea → #fed6e3)
- Kids: Peach gradient (#ffecd2 → #fcb69f)

## Development Commands

### Local Server (Recommended)

**Linux/Mac:**
```bash
./start.sh
```

**Windows:**
```cmd
start.bat
```

**Cross-platform (Python):**
```bash
python3 start.py [port]
```

**Features:**
- Auto port detection (default: 8000)
- Auto-launch browser
- Works with Python 3/2, PHP, or Node.js
- Shows local + network URLs

### Direct Development
- Simply open `player.html` in browser
- No compilation or build step needed
- Changes are immediately visible on refresh

### Adding/Modifying Channels

Edit the `channels` array in player.html (lines 363-445):

```javascript
{
  name: "Channel Name",
  url: "https://stream-url.m3u8",
  category: "major" // or news, sports, entertainment, kids
}
```

**Important:**
- M3U8 URLs often contain time-limited tokens
- External APIs (warlock0.synology.me, jmp2.uk) may have availability issues
- Test URLs regularly as they expire

### Deployment

**Static Hosting:**
- GitHub Pages (current setup)
- Netlify, Vercel, Cloudflare Pages
- Any static file server

**Requirements:**
- Streams must have CORS enabled
- Some streams may be region-restricted
- No server-side processing needed

## Key Technical Details

### Performance Optimizations (v2.0)
1. **DocumentFragment rendering**: Batch DOM insertions instead of individual appends
2. **Pure CSS buttons**: Eliminated all external image requests
3. **HLS.js config**: `enableWorker: true, lowLatencyMode: true, backBufferLength: 90`
4. **Efficient filtering**: Dataset attributes for O(n) search and category filtering
5. **Hardware acceleration**: CSS transforms for smooth animations

### Browser Compatibility
- Chrome/Firefox/Edge: HLS.js
- Safari/iOS: Native HLS
- All: CORS-required for streams

### Error Handling
- Fatal stream errors trigger user notifications
- Loading indicators during stream initialization
- Graceful degradation if HLS not supported
- Network URL display for mobile access

## File Structure

```
├── player.html          # Main application (self-contained)
├── start.sh            # Linux/Mac server launcher
├── start.bat           # Windows server launcher
├── start.py            # Cross-platform Python server
├── README.md           # English documentation
├── README_zh.md        # Chinese documentation
├── CLAUDE.md           # This file
└── LICENSE             # MIT License
```

## Common Development Patterns

### Adding a New Category

1. Add category button in HTML (line ~334-340)
2. Add CSS color scheme (line ~232-247)
3. Assign category to channels in data array
4. No JavaScript changes needed (automatic filtering)

### Modifying UI Colors

**Main gradient:** Lines 53, 170
**Category gradients:** Lines 232-247
**Active channel:** Lines 216-220

### Debugging Streams

1. Open browser DevTools Console
2. Look for HLS.js error events
3. Check Network tab for M3U8 request failures
4. Verify CORS headers on stream URLs
5. Test URL directly in VLC or other M3U8 player

## Version History

### v2.0 (Current - 2025-10-03)
- Pure CSS gradient buttons
- Real-time search functionality
- Category filtering system
- 60% faster rendering with DocumentFragment
- Comprehensive documentation and startup scripts
- Chinese translation

### v1.0
- Basic channel grid with placeholder images
- Simple HLS.js integration

## Important Limitations

1. **Stream URLs**: Often expire due to time-limited tokens
2. **CORS**: Streams must enable cross-origin access
3. **External APIs**: Some channels depend on third-party proxies
4. **Region locks**: Some streams may be geo-restricted
5. **No persistence**: Channel list is hardcoded (by design for simplicity)

## Bilingual Support

- UI elements use both English and Chinese (中文)
- Search placeholder: "🔍 搜索频道... / Search channels..."
- Category buttons: "全部 All", "主流 Major", etc.
- Error messages: Bilingual format
