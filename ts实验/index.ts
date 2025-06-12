console.log("123");

function test(...param) {
    console.log(`🚀yxl ~ index.ts:5 ~ test ~ param:`, param);

    return function (...param: any) {
        console.log(`🚀yxl ~ index.ts:7 ~ param:`, param);
    };
}
function func(...param) {
    console.log(`🚀yxl ~ index.ts:5 ~ test ~ param:`, param);

    return function (...param: any) {
        console.log(`🚀yxl ~ index.ts:7 ~ param:`, param);
    };
}
function cst(...param) {
    console.log(`🚀yxl ~ index.ts:5 ~ test ~ param:`, param);

    return function (...param: any) {
        console.log(`🚀yxl ~ index.ts:7 ~ param:`, param[1].access.get);
    };
}
function Log(target: any, propertyName: string, index: number) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(propertyName);
    console.log(index);
}

@test(1)
class test2 {
    @cst(3)
    cst = 123;

    @func(2)
    test2(@Log() e: number) {
        console.log(`🚀yxl ~ index.ts:16 ~ test2 ~ e:`, e);
    }

    constructor(@Log() pam: number) {
        console.log(`🚀yxl ~ index.ts:43 ~ test2 ~ constructor ~ pam:`, pam);
    }
}
