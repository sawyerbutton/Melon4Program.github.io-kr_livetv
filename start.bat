@echo off
REM ##############################################################################
REM Korean Live TV Player - Startup Script (Windows)
REM
REM This script starts a local HTTP server and opens the player in your browser
REM 启动脚本 - 启动本地 HTTP 服务器并在浏览器中打开播放器
REM ##############################################################################

setlocal enabledelayedexpansion

REM Configuration
set PORT=8000
set FILE=player.html

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║         Korean Live TV Player - Starting Server...          ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

REM Check if the HTML file exists
if not exist "%FILE%" (
    echo [ERROR] %FILE% not found!
    echo Please make sure you're running this script from the project directory.
    pause
    exit /b 1
)

REM Find an available port
:check_port
netstat -ano | findstr ":%PORT%" >nul
if %errorlevel% equ 0 (
    echo [WARNING] Port %PORT% is already in use, trying next port...
    set /a PORT+=1
    goto check_port
)

echo [OK] Starting server on port %PORT%...
echo.
echo Server URL: http://localhost:%PORT%/%FILE%
echo.
echo Press Ctrl+C to stop the server
echo ════════════════════════════════════════════════════════════
echo.

REM Open browser after a short delay
timeout /t 2 /nobreak >nul
start http://localhost:%PORT%/%FILE%

REM Try Python 3 first
where python >nul 2>nul
if %errorlevel% equ 0 (
    python --version 2>&1 | findstr "Python 3" >nul
    if %errorlevel% equ 0 (
        echo [INFO] Using Python 3 HTTP Server
        python -m http.server %PORT%
        goto :end
    )
)

REM Try Python 2
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Using Python 2 HTTP Server
    python -m SimpleHTTPServer %PORT%
    goto :end
)

REM Try PHP
where php >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Using PHP Built-in Server
    php -S localhost:%PORT%
    goto :end
)

REM Try Node.js with npx
where npx >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Using Node.js http-server
    npx http-server -p %PORT% -o /%FILE%
    goto :end
)

REM No server found
echo.
echo [ERROR] No suitable HTTP server found!
echo.
echo Please install one of the following:
echo   • Python 3: https://www.python.org/downloads/
echo   • PHP: https://www.php.net/downloads
echo   • Node.js: https://nodejs.org/
echo.
pause
exit /b 1

:end
endlocal
