let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

let game = new Phaser.Game(config)

function preload() {
  this.load.image('sample', 'assets/mario.jpg')
}

function create() {
  this.add.image(400, 300, 'sample')
}

function update() {

}