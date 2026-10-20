@echo off
chcp 65001 > nul
title JP MOD PORTAL 管理スタジオ
cd /d "%~dp0"

echo ========================================================
echo   🛠️ JP MOD PORTAL 管理スタジオ を起動しています...
echo ========================================================
echo.
echo ブラウザが自動的に開きます。
echo もし開かない場合は、ブラウザで以下のURLを開いてください：
echo http://localhost:3333/admin/
echo.
echo ※この黒い画面を閉じると管理スタジオが停止します。
echo ========================================================
echo.

node admin/server.mjs

pause
