interface Array<T> {
    last: T | undefined; // 返回最后一个元素，如果数组为空则返回 undefined
}

Object.defineProperty(Array.prototype, "last", {
    get: function () {
        return this[this.length - 1];
    },
});
