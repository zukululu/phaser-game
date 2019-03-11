let platforms
let ground

class Level2 extends Phaser.Scene {
  constructor() {
    super({key: 'Level2'})
  }


  preload() {
    this.load.image('sample', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.spritesheet('woof', 'assets/woof.png', 32, 32, 4)
  }

  create() {
    this.add.image(400, 300, 'sample')
    console.log('hit enter to go back')
    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level1')
    }, this)

    ground = this.add.sprite(400, 500, 'ground')
    ground.scaleX = 2
    ground.scaleY = 2
    console.log(this.scene)
  }

  update() {
  }

}