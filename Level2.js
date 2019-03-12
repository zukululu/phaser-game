let platforms
let player
let moveKeys
let enemyBullets

let Bullet = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,
  initialize:

  function Bullet (scene)
  {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet')
    this.speed = 1
    this.born = 0
    this.direction = 0
    this.xSpeed = 0
    this.ySpeed = 0
    this.setSize(2, 12, true)
  },

  fire: function(shooter, target)
  {
    this.setPosition(shooter.x, shooter.y)
    this.direction = Math.atan( (target.x-this.x) / (target.y-this.y))

    if(target.y >= this.y)
    {
      this.xSpeed = this.speed*Math.sin(this.direction)
    }
    else
    {
      this.xSpeed = -this.speed*Math.sin(this.direction);
      this.ySpeed = -this.speed*Math.cos(this.direction);
    }

    this.born = 0
  },

  update: function (time, delta)
  {
    this.x += this.xSpeed * delta
    this.y += this.ySpeed * delta
    this.born += delta
    if(this.born > 1800)
    {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}) //End Bullet Class


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
  }

  create() {
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2)
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2)

    this.add.image(0, 0, 'bg').setOrigin(0)
    // this.add.image(1920, 0, 'bg').setOrigin(0).setFlipX(true)
    this.add.image(0, 1080, 'bg').setOrigin(0).setFlipY(true)
    // this.add.image(1920, 1080, 'bg').setOrigin(0).setFlipX(true).setFlipY(true)

    enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true})

    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level1')
    }, this)
    
    platforms = this.physics.add.staticGroup()
    platforms.create(400, 600, 'ground').setScale(2).refreshBody()

    
    player = this.physics.add.sprite(100, 300, 'woof')
    player.setCollideWorldBounds(true)

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

    this.physics.add.collider(player, platforms)
    //Player controls

    // cursors = this.input.keyboard.createCursorKeys()

    moveKeys = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D
  });

  // Enables movement of player with WASD keys
  this.input.keyboard.on('keydown_W', function (event) {
    if ('keydown_W' && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  })
  this.input.keyboard.on('keydown_A', function (event) {
      player.setVelocityX(-160);
  })
  this.input.keyboard.on('keydown_D', function (event) {
      player.setVelocityX(160);
  })

  this.input.keyboard.on('keyup_W', function (event) {
    if (moveKeys['down'].isUp)
        player.setAccelerationY(0);
  })
  this.input.keyboard.on('keyup_A', function (event) {
      if (moveKeys['right'].isUp)
          player.setVelocityX(0);
  })
  this.input.keyboard.on('keyup_D', function (event) {
      if (moveKeys['left'].isUp)
          player.setVelocityX(0);
  })

  }

  update() {
  }

}