class SceneLoad extends Phaser.Scene
{
  constructor()
  {
    super('SceneLoad');
  }

  preload()
  {
    this.progressText = this.add.text(0, 0, '0%', {color: '#ffffff', fontSize: game.config.width / 10});
    this.progressText.setOrigin(0.5, 0.5);
    Align.center(this.progressText);
    this.load.on('progress', this.showProgress, this);

    Effect.preload(this, model.effectExplosion);
    Effect.preload(this, model.effectArrowHit);

    this.load.image('buttonPlayAgain', 'images/btnPlayAgain.png');
    this.load.image('buttonStart', 'images/btnStart.png');
    this.load.image('blue', 'images/buttons/blue.png');
    this.load.image('red', 'images/buttons/red.png');
    this.load.image('orange', 'images/buttons/orange.png');
    this.load.image('green', 'images/buttons/green.png');
    this.load.image('arrow', 'images/arrow.png');
    this.load.image('back', 'images/back.jpg');
    this.load.image('titleBack', 'images/titleBack.jpg');
    this.load.image('target', 'images/target.png');
    this.load.image('block', 'images/knight.png');
    this.load.image('sample', 'images/sample.png');
    this.load.image('wall', 'images/wall.png');

    this.load.audio('background', 'audio/background.mp3');
    this.load.audio('boom', 'audio/boom.wav');
    this.load.audio('hit', 'audio/hit.wav');
    this.load.audio('pop', 'audio/pop.wav');
    this.load.audio('swish1', 'audio/swish1.wav');
    this.load.audio('swish2', 'audio/swish2.wav');
  }
  
  create()
  {
    model.audioManager = new AudioManager(this);
    this.scene.start('SceneTitle');
  }
  
  showProgress(progress)
  {
    const percentage = Math.floor(progress * 100);
    this.progressText.setText(percentage + '%');
  }
}