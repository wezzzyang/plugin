echo off
@REM 下载地址文件夹
set baseUrl=d:download\Backup_%date:~0,4%%date:~5,2%%date:~8,2%


set file_count=0

for /r "%baseUrl%" %%f in (*) do (
    echo %%f
    set /a file_count += 1
)

set apkUrl=%baseUrl%\justdownload_%RANDOM%%RANDOM%_%file_count%.apk

echo %apkUrl%

mkdir baseUrl


curl -o %apkUrl% http://10.0.20.103/jpcgw_android/33_prod_apk/com.jpcgw.yf/V1.0.0.1(20250609)/com.jpcgw.yf_1.0.0.1_20250609_huawei_release_nolog%%28o%%29_build33.apk


adb uninstall com.jpcgw.yf
adb install -r %apkUrl%


