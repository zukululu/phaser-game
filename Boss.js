class Boss extends Phaser.Scene {
  constructor() {
    super({key: 'Boss'})
  }

  preload() {
    console.log(this)
    console.log(this.scale.gameSize._height)
    // this.scale.gameSize._width = 4000
  }

  create() {

  }

  update() {

  }

}