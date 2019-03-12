let player
let cursors

class Player extends Phaser.Scene {
  constructor() {
    super({key: 'Player'})
  }

  preload() {
    this.load.spritesheet('woof', 'assets/woof.png', { frameWidth: 32, frameHeight: 32 })
  }

  create() {
    player = this.physics.add.sprite(100, 300, 'woof')
    player.setCollideWorldBounds(true)
    this.physics.add.collider(player)
    // console.log(player)


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