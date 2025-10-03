#!/usr/bin/env python3
"""
Korean Live TV Player - Startup Script (Cross-platform)

This script starts a local HTTP server and opens the player in your browser
启动脚本 - 启动本地 HTTP 服务器并在浏览器中打开播放器

Usage:
    python start.py [port]

Example:
    python start.py 8080
"""

import sys
import os
import socket
import webbrowser
import time
from pathlib import Path

# Check Python version and import appropriate HTTP server
if sys.version_info[0] >= 3:
    from http.server import HTTPServer, SimpleHTTPRequestHandler
else:
    from BaseHTTPServer import HTTPServer
    from SimpleHTTPServer import SimpleHTTPRequestHandler

# Configuration
DEFAULT_PORT = 8000
FILE = "player.html"

# Colors for terminal output
class Colors:
    BLUE = '\033[0;34m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    RED = '\033[0;31m'
    NC = '\033[0m'  # No Color

def print_colored(text, color=''):
    """Print colored text (works on Unix-like systems)"""
    if os.name == 'nt':  # Windows
        print(text)
    else:
        print(f"{color}{text}{Colors.NC}")

def print_banner():
    """Print startup banner"""
    print()
    print_colored("╔══════════════════════════════════════════════════════════════╗", Colors.BLUE)
    print_colored("║         Korean Live TV Player - Starting Server...          ║", Colors.BLUE)
    print_colored("╚══════════════════════════════════════════════════════════════╝", Colors.BLUE)
    print()

def check_file_exists(filename):
    """Check if the HTML file exists"""
    if not os.path.isfile(filename):
        print_colored(f"❌ Error: {filename} not found!", Colors.RED)
        print_colored("Please make sure you're running this script from the project directory.", Colors.YELLOW)
        sys.exit(1)

def is_port_in_use(port):
    """Check if a port is already in use"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def find_available_port(start_port):
    """Find an available port starting from start_port"""
    port = start_port
    while is_port_in_use(port):
        print_colored(f"⚠️  Port {port} is already in use, trying {port + 1}...", Colors.YELLOW)
        port += 1
    return port

def get_local_ip():
    """Get local IP address"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except:
        return "127.0.0.1"

def open_browser(url, delay=1.5):
    """Open URL in default browser after a delay"""
    time.sleep(delay)
    try:
        webbrowser.open(url)
        print_colored(f"✅ Opening browser at {url}", Colors.GREEN)
    except:
        print_colored(f"⚠️  Could not open browser automatically", Colors.YELLOW)
        print_colored(f"Please open manually: {url}", Colors.YELLOW)

def start_server(port):
    """Start HTTP server on specified port"""
    try:
        # Change to script directory
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)

        # Check if file exists
        check_file_exists(FILE)

        # Find available port
        port = find_available_port(port)

        # Print server information
        local_ip = get_local_ip()
        local_url = f"http://localhost:{port}/{FILE}"
        network_url = f"http://{local_ip}:{port}/{FILE}"

        print_colored(f"✅ Starting server on port {port}...", Colors.GREEN)
        print()
        print_colored(f"📡 Local URL:   {local_url}", Colors.BLUE)
        print_colored(f"📡 Network URL: {network_url}", Colors.BLUE)
        print()
        print_colored("Press Ctrl+C to stop the server", Colors.YELLOW)
        print_colored("════════════════════════════════════════════════════════════", Colors.BLUE)
        print()

        # Open browser in background thread
        import threading
        browser_thread = threading.Thread(target=open_browser, args=(local_url,))
        browser_thread.daemon = True
        browser_thread.start()

        # Start server
        server_address = ('', port)
        httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

        print_colored(f"🚀 Server is running...", Colors.GREEN)
        print()

        httpd.serve_forever()

    except KeyboardInterrupt:
        print()
        print_colored("\n👋 Server stopped by user", Colors.YELLOW)
        sys.exit(0)
    except Exception as e:
        print_colored(f"❌ Error: {str(e)}", Colors.RED)
        sys.exit(1)

def main():
    """Main function"""
    print_banner()

    # Parse port from command line argument
    port = DEFAULT_PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
            if port < 1024 or port > 65535:
                print_colored("⚠️  Port must be between 1024 and 65535, using default 8000", Colors.YELLOW)
                port = DEFAULT_PORT
        except ValueError:
            print_colored("⚠️  Invalid port number, using default 8000", Colors.YELLOW)
            port = DEFAULT_PORT

    # Start server
    start_server(port)

if __name__ == "__main__":
    main()
