import "../types/index.extension";
import { NutData, NutEnum, NutObstacleEnum, NutScrewEnum, NutScrewObstacleEnum } from "./enum";
import fs from "fs";
import { TestComplete } from "./检测是否可以通关";
import { DiffcultConfig } from "./BaseConfig";

/**
 * 控制难度标准
 *
 * 布帘 难度
 * 问号螺母 难度1
 * 石头 难度
 * 螺母颜色数量 与 可用螺柱之间的 差值 难度 （差的越小，难度越大）
 * 平均高度 待定
 * 双叠加概率 待定
 * 三叠加概率 待定
 */

class CreateRound {
    /** 布帘数量 */
    unKownHideScrewNum = DiffcultConfig.unKownHideScrewNum;
    /** 问号螺母数量 */
    unkownNutNum = DiffcultConfig.unkownNutNum;
    /** 石头数量 */
    unMoveScrewNum = DiffcultConfig.unMoveScrewNum;
    /**  螺柱总数量 （不算广告）（包含布帘和石头）*/
    NutScrewNum = DiffcultConfig.NutScrewNum;
    /** 广告螺柱数量 */
    adScrewNum = DiffcultConfig.adScrewNum;
    /** 螺母颜色数量 */
    nutEnumNum = DiffcultConfig.nutEnumNum;
    /** 螺柱高度 */
    screwHeight = DiffcultConfig.screwHeight;
    /** 平均高度 */
    avgHeight = DiffcultConfig.avgHeight;
    /** 双叠加概率 */
    doubleRate = DiffcultConfig.doubleRate;
    /** 三叠加概率 */
    thirdRate = DiffcultConfig.thirdRate;

    /** 可用枚举数量 */
    nutList: NutData["0"]["nuts"]["0"][] = [];
    /** 可用枚举数量 */
    screwList: NutData = [];

    shuffleArray(arr) {
        const array = [...arr]; // 创建原数组的副本，避免修改原数组
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // 生成 0 ~ i 的随机索引
            [array[i], array[j]] = [array[j], array[i]]; // 交换元素
        }
        return array;
    }

    /** 创建 */
    create() {
        /** 布帘数量 */
        this.unKownHideScrewNum = DiffcultConfig.unKownHideScrewNum;
        /** 问号螺母数量 */
        this.unkownNutNum = DiffcultConfig.unkownNutNum;
        /** 石头数量 */
        this.unMoveScrewNum = DiffcultConfig.unMoveScrewNum;
        /**  螺柱总数量 （不算广告）（包含布帘和石头）*/
        this.NutScrewNum = DiffcultConfig.NutScrewNum;
        /** 广告螺柱数量 */
        this.adScrewNum = DiffcultConfig.adScrewNum;
        /** 螺母颜色数量 */
        this.nutEnumNum = DiffcultConfig.nutEnumNum;
        /** 螺柱高度 */
        this.screwHeight = DiffcultConfig.screwHeight;
        /** 平均高度 */
        this.avgHeight = DiffcultConfig.avgHeight;
        /** 双叠加概率 */
        this.doubleRate = DiffcultConfig.doubleRate;
        /** 三叠加概率 */
        this.thirdRate = DiffcultConfig.thirdRate;

        if (!this.testError()) return;
        this.nutList = [];
        this.screwList = [];
        /** 获取螺丝枚举 */
        const numList = this.getNumList();
        // 创建所有的螺母
        for (let j = 0; j < numList.length; j++) {
            for (let i = 0; i < this.screwHeight; i++) {
                this.nutList.push(this.createNutData(numList[j], NutObstacleEnum.normal));
            }
        }
        this.nutList = this.shuffleArray(this.nutList);

        this.createScrew();

        return this.putNut();
    }

    get RandomNut() {
        const index = Math.floor(Math.random() * this.nutList.length);
        const data = this.nutList.splice(index, 1);
        return data[0];
    }

    UnSameRandomNut(nut: NutEnum) {
        const index = this.nutList.findIndex((item) => {
            return item.nutType != nut;
        });
        if (index == -1) return this.RandomNut;

        const data = this.nutList.splice(index, 1);
        return data[0];
    }

    findNut(nut: NutEnum) {
        const index = this.nutList.findIndex((item) => {
            return item.nutType == nut;
        });
        if (index == -1) return this.UnSameRandomNut(nut);

        const data = this.nutList.splice(index, 1);
        return data[0];
    }

    randomNut(result: { num: number; nut: NutEnum } | null) {
        if (result == null) {
            return this.RandomNut;
        }
        const { num, nut } = result;
        if (num == 1 && Math.random() < this.doubleRate) {
            return this.findNut(nut);
        }

        if (num == 2 && Math.random() < this.thirdRate) {
            return this.findNut(nut);
        }

        return this.UnSameRandomNut(nut);
    }

    findCanUnLock() {
        let data: Map<any, number> = new Map();

        return this.nutList.find((item) => {
            let num = data.get(item.nutType) || 0;

            data.set(item.nutType, ++num);
            if (num >= this.screwHeight) return item;
            return false;
        });
    }

    findNewsetNutAndNum(data: NutData["0"]["nuts"]) {
        if (data.length === 0) return null;
        let num: number = 0;
        let nut: NutEnum = data[data.length - 1].nutType;
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].nutType !== nut) break;
            num++;
        }
        return { num, nut };
    }

    i = 0;

    splitArr<T>(arr: T[]): T[][] {
        const result: T[][] = [];
        const length = arr.length;

        if (length <= 4) {
            result.push(arr);
            return result;
        }

        if (length > 4 && length <= 10) {
            const l = Math.ceil(length / 2);
            result.push(arr.slice(0, l));
            result.push(arr.slice(l));
            return result;
        }

        if (length > 10) {
            const l = Math.ceil(length / 3);
            result.push(arr.slice(0, l));
            result.push(arr.slice(l, 2 * l));
            result.push(arr.slice(2 * l));
            return result;
        }

        return result; // 默认返回（理论上不会走到这）
    }

    /** 创建螺柱 */
    createScrew() {
        for (let i = 0; i < this.NutScrewNum; i++) {
            this.screwList.push(this.createScrewData(NutScrewEnum.normal, NutScrewObstacleEnum.normal));
        }

        for (let i = 0; i < this.unKownHideScrewNum; i++) {
            this.screwList[i].nutScrewObstacleType = NutScrewObstacleEnum.Hide;
        }

        for (let i = 0; i < this.unMoveScrewNum; i++) {
            this.screwList[this.screwList.length - i - 1].nutScrewObstacleType = NutScrewObstacleEnum.UnMove;
        }

        for (let i = 0; i < this.adScrewNum; i++) {
            this.screwList.push(this.createScrewData(NutScrewEnum.normal, NutScrewObstacleEnum.AD));
        }
    }

    /** 螺柱数据模板 */
    createScrewData(nutScrewType: NutScrewEnum, nutScrewObstacleType: NutScrewObstacleEnum): NutData["0"] {
        return {
            id: this.generateRandomString(10),
            nutScrewType: nutScrewType,
            nutScrewObstacleType: nutScrewObstacleType,
            nutScrewHeight: this.screwHeight,
            nuts: [],
        };
    }
    generateRandomString(length: number) {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    /** 螺母数据模板 */
    createNutData(nutType: NutEnum, nutObstacleType: NutObstacleEnum): NutData["0"]["nuts"]["0"] {
        return {
            id: this.generateRandomString(10),
            nutType,
            nutObstacleType,
        };
    }

    /** 获取螺柱枚举 */
    getNumList() {
        const { nutEnumNum } = this;
        const needDelet = 11 - nutEnumNum;
        const baseArr = [];

        for (let i = 0; i < Object.values(NutEnum).length / 2; i++) {
            baseArr.push(i + 1);
        }

        for (let i = 0; i < needDelet; i++) {
            baseArr.splice(Math.floor(Math.random() * baseArr.length), 1);
        }

        return baseArr;
    }

    /** 检测配置是否出错 */
    testError() {
        const { nutEnumNum, screwHeight, unkownNutNum, unMoveScrewNum, NutScrewNum, avgHeight, unKownHideScrewNum } = this;
        if (nutEnumNum > 11) {
            console.log("螺母枚举数量超过");
            return false;
        }
        if (unKownHideScrewNum + unMoveScrewNum >= NutScrewNum) {
            console.log("可移动螺柱不存在");
            return false;
        }
        return true;
    }

    /** 放置螺母 */
    putNut() {
        for (let i = 0; i < this.NutScrewNum; i++) {
            const single = this.screwList[i];
            for (let i = 0; i < this.avgHeight; i++) {
                const nut = this.randomNut(this.findNewsetNutAndNum(single.nuts));
                if (!nut) break;
                if (
                    single.nutScrewObstacleType === NutScrewObstacleEnum.UnMove &&
                    (single.nuts[single.nuts.length - 1]?.nutType == nut.nutType || single.nuts.length <= 2)
                ) {
                    continue;
                }

                if (single.nuts.length >= this.screwHeight) {
                    continue;
                }
                single.nuts.push(nut);

                if (this.unkownNutNum > 0 && single.nuts.length !== this.avgHeight) {
                    if (Math.random() < 0.95) {
                        this.unkownNutNum--;
                        nut.nutObstacleType = NutObstacleEnum.unkown;
                    }
                }
            }
            if (single.nutScrewObstacleType === NutScrewObstacleEnum.Hide) {
                const nut = this.findCanUnLock();

                single.nutScrewObstacleData = {
                    unLockNutType: nut?.nutType,
                };
                if (!nut) {
                    single.nutScrewObstacleType = NutScrewObstacleEnum.normal;
                }
            }
        }

        // console.log(`关卡开始检测` + this.i++);

        // const arr = this.splitArr(this.screwList);
        // fs.writeFileSync("./temp.json", JSON.stringify(arr));

        const tttComplete = new TestComplete(DiffcultConfig.avgStep, Date.now());

        let data = tttComplete.testWin(JSON.parse(JSON.stringify(this.screwList)), []);

        if (data.success) {
            // console.log(`关卡检测成功`);

            const num: number = tttComplete.testDiff(10000, this.screwList) as number;

            if (num >= DiffcultConfig.minSuccessRate && num <= DiffcultConfig.maxSuccessRate) {
                // console.log("关卡成功率：", num);
                const arr = this.splitArr(this.screwList);
                // fs.writeFileSync("./test.json", JSON.stringify(arr));
                return {
                    data: arr,
                    successRate: num,
                    stepData: data.step[0],
                    stepNum: data.step.reduce((pre, cur) => pre + cur.length, 0) / data.step.length,
                };
            }
            console.log("关卡成功率太高：");
            return this.create();
        } else {
            console.log(`关卡检测失败`);
            return this.create();
        }
    }
}

// createRound.create();

const arr: {
    data: NutData[];
    successRate: number;
    stepData: number[][][];
    stepNum: number;
}[] = [];
console.time("创建花费总时间");
for (let i = 0; i < DiffcultConfig.createRoundNum; i++) {
    console.time("创建时间");
    console.log(`-------------------第${i + 1}关创建中-------------------`);
    const createRound = new CreateRound();
    const data = createRound.create();
    arr.push(data);
    console.timeEnd("创建时间");
    console.log(`-------------------第${i + 1}关创建完成-----------------`);
}
console.timeEnd("创建花费总时间");

function getCurrentTime(): string {
    const now = new Date();

    const year = now.getFullYear(); // 年
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 月（从0开始，所以+1）
    const day = String(now.getDate()).padStart(2, "0"); // 日
    const hours = String(now.getHours()).padStart(2, "0"); // 时
    const minutes = String(now.getMinutes()).padStart(2, "0"); // 分
    const seconds = String(now.getSeconds()).padStart(2, "0"); // 秒

    return `${month}${day}${hours}${minutes}${seconds}`;
}

fs.writeFileSync(`./关卡数组${getCurrentTime()}.json`, JSON.stringify(arr));

const excelData: any = [["关卡id", "关卡通关率", "关卡平均步数"]];

arr.forEach((item, index) => {
    const { successRate, stepNum } = item;
    excelData.push([index, successRate, stepNum]);
});

// 将二维数组转换为 CSV 格式的字符串
const csvContent = '\uFEFF' + excelData.map((row) => row.join(",")).join("\n");

// 写入文件
fs.writeFile(`./关卡数组${getCurrentTime()}.csv`, csvContent, "utf-8", (err) => {
    if (err) {
        console.error("写入文件失败:", err);
    } else {
        console.log("CSV 文件已成功生成");
    }
});
