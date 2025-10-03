# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Korean live TV streaming player built as a simple, single-page HTML5 application. It provides a web-based interface for watching various Korean TV channels using HLS (HTTP Live Streaming) technology.

## Architecture

### Single-File Application
- **player.html**: The entire application is contained in a single HTML file with embedded CSS and JavaScript
- No build process or dependencies beyond the HLS.js CDN library
- Static site that can be served directly from any web server or opened locally

### Technology Stack
- **HLS.js** (via CDN): Handles M3U8 stream playback in browsers that don't natively support HLS
- **Vanilla JavaScript**: No frameworks, pure DOM manipulation
- **CSS Grid/Flexbox**: Responsive logo grid layout

### Core Components

1. **Channel Data Structure** (player.html:29-100)
   - Each channel object contains: `name`, `url` (M3U8 stream), and `logo` (placeholder image)
   - Channels are stored in a single array and rendered dynamically

2. **Video Player** (player.html:102-120)
   - Uses HLS.js for browsers with MediaSource Extensions support
   - Falls back to native HLS support for Safari/iOS
   - Handles stream loading, destruction, and playback

3. **UI Components**
   - Video container: Full-width player with 70vh height
   - Logo grid: Clickable channel logos with hover effects and active state indication

## Development

### Making Changes to Channels

To add/modify/remove channels, edit the `channels` array in player.html:
```javascript
{ name: "Channel Name", url: "https://stream-url.m3u8", logo: "https://logo-url.png" }
```

### Testing
- Simply open player.html in a web browser
- No build or compilation step required
- Test stream URLs to ensure they're active (many M3U8 URLs expire or change)

### Deployment
- This is a static site - can be deployed to GitHub Pages, Netlify, Vercel, or any static hosting
- Already configured for GitHub Pages (repository name suggests github.io hosting)

## Important Notes

### Stream URL Limitations
- M3U8 stream URLs often contain time-limited tokens or session IDs
- URLs may expire and need periodic updates
- Some streams use external APIs (warlock0.synology.me, jmp2.uk) which may have availability issues

### Browser Compatibility
- Modern browsers: Uses HLS.js for playback
- Safari/iOS: Uses native HLS support
- Requires CORS-enabled stream sources

## Channel Categories

Channels are organized by type:
- **Major Broadcasters**: KBS, MBC, SBS, EBS
- **Cable Networks**: tvN, JTBC, OCN
- **Sports**: Multiple sports channels (SPOTV, Sky Sports, Golf channels)
- **News**: YTN, 뉴스Y, CNN, BBC
- **Entertainment**: Various drama, variety, and movie channels
- **Kids/Education**: Educational and children's programming
- **Shopping**: Home shopping channels
