const fs = require("fs");
const path = require("path");
/** 包名 */
const APP_NAME = "fdly";
/** 包中文名 */
const APP_CN_NAME = "翻斗乐园";
/** 包路径 */
const PACKAGE_NAME = "com.fdly.yf";
/** 项目组简写 */
const GROUP_NAME = "yf";

/** 配置 1 2 3 4 5 */
const PATH_APP_BUILD_GRADLE = "app/build.gradle";

/** 配置 包名 */
const PATH_BUILD_GRADLE = "build.gradle";

/** AppImpJava 配置 */
const NEW_PATH_APP_IMP_JAVA = {
    /** 微信ID 产品提供 */
    appId: "wx2e7e8d4c6d4c6d4c",
    /** 主体链接 后端提供 */
    baseUrl: "monthrev.com",
    /** 火山配置 https://huixuanjiasu.feishu.cn/sheets/shtcntuDkAwEhqDaQ5DQ89H1OKf 中查找  */
    /** 火山安全SDKid */
    HuoShanSafeSDK: "779495",
    /** 火山License */
    HuoShanSDKLicenseStr:
        "fkZjn26O1rD9doNAzIU6GkzSIj0R5yu916ZAuRhd7QW8dj9m8hzCk37ceJmZjpexvssrVf2/1fE+JIGdC2uh41+Cwb62z6hOeFuGAznmkYl+oszPeDAfmidj8R+5DvrweshcoiYiPdKWkC9I75xyJMrNkPSMjatc22SyIz1M1uU7zYh7V/pqWLwLEQkRCPnp/NHVpQFzvrJVzrNOr9Rr2uHlE6D0BDldQ+EfkfNeiZPNpegraWaRkjBj5as4I+tn2MSyogNoo0mcUuuSRCDKx9b++J2lqlu8Ul0PdDREOHIC45jb",

    /** 广告配置 http://wiki.huixuanjiasu.com/pages/viewpage.action?pageId=92588200 中查找 */
    /** Banner  */
    BannerSlotId: "10208100",
    /** 总激励视频  */
    AnswerSlotId: "10202100",
    /** 激励视频_强弹  */
    ForceAnswerSlotId: "10202102",
    /** 结算页图文  */
    ImgSlotId: "10204000",
    /** 总激励视频  */
    RewardSlotId: "10202100",
    /** 开屏  */
    SplashSlotId: "10203100",
    /** 全屏视频_强弹  */
    FullScreenSlotId: "10202102",
    /** 新插屏  */
    InsertSlotId: "10206100",
    /** 热启动开屏  */
    HotSplashSlotId: "10203101",
};

/** 配置1 */
function CreateSetting1() {
    const baseStr = ` else if ('${PACKAGE_NAME}'.equals(rootProject.ext.appId)) {
            manifestPlaceholders.put('APPLOG_SCHEME', '${PACKAGE_NAME}_uroi_ad_sdk_scheme'.toLowerCase())
            resValue 'string', 'app_name', '${APP_CN_NAME}'
            versionName '1.0.0.0'
            archivesBaseName = "game-\${versionName}_\${versionCode}"
        }`;

    const replaceStr = `
        /**
         * 增加配置定位 1`;

    let app_build_gradle = fs.readFileSync(PATH_APP_BUILD_GRADLE, "utf-8");

    app_build_gradle = app_build_gradle.replace(replaceStr, baseStr + replaceStr);

    fs.writeFileSync(PATH_APP_BUILD_GRADLE, app_build_gradle);
}

/** 配置2 */
function CreateSetting2() {
    const baseStr = ` else if ('${PACKAGE_NAME}'.equals(rootProject.ext.appId)) { //${APP_CN_NAME}
            res.srcDirs += ['../res-${APP_NAME}']
            assets.srcDirs += ['../src/assets-${APP_NAME}']
        }`;

    const replaceStr = `
        /**
         * 增加配置定位 2`;

    let app_build_gradle = fs.readFileSync(PATH_APP_BUILD_GRADLE, "utf-8");

    app_build_gradle = app_build_gradle.replace(replaceStr, baseStr + replaceStr);

    fs.writeFileSync(PATH_APP_BUILD_GRADLE, app_build_gradle);
}

/** 配置3 */
function CreateSetting3() {
    const baseStr = ` else if ('${PACKAGE_NAME}'.equals(rootProject.ext.appId)) { //${APP_CN_NAME}
                from "\${configDir}/assets-${APP_NAME}/ad_config.json"
                from "\${configDir}/assets-${APP_NAME}/ysdkconf.ini"
                from "\${configDir}/assets-${APP_NAME}/${PACKAGE_NAME}.cert.pem"
            }`;

    const replaceStr = `
            /**
             * 增加配置定位 3`;

    let app_build_gradle = fs.readFileSync(PATH_APP_BUILD_GRADLE, "utf-8");

    app_build_gradle = app_build_gradle.replace(replaceStr, baseStr + replaceStr);

    fs.writeFileSync(PATH_APP_BUILD_GRADLE, app_build_gradle);
}

/** 配置4 */
function CreateSetting4() {
    const baseStr = `  else if (appId.equals("${PACKAGE_NAME}")) { //${APP_CN_NAME}
        return 'proguardfile/proguard-rules-${APP_NAME}.pro'
    }`;

    const replaceStr = `
    /**
     * 增加配置定位 4`;

    let app_build_gradle = fs.readFileSync(PATH_APP_BUILD_GRADLE, "utf-8");

    app_build_gradle = app_build_gradle.replace(replaceStr, baseStr + replaceStr);

    fs.writeFileSync(PATH_APP_BUILD_GRADLE, app_build_gradle);
}

function GetRandomNum(baseNum, floatNum) {
    return Math.floor(baseNum + Math.random() * floatNum);
}

/** 配置5 */
function CreateSetting5() {
    const baseStr = ` else if (appId.equals("${PACKAGE_NAME}")) { //${APP_CN_NAME}
        def config = {
            packageBase = 'org.cocos2dx.${APP_NAME}'
            packageCount = ${GetRandomNum(200, 30)}
            activityCountPerPackage = ${GetRandomNum(20, 10)}
            excludeActivityJavaFile = false
            otherCountPerPackage = ${GetRandomNum(80, 10)}
            methodCountPerClass = ${GetRandomNum(50, 20)}
            resPrefix = '${APP_NAME}_'
            drawableCount = ${GetRandomNum(20, 20)}
            stringCount = ${GetRandomNum(300, 50)}
        }
        variantConfig {
            oppoDebug config
            oppoRelease config
        }
    }`;

    const replaceStr = `
    /**
     * 增加配置定位 5`;

    let app_build_gradle = fs.readFileSync(PATH_APP_BUILD_GRADLE, "utf-8");

    app_build_gradle = app_build_gradle.replace(replaceStr, baseStr + replaceStr);

    fs.writeFileSync(PATH_APP_BUILD_GRADLE, app_build_gradle);
}

/** 配置包名 */
function CreatePackageName() {
    const baseStr = `
    package_name_${APP_NAME} = "${PACKAGE_NAME}"// ${APP_CN_NAME}`;

    const replaceStr = `
    /**
     * 增加配置定位 1`;

    let app_build_gradle = fs.readFileSync(PATH_BUILD_GRADLE, "utf-8");

    app_build_gradle = app_build_gradle.replace(replaceStr, baseStr + replaceStr);

    fs.writeFileSync(PATH_BUILD_GRADLE, app_build_gradle);
}
/** 复制粘贴文件夹 */
function copyFolder(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);

    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (fs.lstatSync(srcPath).isDirectory()) {
            copyFolder(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

/** 创建app/src/assets-${APP_NAME} */
function CreateAssets() {
    copyFolder(path.join(process.cwd(), `app/src/assets-lsgc`), path.join(process.cwd(), `app/src/assets-${APP_NAME}`));
}
/** res-${APP_NAME} */
function CreateRes() {
    copyFolder(path.join(process.cwd(), `res-lsgc`), path.join(process.cwd(), `res-${APP_NAME}`));
}

/** 创建 app/src/com/${APP_NAME}/wxapi/WXEntryActivity.java */
function CreateWxApi() {
    if (!fs.existsSync(path.join(process.cwd(), `app/src/com/${APP_NAME}`)))
        fs.mkdirSync(path.join(process.cwd(), `app/src/com/${APP_NAME}`));
    if (!fs.existsSync(path.join(process.cwd(), `app/src/com/${APP_NAME}/${GROUP_NAME}`)))
        fs.mkdirSync(path.join(process.cwd(), `app/src/com/${APP_NAME}/${GROUP_NAME}`));

    const file_path = path.join(process.cwd(), `app/src/com/${APP_NAME}/${GROUP_NAME}/wxapi`);
    copyFolder(path.join(process.cwd(), `app/src/com/lsgc/yf/wxapi`), file_path);

    let wx_entry_activity = fs.readFileSync(path.join(file_path, "WXEntryActivity.java"), "utf-8");

    wx_entry_activity = wx_entry_activity.replace(/com.lsgc.yf/gim, PACKAGE_NAME);

    fs.writeFileSync(path.join(file_path, "WXEntryActivity.java"), wx_entry_activity);
}

/* AppConfigManager.java 修改 */
function ModifyAppConfigManager() {
    const baseStr = `
    public static final String package_name_${APP_NAME} = "${PACKAGE_NAME}";// ${APP_CN_NAME}`;

    const replaceStr = `
    /**
     * 增加配置定位 1`;

    let app_config_manager = fs.readFileSync(
        path.join(process.cwd(), `app/src/org/cocos2dx/javascript/box/appconfig/AppConfigManager.java`),
        "utf-8"
    );

    app_config_manager = app_config_manager.replace(replaceStr, baseStr + replaceStr);

    fs.writeFileSync(
        path.join(process.cwd(), `app/src/org/cocos2dx/javascript/box/appconfig/AppConfigManager.java`),
        app_config_manager
    );
}
function ModifyAppConfigManager2() {
    const baseStr = `
        // ${APP_CN_NAME}
        addConfig(package_name_${APP_NAME}, new ${GetFirstLetterUpperCase(APP_NAME)}AppImp());`;

    const replaceStr = `
        /**
         * 增加配置定位 2`;

    let app_config_manager = fs.readFileSync(
        path.join(process.cwd(), `app/src/org/cocos2dx/javascript/box/appconfig/AppConfigManager.java`),
        "utf-8"
    );

    app_config_manager = app_config_manager.replace(replaceStr, baseStr + replaceStr);

    fs.writeFileSync(
        path.join(process.cwd(), `app/src/org/cocos2dx/javascript/box/appconfig/AppConfigManager.java`),
        app_config_manager
    );
}
ModifyAppConfigManager2();
/** 获取首字母大写 */
function GetFirstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const LSGC_PATH_APP_IMP_JAVA = {
    /** 微信ID */
    appId: "wx2e7e8d4c6d4c6d4c",
    /** 主体链接 */
    baseUrl: "monthrev.com",
    /** 火山安全SDKid */
    HuoShanSafeSDK: "779495",
    /** 火山License */
    HuoShanSDKLicenseStr:
        "fkZjn26O1rD9doNAzIU6GkzSIj0R5yu916ZAuRhd7QW8dj9m8hzCk37ceJmZjpexvssrVf2/1fE+JIGdC2uh41+Cwb62z6hOeFuGAznmkYl+oszPeDAfmidj8R+5DvrweshcoiYiPdKWkC9I75xyJMrNkPSMjatc22SyIz1M1uU7zYh7V/pqWLwLEQkRCPnp/NHVpQFzvrJVzrNOr9Rr2uHlE6D0BDldQ+EfkfNeiZPNpegraWaRkjBj5as4I+tn2MSyogNoo0mcUuuSRCDKx9b++J2lqlu8Ul0PdDREOHIC45jb",

    /** 广告配置 */
    /** Banner  */
    BannerSlotId: "10208100",
    /** 总激励视频  */
    AnswerSlotId: "10202100",
    /** 激励视频_强弹  */
    ForceAnswerSlotId: "10202102",
    /** 结算页图文  */
    ImgSlotId: "10204000",
    /** 总激励视频  */
    RewardSlotId: "10202100",
    /** 开屏  */
    SplashSlotId: "10203100",
    /** 全屏视频_强弹  */
    FullScreenSlotId: "10202102",
    /** 新插屏  */
    InsertSlotId: "10206100",
    /** 热启动开屏  */
    HotSplashSlotId: "10203101",
};
/* ${APP_NAME}AppImp.java 修改 */
function CreateAppConfigManager() {
    let app_config_manager = fs.readFileSync(
        path.join(process.cwd(), `app/src/org/cocos2dx/javascript/box/appconfig/LsgcAppImp.java`),
        "utf-8"
    );

    app_config_manager = app_config_manager.replace(/LsgcAppImp/gm, `${GetFirstLetterUpperCase(APP_NAME)}AppImp`);
    app_config_manager = app_config_manager.replace(/lsgc/gm, `${APP_NAME}`);

    Object.keys(LSGC_PATH_APP_IMP_JAVA).forEach((key) => {
        app_config_manager = app_config_manager.replace(LSGC_PATH_APP_IMP_JAVA[key], NEW_PATH_APP_IMP_JAVA[key]);
    });

    fs.writeFileSync(
        path.join(process.cwd(), `app/src/org/cocos2dx/javascript/box/appconfig/${GetFirstLetterUpperCase(APP_NAME)}AppImp.java`),
        app_config_manager
    );
}

/** 开始生成 */
// CreateSetting1();
// CreateSetting2();
// CreateSetting3();
// CreateSetting4();
// CreateSetting5();
// CreatePackageName();
// CreateAssets();
// CreateRes();
// CreateWxApi();
// ModifyAppConfigManager();
// ModifyAppConfigManager2();
// CreateAppConfigManager();

console.log(`
参考文件：https://huixuanjiasu.feishu.cn/wiki/wikcnQ6dJqAJArinniNfVKFv5pf 

待完成任务：
1. 请使用打包机中的[proguard_build]任务，打包混淆文件，并放置到 app/proguardfile 文件夹下
2. 打开打包机中的[Android_SDK_DEV_AES_OAID]任务, 
3. 使用打包机中的[Android_update_keystore_new]任务，更新apk签名 （相关配置在 https://huixuanjiasu.feishu.cn/docx/JgXddwvxno2G0Lx2FwSc5lnhnkb 中查找）
4. 打开打包机中的[Android_SDK_DEV_AES_OAID]任务，添加 proj_name 配置
`);
