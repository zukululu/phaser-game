
class Level1 extends Phaser.Scene {
  constructor() {
    super({key:'Level1'})
  }

  preload() {
  }

  create() {
  this.add.text(250, 800, 'Click to start...', {"font":"bold 20px Arial"});
  this.input.keyboard.on('keyup_ENTER', function() {
    this.scene.start('Level2')
  }, this)
  }

  update() {

  }
}