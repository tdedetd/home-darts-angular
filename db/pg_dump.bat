@echo off

set pg-dump-path=%1
set db=%2
set user=%3
set out-dir=%4

set hours=%time:~0,2%
set minutes=%time:~3,2%
set seconds=%time:~6,2%

%pg-dump-path%pg_dump.exe -d %db% -U %user% > "%out-dir%%db%_%date%_%hours%.%minutes%.%seconds%.sql"

pause
