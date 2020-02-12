// 上半部分铅笔

import { Pencil } from './Pencil.js'
import { Sprite } from '../base/Sprite.js'

export class UpPencil extends Pencil {
    constructor(top) {
        const image = Sprite.getImage('pencilUp')
        super(image, top)
    }

    draw() {
        // 只需要确定y坐标
        this.y = this.top - this.height
        super.draw()
    }

}