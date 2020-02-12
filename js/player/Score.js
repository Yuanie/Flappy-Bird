import { DataStore } from '../base/DataStore.js'

// 计分器的实现
// 记录当前得分与历史最高分
export class Score {
  constructor() {
    this.ctx = DataStore.getInstance().ctx
    this.scoreNumber = 0
    this.highestScore = sessionStorage.getItem('highScore') || 0
  }

  draw() {
    //  创建一个渐变的字体颜色
    // Create gradient
    const grd = this.ctx.createRadialGradient(
      135.0,
      135.0,
      0.0,
      135.0,
      135.0,
      150.0
    )

    // Add colors
    grd.addColorStop(0.0, 'rgba(34, 10, 10, 1.000)')
    grd.addColorStop(0.0, 'rgba(234, 189, 12, 1.000)')
    grd.addColorStop(0.243, 'rgba(34, 10, 10, 1.000)')
    grd.addColorStop(0.247, 'rgba(255, 255, 255, 1.000)')
    grd.addColorStop(0.991, 'rgba(35, 1, 4, 1.000)')

    // Fill with gradient
    this.ctx.fillStyle = grd
    this.ctx.font = '24px Arial'
    this.ctx.fillText(
      this.scoreNumber,
      window.innerWidth / 2,
      window.innerHeight / 18,
      1000
    )
    const str = 'Record: '
    this.ctx.font = '16px Arial'
    this.ctx.fillText(
      str + this.highestScore,
      window.innerWidth / 18,
      window.innerHeight / 18,
      1000
    )
  }
}
