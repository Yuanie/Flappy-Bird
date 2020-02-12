// 导演类 控制游戏的逻辑

import { DataStore } from './base/DataStore.js'
import { UpPencil } from './runtime/UpPencil.js'
import { DownPencil } from './runtime/DownPencil.js'
import { Score } from './player/Score.js'

export class Director {
  constructor() {
    // 获取到那个实例
    // dataStore 保存的就是 key => 精灵实例
    this.dataStore = DataStore.getInstance()
    // 游戏的移动速度 包括地板和铅笔
    this.moveSpeed = 2
  }

  // 如果不存在实例 则新建
  // 否则就返回那个实例
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  // 创建铅笔
  createPencils() {
    // 为了美观 有一个top的上下限值
    let minTop = window.innerHeight / 8
    let maxTop = window.innerHeight / 2

    // 得到一个随机的top
    const top = Math.random() * (maxTop - minTop) + minTop
    // 插入上半部分铅笔和下半部分铅笔
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  birdsEvent() {
    // 小鸟的事件绑定
    // 当点击发生的时候 小鸟的自由落体计时置零
    const birdSprite = this.dataStore.get('birds')
    birdSprite.y = birdSprite.birdY
    birdSprite.time = 0
  }

  // 判断小鸟与铅笔的撞击
  // 为小鸟和铅笔建一个boarder模型方便判断
  isStrike(bird, pencil) {
    let flag = false
    // 记住或运算的顺序
    // 如果碰到上面铅笔的底部或下面铅笔的头部 则游戏结束
    if (bird.right <= pencil.left || bird.left >= pencil.right) {
      // 鸟飞行在铅笔左边或右边 则说明没有进入两个铅笔针锋相对的范围
      flag = true
    } else if (bird.top >= pencil.bottom || bird.bottom <= pencil.top) {
      // 此时鸟进入针峰相对的区域
      // 这里需要注意的是：铅笔以极快的速率来回切换判断
      // 当考虑上铅笔的时候 第一个条件满足 则直接返回没有撞击
      // 当考虑下铅笔的时候 第一个条件显然不满足 从而去判断第二个条件
      flag = true
    }
    return !flag
  }

  // 检查小鸟是否撞击地板和铅笔
  check() {
    // 撞击地板 游戏结束
    const birds = this.dataStore.get('birds')
    const land = this.dataStore.get('land')
    const pencils = this.dataStore.get('pencils')
    const score = this.dataStore.get('score')

    if (birds.birdY + birds.birdWidth >= land.y) {
      console.log('撞击地板！')
      this.isGameOver = true
      return
    }

    // 撞击天花板
    if (birds.birdY <= 0) {
      console.log('撞击天花板！')
      this.isGameOver = true
      return
    }
    const length = pencils.length
    // 小鸟模型
    const birdBoarder = {
      top: birds.birdY,
      bottom: birds.birdY + birds.birdHeight,
      left: birds.birdX,
      right: birds.birdX + birds.birdWidth
    }
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i]
      // 铅笔模型
      const pencilBoarder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width
      }
      // 循环判断每只铅笔与小鸟的碰撞情况
      if (this.isStrike(birdBoarder, pencilBoarder)) {
        this.isGameOver = true
      }
    }

    // 加分逻辑
    // 为了保证每过一个铅笔只加1分 设立一个变量 canScore
    if (
      birds.birdX >= pencils[0].x + pencils[0].width &&
      this.dataStore.canScore
    ) {
      this.dataStore.canScore = false
      score.scoreNumber += 1
    }
  }

  run() {
    this.check()
    if (!this.isGameOver) {
      this.dataStore.get('background').draw()

      // 铅笔的创建与销毁逻辑
      const pencils = this.dataStore.get('pencils')
      // 铅笔何时销毁呢？
      // 铅笔在第一组铅笔右端到达左侧屏幕时且此时铅笔数量为4 则对第一组铅笔进行销毁
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        // 前面弹出进行销毁
        pencils.shift()
        pencils.shift()
        // 每销毁一组铅笔 就又可以加分了
        this.dataStore.canScore = true
      }
      // 铅笔何时创建呢？
      // 当屏幕只剩下一组铅笔且它的x超过了一定值的时候 则创建一组铅笔
      if (
        pencils.length === 2 &&
        pencils[0].x <= (window.innerWidth - pencils[0].width) / 2
      ) {
        this.createPencils()
      }
      // 绘制铅笔数组的每一个铅笔
      // 为了能让陆地遮住铅笔 顺序很重要
      this.dataStore.get('pencils').forEach(ele => {
        ele.draw()
      })
      this.dataStore.get('land').draw()
      this.dataStore.get('score').draw()
      this.dataStore.get('birds').draw()

      // 动画 requestAnimationFrame函数 能自动调配速率 适应浏览器
      // 性能优于 setTimeout 和 setTimeInterval
      let timer = requestAnimationFrame(() => this.run())
      this.dataStore.put('timer', timer)
    } else {
      // 游戏结束
      console.log('游戏结束')
      const curScore = this.dataStore.get('score').scoreNumber
      const highestScore = this.dataStore.get('score').highestScore
      if (highestScore < curScore) {
        //  如果打破纪录
        sessionStorage.setItem('highScore', curScore)
        this.dataStore.get('score').highestScore = curScore
        alert('打破纪录！')
      }
      this.dataStore.get('start').draw()
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destroy()
    }
  }
}
