@echo off
setlocal
set "HOOKS_DIR=%~dp0"
set "HOOKS_READ=%~dp0."
set "SCRIPT=%HOOKS_DIR%task-handoff.ts"
if defined TEMP (
  set "TASK_HANDOFF_DATA=%TEMP%\adaptive-development-skills-task-handoff"
) else if defined TMP (
  set "TASK_HANDOFF_DATA=%TMP%\adaptive-development-skills-task-handoff"
) else (
  >&2 echo task-handoff hook skipped: cannot resolve the system temporary directory.
  exit /b 0
)

where deno >nul 2>nul
if not errorlevel 1 goto run_deno

where node >nul 2>nul
if not errorlevel 1 goto run_node

>&2 echo task-handoff hook skipped: neither Deno nor Node is available.
exit /b 0

:run_deno
deno run --quiet --no-prompt --no-config --no-lock --no-npm --no-remote --allow-env=TASK_HANDOFF_DATA,NODE_V8_COVERAGE --allow-read="%TASK_HANDOFF_DATA%" --allow-write="%TASK_HANDOFF_DATA%" --allow-run=git "%SCRIPT%"
exit /b %errorlevel%

:run_node
if not exist "%TASK_HANDOFF_DATA%\." mkdir "%TASK_HANDOFF_DATA%" >nul 2>nul
if errorlevel 1 (
  >&2 echo task-handoff hook skipped: cannot create TASK_HANDOFF_DATA.
  exit /b 0
)
node --experimental-strip-types --permission --allow-fs-read="%HOOKS_READ%" --allow-fs-read="%TASK_HANDOFF_DATA%" --allow-fs-write="%TASK_HANDOFF_DATA%" --allow-child-process "%SCRIPT%"
exit /b %errorlevel%
