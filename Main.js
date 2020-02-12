// 初始化整个游戏的精灵
// 游戏开始的入口
import { ResourceLoader } from './js/base/ResourceLoader.js'
import { Director } from './js/Director.js'
import { BackGround } from './js/runtime/BackGround.js'
import { DataStore } from './js/base/DataStore.js'
import { Land } from './js/runtime/Land.js'
import { Birds } from './js/player/Birds.js'
import { StartButton } from './js/player/StartButton.js'
import { Score } from './js/player/Score.js'

export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas')
        this.ctx = this.canvas.getContext('2d')
        // 不采用new 创建实例 而是直接返回现有实例
        this.dataStore = DataStore.getInstance()
        // 创建资源加载实例
        const loader = ResourceLoader.create()
        // 总导演实例
        this.director = Director.getInstance()
        // 加载图片 加载完后调用回调
        loader.onLoaded(map => this.onResourceFirstLoaded(map))

    }
    onResourceFirstLoaded(map) {
        // 图片资源加载完后才调用
        // 将ctx和图片等静态，不发生改变的资源文件赋值到实例属性
        // 从而避免销毁重建
        this.dataStore.ctx = this.ctx
        this.dataStore.resource = map
        this.init()
    }

    init() {
        // 判断游戏结束
        this.director.isGameOver = false
        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('start', StartButton)
            .put('score', Score)
        // 运行前先创建铅笔数组
        this.director.createPencils()
        this.registerEvent()
        // 将绘制 逻辑等交给 director来实现
        this.director.run()
    }

    registerEvent() {
        this.canvas.addEventListener('touchstart', (e) => {
            // 屏蔽掉js的默认点击事件
            e.preventDefault()
            // 如果游戏结束
            if (this.director.isGameOver) {
                this.init()
            } else {
                // 否则给小鸟绑定事件
                this.director.birdsEvent()
            }
        })
    }
}