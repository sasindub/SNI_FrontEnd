@echo off
echo ================================================
echo Starting SNI Laptops Frontend
echo ================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 14 or higher
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo ================================================
echo Starting React development server...
echo ================================================
echo Application will open at: http://localhost:3000
echo Admin Portal: http://localhost:3000/admin
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.

call npm start



