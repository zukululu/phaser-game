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
    this.load.image('sideWall', 'assets/side wall.png')
    this.load.image('otherSide', 'assets/otherSide.png')
    this.load.image('longLadder', 'assets/longLadder.png')
    this.load.image('rock', 'assets/rock.png')
    this.load.image('rocksText', 'assets/rocksText.png')
  }

  create() {
    
    this.platforms = this.physics.add.staticGroup()
    this.platform = this.platforms.create(300, 1800, 'ground').setScale(2).refreshBody()
    this.platforms.create(300, 1200, 'ground').setScale(2).refreshBody()
    this.platforms.create(40, 1400, 'tinyGround').refreshBody()
    this.platforms.create(560, 1400, 'tinyGround').refreshBody()
    this.ladders = this.physics.add.staticGroup()
    this.ladders.create(110, 1460, 'longLadder').setScale(0.55).refreshBody()
    this.ladders.create(500, 1460, 'longLadder').setScale(0.55).refreshBody()
    
    this.add.image(300, 1820, 'floor').setScale(2)
    this.add.image(-200, 1600, 'sideWall').setScale(2)
    this.add.image(-200, 1000, 'sideWall').setScale(2)
    this.add.image(800, 1600, 'otherSide').setScale(2)
    this.add.image(800, 1000, 'otherSide').setScale(2)
    this.add.image(300, 1500, 'rocksText').setScale(2)

    this.rock1 = this.physics.add.sprite(200, 1270, 'rock').setScale(1.5)
    this.rock1.body.allowGravity = false
    this.rock1.hp = 5

    this.rock2 = this.physics.add.sprite(300, 1270, 'rock').setScale(1.5)
    this.rock2.body.allowGravity = false
    this.rock2.hp = 5

    this.rock3 = this.physics.add.sprite(400, 1270, 'rock').setScale(1.5)
    this.rock3.body.allowGravity = false
    this.rock3.hp = 5
    
    this.player = this.physics.add.sprite(100, 1700, 'woof')
    this.player.setActive(true)
    this.player.setCollideWorldBounds(true)
    this.player.canClimb = false
    this.player.canJump = true
    
    this.enemy = this.physics.add.sprite(400, 1600, 'dude').setScale(2)
    this.enemy.body.setCollideWorldBounds(true)
    this.enemy.body.onWorldBounds = true
    this.enVelo = -200
    this.enemy.setVelocityX(this.enVelo)
    
    this.cameras.main.startFollow(this.player)    
    this.cameras.main.setBackgroundColor('#222034')

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.enemy, this.platforms)

    this.physics.add.overlap(this.player, this.enemy, this.enemyCollision, null, this)
    this.physics.add.overlap(this.player, this.ladders, this.climb, null, this)
    this.physics.add.overlap(this.rock1, this.enemy, function() {
      this.scene.start('Win')
    }, null, this)
    this.physics.add.overlap(this.rock2, this.enemy, function() {
      this.scene.start('Win')
    }, null, this)
    this.physics.add.overlap(this.rock3, this.enemy, function() {
      this.scene.start('Win')
    }, null, this)

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

  enemyCollision() {
    if(this.enemy.active === true)
    this.scene.start('Death')
    //   this.player.setActive(false).setVisible(false)
  }

  launchBullet() {
    //Create and initialize bullet properties
    this.bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet')
    this.physics.add.overlap(this.bullet, this.rock1, this.dropRock, null, this)
    this.physics.add.overlap(this.bullet, this.rock2, this.dropRock, null, this)
    this.physics.add.overlap(this.bullet, this.rock3, this.dropRock, null, this)
    this.bullet.body.allowGravity = false
    this.bullet.body.setCollideWorldBounds(true)
    this.bullet.body.onWorldBounds = true
    //Shoot in faced direction
    if(this.facing === 'right')
      this.bullet.body.velocity.x = 400
    else if (this.facing === 'left')
    this.bullet.body.velocity.x = -400
  
    //function to delete bullet after leaving view
    this.bullet.body.world.on('worldbounds', function(body){
      if(body.gameObject === this) {
        this.setActive(false).setVisible(false)
      }
    }, this.bullet)
  }

  climb() {
    if(this.player.x <= this.ladders.x + 10 || this.player.x >= this.ladders.x - 10) {
    this.player.canClimb = true
    console.log('climb activated')
    }
  }

  dropRock(bullet, rock) {
    bullet.destroy()
    rock.hp--
    if(rock.hp === 0)
      rock.setVelocityY(600)
  }

  flipBoss() {
    this.enVelo *= -1
    this.enemy.setFlipX(true)
  }

  update() {
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160)
        this.player.anims.play('left', true)
        this.player.flipX = false
        this.facing = 'left'
    } //run left
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160)
        this.player.anims.play('left', true)
        this.player.flipX = true
        this.facing = 'right'
    } //run right
    else
    {
        this.player.setVelocityX(0);
    } //stop player when not pressing anything

    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        this.player.setVelocityY(-370);
    } //jump

    if(Phaser.Input.Keyboard.JustDown(this.space)) {
      this.launchBullet()
    } //shoot

    if (this.enemy) {
      this.physics.world.on('worldbounds', this.flipBoss ,this);
    }

    this.enemy.body.velocity.x = this.enVelo
  } //end update

} // end boss class