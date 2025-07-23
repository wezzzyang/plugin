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

set url=http://10.0.20.103/lsgc_android_test/127_dev_apk/com.lsgc.yf/V1.0.0.0(20250723)/com.lsgc.yf_1.0.0.0_20250723_base_release_log%%28t%%29_build127.apk
echo %url%

curl -o %apkUrl% %url%


adb uninstall com.lsgc.yf
adb install -r %apkUrl%


