class Level2 extends Phaser.Scene {
  constructor() {
    super({key: 'Level2'})
  }

  preload() {
    this.load.image('sample', 'assets/sky.png')
  }

  create() {
    this.add.image(400, 300, 'sample')
  }

  update() {

  }

}