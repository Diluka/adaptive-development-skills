@echo off
setlocal
set "HOOKS_DIR=%~dp0"
set "HOOKS_READ=%~dp0."
set "SCRIPT=%HOOKS_DIR%task-handoff.ts"

where deno >nul 2>nul
if not errorlevel 1 goto run_deno

where node >nul 2>nul
if not errorlevel 1 goto run_node

>&2 echo task-handoff hook skipped: neither Deno nor Node is available.
exit /b 0

:run_deno
deno run --quiet --no-prompt --no-config --no-lock --no-npm --no-remote --allow-env=PLUGIN_DATA,NODE_V8_COVERAGE --allow-read="%PLUGIN_DATA%" --allow-write="%PLUGIN_DATA%" --allow-run=git "%SCRIPT%"
exit /b %errorlevel%

:run_node
if defined PLUGIN_DATA if not exist "%PLUGIN_DATA%\." mkdir "%PLUGIN_DATA%" >nul 2>nul
if errorlevel 1 (
  >&2 echo task-handoff hook skipped: cannot create PLUGIN_DATA.
  exit /b 0
)
node --experimental-strip-types --permission --allow-fs-read="%HOOKS_READ%" --allow-fs-read="%PLUGIN_DATA%" --allow-fs-write="%PLUGIN_DATA%" --allow-child-process "%SCRIPT%"
exit /b %errorlevel%
