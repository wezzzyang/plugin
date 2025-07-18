/** 创建螺柱 */

export enum NutEnum {
    /** 螺母1 */
    nut1 = 1,
    /** 螺母2 */
    nut2,
    nut3,
    nut4,
    nut5,
    nut6,
    nut7,
    nut8,
    nut9,
    nut10,
    nut11,
}

/** 螺母障碍类型 */
export enum NutObstacleEnum {
    /** 普通类型 */
    normal,
    /** 位置类型 */
    unkown,
}

/** 螺母棍障碍类型 */
export enum NutScrewObstacleEnum {
    /** 普通类型 */
    normal,
    /** 看广告 */
    AD,
    /** 遮蔽 */
    Hide,
    /** 不让移动 */
    UnMove,
}

/** 螺母棍类型 */
export enum NutScrewEnum {
    /** 普通类型 */
    normal,
}

export type NutData = {
    id: string;
    /** 螺丝障碍类型 */
    nutScrewObstacleType: NutScrewObstacleEnum;
    /** 螺丝障碍解锁条件 */
    nutScrewObstacleData?: {
        /** 解锁所需螺母 */
        unLockNutType?: NutEnum;
        /** 螺棍所需螺母颜色完成 */
        needNutType?: NutEnum;
    };
    /** 螺丝类型 */
    nutScrewType: NutScrewEnum;
    /** 螺丝高度 */
    nutScrewHeight: number;
    /** 螺母 */
    nuts: {
        id: string;
        /** 螺母类型 */
        nutType: NutEnum;
        /** 螺母障碍类型 */
        nutObstacleType: NutObstacleEnum;
    }[];
}[];
