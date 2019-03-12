let platforms
let player
let cursors
let moveKeys

class Level2 extends Phaser.Scene {
  constructor() {
    super({key: 'Level2'})
  }

  preload() {
    this.load.image('bg', 'assets/the-end-by-iloe-and-made.jpg')
    this.load.image('sample', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('bullet', 'assets/bullet.png')
    this.load.spritesheet('woof', 'assets/woof.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
  }
  

  create() {
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2)
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2)

    this.add.image(0, 0, 'bg').setOrigin(0)
    // this.add.image(1920, 0, 'bg').setOrigin(0).setFlipX(true)
    this.add.image(0, 1080, 'bg').setOrigin(0).setFlipY(true)
    // this.add.image(1920, 1080, 'bg').setOrigin(0).setFlipX(true).setFlipY(true)

    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level1')
    }, this)
    
    platforms = this.physics.add.staticGroup()
    platforms.create(400, 600, 'ground').setScale(2).refreshBody()
    
    player = this.physics.add.sprite(100, 300, 'woof')
    enemy = this.physics.add.sprite(300, 300, 'dude')
    player.setCollideWorldBounds(true)
    this.physics.add.collider(player, platforms)
    this.physics.add.collider(enemy, platforms)

    this.cameras.main.startFollow(player, true, 0.05, 0.05)

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

  cursors = this.input.keyboard.createCursorKeys()
}

  update(time, delta) {
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