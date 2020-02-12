// 铅笔的基类
import { Sprite } from '../base/Sprite.js'
import { Director } from '../Director.js'

export class Pencil extends Sprite {
    // 个人理解 top表示的是上半部分铅笔头的y坐标
    constructor(image, top) {
        super(image, 0, 0,
            image.width, image.height,
            // 首先绘制在最右边 刚好看不到的位置
            window.innerWidth, 0, image.width, image.height)
        this.top = top
    }

    draw() {
        // 移动与陆地保持一致
        this.x -= Director.getInstance().moveSpeed
        super.draw(this.image, 0, 0,
            this.width, this.height,
            this.x, this.y, this.width, this.height)
    }
}