/** 要修改的包名 */
let package_name = "com.lsgc.yf_test";
/** 要修改的key */
let updateKey = "success_count";
/** 要修改的值*/
let updateValue = 3;
/** 用户yid */
let yid = "16957121";
/** 要修改的表名*/
let excelName = "user_process_update"; // user_process_update = 游戏进度表  user_detail_update = user_detail_update
/** cookie 需要时常更新 */
let cookie =
    "remember_token=0000000294|cf106c6615e04dc5011707770fdbea90d513b53703efb15190b8967d2d28ccbc4fe0b795f2cab4c0a36c11ca46adcdb11d0f248c1c5457913625b9b78a6b2841; hxjsFuid=65c4gf2b; hxjsName=5p2o5pmT6b6Z; hxjsDepartmentNames=5LqR5biG5bel5L2c5a6k; hxjsMobile=Kzg2MTg3MzEwMTkyMzA%3D; hxjsFToken=c9134c6a-1f9f-4c70-ac9a-be265f7a8312_177; session=.eJwli7sOwjAMAP8lM4PjOHbcn6kSPwRrSyfEv4PgtpPuXuU6499gfXrYCf1Cp3MqeR5z3sj2PK772C5jVcsKoFNnmRKzOa3GVSCAQYDCtZggmOMCTIzovXT4kmilWytmRdFmrrZmnTpsrDdFNwQlVvr9QJxu1NmRdwiOFxAS6S3l_AO-VMGs.aH3eow.9bshFINvvuP9ZFQyh09Kya5B4UA";

async function main() {
    const data = await fetch(
        `https://fs.galio.huixuanjiasu.com/galio/operate/${excelName}?website_id=null&code=null&package_name=` + package_name,
        {
            method: "POST",
            body: JSON.stringify({
                user_id: yid,
                update_key: updateKey,
                update_value: updateValue,
            }),
            headers: {
                accept: "*/*",
                "accept-encoding": "gzip, deflate, br, zstd",
                "accept-language": "zh-CN,zh;q=0.9",
                "content-length": "70",
                "content-type": "application/json",
                cookie,
                origin: "https://fs.galio.huixuanjiasu.com",
                priority: "u=1, i",
                referer: "https://fs.galio.huixuanjiasu.com/",
                "sec-ch-ua": '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
            },
        }
    );
    console.log(`🚀yxl ~ update_success_count.js:30 ~ main ~ data:`, await data.json());
}

main();
