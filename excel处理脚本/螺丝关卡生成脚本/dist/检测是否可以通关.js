"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestComplete = void 0;
const BaseConfig_1 = require("./BaseConfig");
const enum_1 = require("./enum");
function cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}
Object.defineProperty(Array.prototype, "last", {
    get: function () {
        return this[this.length - 1];
    },
});
function unLockNutHide(screwIn, clone) {
    if (!testComplete(screwIn))
        return;
    clone.forEach((item) => {
        var _a;
        if (screwIn.nuts[0].nutType == ((_a = item.nutScrewObstacleData) === null || _a === void 0 ? void 0 : _a.unLockNutType)) {
            item.nutScrewObstacleType = 0;
        }
    });
}
function testSucc(baseData) {
    return baseData.every((item) => {
        return testComplete(item) || item.nuts.length == 0;
    });
}
function testCanMoveSelf(screwOut) {
    if (!screwOut.nuts.length)
        return false;
    if (screwOut.nutScrewObstacleType !== 0)
        return false;
    if (testComplete(screwOut))
        return false;
    return true;
}
function sameNutLength(screwOut) {
    var _a;
    const nutType = (_a = screwOut.nuts.last) === null || _a === void 0 ? void 0 : _a.nutType;
    let length = 0;
    for (let i = screwOut.nuts.length - 1; i >= 0; i--) {
        if (screwOut.nuts[i].nutType !== nutType)
            break;
        length++;
    }
    return length;
}
/** 判断是否都是相同螺母 */
function testAllSame(screwOut) {
    var _a;
    const nutType = (_a = screwOut.nuts.last) === null || _a === void 0 ? void 0 : _a.nutType;
    return screwOut.nuts.every((item) => item.nutType == nutType);
}
function outSameNut(screwOut, canlength) {
    const length = sameNutLength(screwOut);
    if (canlength < length)
        return [];
    return screwOut.nuts.splice(screwOut.nuts.length - length);
}
function findSameNut(screwOut) {
    const length = sameNutLength(screwOut);
    return screwOut.nuts.slice(screwOut.nuts.length - length);
}
function testCanMoveTo(screwOut, screwIn) {
    var _a, _b;
    const newst = screwOut.nuts.last;
    if (!newst)
        return false;
    if (screwIn.nutScrewObstacleType == 3) {
        if (screwIn.nuts.length == 0)
            return screwIn.nutScrewHeight;
        if (newst.nutType !== ((_a = screwIn.nuts.last) === null || _a === void 0 ? void 0 : _a.nutType))
            return false;
        return screwIn.nutScrewHeight - screwIn.nuts.length;
    }
    if (screwIn.nutScrewObstacleType !== 0)
        return false;
    if (screwIn.nuts.length == screwIn.nutScrewHeight)
        return false;
    if (testAllSame(screwOut) && screwIn.nuts.length == 0)
        return false;
    if (screwIn.nuts.length == 0)
        return screwIn.nutScrewHeight;
    if (newst.nutType !== ((_b = screwIn.nuts.last) === null || _b === void 0 ? void 0 : _b.nutType))
        return false;
    const length = screwIn.nutScrewHeight - screwIn.nuts.length;
    if (length < sameNutLength(screwOut))
        return false;
    return screwIn.nutScrewHeight - screwIn.nuts.length;
}
function testComplete(screwOut) {
    const { nutScrewHeight, nuts } = screwOut;
    if (nuts.length !== nutScrewHeight)
        return;
    let nutType = nuts[0].nutType;
    return !nuts.some((item) => {
        return nutType !== item.nutType;
    });
}
function findNewestNut(screwOut) {
    return screwOut.nuts[screwOut.nuts.length - 1];
}
function RandomMove(screwOut) {
    if (testSucc(screwOut))
        return true;
    if (testFail(screwOut)) {
        // console.log("检测失败");
        return 0;
    }
    const arr = testCanMoveArr(screwOut);
    const screwOT = arr[Math.floor(Math.random() * arr.length)];
    // console.log("拿起：", screwOut.indexOf(screwOT) + 1);
    if (!screwOT) {
        // console.log("无可移动螺柱");
        return 0;
    }
    const beMoves = testCanBeMove(screwOT, screwOut);
    const screwIN = beMoves[Math.floor(Math.random() * beMoves.length)];
    // console.log("放下：", screwOut.indexOf(screwIN) + 1);
    if (!screwIN) {
        // console.log("无可放入螺柱");
        return false;
    }
    const length = testCanMoveTo(screwOT, screwIN);
    // console.log(JSON.stringify(screwOut.map((item) => item.nuts)));
    if (length) {
        const arr = outSameNut(screwOT, length);
        screwIN.nuts.push(...arr);
        unLockNutHide(screwIN, screwOut);
    }
    return false;
}
function findCanMoveScrew(screwOut, screwData) {
    return screwData.find((item) => {
        return testCanMoveTo(screwOut, item);
    });
}
function testCanMoveArr(screwOut) {
    return screwOut.filter((nutScrewComp) => {
        if (nutScrewComp.nutScrewObstacleType !== enum_1.NutScrewObstacleEnum.normal) {
            return false;
        }
        if (testComplete(nutScrewComp))
            return false;
        if (nutScrewComp.nuts.length == 0)
            return false;
        return findCanMoveScrew(nutScrewComp, screwOut);
    });
}
function testCanBeMove(screwMoveIn, screwOut) {
    return screwOut.filter((nutScrewComp, index) => {
        if (nutScrewComp.nutScrewObstacleType === enum_1.NutScrewObstacleEnum.AD ||
            nutScrewComp.nutScrewObstacleType === enum_1.NutScrewObstacleEnum.Hide) {
            // console.log("特殊柱子无法移动");
            return false;
        }
        if (nutScrewComp == screwMoveIn) {
            // console.log("等于本身无法移动");
            return false;
        }
        if (nutScrewComp.nutScrewHeight === nutScrewComp.nuts.length) {
            // console.log("无可放入余地， 无法移动");
            return false;
        }
        // 可放入数量 比 相同颜色长度得数量 小 不进行移动
        if (sameNutLength(screwMoveIn) > nutScrewComp.nutScrewHeight - nutScrewComp.nuts.length) {
            // console.log("可放入数量，比能放入数量小无法移动");
            return false;
        }
        // 不浪费移动
        if (sameNutLength(screwMoveIn) === screwMoveIn.nuts.length && nutScrewComp.nuts.length == 0) {
            // console.log("避免死循环");
            return false;
        }
        if (nutScrewComp.nuts.length == 0)
            return true;
        // 如果 进入得义子 最新得 和 被进入得最新得 不是同一个，并且 被进入得还有椅子，不行
        if (screwMoveIn.nuts.last.nutType !== nutScrewComp.nuts.last.nutType) {
            // console.log("顶部义子颜色不同无法移动");
            return false;
        }
        return true;
    });
}
function testFail(screwOut) {
    const canMoveArr = [];
    const stoneArr = [];
    for (let nutScrewComp of screwOut) {
        // 不能有两个相同的石头放到一块
        if (nutScrewComp.nutScrewObstacleType == enum_1.NutScrewObstacleEnum.UnMove) {
            const nutType = findNewestNut(nutScrewComp);
            if (nutType) {
                if (stoneArr.includes(nutType))
                    return 2;
                stoneArr.push(nutType);
            }
        }
        if (nutScrewComp.nutScrewObstacleType !== enum_1.NutScrewObstacleEnum.normal) {
            continue;
        }
        if (nutScrewComp.nuts.length == 0)
            return false;
        if (testComplete(nutScrewComp))
            continue;
        canMoveArr.push(nutScrewComp);
    }
    if (canMoveArr.length == 0)
        return false;
    const canMove = [];
    const data = screwOut.find((item) => {
        if (item.nutScrewObstacleType !== enum_1.NutScrewObstacleEnum.normal && item.nutScrewObstacleType !== enum_1.NutScrewObstacleEnum.UnMove)
            return false;
        canMove[0] = item;
        return canMoveArr.find((item2) => {
            if (item == item2)
                return false;
            canMove[1] = item2;
            const item1Newsst = findNewestNut(item);
            const item1Newssts = findSameNut(item);
            const item2Newsst = findNewestNut(item2);
            return (item1Newsst === null || item1Newsst === void 0 ? void 0 : item1Newsst.nutType) == (item2Newsst === null || item2Newsst === void 0 ? void 0 : item2Newsst.nutType) && item1Newssts.length <= item2.nutScrewHeight - item2.nuts.length;
        });
    });
    return !data ? 1 : false;
}
class TestComplete {
    constructor(limitRecordSucc, startTime) {
        this.recordSucc = 0;
        this.limitRecordSucc = 1;
        this.startTime = 0;
        this.successStep = [];
        this.recordSucceeStep = [];
        this.limitLength = 1;
        this.limitRecordSucc = limitRecordSucc;
        this.startTime = startTime;
    }
    testWin(baseData, index = []) {
        this.recordSucc = 0;
        this.testdata(baseData, index);
        return {
            success: this.recordSucc,
            step: this.successStep,
        };
    }
    testDiff(num = BaseConfig_1.DiffcultConfig.checkRandomNum, screwOut) {
        if (testFail(screwOut))
            return false;
        let succussCount = 0;
        for (let i = 0; i < num; i++) {
            const data = cloneObj(screwOut);
            for (let j = 0; j < BaseConfig_1.DiffcultConfig.onRnadomNum; j++) {
                const result = RandomMove(data);
                if (result) {
                    succussCount++;
                    break;
                }
                if (result === 0)
                    break;
            }
        }
        return succussCount / num;
    }
    testdata(baseData, index = []) {
        if (this.recordSucceeStep.includes(JSON.stringify(index.slice(0, this.limitLength))))
            return false;
        // 检测超时
        if (Date.now() - this.startTime > 3000 && this.recordSucc == 0)
            return false;
        if (testFail(baseData))
            return false;
        // 限制成功次数
        if (this.recordSucc >= this.limitRecordSucc)
            return true;
        const lastData = index[index.length - 1];
        for (let i = 0; i < baseData.length; i++) {
            const screw = baseData[i];
            const moveSelf = testCanMoveSelf(screw);
            if (!moveSelf)
                continue;
            for (let j = 0; j < baseData.length; j++) {
                if (lastData && lastData[0] == j && lastData[1] == i)
                    continue;
                if (i == j)
                    continue;
                const clone = cloneObj(baseData);
                const screwOut = clone[i];
                const screwIn = clone[j];
                const length = testCanMoveTo(screwOut, screwIn);
                if (!length)
                    continue;
                const arr = outSameNut(screwOut, length);
                screwIn.nuts.push(...arr);
                unLockNutHide(screwIn, clone);
                if (testSucc(clone)) {
                    this.recordSucc++;
                    if (index.length > 6)
                        this.recordSucceeStep.push(JSON.stringify(index.slice(0, this.limitLength)));
                    this.successStep = index;
                    // console.log(`完成步骤${this.recordSucc}`, JSON.stringify(index));
                    return true;
                }
                const cloneIndex = cloneObj(index);
                cloneIndex.push([i + 1, j + 1]);
                this.testdata(clone, cloneIndex);
            }
        }
        return false;
    }
}
exports.TestComplete = TestComplete;
