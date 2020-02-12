import { Sprite } from "../base/Sprite.js";

// 开始按钮类

export class StartButton extends Sprite {
    constructor() {
        const image = Sprite.getImage('startButton')
        const offsetUp = 70
        super(image, 0, 0,
            image.width, image.height,
            (window.innerWidth - image.width) / 2, (window.innerHeight) / 2 - offsetUp,
            image.width, image.height)
    }

}