let platforms
let player
class Level2 extends Phaser.Scene {
  constructor() {
    super({key: 'Level2'})
  }

  preload() {
    this.load.image('sample', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.spritesheet('woof', 'assets/woof.png', { frameWidth: 32, frameHeight: 32 })
  }

  create() {
    this.add.image(400, 300, 'sample')

    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level1')
    }, this)
    
    platforms = this.add.group()
    platforms.enableBody = true
    let ground = platforms.create(400, 500, 'ground')
    ground.scaleX = 2
    ground.scaleY = 2

    player = this.add.group()
    player.enableBody = true
    let homie = player.create(100, 300, 'woof')
    console.log(this.physics)
    console.log(homie.body)

    //Player controls
    


  }

  update() {
  }

}