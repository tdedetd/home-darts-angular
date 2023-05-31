@echo off

set pg-restore-path=%1
set db=%2
set user=%3
set file-path=%4

%pg-restore-path%psql.exe -U %user% %db% < %file-path%

pause
