import { DiffcultConfig } from "./BaseConfig";
import { NutData, NutScrewObstacleEnum } from "./enum";

function cloneObj<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

// Object.defineProperty(Array.prototype, "last", {
//     get: function () {
//         return this[this.length - 1];
//     },
// });

function unLockNutHide(screwIn: NutData[0], clone: NutData) {
    if (!testComplete(screwIn)) return;

    clone.forEach((item) => {
        if (screwIn.nuts[0].nutType == item.nutScrewObstacleData?.unLockNutType) {
            item.nutScrewObstacleType = 0;
        }
    });
}

function testSucc(baseData: NutData) {
    return baseData.every((item) => {
        return testComplete(item) || item.nuts.length == 0;
    });
}

function testCanMoveSelf(screwOut: NutData[0]) {
    if (!screwOut.nuts.length) return false;

    if (screwOut.nutScrewObstacleType !== 0) return false;

    if (testComplete(screwOut)) return false;

    return true;
}

function sameNutLength(screwOut: NutData[0]) {
    const nutType = screwOut.nuts.last?.nutType;

    let length = 0;
    for (let i = screwOut.nuts.length - 1; i >= 0; i--) {
        if (screwOut.nuts[i].nutType !== nutType) break;
        length++;
    }
    return length;
}

/** 判断是否都是相同螺母 */
function testAllSame(screwOut: NutData[0]) {
    const nutType = screwOut.nuts.last?.nutType;
    return screwOut.nuts.every((item) => item.nutType == nutType);
}

function outSameNut(screwOut: NutData[0], canlength: number) {
    const length = sameNutLength(screwOut);
    if (canlength < length) return [];

    return screwOut.nuts.splice(screwOut.nuts.length - length);
}
function findSameNut(screwOut: NutData[0]) {
    const length = sameNutLength(screwOut);
    return screwOut.nuts.slice(screwOut.nuts.length - length);
}

function testCanMoveTo(screwOut: NutData[0], screwIn: NutData[0]) {
    const newst = screwOut.nuts.last;
    if (!newst) return false;
    if (screwIn.nutScrewObstacleType == 3) {
        if (screwIn.nuts.length == 0) return screwIn.nutScrewHeight;

        if (newst.nutType !== screwIn.nuts.last?.nutType) return false;

        return screwIn.nutScrewHeight - screwIn.nuts.length;
    }

    if (screwIn.nutScrewObstacleType !== 0) return false;

    if (screwIn.nuts.length == screwIn.nutScrewHeight) return false;

    if (testAllSame(screwOut) && screwIn.nuts.length == 0) return false;

    if (screwIn.nuts.length == 0) return screwIn.nutScrewHeight;

    if (newst.nutType !== screwIn.nuts.last?.nutType) return false;

    const length = screwIn.nutScrewHeight - screwIn.nuts.length;

    if (length < sameNutLength(screwOut)) return false;

    return screwIn.nutScrewHeight - screwIn.nuts.length;
}

function testComplete(screwOut: NutData[0]) {
    const { nutScrewHeight, nuts } = screwOut;
    if (nuts.length !== nutScrewHeight) return;
    let nutType = nuts[0].nutType;
    return !nuts.some((item) => {
        return nutType !== item.nutType;
    });
}

function findNewestNut(screwOut: NutData[0]) {
    return screwOut.nuts[screwOut.nuts.length - 1];
}

function RandomMove(screwOut: NutData) {
    if (testSucc(screwOut)) return true;
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

function findCanMoveScrew(screwOut: NutData[0], screwData: NutData) {
    return screwData.find((item) => {
        return testCanMoveTo(screwOut, item);
    });
}

function testCanMoveArr(screwOut: NutData): NutData {
    return screwOut.filter((nutScrewComp) => {
        if (nutScrewComp.nutScrewObstacleType !== NutScrewObstacleEnum.normal) {
            return false;
        }
        if (testComplete(nutScrewComp)) return false;
        if (nutScrewComp.nuts.length == 0) return false;

        return findCanMoveScrew(nutScrewComp, screwOut);
    });
}

function testCanBeMove(screwMoveIn: NutData[0], screwOut: NutData): NutData {
    return screwOut.filter((nutScrewComp, index) => {
        if (
            nutScrewComp.nutScrewObstacleType === NutScrewObstacleEnum.AD ||
            nutScrewComp.nutScrewObstacleType === NutScrewObstacleEnum.Hide
        ) {
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

        if (nutScrewComp.nuts.length == 0) return true;

        // 如果 进入得义子 最新得 和 被进入得最新得 不是同一个，并且 被进入得还有椅子，不行
        if (screwMoveIn.nuts.last.nutType !== nutScrewComp.nuts.last.nutType) {
            // console.log("顶部义子颜色不同无法移动");
            return false;
        }

        return true;
    });
}

function testFail(screwOut: NutData) {
    const canMoveArr = [];
    const stoneArr = [];

    for (let nutScrewComp of screwOut) {
        // 不能有两个相同的石头放到一块
        if (nutScrewComp.nutScrewObstacleType == NutScrewObstacleEnum.UnMove) {
            const nutType = findNewestNut(nutScrewComp);
            if (nutType) {
                if (stoneArr.includes(nutType)) return 2;
                stoneArr.push(nutType);
            }
        }
        if (nutScrewComp.nutScrewObstacleType !== NutScrewObstacleEnum.normal) {
            continue;
        }

        if (nutScrewComp.nuts.length == 0) return false;
        if (testComplete(nutScrewComp)) continue;
        canMoveArr.push(nutScrewComp);
    }

    if (canMoveArr.length == 0) return false;

    const canMove = [];
    const data = screwOut.find((item: NutData[0]) => {
        if (item.nutScrewObstacleType !== NutScrewObstacleEnum.normal && item.nutScrewObstacleType !== NutScrewObstacleEnum.UnMove)
            return false;
        canMove[0] = item;
        return canMoveArr.find((item2: NutData[0]) => {
            if (item == item2) return false;
            canMove[1] = item2;

            const item1Newsst = findNewestNut(item);
            const item1Newssts = findSameNut(item);
            const item2Newsst = findNewestNut(item2);
            return item1Newsst?.nutType == item2Newsst?.nutType && item1Newssts.length <= item2.nutScrewHeight - item2.nuts.length;
        });
    });

    return !data ? 1 : false;
}

export class TestComplete {
    recordSucc = 0;

    limitRecordSucc: number = 1;

    startTime: number = 0;

    constructor(limitRecordSucc: number, startTime: number) {
        this.limitRecordSucc = limitRecordSucc;
        this.startTime = startTime;
    }

    successSteps: number[][][] = [];

    testWin(baseData: NutData, index: number[][] = []): { success: number; step: number[][][] } {
        this.recordSucc = 0;
        this.testdata(baseData, index);
        return {
            success: this.recordSucc,
            step: this.successSteps,
        };
    }

    testDiff(num = DiffcultConfig.checkRandomNum, screwOut: NutData) {
        if (testFail(screwOut)) return false;

        let succussCount = 0;

        for (let i = 0; i < num; i++) {
            const data = cloneObj(screwOut);

            for (let j = 0; j < DiffcultConfig.onRnadomNum; j++) {
                const result = RandomMove(data);
                if (result) {
                    succussCount++;
                    break;
                }
                if (result === 0) break;
            }
        }
        return succussCount / num;
    }

    recordSucceeStep: any[] = [];

    limitLength: number = 1;

    testdata(baseData: NutData, index: number[][] = []) {
        if (this.recordSucceeStep.includes(JSON.stringify(index.slice(0, this.limitLength)))) return false;
        // 检测超时
        if (Date.now() - this.startTime > 5000) return false;

        if (testFail(baseData)) return false;
        // 限制成功次数
        if (this.recordSucc >= this.limitRecordSucc) return true;

        const lastData = index[index.length - 1];
        for (let i = 0; i < baseData.length; i++) {
            const screw = baseData[i];

            const moveSelf = testCanMoveSelf(screw);

            if (!moveSelf) continue;

            for (let j = 0; j < baseData.length; j++) {
                if (lastData && lastData[0] == j && lastData[1] == i) continue;
                if (i == j) continue;

                const clone = cloneObj(baseData);
                const screwOut = clone[i];
                const screwIn = clone[j];

                const length = testCanMoveTo(screwOut, screwIn);

                if (!length) continue;

                const arr = outSameNut(screwOut, length);
                screwIn.nuts.push(...arr);

                unLockNutHide(screwIn, clone);
                if (testSucc(clone)) {
                    this.recordSucc++;
                    if (index.length > 6) this.recordSucceeStep.push(JSON.stringify(index.slice(0, this.limitLength)));
                    this.successSteps.push(index);
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
