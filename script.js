let config = {
  type: Phaser.CANVAS,
  width: 600,
  height: 2000,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 }
    }
  },
  debug: true,
  scene: [ Level1, Level2, Boss ]
}

let game = new Phaser.Game(config)
