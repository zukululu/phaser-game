class Boss extends Phaser.Scene {
  constructor() {
    super({key: 'Boss'})

    this.map
    this.groundLayer, this.coinLayer
    this.platforms
    this.player
    this.cursors
    this.moveKeys
    this.enemy
    this.bullet
    this.bullets
    this.space
    this.facing = 'left'
    this.scaleRatio = window.devicePixelRatio / 3
    this.hopper
    this.camera

  }

  preload() {
    this.load.image('sample', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('bullet', 'assets/bullet.png')
    this.load.spritesheet('woof', 'assets/woof.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
    this.load.tilemapTiledJSON('map', 'assets/map.json')
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70})
    this.load.image('coin', 'assets/coinGold.png')
    this.load.atlas('player', 'assets/player.png', 'assets/player.json')
    this.load.image('smallGround', 'assets/smallPlatform.png')
    this.load.image('ladder', 'assets/ladder.png')
    this.load.image('tinyPlatform', 'assets/tinyPlatform.png')
    this.load.image('mediumPlatform', 'assets/mediumPlatform.png')
    this.load.image('door', 'assets/door.png')
    this.load.image('floor', 'assets/ground.png')
    this.load.image('mediumGround', 'assets/mediumGround.png')
    this.load.image('tinyGround', 'assets/tinyGround.png')
    this.load.image('platformCover', 'assets/platformCover.png')
    this.load.image('smallCover', 'assets/smallGround.png')
  }

  create() {
    this.player = this.physics.add.sprite(100, 1700, 'woof')
    this.player.setActive(true)
    this.player.setCollideWorldBounds(true)
    this.player.canClimb = false
    this.player.canJump = true

    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(300, 1800, 'ground').setScale(2).refreshBody()

    this.cameras.main.startFollow(this.player)

    this.physics.add.collider(this.player, this.platforms)
    
    this.cursors = this.input.keyboard.createCursorKeys()
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

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
    
  }

  update() {
    console.log(this.cursors)

    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160)
        this.player.anims.play('left', true)
        this.player.flipX = false
        this.facing = 'left'
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160)
        this.player.anims.play('left', true)
        this.player.flipX = true
        this.facing = 'right'
    }
    else
    {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.setVelocityY(-370);
    }

  }

}