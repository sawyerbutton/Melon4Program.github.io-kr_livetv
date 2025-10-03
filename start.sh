#!/bin/bash

###############################################################################
# Korean Live TV Player - Startup Script (Linux/Mac)
#
# This script starts a local HTTP server and opens the player in your browser
# 启动脚本 - 启动本地 HTTP 服务器并在浏览器中打开播放器
###############################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PORT=8000
FILE="player.html"

echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         Korean Live TV Player - Starting Server...          ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if the HTML file exists
if [ ! -f "$FILE" ]; then
    echo -e "${RED}❌ Error: $FILE not found!${NC}"
    echo -e "${YELLOW}Please make sure you're running this script from the project directory.${NC}"
    exit 1
fi

# Find an available port
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 1
    else
        return 0
    fi
}

while ! check_port $PORT; do
    echo -e "${YELLOW}⚠️  Port $PORT is already in use, trying $(($PORT + 1))...${NC}"
    PORT=$(($PORT + 1))
done

# Start the server based on available tools
start_server() {
    echo -e "${GREEN}✅ Starting server on port $PORT...${NC}"
    echo ""
    echo -e "${BLUE}📡 Server URL: ${GREEN}http://localhost:$PORT/$FILE${NC}"
    echo -e "${BLUE}📡 Network URL: ${GREEN}http://$(hostname -I | awk '{print $1}'):$PORT/$FILE${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
    echo ""

    # Try to open in browser
    sleep 1
    if command -v xdg-open > /dev/null; then
        xdg-open "http://localhost:$PORT/$FILE" 2>/dev/null &
    elif command -v open > /dev/null; then
        open "http://localhost:$PORT/$FILE" 2>/dev/null &
    fi
}

# Check for Python 3
if command -v python3 &> /dev/null; then
    start_server
    python3 -m http.server $PORT
# Check for Python 2
elif command -v python &> /dev/null; then
    start_server
    cd "$(dirname "$0")"
    python -m SimpleHTTPServer $PORT
# Check for PHP
elif command -v php &> /dev/null; then
    start_server
    php -S localhost:$PORT
# Check for Node.js with http-server
elif command -v npx &> /dev/null; then
    echo -e "${YELLOW}Installing http-server temporarily...${NC}"
    start_server
    npx http-server -p $PORT -o /$FILE
else
    echo -e "${RED}❌ Error: No suitable HTTP server found!${NC}"
    echo -e "${YELLOW}Please install one of the following:${NC}"
    echo -e "  • Python 3: ${GREEN}sudo apt install python3${NC} (Linux) or ${GREEN}brew install python3${NC} (Mac)"
    echo -e "  • Python 2: ${GREEN}sudo apt install python${NC}"
    echo -e "  • PHP: ${GREEN}sudo apt install php${NC}"
    echo -e "  • Node.js: ${GREEN}sudo apt install nodejs npm${NC}"
    exit 1
fi
