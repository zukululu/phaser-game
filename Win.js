class Win extends Phaser.Scene {
    constructor() {
      super({key:'Win'})
    }
  
    preload() {
        this.load.image('win', 'assets/win.png')
    }
  
    create() {
    this.cameras.main.setBackgroundColor('#222034')
    this.add.image(250, 1000, 'win')
    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level2')
    }, this)
    }
  
    update() {
  
    }
  }