function sample() {
  Phaser.Scene.call(this)
}

let sample_proto = Object.create(Phaser.Scene.prototype)
sample.prototype = sample_proto
sample.prototype.contructor = sample

sample.prototype.init = function() {
  this.physics.startSystem(Phaser.Physics.ARCADE)
}

sample.prototype.preload = function () {
  
}