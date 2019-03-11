function Boot() {
  Phaser.State.call(this)
}

let Boot_proto = Object.create(Phaser.State.prototype)
Boot.prototype = Boot_proto
Boot.prototype.constructor = Boot

Boot.prototype.init = function () {

  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
  this.scale.pageAlignHorizontally = true
  this.scale.pageAlignVertically = true

}

Boot.prototype.preload = function () {

}

Boot.prototype.create  = function () {
  this.game.state.start('script')
}