// 背景
import { Sprite } from '../base/Sprite.js'
export class BackGround extends Sprite {
    constructor() {
        const image = Sprite.getImage('background')
        // innerHeight 为可视区域的高度
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            window.innerWidth, window.innerHeight)
    }
}