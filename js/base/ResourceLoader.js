// 资源文件加载器 确保canvas在图片加载之后才开始渲染
import { Resources } from './Resources.js'
export class ResourceLoader {
    constructor() {
        this._map = new Map(Resources)
        for (let [key, val] of this._map) {
            const image = new Image()
            // wx.createImage()
            image.src = val
            // key => Image对象
            this._map.set(key, image)
        }
    }

    // 保证资源加载一次
    // 当加载完成后就调用回调函数 callback
    onLoaded(callback) {
        let loadedCnt = 0
        for (let value of this._map.values()) {
            value.onload = () => {
                loadedCnt++
                if (loadedCnt >= this._map.size) {
                    callback(this._map)
                }
            }
        }
    }

    static create() {
        return new ResourceLoader()
    }
}