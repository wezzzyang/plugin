echo  off
set "message=BBQ上传正式热更新成功：热更版本 %JENKINS_GAME_HOTUPDATE_VERSION%"
if defined BUILD_TIPS (
    set "message=!message!\n「%BUILD_TIPS%」"
)
set "postMsg=<at user_id=\""ou_79ddf13100e6baa150c6a345f9a54218\"">王家兴. </at> %message%"
set IS_PUSH_MSG=true
if "%IS_PUSH_MSG%" == "true" (
  curl -X POST -H "Content-Type: application/json" -d "{\"msg_type\":\"text\",\"content\":{\"text\":""%message%""}}" "https://open.feishu.cn/open-apis/bot/v2/hook/5d5b5cf9-397b-4327-beb7-075e3a23c265"
)
echo on
