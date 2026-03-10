@echo off
title Kho San Xuat Trai Giam Dong Son
color 0A
echo.
echo ==========================================================
echo   KHO SAN XUAT TRAI GIAM DONG SON - Dashboard Quan Ly
echo ==========================================================
echo.

set "FOLDER=%~dp0"
set "PORT=8000"

set "CSC=C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe"
if not exist "%CSC%" set "CSC=C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe"

REM === Bien dich lai neu co file .cs moi ===
if exist "%FOLDER%server.cs" (
    echo [INFO] Dang kiem tra va cap nhat may chu...
    "%CSC%" /out:"%FOLDER%server.exe" "%FOLDER%server.cs" >nul 2>&1
    if %errorlevel% == 0 (
        echo [OK] Da cap nhat may chu thanh cong.
    ) else (
        echo [!] Khong the bien dich server.cs, se dung ban cu hoac fallback.
    )
)

REM === Uu tien server.exe neu ton tai ===
if exist "%FOLDER%server.exe" (
    echo [OK] Dang khoi dong may chu Dashboard...
    echo.
    echo >>> Truy cap dashboard tai: http://localhost:%PORT%
    echo >>> De xem tren dien thoai: http://192.168.1.9:%PORT%
    echo.
    start "" "http://localhost:%PORT%"
    "%FOLDER%server.exe" %PORT% "%FOLDER%"
    goto :end
)

REM Thu Python
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Tim thay Python - Dang khoi dong may chu...
    echo >>> http://localhost:%PORT%
    start "" "http://localhost:%PORT%"
    python -m http.server %PORT% --directory "%FOLDER%"
    goto :end
)

REM Thu Python3
python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Tim thay Python3
    start "" "http://localhost:%PORT%"
    python3 -m http.server %PORT% --directory "%FOLDER%"
    goto :end
)

REM Thu Node/npx 
where npx >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Tim thay Node.js
    start "" "http://localhost:%PORT%"
    npx -y serve "%FOLDER%" -p %PORT% --no-clipboard
    goto :end
)

REM Fallback: PowerShell Server
echo [INFO] Dang khoi dong may chu PowerShell...
echo >>> http://localhost:%PORT%
echo >>> Mang noi bo: http://192.168.1.9:%PORT%
start "" "http://localhost:%PORT%"
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"$port=%PORT%;$folder='%FOLDER%';$l=New-Object Net.HttpListener;$l.Prefixes.Add(\"http://localhost:$port/\");$l.Start();while($l.IsListening){try{$c=$l.GetContext();$rq=$c.Request;$rp=$c.Response;$p=Join-Path $folder ($rq.Url.LocalPath -replace '/','\\').TrimStart('\\');if(!$p -or $p -eq $folder){$p=Join-Path $folder 'index.html'};if(Test-Path $p -PathType Leaf){$b=[IO.File]::ReadAllBytes($p);$e=[IO.Path]::GetExtension($p);$m=@{'.html'='text/html;charset=utf-8';'.css'='text/css';'.js'='application/javascript';'.png'='image/png'}.($e);if(!$m){$m='text/plain'};$rp.ContentType=$m;$rp.ContentLength64=$b.Length;$rp.OutputStream.Write($b,0,$b.Length)}else{$rp.StatusCode=404};$rp.Close()}catch{break}};$l.Stop()"

:end
pause
