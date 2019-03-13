
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
  this.canFire = true
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
    //Sample scene transition
    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level1')
    }, this)
    
    //World Creation
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

    //Bullets

    
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

  noFire() {
    console.log(this.canFire)
    this.canFire = true
  }
  
  launchBullet() {
    if(this.canFire === true) {
      this.bullet = this.physics.add.image(this.player.x, this.player.y, 'bullet')
      this.physics.add.overlap(this.bullet, this.enemy, this.bulletHit, null, this)
      this.bullet.body.allowGravity = false
      this.bullet.body.velocity.x = 400
      this.canFire = false
    }
    setTimeout(this.noFire, 1000)
}

  bulletHit(bullet, enemy) {
    this.enemy.destroy()
    this.bullet.destroy()
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

    if(this.space.isDown) {
        this.launchBullet()
        console.log(this.canFire)
    }
  }
}