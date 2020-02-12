// 小鸟类
// 小鸟扇动翅膀的本质就是不断地循环渲染三张图片
import { Sprite } from "../base/Sprite.js";

export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds')
        super(image, 0, 0, image.width, image.height,
            0, 0, image.width, image.height)
        // 小鸟剪裁需要知道的参数
        // 初始化
        // 小鸟的外边距为9 两只小鸟间距为18 小鸟的宽度为34
        this.birdWidth = 34
        this.birdHeight = 24
        // 有3只小鸟 用数组分别保存它们的截取参数
        // 3种状态小鸟的截取初始x
        this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18]
        // 3种状态小鸟的截取初始y, 三只小鸟距离顶部的间距为10
        // 由于截取宽度和高度都一样 不用数组保存
        this.clippingY = 10
        this.clippingWidth = 34
        this.clippingHeight = 24
        // 初始小鸟出现的位置
        this.birdX = window.innerWidth / 4
        this.birdY = window.innerHeight / 2
        // 切换速度
        this.switchSpeed = 1 / 10
        // 记录循环索引和时间
        // 计数
        this.count = 0
        this.index = 0
        this.time = 0
    }

    draw() {
        // 由于浏览器刷新大概为60s一次
        this.count += this.switchSpeed
        if (this.count >= 3) {
            this.count = 0
        }
        // 减速器 和 循环
        this.index = Math.floor(this.count) % 3

        // 模拟重力加速度
        const g = 1
        // 为了保证掉落的时候有一个向上升的过程
        const offsetUp = 15
        // y的偏移
        const offsetY = (g * (this.time - offsetUp)) / 2
        this.birdY += offsetY
        this.time++
        super.draw(this.img, this.clippingX[this.index],
            this.clippingY, this.clippingWidth, this.clippingHeight,
            this.birdX, this.birdY, this.birdWidth, this.birdHeight)
    }
}