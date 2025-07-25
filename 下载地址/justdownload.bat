echo off
@REM 下载地址文件夹
set baseUrl=d:download\Backup_%date:~0,4%%date:~5,2%%date:~8,2%
echo %baseUrl%
mkdir baseUrl

@REM 查看文件夹是否存在
if not exist "%baseUrl%"  (
    mkdir "%baseUrl%"
)

set file_count=0

for /r "%baseUrl%" %%f in (*) do (
    echo %%f
    set /a file_count += 1
)

set apkUrl=%baseUrl%\justdownload_%RANDOM%%RANDOM%_%file_count%.apk

echo %apkUrl%

set url=https://apps.bytesfield.com/download/basic/cur/2bbecde26fd47d456379012de126a6c55165f1f7
echo %url%

curl -o %apkUrl% %url%


adb uninstall com.lsgc.yf
adb install -r %apkUrl%


