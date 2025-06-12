"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
console.log("123");
function test(...param) {
    console.log(`🚀yxl ~ index.ts:5 ~ test ~ param:`, param);
    return function (...param) {
        console.log(`🚀yxl ~ index.ts:7 ~ param:`, param);
    };
}
function func(...param) {
    console.log(`🚀yxl ~ index.ts:5 ~ test ~ param:`, param);
    return function (...param) {
        console.log(`🚀yxl ~ index.ts:7 ~ param:`, param);
    };
}
function cst(...param) {
    console.log(`🚀yxl ~ index.ts:5 ~ test ~ param:`, param);
    return function (...param) {
        console.log(`🚀yxl ~ index.ts:7 ~ param:`, param[1].access.get);
    };
}
function Log(target, propertyName, index) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(propertyName);
    console.log(index);
}
let test2 = (() => {
    let _classDecorators = [test(1)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _cst_decorators;
    let _cst_initializers = [];
    let _cst_extraInitializers = [];
    let _test2_decorators;
    var test2 = _classThis = class {
        test2(e) {
            console.log(`🚀yxl ~ index.ts:16 ~ test2 ~ e:`, e);
        }
        constructor(pam) {
            this.cst = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _cst_initializers, 123));
            __runInitializers(this, _cst_extraInitializers);
            console.log(`🚀yxl ~ index.ts:43 ~ test2 ~ constructor ~ pam:`, pam);
        }
    };
    __setFunctionName(_classThis, "test2");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _cst_decorators = [cst(3)];
        _test2_decorators = [func(2)];
        __esDecorate(_classThis, null, _test2_decorators, { kind: "method", name: "test2", static: false, private: false, access: { has: obj => "test2" in obj, get: obj => obj.test2 }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _cst_decorators, { kind: "field", name: "cst", static: false, private: false, access: { has: obj => "cst" in obj, get: obj => obj.cst, set: (obj, value) => { obj.cst = value; } }, metadata: _metadata }, _cst_initializers, _cst_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        test2 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return test2 = _classThis;
})();
