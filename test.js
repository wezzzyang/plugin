class test {
    waitKey = {};
    /**
     * 等待
     * waitKey: 等待的key
     * time: 毫秒 1000， 如果时间存在再一定时间后释放 （不设置时间需要手动消除）
     * 设置  type: throttling 节流 debounce 防抖
     */
    onAwait(waitKey, time = 0, isDebunce = true) {
        const key = this.waitKey[waitKey];
        if (time !== 0) {
            if (key) {
                // 节流则不重新计算
                if (isDebunce) {
                    return key;
                }
                clearTimeout(this.waitKey[waitKey]);
            }
            this.waitKey[waitKey] = setTimeout(() => {
                this.unlockAwait(waitKey);
            }, time);
        } else {
            this.waitKey[waitKey] = 1;
        }
        return key;
    }

    /**
     * 解除等待
     */
    unlockAwait(waitKey) {
        delete this.waitKey[waitKey];
    }
}

const t = new test();
const a = t.onAwait("test", 1000, false);

console.log(`🚀yxl ~ test.js:38 ~ a:`, a);

setTimeout(() => {
    const a = t.onAwait("test", 1000, false);

    console.log(`🚀yxl ~ test.js:38 ~ a:`, a);
}, 500);

setTimeout(() => {
    const a = t.onAwait("test", 1000, false);

    console.log(`🚀yxl ~ test.js:38 ~ a:`, a);
}, 1000);

setTimeout(() => {
    const a = t.onAwait("test", 1000, false);

    console.log(`🚀yxl ~ test.js:38 ~ a:`, a);
}, 1500);
