
class Level2 extends Phaser.Scene {
  constructor() {
    super({key: 'Player'})
  this.player
  this.cursors
  this.moveKeys
  }

  preload() {
    this.load.image('bg', 'assets/the-end-by-iloe-and-made.jpg')
    this.load.image('sample', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.spritesheet('woof', 'assets/woof.png', { frameWidth: 32, frameHeight: 32 })
  }
  
  create() {
    this.player = this.physics.add.sprite(100, 300, 'woof')
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2)
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2)

    this.add.image(0, 0, 'bg').setOrigin(0)
    // this.add.image(1920, 0, 'bg').setOrigin(0).setFlipX(true)
    this.add.image(0, 1080, 'bg').setOrigin(0).setFlipY(true)
    // this.add.image(1920, 1080, 'bg').setOrigin(0).setFlipX(true).setFlipY(true)

    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level1')
    }, this)
    
    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 600, 'ground').setScale(2).refreshBody()
    
    // this.enemy = this.physics.add.sprite(300, 300, 'dude')
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.enemy, this.platforms)

    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)

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

  this.cursors = this.input.keyboard.createCursorKeys()
}

  update() {
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
        this.player.flipX = false
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('left', true);
        this.player.flipX = true
    }
    else
    {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }
  }
}