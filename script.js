let config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 }
    }
  },
  debug: true,
  scene: [ Level1, Level2 ]
}

let game = new Phaser.Game(config)
