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

    this.anims.create ({
      key: 'left',
      frames: this.anims.generateFrameNumbers('woof', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: 0
  })

    this.anims.create ({
      key: 'right',
      frames: this.anims.generateFrameNumbers('woof', { start: 2, end: 3 }),
      frameRate: 10,
      repeat: 0
  })

    this.anims.create ({
      key: 'idleRight',
      frames: this.anims.generateFrameNumbers('woof', { end: 2 }),
      frameRate: 10,
      repeat: -1
  })

    this.anims.create ({
      key: 'idleLeft',
      frames: this.anims.generateFrameNumbers('woof', { end: 1 }),
      frameRate: 10,
      repeat: -1
  })

    this.physics.add.collider(player, platforms)
    //Player controls

    cursors = this.input.keyboard.createCursorKeys()
  }

  update() {

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
  }

}