
class Level1 extends Phaser.Scene {
  constructor() {
    super({key:'Level1'})
  }

  preload() {
    this.load.image('play', 'assets/play.png')
  }

  create() {
  this.cameras.main.setBackgroundColor('#222034')
  this.add.image(250, 1000, 'play')
  this.input.keyboard.on('keyup_ENTER', function() {
    this.scene.start('Boss')
  }, this)
  }

  update() {

  }
}