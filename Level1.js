
class Level1 extends Phaser.Scene {
  constructor() {
    super({key:'Level1'})
  }

  preload() {
    // this.load.image('ground', 'assets/platform.png')
  }

  create() {
  this.add.text(77, 112, 'Click to start...', {"font":"bold 20px Arial"});
  this.input.keyboard.on('keyup_ENTER', function() {
    this.scene.start('Level2')
  }, this)

  }

  update() {

  }
}

// Level1.prototype.afterCreate = function() {
//   let startKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER)
//   startKey.onDown.add(this.startGame, this)
// }

// Level1.prototype.startGame = function() {
//   console.log('hello')
// }