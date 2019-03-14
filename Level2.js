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
  this.enemyBullets
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
    
    this.enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    console.log(this.enemyBullets)
    console.log('create')
    //Sample scene transition
    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level1')
    }, this)
    
    //World Creation
    this.cameras.main.setBounds(0, 0, 1920 , 1080 )
    // this.physics.world.setBounds(0, 0, 1920, 1080)

    this.add.image(0, 0, 'bg').setOrigin(0)
    // this.add.image(1920, 0, 'bg').setOrigin(0).setFlipX(true)
    this.add.image(0, 1080, 'bg').setOrigin(0).setFlipY(true)
    // this.add.image(1920, 1080, 'bg').setOrigin(0).setFlipX(true).setFlipY(true)
    
    //Dummy Platform
    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(900, 600, 'ground').setScale(4).refreshBody()
    this.platforms.setDepth(1)
    
    //Player creation
    this.player = this.physics.add.sprite(100, 300, 'woof')
    this.player.setCollideWorldBounds(true)
    
    this.enemy = this.physics.add.sprite(300, 300, 'dude')
    this.flyingEnemy = this.physics.add.sprite(300, 300, 'dude')
    this.flyingEnemy.body.allowGravity = false
    this.flyingEnemy.lastFire = 0
    
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.enemy, this.platforms)
    
    //Enemy Collision
    this.physics.add.overlap(this.player, this.enemy, this.enemyCollision, null, this)

    //Camera
    // this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
    this.cameras.main
    .setPosition(0, 0)
    .setSize(2000, 1600)
    .setZoom(0.5);
    

    
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
    if(this.enemy.x < this.player.x) {
      this.enemy.setVelocityX(50)
    } else if (this.enemy.x > this.player.x) {
      this.enemy.setVelocityX(-50)
    } else {
      return
    }
  }

  enemyFire(time) {
    if(this.flyingEnemy.active === false)
      return

    if((time - this.flyingEnemy.lastFire) > 1000) {
      this.flyingEnemy.lastFire = time
     //Create bullet
    this.enemyBullet = this.physics.add.sprite(this.flyingEnemy.x, this.flyingEnemy.y, 'bullet')
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
        this.player.setVelocityY(-370);
    }

    if(Phaser.Input.Keyboard.JustDown(this.space)) {
        this.launchBullet()
    }

    if(this.player.x <= this.enemy.x + 500 || this.player.x <= this.enemy.x - 500 && this.player.y === this.enemy.y && this.enemy.active !== false) {
        this.enemyChase()
    }

    if(this.player.x <= this.flyingEnemy.x + 300 || this.player.x <= this.flyingEnemy.x - 300 && this.flyingEnemy.active !== false) {
        this.enemyFire(this.time.now) 
    }
  }
}