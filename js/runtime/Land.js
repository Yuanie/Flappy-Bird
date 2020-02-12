// 不断移动的陆地
import { Sprite } from '../base/Sprite.js'
import { Director } from '../Director.js'

export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land')
        super(image, 0, 0, image.width, image.height,
            0, window.innerHeight - image.height,
            image.width, image.height)

        // 地板的变化坐标和移动速度
        this.landX = 0
        this.landSpeed = Director.getInstance().moveSpeed
    }

    // 地板需要不断地移动
    // 这里就需要在子类中重新设置方法
    draw() {
        // 从右向左移动
        // 地板的移动本质上就是不断地改变放置的x坐标然后重绘
        this.landX += this.landSpeed
        // 为了造成视觉的不冲突 只要地板可移动宽度小于 window.innerWidth 则置零
        if (this.landX >= this.img.width - window.innerWidth) {
            this.landX = 0
        }
        super.draw(this.img, this.srcX, this.srcY,
            this.srcW, this.srcH, -this.landX, this.y,
            this.width, this.height)
    }
}