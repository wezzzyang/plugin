set num=235
set pack=jpcgw
set datee=20250519

curl -o d:download\Backup_20250521\%pack%_%num%.apk http://10.0.20.103/%pack%_android_test/%num%_dev_apk/com.%pack%.yf/V1.0.0.0(%datee%)/com.%pack%.yf_1.0.0.0_%datee%_base_release_log(t)_build%num%.apk

adb uninstall com.%pack%.yf
adb install -r D:\download\Backup_20250521\%pack%_%num%.apk
