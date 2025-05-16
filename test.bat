@echo off
setlocal enabledelayedexpansion
set "target_path=http://10.0.20.103/"

if "%JENKINS_GAME_IS_PROD%" == "true" (
    if "%JENKINS_GAME_PACKAGE_OUTPUT%" == "true" (
        set "target_path=%target_path%%proj_name%_android/%BUILD_NUMBER%_prod_apk"
    ) else (
        set "target_path=%target_path%%proj_name%_android/%BUILD_NUMBER%_prod"
    )
    echo prod
) else (
    if "%JENKINS_GAME_PACKAGE_OUTPUT%" == "true" (
        set "target_path=%target_path%%proj_name%_android_test/%BUILD_NUMBER%_dev_apk"
    ) else (
        set "target_path=%target_path%%proj_name%_android_test/%BUILD_NUMBER%_dev"
    )
    echo test
)

set "target_path=%target_path%/%game_pkg_name%/V%versionName%(%version_code%)/"

:: 将包名和 target_path 结合，添加描述
set "message=「烧烤工厂」正式包：\napk channel: %channel_name%\nDownload Path: %target_path%"
if "%JENKINS_GAME_HOTUPDATE_UPLOAD%" == "true" (
    if "%JENKINS_GAME_PACKAGE_OUTPUT%" == "false" (
        set "message=发布正式热更新成功：热更版本 %JENKINS_GAME_HOTUPDATE_VERSION%"
    )
)

if defined BUILD_TIPS (
    set "message=!message!\n「%BUILD_TIPS%」"
)

echo message
