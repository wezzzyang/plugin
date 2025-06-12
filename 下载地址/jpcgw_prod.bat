echo off
@REM 打包id
set num=20
@REM 包名
set pack=jpcgw
@REM 打包日期
set datee=20250605
@REM 下载地址文件夹
set baseUrl=d:download\Backup_%date:~0,4%%date:~5,2%%date:~8,2%
@REM 下载地址
set apkUrl=%baseUrl%\prod_%pack%_%num%.apk
@REM 是否是线上
set isOnline=true

@REM 是否打印
set noLog=nolog
set isProd=prod
set isTest=_test

@REM 查看文件夹是否存在
if not exist "%baseUrl%"  (
    mkdir "%baseUrl%"
)

@REM 线上设置
if "%isOnline%" == "true" (
    set "noLog=nolog(o)"
    set "isProd=prod_"
    set "isTest="
) else (
    @REM 线下设置
    set "noLog=log(t)"
    set "isProd=dev_"
    set "isTest=_test"
)

@REM set noLog=nolog
@REM set isProd=prod
@REM set isTest=_test

@REM 文件夹不存在则下载
@REM if not exist "%apkUrl%" (
curl -o %apkUrl% "http://10.0.20.103/%pack%_android/%num%_%isProd%apk/com.%pack%.yf/V1.0.0.1(%datee%)/com.%pack%.yf_1.0.0.1_%datee%_base_release_%noLog%_build%num%.apk"
@REM )



@REM 文件夹存在直接卸载 + 安装
adb uninstall com.%pack%.yf
adb install -r %baseUrl%\%isProd%%pack%_%num%.apk
