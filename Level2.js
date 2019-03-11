let platforms
let player
let cursors

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
    
    platforms = this.physics.add.staticGroup()
    
    platforms.create(400, 600, 'ground').setScale(2).refreshBody()

    player = this.physics.add.sprite(100, 300, 'woof')
    player.setCollideWorldBounds(true)
    
    //Player controls

    cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    if(cursors.up.isDown) {
      player.y -=10
    }
  }

}