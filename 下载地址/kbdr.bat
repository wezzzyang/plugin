set num=2
set pack=kbdr
set datee=20250527
set apkUrl=d:download\Backup_20250521\prod_%pack%_%num%.apk

curl -o %apkUrl% http://10.0.20.103/%pack%_android/%num%_prod_apk/com.%pack%.yf/V1.0.0.0(%datee%)/com.%pack%.yf_1.0.0.0_%datee%_base_release_nolog(o)_build%num%.apk 


adb uninstall com.%pack%.yf
adb install -r D:\download\Backup_20250521\prod_%pack%_%num%.apk

