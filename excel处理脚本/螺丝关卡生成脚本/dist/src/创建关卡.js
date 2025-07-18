"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../types/index.extension");
const enum_1 = require("./enum");
const fs_1 = __importDefault(require("fs"));
const ________1 = require("./\u68C0\u6D4B\u662F\u5426\u53EF\u4EE5\u901A\u5173");
const BaseConfig_1 = require("./BaseConfig");
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
    constructor() {
        /** 布帘数量 */
        this.unKownHideScrewNum = BaseConfig_1.DiffcultConfig.unKownHideScrewNum;
        /** 问号螺母数量 */
        this.unkownNutNum = BaseConfig_1.DiffcultConfig.unkownNutNum;
        /** 石头数量 */
        this.unMoveScrewNum = BaseConfig_1.DiffcultConfig.unMoveScrewNum;
        /**  螺柱总数量 （不算广告）（包含布帘和石头）*/
        this.NutScrewNum = BaseConfig_1.DiffcultConfig.NutScrewNum;
        /** 广告螺柱数量 */
        this.adScrewNum = BaseConfig_1.DiffcultConfig.adScrewNum;
        /** 螺母颜色数量 */
        this.nutEnumNum = BaseConfig_1.DiffcultConfig.nutEnumNum;
        /** 螺柱高度 */
        this.screwHeight = BaseConfig_1.DiffcultConfig.screwHeight;
        /** 平均高度 */
        this.avgHeight = BaseConfig_1.DiffcultConfig.avgHeight;
        /** 双叠加概率 */
        this.doubleRate = BaseConfig_1.DiffcultConfig.doubleRate;
        /** 三叠加概率 */
        this.thirdRate = BaseConfig_1.DiffcultConfig.thirdRate;
        /** 可用枚举数量 */
        this.nutList = [];
        /** 可用枚举数量 */
        this.screwList = [];
        this.i = 0;
    }
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
        if (!this.testError())
            return;
        this.nutList = [];
        this.screwList = [];
        /** 获取螺丝枚举 */
        const numList = this.getNumList();
        // 创建所有的螺母
        for (let j = 0; j < numList.length; j++) {
            for (let i = 0; i < this.screwHeight; i++) {
                this.nutList.push(this.createNutData(numList[j], enum_1.NutObstacleEnum.normal));
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
    UnSameRandomNut(nut) {
        const index = this.nutList.findIndex((item) => {
            return item.nutType != nut;
        });
        if (index == -1)
            return this.RandomNut;
        const data = this.nutList.splice(index, 1);
        return data[0];
    }
    findNut(nut) {
        const index = this.nutList.findIndex((item) => {
            return item.nutType == nut;
        });
        if (index == -1)
            return this.UnSameRandomNut(nut);
        const data = this.nutList.splice(index, 1);
        return data[0];
    }
    randomNut(result) {
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
        let data = new Map();
        return this.nutList.find((item) => {
            let num = data.get(item.nutType) || 0;
            data.set(item.nutType, ++num);
            if (num >= this.screwHeight)
                return item;
            return false;
        });
    }
    findNewsetNutAndNum(data) {
        if (data.length === 0)
            return null;
        let num = 0;
        let nut = data[data.length - 1].nutType;
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].nutType !== nut)
                break;
            num++;
        }
        return { num, nut };
    }
    /** 放置螺母 */
    putNut() {
        var _a;
        for (let i = 0; i < this.NutScrewNum; i++) {
            const single = this.screwList[i];
            for (let i = 0; i < this.avgHeight; i++) {
                const nut = this.randomNut(this.findNewsetNutAndNum(single.nuts));
                if (!nut)
                    break;
                if (single.nutScrewObstacleType === enum_1.NutScrewObstacleEnum.UnMove &&
                    (((_a = single.nuts[single.nuts.length - 1]) === null || _a === void 0 ? void 0 : _a.nutType) == nut.nutType || single.nuts.length <= 2)) {
                    continue;
                }
                if (single.nuts.length >= this.screwHeight) {
                    continue;
                }
                single.nuts.push(nut);
                if (this.unkownNutNum > 0 && single.nuts.length !== this.avgHeight) {
                    if (Math.random() < 0.9) {
                        this.unkownNutNum--;
                        nut.nutObstacleType = enum_1.NutObstacleEnum.unkown;
                    }
                }
            }
            if (single.nutScrewObstacleType === enum_1.NutScrewObstacleEnum.Hide) {
                const nut = this.findCanUnLock();
                single.nutScrewObstacleData = {
                    unLockNutType: nut === null || nut === void 0 ? void 0 : nut.nutType,
                };
                if (!nut) {
                    single.nutScrewObstacleType = enum_1.NutScrewObstacleEnum.normal;
                }
            }
        }
        // console.log(`关卡开始检测` + this.i++);
        // const arr = this.splitArr(this.screwList);
        // fs.writeFileSync("./temp.json", JSON.stringify(arr));
        const tttComplete = new ________1.TestComplete(1, Date.now());
        let data = tttComplete.testWin(JSON.parse(JSON.stringify(this.screwList)), []);
        if (data.success) {
            // console.log(`关卡检测成功`);
            const num = tttComplete.testDiff(10000, this.screwList);
            // console.log("关卡成功率：", num);
            const arr = this.splitArr(this.screwList);
            // fs.writeFileSync("./test.json", JSON.stringify(arr));
            return {
                data: arr,
                successRate: num,
                step: data.step,
            };
        }
        else {
            console.log(`关卡检测失败`);
            return this.create();
        }
    }
    splitArr(arr) {
        const result = [];
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
            this.screwList.push(this.createScrewData(enum_1.NutScrewEnum.normal, enum_1.NutScrewObstacleEnum.normal));
        }
        for (let i = 0; i < this.unKownHideScrewNum; i++) {
            this.screwList[i].nutScrewObstacleType = enum_1.NutScrewObstacleEnum.Hide;
        }
        for (let i = 0; i < this.unMoveScrewNum; i++) {
            this.screwList[this.screwList.length - i - 1].nutScrewObstacleType = enum_1.NutScrewObstacleEnum.UnMove;
        }
        for (let i = 0; i < this.adScrewNum; i++) {
            this.screwList.push(this.createScrewData(enum_1.NutScrewEnum.normal, enum_1.NutScrewObstacleEnum.AD));
        }
    }
    /** 螺柱数据模板 */
    createScrewData(nutScrewType, nutScrewObstacleType) {
        return {
            id: this.generateRandomString(10),
            nutScrewType: nutScrewType,
            nutScrewObstacleType: nutScrewObstacleType,
            nutScrewHeight: this.screwHeight,
            nuts: [],
        };
    }
    generateRandomString(length) {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    /** 螺母数据模板 */
    createNutData(nutType, nutObstacleType) {
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
        for (let i = 0; i < Object.values(enum_1.NutEnum).length / 2; i++) {
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
}
// createRound.create();
const arr = [];
for (let i = 0; i < 10; i++) {
    console.log(`-------------------第${i + 1}关创建中-------------------`);
    const createRound = new CreateRound();
    const data = createRound.create();
    arr.push(data);
    console.log(`-------------------第${i + 1}关创建完成-----------------`);
}
fs_1.default.writeFileSync("../关卡数组.json", JSON.stringify(arr));
