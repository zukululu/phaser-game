class Death extends Phaser.Scene {
    constructor() {
      super({key:'Death'})
    }
  
    preload() {
        this.load.image('death', 'assets/death.png')
    }
  
    create() {
    this.cameras.main.setBackgroundColor('#222034')
    this.add.image(250, 1000, 'death')
    this.input.keyboard.on('keyup_ENTER', function() {
      this.scene.start('Level2')
    }, this)
    }
  
    update() {
  
    }
  }