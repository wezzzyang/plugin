set num=388
set pack=jpcgw
set datee=20250410
set apkUrl=d:download\Backup_20250521\test_%pack%_%num%.apk
set noLog=log

curl -o %apkUrl% http://10.0.20.103/%pack%_android_test/%num%_dev_apk/com.%pack%.yf/V1.0.0.0(%datee%)/com.%pack%.yf_1.0.0.0_%datee%_base_release_%noLog%(t)_build%num%.apk 


adb uninstall com.%pack%.yf
adb install -r D:\download\Backup_20250521\test_%pack%_%num%.apk
