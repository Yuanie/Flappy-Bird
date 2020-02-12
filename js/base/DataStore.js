// 变量缓存 方便在不同的类中访问和修改变量
export class DataStore {

    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore()
        }
        return DataStore.instance
    }

    constructor() {
        // 变量创建保存到map中
        this.map = new Map()
        // 可以加分
        this.canScore = true
    }

    put(key, value) {
        // 创建一个链式调用的赋值方法
        // ES6将类也作为函数
        if (typeof value === 'function') {
            value = new value()
        }
        this.map.set(key, value)
        return this
    }

    get(key) {
        return this.map.get(key)
    }

    // 销毁
    destroy() {
        for (let value of this.map.values()) {
            value = null
        }
    }

}