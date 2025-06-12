set num=2
set pack=jpcgw
set datee=20250527
set apkUrl=d:download\Backup_20250521\prod_%pack%_%num%.apk
set noLog=nolog

curl -o %apkUrl% http://10.0.20.103/%pack%_android/%num%_prod_apk/com.%pack%.yf/V1.0.0.0%%28%datee%%%29/com.%pack%.yf_1.0.0.0_%datee%_base_release_%noLog%%%28o%%29_build%num%.apk 


adb uninstall com.%pack%.yf
adb install -r D:\download\Backup_20250521\prod_%pack%_%num%.apk
