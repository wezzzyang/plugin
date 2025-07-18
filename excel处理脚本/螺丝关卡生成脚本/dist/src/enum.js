"use strict";
/** 创建螺柱 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutScrewEnum = exports.NutScrewObstacleEnum = exports.NutObstacleEnum = exports.NutEnum = void 0;
var NutEnum;
(function (NutEnum) {
    /** 螺母1 */
    NutEnum[NutEnum["nut1"] = 1] = "nut1";
    /** 螺母2 */
    NutEnum[NutEnum["nut2"] = 2] = "nut2";
    NutEnum[NutEnum["nut3"] = 3] = "nut3";
    NutEnum[NutEnum["nut4"] = 4] = "nut4";
    NutEnum[NutEnum["nut5"] = 5] = "nut5";
    NutEnum[NutEnum["nut6"] = 6] = "nut6";
    NutEnum[NutEnum["nut7"] = 7] = "nut7";
    NutEnum[NutEnum["nut8"] = 8] = "nut8";
    NutEnum[NutEnum["nut9"] = 9] = "nut9";
    NutEnum[NutEnum["nut10"] = 10] = "nut10";
    NutEnum[NutEnum["nut11"] = 11] = "nut11";
})(NutEnum || (exports.NutEnum = NutEnum = {}));
/** 螺母障碍类型 */
var NutObstacleEnum;
(function (NutObstacleEnum) {
    /** 普通类型 */
    NutObstacleEnum[NutObstacleEnum["normal"] = 0] = "normal";
    /** 位置类型 */
    NutObstacleEnum[NutObstacleEnum["unkown"] = 1] = "unkown";
})(NutObstacleEnum || (exports.NutObstacleEnum = NutObstacleEnum = {}));
/** 螺母棍障碍类型 */
var NutScrewObstacleEnum;
(function (NutScrewObstacleEnum) {
    /** 普通类型 */
    NutScrewObstacleEnum[NutScrewObstacleEnum["normal"] = 0] = "normal";
    /** 看广告 */
    NutScrewObstacleEnum[NutScrewObstacleEnum["AD"] = 1] = "AD";
    /** 遮蔽 */
    NutScrewObstacleEnum[NutScrewObstacleEnum["Hide"] = 2] = "Hide";
    /** 不让移动 */
    NutScrewObstacleEnum[NutScrewObstacleEnum["UnMove"] = 3] = "UnMove";
})(NutScrewObstacleEnum || (exports.NutScrewObstacleEnum = NutScrewObstacleEnum = {}));
/** 螺母棍类型 */
var NutScrewEnum;
(function (NutScrewEnum) {
    /** 普通类型 */
    NutScrewEnum[NutScrewEnum["normal"] = 0] = "normal";
})(NutScrewEnum || (exports.NutScrewEnum = NutScrewEnum = {}));
