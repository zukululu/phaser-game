class Level2 extends Phaser.Scene {
  constructor() {
    super({key: 'Level2'})
  this.platforms
  this.player
  this.cursors
  this.moveKeys
  this.enemy
  this.bullet
  this.bullets
  this.space
  this.facing = 'left'
  }

  preload() {
    console.log('preload')
    this.load.image('bg', 'assets/the-end-by-iloe-and-made.jpg')
    this.load.image('sample', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('bullet', 'assets/bullet.png')
    this.load.spritesheet('woof', 'assets/woof.png', { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
  }
  
  create() {
    console.log('create')
    //Sample scene transition
    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level1')
    }, this)
    
    //World Creation
    console.log(this)
    console.log(this.cameras.cameras[0].displayHeight)
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2)
    this.physics.world.setBounds(0, 0, 1920, 1080)

    this.add.image(0, 0, 'bg').setOrigin(0)
    // this.add.image(1920, 0, 'bg').setOrigin(0).setFlipX(true)
    this.add.image(0, 1080, 'bg').setOrigin(0).setFlipY(true)
    // this.add.image(1920, 1080, 'bg').setOrigin(0).setFlipX(true).setFlipY(true)
    
    //Dummy Platform
    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 600, 'ground').setScale(2).refreshBody()
    
    //Player creation
    this.player = this.physics.add.sprite(100, 300, 'woof')
    this.enemy = this.physics.add.sprite(300, 300, 'dude')
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.enemy, this.platforms)

    //Enemy Collision
    this.physics.add.overlap(this.player, this.enemy, this.enemyCollision, null, this)

    //Camera
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
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  enemyCollision() {
    this.player.setActive(false).setVisible(false)
  }

  launchBullet() {
      //Create and initialize bullet properties
      this.bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet')
      this.physics.add.overlap(this.bullet, this.enemy, this.bulletHit, null, this)
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

  bulletHit(bullet, enemy) {
    this.enemy.setActive(false).setVisible(false)
    this.bullet.destroy()
    console.log('dead?')
    console.log(this.enemy)
  }

  enemyChase() {
    // console.log(this.enemy.x)
    // console.log(this.player.x)
    // if(this.enemy.x)
    // console.log('exists')
    if(this.enemy.x < this.player.x) {
      this.enemy.setVelocityX(80)
    } else if (this.enemy.x > this.player.x) {
      this.enemy.setVelocityX(-80)
    } else {
      return
    }
  }

  update() {
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

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }

    if(Phaser.Input.Keyboard.JustDown(this.space)) {
        this.launchBullet()
    }

    console.log('updating...')
      if(this.player.x <= this.enemy.x + 500 || this.player.x <= this.enemy.x - 500 && this.player.y === this.enemy.y) {
        this.enemyChase()
    }
  }
}