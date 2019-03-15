class Level2 extends Phaser.Scene {
  constructor() {
    super({key: 'Level2'})
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
  }

  preload() {
    console.log('preload')
    this.load.image('bg', 'assets/the-end-by-iloe-and-made.jpg')
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
  }
  
  create() {
    console.log('create')
    //Sample scene transition
    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level1')
    }, this)
    
    //World Creation
    // this.cameras.main.setBounds(0, 0, 600 , 2000 )
    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(300, 1800, 'ground').setScale(2).refreshBody()
    this.platforms.create(400, 1700, 'smallGround').refreshBody()
    this.platforms.create(500, 1625, 'smallGround').refreshBody()
    this.platforms.create(0, 1525, 'ground').refreshBody()
    this.ladders = this.physics.add.staticGroup()
    this.ladders.create(180, 1300, 'ladder').setScale(0.5).refreshBody()
    this.platforms.create(100, 1200, 'smallGround').refreshBody()
    
    //Player creation
    this.player = this.physics.add.sprite(100, 1700, 'woof')
    this.player.setActive(true)
    this.player.setCollideWorldBounds(true)
    this.player.canClimb = false
    console.log(this.player)
    
    //Enemies Creation
    this.enemy = this.physics.add.sprite(100, 1300, 'dude')
    // console.log(this.enemy)

    this.flyingEnemy = this.physics.add.sprite(500, 1300, 'dude')
    this.flyingEnemy.setDepth(1)
    this.flyingEnemy.body.allowGravity = false
    this.flyingEnemy.lastFire = 0
    console.log(this.flyingEnemy)

    this.flyingEnemy2 = this.physics.add.sprite(700, 300, 'dude')
    this.flyingEnemy2.setDepth(1)
    this.flyingEnemy2.body.allowGravity = false
    this.flyingEnemy2.lastFire = 0
    
    
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.enemy, this.platforms)

    this.physics.add.overlap(this.player, this.ladders, this.climb, null, this)
    this.physics.add.overlap(this.player, this.platforms, this.noClimb, null, this)
    
    //Enemy Collision
    this.physics.add.overlap(this.player, this.enemy, this.enemyCollision, null, this)

    //Camera
    this.cameras.main.startFollow(this.player)

    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');
    

    
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
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
  }

  climb() {
    this.player.canClimb = true
  }

  enemyCollision() {
    if(this.enemy.active === true)
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
    if(enemy.active === true) {
      this.physics.world.removeCollider(this.enemy);
      this.enemy.setActive(false).setVisible(false)
      bullet.destroy()
    }
  }

  enemyChase() {
    console.log(`player is ${this.player.y}`)
    console.log(this.enemy.y)
    if(this.enemy.x < this.player.x) {
      this.enemy.setVelocityX(50)
      this.enemy.flipX = true
    } else if (this.enemy.x > this.player.x) {
      this.enemy.flipX = false
      this.enemy.setVelocityX(-50)
    }
  }

  enemyFire(enemy, time) {
    if(enemy.active === false)
      return

    if((time - enemy.lastFire) > 1000) {
      enemy.lastFire = time
     //Create bullet
    this.enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'bullet')
    this.physics.add.overlap(this.enemyBullet, this.player, this.bulletCollision, null, this)
    this.enemyBullet.body.allowGravity = false
    this.enemyBullet.body.setCollideWorldBounds(true)
    this.enemyBullet.body.onWorldBounds = true

    this.direction = Math.atan( (this.player.x-this.enemyBullet.x) / (this.player.y-this.enemyBullet.y));

    if (this.player.y >= this.enemyBullet.y)
    {
        this.enemyBullet.setVelocityX(Math.sin(this.direction) * 100)
        this.enemyBullet.setVelocityY(Math.cos(this.direction) * 100)
    }
    else
    {
        this.enemyBullet.setVelocityX(-(Math.sin(this.direction) * 100))
        this.enemyBullet.setVelocityY(-(Math.cos(this.direction) * 100))
    }
    this.enemyBullet.body.world.on('worldbounds', function(body){
      if(body.gameObject === this) {
        this.setActive(false).setVisible(false)
      }
    }, this.enemyBullet)
  }
  }

  bulletCollision() {
    if(this.enemyBullet.active === true) {
      this.player.setActive(false).setVisible(false)
    }
  }

  update() {
    if (this.player.body.onFloor()) {
        this.player.canClimb = false
    }

    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160)
        this.player.anims.play('left', true)
        this.player.flipX = false
        this.facing = 'left'
        if (this.shift.isDown) {
          this.player.setVelocityX(-250)
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160)
        this.player.anims.play('left', true)
        this.player.flipX = true
        this.facing = 'right'
        if (this.shift.isDown) {
          this.player.setVelocityX(250)
        }
    }
    else
    {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor())
    {
        if (this.shift.isDown && this.cursors.right.isDown) {
          this.player.setVelocityY(-450)
        }
        else if (this.shift.isDown && this.cursors.left.isDown) {
          this.player.setVelocityY(-450)
        }
        else {
          this.player.setVelocityY(-370);
        }
    }


    if(this.player.canClimb === true && this.cursors.up.isDown) {
      this.player.setVelocityY(-100)
    }

    if(Phaser.Input.Keyboard.JustDown(this.space)) {
        this.launchBullet()
    }

    if(this.enemy.active !== false) {
      if(this.player.y === this.enemy.y + 8 || this.player.y < this.enemy.y - 400) {
        this.enemyChase()
      }
      else {
        this.enemy.setVelocityX(0)
      }
    }

    if(this.player.y <= this.flyingEnemy.y + 300) {
      if(this.player.x >= this.flyingEnemy.x - 330)
        this.enemyFire(this.flyingEnemy, this.time.now) 
    } else {
      return
    }

  //   if(this.player.x <= this.flyingEnemy2.x + 300 || this.player.x <= this.flyingEnemy2.x - 300 && this.flyingEnemy2.active !== false) {
  //     this.enemyFire(this.flyingEnemy2, this.time.now) 
  // }
  }
}