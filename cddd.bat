@echo off
set backup_dir=D:\download\Backup_%date:~0,4%%date:~5,2%%date:~8,2%
if not exist "%backup_dir%" mkdir "%backup_dir%"
